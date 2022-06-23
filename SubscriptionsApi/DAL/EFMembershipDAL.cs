using SubscriptionsApi.DTO;
using SubscriptionsApi.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.SqlServer;
using System.Linq;
using System.Web;

namespace SubscriptionsApi.DAL
{
    public class EFMembershipDAL
    {
        SubscriptionsDBContext dbContext = null;
        public EFMembershipDAL()
        {
            dbContext = new SubscriptionsDBContext();
        }
        public IEnumerable<MembershipDTO> GetAllMembershipsByMember(Guid memberID)
        {
            var list = (from memberships in dbContext.Memberships
                        join programs in dbContext.Programs
                        on memberships.ProgramID equals programs.ProgramID
                        join invoiceItems in dbContext.InvoiceItems
                        on memberships.MembershipID equals invoiceItems.MembershipID
                        join invoices in dbContext.Invoices
                        on invoiceItems.InvoiceID equals invoices.InvoiceID
                        where memberships.PartyID == memberID && invoices.IsRefunded == false
                        orderby memberships.StartDate descending
                        select new MembershipDTO
                        {
                            MembershipID = memberships.MembershipID,
                            ProgramID = memberships.ProgramID,
                            InvoiceID = dbContext.InvoiceItems.Where(x => x.MembershipID == memberships.MembershipID).FirstOrDefault().InvoiceID,
                            ProgramName = programs.ProgramName,
                            StartDate = memberships.StartDate.ToString(),
                            EndDate = (memberships.EndDate == null ? null : memberships.EndDate.ToString()),
                            BookedVisits = memberships.BookedVisits,
                            IsActive = memberships.IsActive,
                            UsedVisits = (programs.ProgramBasis == "openProgram" || programs.ProgramBasis == "fixedProgram" ?
                            (from membershipsVisits in dbContext.MembershipVisits
                             where memberships.MembershipID == membershipsVisits.MemberShipID
                             select membershipsVisits.MembershipVisitID).Count() :
                                          memberships.MembershipVisits.Where(i => i.InDateTime != null).Count()),
                            //InvoiceDue = ((from invoicesDue in dbContext.Invoices
                            //               join invoicesItems in dbContext.InvoiceItems
                            //               on invoicesDue.InvoiceID equals invoicesItems.InvoiceID
                            //               join payments in dbContext.Payments
                            //               on invoicesDue.InvoiceID equals payments.InvoiceID
                            //               where invoicesItems.InvoiceID == dbContext.InvoiceItems.Where(x => x.MembershipID == memberships.MembershipID).FirstOrDefault().InvoiceID
                            //               select ((((invoicesDue.InvoiceItems.Sum(x => (x.Price * x.Quantity)) - invoicesDue.DiscountValue) + invoicesDue.TaxValue) - (invoicesDue.Payments.Count > 0 ? invoicesDue.Payments.Sum(x => x.Paid) : 0)))).FirstOrDefault()),
                            IsRenewal = ((from memberships_gr in dbContext.Memberships
                                          join programs_gr in dbContext.Programs
                                          on memberships_gr.ProgramID equals programs_gr.ProgramID
                                          where memberships_gr.PartyID == memberID && memberships_gr.IsActive == true && programs_gr.IsActive == true && programs_gr.ProgramBasis != "fixedProgram"
                                          group memberships_gr by memberships_gr.ProgramID into gr
                                          select new
                                          {
                                              grProgramID = gr.Key,
                                              maxStartDate = gr.Max(x => x.StartDate)
                                          }).Where(x => x.grProgramID == programs.ProgramID && x.maxStartDate == memberships.StartDate).Count() == 1 ? true : false),
                            IsRunning = ((memberships.Program.ProgramBasis == "openProgram" || memberships.Program.ProgramBasis == "fixedProgram") && memberships.EndDate >= DateTime.Today ? true : false)
                        }).ToList();
            return list;
        }
        public IEnumerable<MembershipEndingDTO> GetMembershipsEndingSoon(Guid branchID)
        {
            var list = (from parties in dbContext.Parties
                        join memberships in dbContext.Memberships
                        on parties.PartyID equals memberships.PartyID
                        join programs in dbContext.Programs
                        on memberships.ProgramID equals programs.ProgramID
                        where parties.CompanyBranchId == branchID && memberships.IsActive == true
                        select new MembershipEndingDTO
                        {
                            MembershipID = memberships.MembershipID,
                            PartyID = parties.PartyID,
                            PartyName = parties.PartyFirstName + " " + parties.PartyLastName,
                            Telephone = parties.Telephone,
                            ProgramName = programs.ProgramName,
                            ProgramBasis = programs.ProgramBasis,
                            RemainingDay = (memberships.EndDate >= DateTime.Now ? SqlFunctions.DateDiff("day", DateTime.Now, memberships.EndDate) : null),
                            BookedVisits = memberships.BookedVisits,
                            UsedVisits = (from membershipsVisits in dbContext.MembershipVisits
                                          where memberships.MembershipID == membershipsVisits.MemberShipID
                                          select membershipsVisits.MembershipVisitID).Count(),
                            IsRenewal = ((from memberships_gr in dbContext.Memberships
                                          join programs_gr in dbContext.Programs
                                          on memberships_gr.ProgramID equals programs_gr.ProgramID
                                          where memberships_gr.PartyID == parties.PartyID && memberships_gr.IsActive == true && programs_gr.IsActive == true && programs_gr.ProgramBasis != "fixedProgram"
                                          group memberships_gr by memberships_gr.ProgramID into gr
                                          select new
                                          {
                                              grProgramID = gr.Key,
                                              maxStartDate = gr.Max(x => x.StartDate)
                                          }).Where(x => x.grProgramID == programs.ProgramID && x.maxStartDate == memberships.StartDate).Count() == 1 ? true : false),
                            IsActive = memberships.IsActive
                        }).ToList();
            return list;
        }
        public void ChangeMembershipStatus(Guid memsID, Guid userUID, bool isActive)
        {
            var membership = dbContext.Memberships.Find(memsID);

            membership.IsActive = isActive;
            membership.EditedBy = userUID;
            membership.EditDate = DateTime.Now;

            dbContext.Entry(membership).State = System.Data.Entity.EntityState.Modified;
            dbContext.SaveChangesAsync();
        }
        public IEnumerable<MembershipVisitsDTO> GetAllCheckins(Guid branchID)
        {
            var visits = (from membershipVisits in dbContext.MembershipVisits
                          join memberships in dbContext.Memberships
                          on membershipVisits.MemberShipID equals memberships.MembershipID
                          join parties in dbContext.Parties
                           on memberships.PartyID equals parties.PartyID
                          join programs in dbContext.Programs
                          on memberships.ProgramID equals programs.ProgramID
                          where parties.CompanyBranchId == branchID
                          orderby membershipVisits.InDateTime
                          select new MembershipVisitsDTO
                          {
                              MembershipVisitID = membershipVisits.MembershipVisitID,
                              CheckInDate = SqlFunctions.DatePart("year", membershipVisits.InDateTime) + "-" + SqlFunctions.DatePart("month", membershipVisits.InDateTime) + "-" + SqlFunctions.DatePart("day", membershipVisits.InDateTime),
                              CheckInTime = SqlFunctions.DatePart("hour", membershipVisits.InDateTime) + ":" + SqlFunctions.DatePart("minute", membershipVisits.InDateTime),
                              PartyName = parties.PartyFirstName + " " + parties.PartyLastName,
                              ProgramName = programs.ProgramName,
                              ReservationDate = SqlFunctions.DatePart("year", membershipVisits.ReservationDate) + "-" + SqlFunctions.DatePart("month", membershipVisits.ReservationDate) + "-" + SqlFunctions.DatePart("day", membershipVisits.ReservationDate),
                              SequenceNo = membershipVisits.SequenceNo,
                              Specialist = membershipVisits.SpecialistId.ToString(),
                              //CheckInBy= ..........
                              MembershipStartDate = memberships.StartDate

                          }).ToList();
            return visits;
        }
        public IEnumerable<MembershipVisitsDTO> GetCheckinsByMembership(Guid membershipID)
        {
            //var visits=new List<MembershipVisits>();
            //var memship = dbContext.Memberships.Find(membershipID);
            //var memProg = dbContext.Programs.Include("ProgramPackages").Where(i => i.ProgramID == memship.ProgramID).FirstOrDefault();
            //if (memProg.ProgramBasis != "Package")
            //{
            var visits = (from membershipVisits in dbContext.MembershipVisits
                          join memberships in dbContext.Memberships
                          on membershipVisits.MemberShipID equals memberships.MembershipID
                          join programs in dbContext.Programs
                          on memberships.ProgramID equals programs.ProgramID
                          where membershipVisits.MemberShipID == membershipID
                          orderby membershipVisits.ReservationDate.HasValue descending, membershipVisits.ReservationDate
                          select new MembershipVisitsDTO
                          {
                              MembershipVisitID = membershipVisits.MembershipVisitID,
                              CheckInDate = (membershipVisits.InDateTime == null ? "" : SqlFunctions.DatePart("year", membershipVisits.InDateTime) + "-" + SqlFunctions.DatePart("month", membershipVisits.InDateTime) + "-" + SqlFunctions.DatePart("day", membershipVisits.InDateTime)),
                              CheckInTime = (membershipVisits.InDateTime == null ? "" : SqlFunctions.DatePart("hour", membershipVisits.InDateTime) + ":" + SqlFunctions.DatePart("minute", membershipVisits.InDateTime)),
                              ProgramName = (programs.ProgramBasis != "Package" ? programs.ProgramName : dbContext.Programs.Where(c => c.ProgramID == membershipVisits.ChildProgramId).Select(n => n.ProgramName).FirstOrDefault()),
                              Specialist = (membershipVisits.SpecialistId == null ? "" : dbContext.Users.Where(i => i.UserID == membershipVisits.SpecialistId).Select(n => n.Party.PartyFirstName + " " + n.Party.PartyLastName).FirstOrDefault()),
                              ReservationDate = (membershipVisits.ReservationDate == null ? "" : SqlFunctions.DatePart("year", membershipVisits.ReservationDate) + "-" + SqlFunctions.DatePart("month", membershipVisits.ReservationDate) + "-" + SqlFunctions.DatePart("day", membershipVisits.ReservationDate)),
                              ReservationTime = (membershipVisits.ReservationDate == null ? "" : SqlFunctions.DatePart("hour", membershipVisits.ReservationDate) + ":" + SqlFunctions.DatePart("minute", membershipVisits.ReservationDate)),
                              SequenceNo = membershipVisits.SequenceNo
                          }).ToList();
            //}
            //else
            //{

            //}
            return visits;
        }

