using SubscriptionsApi.DTO;
using SubscriptionsApi.Models;
using SubscriptionsApi.Utilities;
using System;
using System.Collections.Generic;
using System.Data.Entity.SqlServer;
using System.Linq;
using System.Web;

namespace SubscriptionsApi.DAL
{
    public class EFInvoiceDAL
    {
        SubscriptionsDBContext dbContext;
        Helper helper;
        public EFInvoiceDAL()
        {
            dbContext = new SubscriptionsDBContext();
            helper = new Helper();
        }

        public InvoiceDTO GetAllInvoiceDetails(Guid invoiceId)
        {
            InvoiceDTO invoiceDetails = new InvoiceDTO();
            invoiceDetails = (from invoices in dbContext.Invoices
                              where invoices.InvoiceID == invoiceId
                              select new InvoiceDTO
                              {
                                  InvoiceSerial = invoices.InvoiceSerial,
                                  InvoiceDate = SqlFunctions.DatePart("year", invoices.CreationDate) + "-" + SqlFunctions.DatePart("month", invoices.CreationDate) + "-" + SqlFunctions.DatePart("day", invoices.CreationDate),
                                  InvoiceTime = SqlFunctions.DatePart("hour", invoices.CreationDate) + ":" + SqlFunctions.DatePart("minute", invoices.CreationDate),
                                  InvoiceMemberships = invoices.InvoiceItems.Where(x => x.ItemID == null).Select(x => x.Membership),
                                  InvoiceItems = invoices.InvoiceItems.OrderByDescending(x => x.MembershipID).ToList(),
                                  DiscountPercent = invoices.DiscountPercent,
                                  DiscountValue = invoices.DiscountValue,
                                  TaxPercent = invoices.TaxPercent,
                                  TaxValue = invoices.TaxValue,
                                  Paid = (invoices.Payments.Count > 0 ? invoices.Payments.Sum(x => x.Paid) : 0)
                              }).FirstOrDefault();
            return invoiceDetails;
        }

        public long? GetLastInvoiceSerial(Guid companyID)
        {
            long? lastSerial = dbContext.CompanyPreferences.Where(x => x.CompanyID == companyID).Select(x => x.LastInvoiceSerial).FirstOrDefault();
            return lastSerial;
        }

