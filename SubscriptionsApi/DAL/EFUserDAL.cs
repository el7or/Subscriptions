using SubscriptionsApi.DTO;
using SubscriptionsApi.Models;
using SubscriptionsApi.Utilities;
using System;
using System.Collections.Generic;
using System.Data.Entity.SqlServer;
using System.Data.Entity.Validation;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Web;

namespace SubscriptionsApi.DAL
{
    public class EFUserDAL
    {
        SubscriptionsDBContext dbContext = null;
        Helper helper;
        public EFUserDAL()
        {
            dbContext = new SubscriptionsDBContext();
            helper = new Helper();
        }
        public UserDTO GetUserDTOByID(Guid userID)
        {
            try
            {
                UserDTO user = new UserDTO();
                Guid moduleId = GetConstID.moduleID;
                user = (from users in dbContext.Users
                        join parties in dbContext.Parties
                        on users.PartyID equals parties.PartyID
                        join branches in dbContext.Branches
                        on users.BranchID equals branches.BranchID
                        join companies in dbContext.Companies
                        on branches.CompanyID equals companies.CompanyID
                        join industries in dbContext.Industries
                        on companies.IndustryID equals industries.IndustryID
                        join userSettings in dbContext.UserPreferences
                        on users.UserID equals userSettings.UserID
                        where users.UserID == userID
                        select new UserDTO
                        {
                            UserID = users.UserID,
                            PartyID = parties.PartyID,
                            BranchID = users.BranchID,
                            CompanyID = companies.CompanyID,
                            RoleTitle = users.Roles.Where(x => x.ModuleID == moduleId).FirstOrDefault().RoleTitle,
                            UserName = users.UserName,
                            Email = parties.Email,
                            PartyFirstName = parties.PartyFirstName,
                            PartyLastName = parties.PartyLastName,
                            Telephone = parties.Telephone,
                            CompanyName = companies.CompanyName,
                            Industry = industries.IndustryTitle,
                            Language = userSettings.LanguageID,
                            Currency = userSettings.Currency.code,
                            AlertDays = userSettings.AlertDays,
                            AlertVisits = userSettings.AlertVisits,
                            AlertPayments = userSettings.AlertPayments,
                            CheckDivisions = (companies.Divisions.Count() > 0 ? true : false),
                            Logo = companies.Logo,
                            isCompanyExpired = (SqlFunctions.DateDiff("day", DateTime.Today, companies.NextPaymentDate) <6? true:false),
                            ExpirationDays = SqlFunctions.DateDiff("day", DateTime.Today, companies.NextPaymentDate),
                            EditedBy = users.EditedBy
                        }).FirstOrDefault();
                return user;
            }
            catch (Exception ex)
            {
                helper.WriteLog(userID, System.Reflection.MethodBase.GetCurrentMethod().Name, ex.InnerException.Message);
                throw;
            }

        }
        public void UpdateUserDetails(PartyDTO userDetails)
        {
            var us = dbContext.Parties.Find(userDetails.PartyID);

            us.PartyFirstName = userDetails.PartyFirstName;
            us.PartyLastName = userDetails.PartyLastName;
            us.Telephone = userDetails.Telephone;
            us.EditedBy = userDetails.EditedBy;
            us.EditDate = DateTime.Now;

            dbContext.Entry(us).State = System.Data.Entity.EntityState.Modified;
            dbContext.SaveChangesAsync();
        }
        public bool UpdateUserPassword(PasswordDTO passowrdDetails)
        {
            var us = dbContext.Users.Find(passowrdDetails.EditedBy);
            if (us.Password == passowrdDetails.OldPassword)
            {
                us.Password = passowrdDetails.NewPassword;
                us.EditedBy = passowrdDetails.EditedBy;
                us.EditDate = DateTime.Now;

                dbContext.Entry(us).State = System.Data.Entity.EntityState.Modified;
                dbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }
        public string ResetSubscriberPass(string userId, string oldPass, string newPass)
        {
            var us = dbContext.Users.Find(Guid.Parse(userId));
            if (us.Password == oldPass)
            {
                us.Password = newPass;
                us.EditedBy = Guid.Parse(userId);
                us.EditDate = DateTime.Now;

                dbContext.Entry(us).State = System.Data.Entity.EntityState.Modified;
                dbContext.SaveChangesAsync();
                return "Done";
            }
            return "NoPass";
        }
        public string SaveCompanyLogo(CompanyDTO logoDetails)
        {
            string PictRelativePath = null;
            if (logoDetails.binaryImage != null)
            {
                byte[] imageBytes = Convert.FromBase64String(logoDetails.binaryImage);
                MemoryStream ms = new MemoryStream(imageBytes, 0, imageBytes.Length);
                ms.Write(imageBytes, 0, imageBytes.Length);
                System.Drawing.Image image = System.Drawing.Image.FromStream(ms, true);

                string companyFolderName = logoDetails.CompanyID.ToString();
                string companyPath = Path.Combine(HttpContext.Current.Server.MapPath("~/Images_Company/") + companyFolderName);
                if (!Directory.Exists(companyPath))
                {
                    Directory.CreateDirectory(companyPath);
                }
                string fileName = "logo.jpg";
                string filePath = Path.Combine(HttpContext.Current.Server.MapPath("~/Images_Company/") + companyFolderName, fileName);
                image.Save(filePath, ImageFormat.Jpeg);
                Uri fullPath = new Uri(filePath, UriKind.Absolute);
                Uri rootPath = new Uri(HttpContext.Current.Server.MapPath("~/Images_Company/"), UriKind.Absolute);
                PictRelativePath = "../Images_Company/" + rootPath.MakeRelativeUri(fullPath).ToString();
            }
            var comp = dbContext.Companies.Find(logoDetails.CompanyID);

            comp.Logo = PictRelativePath;
            comp.EditedBy = logoDetails.EditedBy;
            comp.EditDate = DateTime.Now;

            dbContext.Entry(comp).State = System.Data.Entity.EntityState.Modified;
            dbContext.SaveChanges();
            return PictRelativePath;
        }
        public void UpdateCompanyInfo(CompanyDTO companyDetails)
        {
            var comp = dbContext.Companies.Find(companyDetails.CompanyID);

            comp.CompanyName = companyDetails.CompanyName;
            //comp.Industry = companyDetails.Industry;
            comp.EditedBy = companyDetails.EditedBy;
            comp.EditDate = DateTime.Now;

            dbContext.Entry(comp).State = System.Data.Entity.EntityState.Modified;
            dbContext.SaveChangesAsync();
        }
        public bool CheckActivate(Guid companyUID)
        {
            var comp = dbContext.Companies.Find(companyUID);
            return comp.IsActivate;
        }
        public void sendActivation(Guid userID)
        {
            var user = dbContext.Users.Find(userID);
            int? userSettings = dbContext.UserPreferences.Where(x => x.UserID == userID).Select(s => s.LanguageID).FirstOrDefault();
            string userEmail = user.UserName;
            string tokenID = user.VerificationToken.ToString();
            SendActivationMail.sendActivation(userEmail, tokenID, userSettings);
        }
        public void sendClientAccess(string email)
        {
            var user = dbContext.Users.Where(u => u.UserName == email.ToLower().Trim()).FirstOrDefault();
            SendActivationMail.sendClientAccessForAndroid(user.UserName, user.Password);
        }
        public string CheckLoginDataAndroid(string email, string pass)
        {
            var user = dbContext.Users.Where(u => u.UserName == email.ToLower().Trim()).FirstOrDefault();
            if (user == null)
            {
                return "";
            }
            else
            {
                if (user.Password != pass)
                {
                    return "NoPass";
                }
                else
                {
                    return user.UserID.ToString();
                }
            }
        }
        public IEnumerable<UserStaffDTO> GetAllStaffUsers(Guid compID)
        {
            var list = (from users in dbContext.Users
                        join parties in dbContext.Parties
                        on users.PartyID equals parties.PartyID
                        join branches in dbContext.Branches
                        on users.BranchID equals branches.BranchID
                        join companies in dbContext.Companies
                        on branches.CompanyID equals companies.CompanyID
                        where companies.CompanyID == compID && users.IsDeleted == false && users.Roles.Select(x => x.RoleID).FirstOrDefault() != GetConstID.ClientRoleID
                        orderby users.IsAdmin descending
                        select new UserStaffDTO
                        {
                            UserID = users.UserID,
                            BranchID = users.BranchID,
                            RoleID = users.Roles.Where(x => x.ModuleID == GetConstID.moduleID).FirstOrDefault().RoleID,
                            DivisionID = users.DivisionID,
                            PartyFirstName = parties.PartyFirstName,
                            UserName = users.UserName,
                            Password = users.Password,
                            branchTitle = branches.branchTitle,
                            RoleTitle = users.Roles.Where(x => x.ModuleID == GetConstID.moduleID).FirstOrDefault().RoleTitle,
                            IsBlockedByAdmin = users.IsBlockedByAdmin,
                        }).ToList();
            return list;
        }
        public IEnumerable<UserStaffDTO> GetUsersByBranch(Guid branchID)
        {
            var list = (from users in dbContext.Users
                        join parties in dbContext.Parties
                        on users.PartyID equals parties.PartyID
                        join branches in dbContext.Branches
                        on users.BranchID equals branches.BranchID
                        where users.BranchID == branchID && users.IsDeleted == false && users.Roles.Select(x => x.RoleID).FirstOrDefault() != GetConstID.ClientRoleID
                        orderby users.IsAdmin descending
                        select new UserStaffDTO
                        {
                            UserID = users.UserID,
                            BranchID = users.BranchID,
                            RoleID = users.Roles.Where(x => x.ModuleID == GetConstID.moduleID).FirstOrDefault().RoleID,
                            DivisionID = users.DivisionID,
                            PartyFirstName = parties.PartyFirstName,
                            UserName = users.UserName,
                            Password = users.Password,
                            branchTitle = branches.branchTitle,
                            RoleTitle = users.Roles.Where(x => x.ModuleID == GetConstID.moduleID).FirstOrDefault().RoleTitle,
                            IsBlockedByAdmin = users.IsBlockedByAdmin,
                        }).ToList();
            return list;
        }
        public void PostStaffUser(string staffName, string userName, string userPass, Guid? braunchId, Guid roleId, Guid? SpecDivId, int Language, Guid CurrentUserID)
        {
            Party party = new Party()
            {
                PartyID = Guid.NewGuid(),
                PartyFirstName = staffName,
                PartyLastName = "",
                CompanyBranchId = new Guid(braunchId.ToString()),
                PartyTypeId = GetConstID.partyUserTypeID,
                Email = userName,
                IsIndividual = false,
                EditDate = DateTime.Now,
                EditedBy = CurrentUserID
            };
            dbContext.Parties.Add(party);

            User user = new User()
            {
                Party = party,
                UserID = Guid.NewGuid(),
                BranchID = new Guid(braunchId.ToString()),
                DivisionID = SpecDivId,
                UserName = userName,
                Password = userPass,
                FailedPasswordAttemptCount = 0,
                IsLocked = false,
                IsAdmin = false,
                IsBlockedByAdmin = false,
                SubscriptionDate = DateTime.Now,
                MustChangePassword = false,
                ShowUserDataOnly = false,
                IsDeleted = false,
                EditDate = DateTime.Now,
                EditedBy = CurrentUserID
            };
            Role role = dbContext.Roles.Where(x => x.RoleID == roleId).SingleOrDefault();
            user.Roles.Add(role);
            dbContext.Users.Add(user);

            UserPreference userSetting = new UserPreference()
            {
                User = user,
                LanguageID = Language,
                AlertDays = 3,
                AlertVisits = 3,
                AlertPayments = 3
            };
            dbContext.UserPreferences.Add(userSetting);

            dbContext.SaveChanges();

        }
        public void UpdateStaffUser(UserStaffDTO UserDetails)
        {
            var userStaff = dbContext.Users.Include("Roles").Include("Party").Where(u => u.UserID == UserDetails.UserID).FirstOrDefault();
            userStaff.Party.PartyFirstName = UserDetails.PartyFirstName;
            userStaff.Party.PartyLastName = "";
            userStaff.Party.Email = UserDetails.UserName;
            userStaff.BranchID = UserDetails.BranchID;
            userStaff.DivisionID = UserDetails.DivisionID;
            userStaff.UserName = UserDetails.UserName;
            userStaff.Password = UserDetails.Password;
            userStaff.EditDate = DateTime.Now;
            userStaff.EditedBy = UserDetails.CurrentUserID;

            userStaff.Roles.Remove(userStaff.Roles.FirstOrDefault());
            Role role = dbContext.Roles.Where(x => x.RoleID == UserDetails.RoleID).SingleOrDefault();
            userStaff.Roles.Add(role);

            dbContext.SaveChanges();
        }
        public void BlockStaffUser(Guid userStaffID, Guid userUID, bool isBlocked)
        {
            var userStaff = dbContext.Users.Find(userStaffID);

            userStaff.IsBlockedByAdmin = isBlocked;
            userStaff.EditedBy = userUID;
            userStaff.EditDate = DateTime.Now;

            dbContext.Entry(userStaff).State = System.Data.Entity.EntityState.Modified;
            dbContext.SaveChangesAsync();
        }
        public void DeleteStaffUser(Guid userStaffID, Guid userUID)
        {
            var userStaff = dbContext.Users.Find(userStaffID);

            userStaff.IsDeleted = true;
            userStaff.EditedBy = userUID;
            userStaff.EditDate = DateTime.Now;

            dbContext.Entry(userStaff).State = System.Data.Entity.EntityState.Modified;
            dbContext.SaveChangesAsync();
        }
        public IEnumerable<Role> GetRoles()
        {
            var roles = dbContext.Roles.Where(x => x.ModuleID == GetConstID.moduleID).ToList();
            return roles;
        }
        public void setLanguage(Guid userID, int langID)
        {
            var setting = (from userPreference in dbContext.UserPreferences
                           where userPreference.UserID == userID
                           select userPreference).FirstOrDefault();
            setting.LanguageID = langID;
            dbContext.Entry(setting).State = System.Data.Entity.EntityState.Modified;
            dbContext.SaveChangesAsync();
        }
        public void setNotification(Guid userID, int alertDays, int alertVisits, int alertPayments)
        {
            var settings = (from userPreference in dbContext.UserPreferences
                            where userPreference.UserID == userID
                            select userPreference).FirstOrDefault();
            settings.AlertDays = alertDays;
            settings.AlertVisits = alertVisits;
            settings.AlertPayments = alertPayments;
            dbContext.Entry(settings).State = System.Data.Entity.EntityState.Modified;
            dbContext.SaveChangesAsync();
        }
        public Guid PostMemberUser(UserMemberDTO userMember)
        {
            Party party = dbContext.Parties.Where(x => x.PartyID == userMember.PartyID).FirstOrDefault();
            party.Email = userMember.UserName;
            dbContext.Entry(party).State = System.Data.Entity.EntityState.Modified;

            User user = new User()
            {
                Party = party,
                BranchID = new Guid(userMember.BranchID.ToString()),
                UserName = userMember.UserName,
                Password = userMember.Password,
                FailedPasswordAttemptCount = 0,
                IsLocked = false,
                IsAdmin = false,
                IsBlockedByAdmin = false,
                SubscriptionDate = DateTime.Now,
                MustChangePassword = false,
                ShowUserDataOnly = false,
                IsDeleted = false,
                EditDate = DateTime.Now,
                EditedBy = userMember.EditedBy
            };
            Role role = dbContext.Roles.Where(x => x.RoleID == GetConstID.ClientRoleID).SingleOrDefault();
            user.Roles.Add(role);
            dbContext.Users.Add(user);

            UserPreference userSetting = new UserPreference()
            {
                User = user,
                LanguageID = userMember.Language
            };
            dbContext.UserPreferences.Add(userSetting);

            dbContext.SaveChanges();

            SendActivationMail.sendClientAccess(userMember.UserName, userMember.Password, userMember.CompanyName);

            return user.UserID;
        }
        public void UpdateMemberUser(UserMemberDTO UserMemberDetails)
        {
            Party party = dbContext.Parties.Where(x => x.PartyID == UserMemberDetails.PartyID).FirstOrDefault();
            party.Email = UserMemberDetails.UserName;
            dbContext.Entry(party).State = System.Data.Entity.EntityState.Modified;

            var userMember = dbContext.Users.Where(u => u.UserID == UserMemberDetails.UserID).FirstOrDefault();
            userMember.UserName = UserMemberDetails.UserName;
            userMember.Password = UserMemberDetails.Password;
            userMember.EditDate = DateTime.Now;
            userMember.EditedBy = UserMemberDetails.EditedBy;

            dbContext.SaveChanges();

            SendActivationMail.sendClientAccess(userMember.UserName, userMember.Password, UserMemberDetails.CompanyName);
        }
        public ClientDetailsDTO GetClientSummary(Guid userID)
        {
            ClientDetailsDTO ClientDetails = (from users in dbContext.Users
                                              join parties in dbContext.Parties
                                              on users.PartyID equals parties.PartyID
                                              join branches in dbContext.Branches
                                              on users.BranchID equals branches.BranchID
                                              join companies in dbContext.Companies
                                              on branches.CompanyID equals companies.CompanyID
                                              join industries in dbContext.Industries
                                              on companies.IndustryID equals industries.IndustryID
                                              join userSettings in dbContext.UserPreferences
                                              on users.UserID equals userSettings.UserID
                                              where users.UserID == userID
                                              select new ClientDetailsDTO
                                              {
                                                  CompanyName = companies.CompanyName,
                                                  PartyName = parties.PartyFirstName + " " + parties.PartyLastName,
                                                  UserEmail = users.UserName,
                                                  LanguageID = userSettings.LanguageID,
                                                  SubscriptionsObject = (parties.Memberships.Select(m => new MembershipEndingDTO
                                                  {
                                                      MembershipID = m.MembershipID,
                                                      PartyID = parties.PartyID,
                                                      PartyName = parties.PartyFirstName + " " + parties.PartyLastName,
                                                      Telephone = parties.Telephone,
                                                      ProgramName = m.Program.ProgramName,
                                                      ProgramBasis = m.Program.ProgramBasis,
                                                      RemainingDay = (m.EndDate >= DateTime.Now ? SqlFunctions.DateDiff("day", DateTime.Now, m.EndDate) : null),
                                                      BookedVisits = m.BookedVisits,
                                                      UsedVisits = (from membershipsVisits in dbContext.MembershipVisits
                                                                    where m.MembershipID == membershipsVisits.MemberShipID
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
                                                                    }).Where(x => x.grProgramID == m.Program.ProgramID && x.maxStartDate == m.StartDate).Count() == 1 ? true : false),
                                                      IsActive = m.IsActive
                                                  })).ToList()
                                              }).FirstOrDefault();
            return ClientDetails;
        }
        public void PostNewsSubscriber(string email)
        {
            NewsSubscription visitor = new NewsSubscription()
            {
                VisitorID = Guid.NewGuid(),
                VisitorEmail = email
            };
            dbContext.NewsSubscriptions.Add(visitor);
            dbContext.SaveChanges();
        }
    }
}