        public void AddMembershipVisit(Guid memShipID)
        {
            MembershipVisit memVisit = new MembershipVisit()
            {
                MemberShipID = memShipID,
                InDateTime = DateTime.Now
            };

            dbContext.MembershipVisits.Add(memVisit);
            dbContext.SaveChangesAsync();
        }

        public void PostVisit(Guid visitID)
        {
            MembershipVisit visit = dbContext.MembershipVisits.Find(visitID);
            visit.InDateTime = DateTime.Now;
            dbContext.Entry(visit).State = System.Data.Entity.EntityState.Modified;
            dbContext.SaveChanges();
        }

        public int? UpdateMembershipVisit(MembershipVisitsDTO VisitDetails)
        {
            MembershipVisit visit = dbContext.MembershipVisits.Find(VisitDetails.MembershipVisitID);
            visit.SpecialistId = (VisitDetails.Specialist == "" ? (Guid?)null : Guid.Parse(VisitDetails.Specialist));
            visit.ReservationDate = (VisitDetails.ReservationDate==""?(DateTime?)null: DateTime.Parse(VisitDetails.ReservationDate));
            if (VisitDetails.ReservationTime!="")
            {
                visit.ReservationDate = visit.ReservationDate.Value.Add(TimeSpan.Parse(VisitDetails.ReservationTime));
            }
            if (visit.SequenceNo == null)
            {
                int? seqNum = dbContext.MembershipVisits.Where(s => s.SpecialistId == visit.SpecialistId && SqlFunctions.DateDiff("DAY", s.ReservationDate, visit.ReservationDate) == 0).OrderByDescending(s => s.SequenceNo).Select(s => s.SequenceNo).FirstOrDefault();
                visit.SequenceNo = (seqNum == null ? 1 : seqNum + 1);
            }
            dbContext.Entry(visit).State = System.Data.Entity.EntityState.Modified;
            dbContext.SaveChanges();
            return visit.SequenceNo;
        }