        public Guid AddNewInvoice(InvoiceDTO invoiceObj)
        {
            Invoice invoice = new Invoice()
            {
                InvoiceID = Guid.NewGuid(),
                InvoiceSerial = invoiceObj.InvoiceSerial,
                PartyID = invoiceObj.PartyID,
                BranchID = invoiceObj.BranchID,
                DiscountPercent = invoiceObj.DiscountPercent,
                DiscountValue = invoiceObj.DiscountValue,
                TaxPercent = invoiceObj.TaxPercent,
                TaxValue = invoiceObj.TaxValue,
                CreationDate = DateTime.Now,
                IsRefunded = false,
                EditDate = DateTime.Now,
                EditedBy = invoiceObj.EditedBy
            };
            dbContext.Invoices.Add(invoice);

            Payment payment = new Payment()
            {
                PaymentID = Guid.NewGuid(),
                Invoice = invoice,
                PartyID = invoiceObj.PartyID,
                Paid = invoiceObj.Paid,
                NextPaymentDate = (invoiceObj.NextPaymentDate != "" ? DateTime.Parse(invoiceObj.NextPaymentDate) : (DateTime?)null),
                EditDate = DateTime.Now,
                EditedBy = invoiceObj.EditedBy
            };
            dbContext.Payments.Add(payment);

            Membership lastMemshipAdded = new Membership();

            if (invoiceObj.InvoiceMemberships.Count() > 0)
            {
                foreach (Membership memship in invoiceObj.InvoiceMemberships)
                {
                    memship.MembershipID = Guid.NewGuid();
                    memship.EditDate = DateTime.Now;
                    memship.EditedBy = invoiceObj.EditedBy;
                    dbContext.Memberships.Add(memship);
                    lastMemshipAdded = memship;
                    decimal memshipPrice = dbContext.Programs.Find(memship.ProgramID).ProgramFees;

                    // create visits if basis not open or fixed
                    var memProg = dbContext.Programs.Include("ProgramPackages").Where(i => i.ProgramID == memship.ProgramID).FirstOrDefault();
                    if (memProg.ProgramBasis == "oneVisit" || memProg.ProgramBasis == "multiVisits")
                    {
                        for (int i = 0; i < memship.BookedVisits; i++)
                        {
                            MembershipVisit memVisit = new MembershipVisit()
                            {
                                MembershipVisitID = Guid.NewGuid(),
                                MemberShipID = memship.MembershipID,
                                SpecialistId = memship.SpecialistId,
                                InDateTime = null,
                                OutDateTime = null,
                                ReservationDate = (i == 0 ? (DateTime?)memship.StartDate : null),
                                ChildProgramId = null,
                                SequenceNo = null
                            };
                            dbContext.MembershipVisits.Add(memVisit);
                        }
                    }
                    if (memProg.ProgramBasis == "Package")
                    {
                        foreach (var prog in memProg.ProgramPackages)
                        {
                            for (int i = 0; i < prog.ChildVisitsCount; i++)
                            {
                                MembershipVisit memVisit = new MembershipVisit()
                                {
                                    MembershipVisitID = Guid.NewGuid(),
                                    MemberShipID = memship.MembershipID,
                                    SpecialistId = memship.SpecialistId,
                                    InDateTime = null,
                                    OutDateTime = null,
                                    ReservationDate = null,
                                    ChildProgramId = prog.ChildProgramId,
                                    SequenceNo = null
                                };
                                dbContext.MembershipVisits.Add(memVisit);
                            }
                        }
                    }

                    InvoiceItem invoiceItem = new InvoiceItem()
                    {
                        InvoiceItemID = Guid.NewGuid(),
                        Membership = memship,
                        ItemID = null,
                        Invoice = invoice,
                        Price = memshipPrice,
                        Quantity = 1,
                    };
                    dbContext.InvoiceItems.Add(invoiceItem);
                }
            }
            if (invoiceObj.InvoiceItems.Count() > 0)
            {
                foreach (InvoiceItem item in invoiceObj.InvoiceItems)
                {
                    InvoiceItem invoiceItem = new InvoiceItem()
                    {
                        InvoiceItemID = Guid.NewGuid(),
                        ItemID = item.ItemID,
                        MembershipID = null,
                        Invoice = invoice,
                        Price = item.Price,
                        Quantity = item.Quantity
                    };
                    dbContext.InvoiceItems.Add(invoiceItem);
                }
            }

            CompanyPreference compSetting = dbContext.Branches.Where(b => b.BranchID == invoiceObj.BranchID).Select(c => c.Company.CompanyPreferences.FirstOrDefault()).FirstOrDefault();
            compSetting.LastInvoiceSerial = invoiceObj.InvoiceSerial;
            dbContext.Entry(compSetting).State = System.Data.Entity.EntityState.Modified;

            dbContext.SaveChanges();
            return lastMemshipAdded.MembershipID;
        }

