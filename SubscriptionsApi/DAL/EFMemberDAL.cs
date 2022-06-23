using Newtonsoft.Json;
using SubscriptionsApi.DTO;
using SubscriptionsApi.Models;
using SubscriptionsApi.Utilities;
using System;
using System.Collections.Generic;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;

namespace SubscriptionsApi.DAL
{
    public class EFMemberDAL
    {
        SubscriptionsDBContext dbContext = null;
        Helper helper;
        public EFMemberDAL()
        {
            dbContext = new SubscriptionsDBContext();
            helper = new Helper();
        }
        public IEnumerable<MemberSearchDTO> GetAllMembers(Guid branchID)
        {
            var members = (from parties in dbContext.Parties
                           join memberships in dbContext.Memberships
                           on parties.PartyID equals memberships.PartyID into mems
                           from memberships in mems.Where(x => x.IsActive == true).DefaultIfEmpty().OrderByDescending(x => x.StartDate).Take(1)
                           join Joiningmemberships in dbContext.Memberships
                           on parties.PartyID equals Joiningmemberships.PartyID into joinmems
                           from Joiningmemberships in joinmems.DefaultIfEmpty().OrderBy(x => x.StartDate).Take(1)
                           join programs in dbContext.Programs
                           on memberships.ProgramID equals programs.ProgramID into progs
                           from programs in progs.DefaultIfEmpty()
                           join partyTypes in dbContext.PartiesTypeLookups
                           on parties.PartyTypeId equals partyTypes.PartyTypeID
                           where parties.CompanyBranchId == branchID && partyTypes.PartyTypeName == "Customer"
                           orderby parties.PartyFirstName, parties.PartyLastName
                           select new MemberSearchDTO
                           {
                               PartyID = parties.PartyID,
                               MembershipID = memberships.MembershipID,
                               PartyFirstName = parties.PartyFirstName,
                               PartyLastName = parties.PartyLastName,
                               Telephone = parties.Telephone,
                               ProgramName = programs.ProgramName,
                               JoiningDate = Joiningmemberships.StartDate.ToString(),
                               PartyCode = parties.PartyCode
                           }).ToList();
            return members;
        }
        public MemberDTO GetMemberDTOByID(Guid partyID)
        {
            MemberDTO member = new MemberDTO();
            member = (from parties in dbContext.Parties
                      where parties.PartyID == partyID
                      select new MemberDTO
                      {
                          PartyID = parties.PartyID,
                          PartyFirstName = parties.PartyFirstName,
                          PartyLastName = parties.PartyLastName,
                          CompanyBranchId = parties.CompanyBranchId,
                          Email = parties.Email,
                          Telephone = parties.Telephone,
                          Address = parties.Address,
                          GenderID = parties.GenderID,
                          Birthday = parties.Birthday.ToString(),
                          Picture = parties.Picture,
                          MembershipsCount = parties.Memberships.Count,
                          TotalDue = (from invoices in dbContext.Invoices
                                      where invoices.PartyID == partyID
                                      select
                                      ((invoices.InvoiceItems.Sum(x => x.Price * x.Quantity) - invoices.DiscountValue.Value) + invoices.TaxValue.Value) - ((invoices.Payments.Count > 0 ? invoices.Payments.Sum(x => x.Paid) : 0))).Sum(),
                          AccountUserID = (dbContext.Users.Where(x => x.PartyID == partyID).Count() > 0 ? dbContext.Users.Where(x => x.PartyID == partyID).Select(x => x.UserID).FirstOrDefault().ToString() : null),
                          IsBlocked = (dbContext.Users.Where(x => x.PartyID == partyID).Count() > 0 ? dbContext.Users.Where(x => x.PartyID == partyID).Select(x => x.IsBlockedByAdmin).FirstOrDefault() : null),
                          JoiningDate = parties.Memberships.OrderBy(s => s.StartDate).Select(s => s.StartDate.ToString()).FirstOrDefault(),
                          PartyCode = parties.PartyCode
                      }).FirstOrDefault();
            return member;
        }
        public IEnumerable<MemberCalendarDTO> GetAllMembersByProgID(Guid progID)
        {
            string progBasis = dbContext.Programs.Where(x => x.ProgramID == progID).Select(x => x.ProgramBasis).FirstOrDefault();
            if (progBasis == "openProgram" || progBasis == "fixedProgram")
            {
                var members = (from memberships in dbContext.Memberships
                               where memberships.ProgramID == progID
                               group memberships by memberships.PartyID into memberships_gr
                               select new MemberCalendarDTO
                               {
                                   PartyID = memberships_gr.Key,
                                   MembershipID = (memberships_gr.Where(x => x.EndDate >= DateTime.Today).Count() > 0 ? memberships_gr.Where(x => x.EndDate >= DateTime.Today).OrderBy(x => x.EndDate).FirstOrDefault().MembershipID : memberships_gr.OrderByDescending(x => x.EndDate).Select(x => x.MembershipID).FirstOrDefault()),
                                   PartyName = dbContext.Parties.Where(x => x.PartyID == memberships_gr.Key).Select(x => x.PartyFirstName + " " + x.PartyLastName).FirstOrDefault(),
                                   Telephone = dbContext.Parties.Where(x => x.PartyID == memberships_gr.Key).Select(x => x.Telephone).FirstOrDefault(),
                                   IsRunning = (memberships_gr.Where(x => x.EndDate >= DateTime.Today).Count() > 0 && memberships_gr.Where(x => x.IsActive == true).Count() > 0 ? true : false)
                               }).ToList();
                foreach (var item in members)
                {
                    var m = (from memberships in dbContext.Memberships
                             where memberships.MembershipID == item.MembershipID
                             select new MembershipDTO
                             {
                                 MembershipID = memberships.MembershipID,
                                 StartDate = memberships.StartDate.ToString(),
                                 EndDate = memberships.EndDate.ToString()
                             }).FirstOrDefault();
                    item.StartDate = m.StartDate.ToString();
                    item.EndDate = m.EndDate.ToString();
                    item.BookedVisits = null;
                    item.UsedVisits = dbContext.MembershipVisits.Where(x => x.MemberShipID == m.MembershipID).Count();
                }

                return members;
            }

            else       // if(progBasis == "oneVisit" || progBasis == "multiVisits")
            {
                var members = (from memberships in dbContext.Memberships
                               where memberships.ProgramID == progID
                               group memberships by memberships.PartyID into memberships_gr
                               select new MemberCalendarDTO
                               {
                                   PartyID = memberships_gr.Key,
                                   MembershipID = (memberships_gr.Where(x => x.BookedVisits > x.MembershipVisits.Count).Count() > 0 ? memberships_gr.Where(x => x.BookedVisits > x.MembershipVisits.Count).OrderBy(x => x.StartDate).FirstOrDefault().MembershipID : memberships_gr.OrderByDescending(x => x.StartDate).Select(x => x.MembershipID).FirstOrDefault()),
                                   PartyName = dbContext.Parties.Where(x => x.PartyID == memberships_gr.Key).Select(x => x.PartyFirstName + " " + x.PartyLastName).FirstOrDefault(),
                                   Telephone = dbContext.Parties.Where(x => x.PartyID == memberships_gr.Key).Select(x => x.Telephone).FirstOrDefault(),
                                   IsRunning = (memberships_gr.Where(x => x.BookedVisits > x.MembershipVisits.Count).Count() > 0 && memberships_gr.Where(x => x.IsActive == true).Count() > 0 ? true : false)
                               }).ToList();
                foreach (var item in members)
                {
                    Membership m = dbContext.Memberships.Where(x => x.MembershipID == item.MembershipID).FirstOrDefault();
                    item.StartDate = null;
                    item.EndDate = null;
                    item.BookedVisits = m.BookedVisits;
                    item.UsedVisits = dbContext.MembershipVisits.Where(x => x.MemberShipID == m.MembershipID).Count();
                }

                return members;
            }
        }
        public Guid AddMember(MemberDTO m)
        {
            /*----- save picture on server and Database ----*/
            string PictRelativePath = null;
            if (m.Picture != null)
            {
                byte[] imageBytes = Convert.FromBase64String(m.Picture);
                MemoryStream ms = new MemoryStream(imageBytes, 0, imageBytes.Length);
                ms.Write(imageBytes, 0, imageBytes.Length);
                System.Drawing.Image image = System.Drawing.Image.FromStream(ms, true);
                string companyFolderName = dbContext.Companies.Where(c => c.Branches.Select(b => b.BranchID).FirstOrDefault() == m.CompanyBranchId).Select(c => c.CompanyID).FirstOrDefault().ToString();
                string memberPath = Path.Combine(HttpContext.Current.Server.MapPath("~/Images_Company/") + companyFolderName, "Members");
                if (!Directory.Exists(memberPath))
                {
                    Directory.CreateDirectory(memberPath);
                }
                string fileName = m.PartyID.ToString() + ".jpg";
                string filePath = Path.Combine(HttpContext.Current.Server.MapPath("~/Images_Company/") + companyFolderName, "Members", fileName);
                image.Save(filePath, ImageFormat.Jpeg);
                Uri fullPath = new Uri(filePath, UriKind.Absolute);
                Uri rootPath = new Uri(HttpContext.Current.Server.MapPath("~/Images_Company/"), UriKind.Absolute);
                PictRelativePath = "../Images_Company/" + rootPath.MakeRelativeUri(fullPath).ToString();
            }

            int? lastPartyCode = dbContext.Parties.Where(b => b.CompanyBranchId == m.CompanyBranchId).OrderByDescending(c => c.PartyCode).Select(c => c.PartyCode).FirstOrDefault();
            Party p = new Party()
            {
                PartyID = Guid.NewGuid(),
                PartyFirstName = m.PartyFirstName,
                PartyLastName = m.PartyLastName,
                CompanyBranchId = m.CompanyBranchId,
                PartyTypeId = GetConstID.partyCustomerTypeID,
                Email = m.Email,
                Telephone = m.Telephone,
                Address = m.Address,
                GenderID = m.GenderID,
                Birthday = (m.Birthday == "" ? (DateTime?)null : DateTime.Parse(m.Birthday)),
                Picture = PictRelativePath,
                IsIndividual = true,
                PartyCode = (lastPartyCode == null ? 1 : lastPartyCode + 1),
                EditDate = DateTime.Now,
                EditedBy = m.EditedBy
            };
            dbContext.Parties.Add(p);
            dbContext.SaveChanges();
            return p.PartyID;
        }
        public void UpdateMemberDetails(MemberDTO memberDetails)
        {
            var party = dbContext.Parties.Find(memberDetails.PartyID);

            party.PartyFirstName = memberDetails.PartyFirstName;
            party.PartyLastName = memberDetails.PartyLastName;
            party.Email = memberDetails.Email;
            party.Telephone = memberDetails.Telephone;
            party.Address = memberDetails.Address;
            party.GenderID = memberDetails.GenderID;
            party.Birthday = (memberDetails.Birthday == "" ? (DateTime?)null : DateTime.Parse(memberDetails.Birthday));

            /*----- save picture on server and Database ----*/
            string PictRelativePath = null;
            if (memberDetails.Picture != null)
            {
                byte[] imageBytes = Convert.FromBase64String(memberDetails.Picture);
                MemoryStream ms = new MemoryStream(imageBytes, 0, imageBytes.Length);
                ms.Write(imageBytes, 0, imageBytes.Length);
                System.Drawing.Image image = System.Drawing.Image.FromStream(ms, true);
                string companyFolderName = dbContext.Companies.Where(c => c.Branches.Select(b => b.BranchID).FirstOrDefault() == memberDetails.CompanyBranchId).Select(c => c.CompanyID).FirstOrDefault().ToString();
                string memberPath = Path.Combine(HttpContext.Current.Server.MapPath("~/Images_Company/") + companyFolderName, "Members");
                if (!Directory.Exists(memberPath))
                {
                    Directory.CreateDirectory(memberPath);
                }
                string fileName = memberDetails.PartyID.ToString() + ".jpg";
                string filePath = Path.Combine(HttpContext.Current.Server.MapPath("~/Images_Company/") + companyFolderName, "Members", fileName);
                image.Save(filePath, ImageFormat.Jpeg);
                Uri fullPath = new Uri(filePath, UriKind.Absolute);
                Uri rootPath = new Uri(HttpContext.Current.Server.MapPath("~/Images_Company/"), UriKind.Absolute);
                PictRelativePath = "../Images_Company/" + rootPath.MakeRelativeUri(fullPath).ToString();
                party.Picture = PictRelativePath;
            }

            party.EditDate = DateTime.Now;
            party.EditedBy = memberDetails.EditedBy;

            dbContext.Entry(party).State = System.Data.Entity.EntityState.Modified;
            dbContext.SaveChangesAsync();
        }
    }
}