        public IEnumerable<MembershipChartDTO> GetSubscriptionsChart(Guid compID)
        {
            DateTime prevYear = DateTime.Now.AddYears(-1);

            var currentYearSubs = (from m in dbContext.Memberships
                                   where m.Program.Division.CompanyID == compID && m.StartDate.Year == DateTime.Now.Year
                                   orderby m.StartDate
                                   select new { IsCurrent = true, m.StartDate.Month }).ToList();

            var prevYearSubs = (from m in dbContext.Memberships
                                where m.Program.Division.CompanyID == compID && m.StartDate.Year == prevYear.Year
                                orderby m.StartDate
                                select new { IsCurrent = false, m.StartDate.Month }).ToList();

            var list = (from all in currentYearSubs.Concat(prevYearSubs)
                        group all by all.Month into gr
                        select new MembershipChartDTO
                        {
                            MonthOfYear = gr.Key.ToString(),
                            CountCurrentYear = gr.Count(m => m.IsCurrent == true),
                            CountPrevYear = gr.Count(m => m.IsCurrent == false)
                        }).ToList();

            return list;
        }
        public IEnumerable<MembershipDTO> GetSubscriptions(Guid memberID)
        {
            var list = (from memberships in dbContext.Memberships
                        join parties in dbContext.Parties
                        on memberships.PartyID equals parties.PartyID
                        join users in dbContext.Users
                        on parties.PartyID equals users.PartyID
                        where users.UserID == memberID
                        orderby memberships.StartDate descending
                        select new MembershipDTO
                        {
                            MembershipID = memberships.MembershipID,
                            ProgramName = memberships.Program.ProgramName,
                            StartDate = memberships.StartDate.ToString(),
                            EndDate = (memberships.EndDate == null ? null : memberships.EndDate.ToString()),
                            BookedVisits = memberships.BookedVisits,
                            UsedVisits = memberships.MembershipVisits.Count(),
                            IsActive = memberships.IsActive
                        }).ToList();
            return list;
        }
        public IEnumerable<BookedVisitsDTO> GetBookedVisits(Guid specialistID)
        {
            var list = (from visits in dbContext.MembershipVisits
                        join memberships in dbContext.Memberships
                        on visits.MemberShipID equals memberships.MembershipID
                        join invoiceItems in dbContext.InvoiceItems
                        on memberships.MembershipID equals invoiceItems.MembershipID
                        where visits.SpecialistId==specialistID && visits.ReservationDate!=null && memberships.IsActive == true
                        select new BookedVisitsDTO
                        {
                            MembershipVisitID = visits.MembershipVisitID,
                            PartyID = memberships.PartyID,
                            InvoiceID = invoiceItems.InvoiceID,
                            PartyName = memberships.Party.PartyFirstName +" "+ memberships.Party.PartyLastName,
                            ProgramName = memberships.Program.ProgramName,
                            ReservationDate = SqlFunctions.DatePart("year", visits.ReservationDate) + "-" + SqlFunctions.DatePart("month", visits.ReservationDate) + "-" + SqlFunctions.DatePart("day", visits.ReservationDate),
                            SequenceNo = visits.SequenceNo
                        }).ToList();
            return list;                
        }
    }
}