        public void UpdateInvoice(InvoiceDTO invoiceObj, Guid invoiesId)
        {
            Invoice invoice = dbContext.Invoices.Find(invoiesId);

            invoice.DiscountPercent = invoiceObj.DiscountPercent;
            invoice.DiscountValue = invoiceObj.DiscountValue;
            invoice.TaxPercent = invoiceObj.TaxPercent;
            invoice.TaxValue = invoiceObj.TaxValue;
            invoice.EditDate = DateTime.Now;
            invoice.EditedBy = invoiceObj.EditedBy;

            dbContext.Entry(invoice).State = System.Data.Entity.EntityState.Modified;

            if (invoiceObj.Paid != 0)
            {
                Payment payment = new Payment()
                {
                    Invoice = invoice,
                    PartyID = invoiceObj.PartyID,
                    Paid = invoiceObj.Paid,
                    NextPaymentDate = (invoiceObj.NextPaymentDate != "" ? DateTime.Parse(invoiceObj.NextPaymentDate) : (DateTime?)null),
                    EditDate = DateTime.Now,
                    EditedBy = invoiceObj.EditedBy
                };
                dbContext.Payments.Add(payment);
            }

            dbContext.SaveChanges();
        }
        public IEnumerable<InvoiceListDTO> GetAllInvoices(Guid companyID)
        {
            var list = (from invoices in dbContext.Invoices
                        join parties in dbContext.Parties
                        on invoices.PartyID equals parties.PartyID
                        join branches in dbContext.Branches
                        on invoices.BranchID equals branches.BranchID
                        where branches.Company.CompanyID == companyID && invoices.IsRefunded == false
                        orderby invoices.InvoiceSerial
                        select new InvoiceListDTO
                        {
                            InvoiceID = invoices.InvoiceID,
                            PartyID = invoices.PartyID,
                            MembershipID = invoices.InvoiceItems.Select(x => x.MembershipID).FirstOrDefault(),
                            PartyName = parties.PartyFirstName + " " + parties.PartyLastName,
                            Telephone = parties.Telephone,
                            InvoiceSerial = invoices.InvoiceSerial,
                            InvoiceDate = SqlFunctions.DatePart("year", invoices.CreationDate) + "-" + SqlFunctions.DatePart("month", invoices.CreationDate) + "-" + SqlFunctions.DatePart("day", invoices.CreationDate),
                            Total = (invoices.InvoiceItems.Sum(x => x.Price * x.Quantity) - invoices.DiscountValue.Value) + invoices.TaxValue.Value,
                            Paid = (invoices.Payments.Count > 0 ? invoices.Payments.Sum(x => x.Paid) : 0),
                            ProgramID = invoices.InvoiceItems.Select(x => x.Membership.ProgramID).FirstOrDefault(),
                            NextPaymentDate = invoices.Payments.OrderByDescending(x => x.NextPaymentDate).Select(x => x.NextPaymentDate.ToString()).FirstOrDefault(),
                            IsHasMembership = (invoices.InvoiceItems.Where(x => x.MembershipID.HasValue).Count() > 0 ? true : false),
                            IsMembershipActive = invoices.InvoiceItems.Where(x => x.MembershipID.HasValue).Select(x => x.Membership.IsActive).DefaultIfEmpty(true).FirstOrDefault(),
                            MembershipName = invoices.InvoiceItems.Where(x => x.MembershipID.HasValue).Select(x => x.Membership.Program.ProgramName).FirstOrDefault()
                        }).ToList();
            return list;
        }
        public void RefundInvoice(Guid invoiecId, Guid UserId)
        {
            Invoice invoice = dbContext.Invoices.Find(invoiecId);

            invoice.IsRefunded = true;
            invoice.EditDate = DateTime.Now;
            invoice.EditedBy = UserId;

            dbContext.Entry(invoice).State = System.Data.Entity.EntityState.Modified;
            dbContext.SaveChanges();
        }
        public IEnumerable<InvoiceChartDTO> CashFlowChart(Guid compID)
        {
            decimal noValue = 0;
            DateTime prevYear = DateTime.Now.AddYears(-1);
            var currentYearPays = from p in dbContext.Payments
                                  where p.Party.Branch.CompanyID == compID && p.EditDate.Year == DateTime.Now.Year
                                  orderby p.EditDate
                                  select new { IsSubs = true, p.EditDate.Month, CurrentPays = p.Paid, PrevPays = noValue };
            var prevYearPays = from p in dbContext.Payments
                               where p.Party.Branch.CompanyID == compID && p.EditDate.Year == prevYear.Year
                               orderby p.EditDate
                               select new { IsSubs = false, p.EditDate.Month, CurrentPays = noValue, PrevPays = p.Paid };

            var list = (from all in currentYearPays.Concat(prevYearPays)
                        group all by all.Month into gr
                        select new InvoiceChartDTO
                        {
                            MonthOfYear = gr.Key.ToString(),
                            TotalCurrentPay = gr.Sum(p => p.CurrentPays),
                            TotalPrevPay = gr.Sum(p => p.PrevPays)
                        }).ToList();

            return list;
        }
    }
}