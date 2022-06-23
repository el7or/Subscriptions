using SubscriptionsApi.DTO;
using SubscriptionsApi.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SubscriptionsApi.Models;
using System.Web;
using System.Threading;
using System.Threading.Tasks;
using SubscriptionsApi.Utilities;

namespace SubscribersApi.Controllers
{
    public class UserAPIController : ApiController
    {
        SubscriptionsDBContext dbContext = null;
        EFUserDAL userDAL;
        Helper helper;
        public UserAPIController()
        {
            dbContext = new SubscriptionsDBContext();
            userDAL = new EFUserDAL();
            helper = new Helper();
        }

        // Get user Details:
        [HttpGet]

        public IHttpActionResult GetUserByID(Guid id)
        {
            // if (helper.IsSessionValid())
            // {
            //var user = userDAL.GetUserDTOByID(helper.CurrentUserID);
            var user = userDAL.GetUserDTOByID(id);
            return Ok(user);
            //  }
            //  else
            //  {
            //      return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            //  }
        }

        // Update User:
        [HttpPost]
        public IHttpActionResult UpdateUser(PartyDTO userDetails)
        {
            if (helper.IsSessionValid())
            {
                userDAL.UpdateUserDetails(userDetails);
                return Ok();
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        // Update User Password:
        [HttpPost]
        public IHttpActionResult UpdateUserPass(PasswordDTO passowrdDetails)
        {
            if (helper.IsSessionValid())
            {
                bool res = userDAL.UpdateUserPassword(passowrdDetails);
                return Ok(res);
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        // Update Client Password from android:
        [HttpGet]
        public IHttpActionResult ResetSubscriberPass(string userId, string oldPass, string newPass)
        {
            string res = userDAL.ResetSubscriberPass(userId, oldPass, newPass);
            return Ok(res);
        }

        // set company logo:
        [HttpPost]
        public IHttpActionResult SaveCompanyLogo(CompanyDTO logoDetails)
        {
            if (helper.IsSessionValid())
            {
                string urlLogo = userDAL.SaveCompanyLogo(logoDetails);
                return Ok(urlLogo);
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        // Update Copmany info:
        [HttpPost]
        public IHttpActionResult UpdateCompany(CompanyDTO companyDetails)
        {
            if (helper.IsSessionValid() && helper.IsObjectReleatedToUserCompany(Helper.UserObjects.Company, companyDetails.CompanyID))
            {
                userDAL.UpdateCompanyInfo(companyDetails);
                return Ok();
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        // check activation mail:
        [HttpGet]
        public IHttpActionResult CheckActivate(Guid id)
        {
            if (helper.IsSessionValid())
            {
                bool check = userDAL.CheckActivate(id);
                return Ok(check);
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        // check login access for android
        [HttpGet]
        public IHttpActionResult CheckLoginData(string email, string pass)
        {
            string userId = userDAL.CheckLoginDataAndroid(email, pass);
            return Ok(userId);
        }

        // send activation mail again:
        [HttpGet]
        public IHttpActionResult sendActivation(Guid id)
        {
            if (helper.IsSessionValid())
            {
                //userDAL.sendActivation(helper.CurrentUserID);
                userDAL.sendActivation(id);
                return Ok();
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        // send activation mail again for android:
        [HttpGet]
        public IHttpActionResult sendClientAccessForAndroid(string email)
        {
            userDAL.sendClientAccess(email);
            return Ok();
        }

        // Get staff Users by company:
        [HttpGet]
        public IHttpActionResult GetAllStaffUsers(Guid id)
        {
            if (helper.IsSessionValid())
            {
                var list = userDAL.GetAllStaffUsers(id);
                return Ok(list);
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        //Get staff Users by branch:
        [HttpGet]
        public IHttpActionResult GetUsersByBranch(Guid id)
        {
            if (helper.IsSessionValid())
            {
                var list = userDAL.GetUsersByBranch(id);
                return Ok(list);
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        // Add staff User:
        [HttpGet]
        public IHttpActionResult AddStaffUser(string staffName, string userName, string userPass, Guid? braunchId, Guid roleId, Guid? SpecDivId, int Language, Guid CurrentUserID)
        {            
            if (helper.IsSessionValid() && helper.IsUserRoleValid(roleId))
            {
                userDAL.PostStaffUser( staffName,  userName,  userPass,  braunchId,  roleId,  SpecDivId,  Language,  CurrentUserID);
                return Ok();
            }

            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        // Edit staff User:
        [HttpPost]
        public IHttpActionResult UpdateStaffUser(UserStaffDTO UserDetails)
        {
            //if (helper.IsSessionValid() && (helper.CurrentUserID == UserDetails.UserID || (helper.CurrentUserID != UserDetails.UserID && helper.IsUserRoleValid(UserDetails.RoleID))))
            //{
                userDAL.UpdateStaffUser(UserDetails);
                return Ok();
            //}
            //else
            //{
            //    return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            //}
        }

        // block staff user:
        [HttpGet]
        public IHttpActionResult BlockStaffUser(Guid staffID, Guid userUID, bool isBlocked)
        {
            //Guid staffUserRole = dbContext.Users.Include("Roles").Where(u => u.UserID == staffID).Select(r => r.Roles.Select(x => x.RoleID).FirstOrDefault()).FirstOrDefault();
            //if (helper.IsSessionValid() && helper.CurrentUserID != staffID && helper.IsUserRoleValid(staffUserRole))
            //{
            //userDAL.BlockStaffUser(staffID, helper.CurrentUserID, isBlocked);
            userDAL.BlockStaffUser(staffID, userUID, isBlocked);
            return Ok();
            //}
            //else
            //{
            //    return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            //}
        }

        // Delete staff user:
        [HttpGet]
        public IHttpActionResult DeleteStaffUser(Guid staffID,Guid userUID)
        {
            //Guid staffUserRole = dbContext.Users.Include("Roles").Where(u => u.UserID == staffID).Select(r => r.Roles.Select(x => x.RoleID).FirstOrDefault()).FirstOrDefault();
            //if (helper.IsSessionValid() && helper.CurrentUserID != staffID && helper.IsUserRoleValid(staffUserRole))
            //{
            //userDAL.DeleteStaffUser(staffID, helper.CurrentUserID);
            userDAL.DeleteStaffUser(staffID, userUID);
            return Ok();
            //}
            //else
            //{
            //    return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            //}
        }

        // Get roles by moduleID:
        [HttpGet]
        public IHttpActionResult GetRoles()
        {
            if (helper.IsSessionValid())
            {
                var roles = userDAL.GetRoles();
                return Ok(roles);
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        // Change language in user perferences
        [HttpGet]
        public IHttpActionResult setLanguage(Guid userUID, int langID)
        {
            if (helper.IsSessionValid())
            {
                //userDAL.setLanguage(helper.CurrentUserID, langID);
                userDAL.setLanguage(userUID, langID);
                return Ok();
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        // Change Notifications settings in user perferences
        [HttpGet]
        public IHttpActionResult setNotification(Guid userUID, int alertDays, int alertVisits, int alertPayments)
        {
            if (helper.IsSessionValid())
            {
                //userDAL.setNotification(helper.CurrentUserID, alertDays, alertVisits, alertPayments);
                userDAL.setNotification(userUID, alertDays, alertVisits, alertPayments);
                return Ok();
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        // Add Member User:
        [HttpPost]
        public IHttpActionResult PostMemberUser(UserMemberDTO user)
        {
            if (helper.IsSessionValid())
            {
                Guid userID = userDAL.PostMemberUser(user);
                return Ok(userID);
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        // Edit Member User:
        [HttpPost]
        public IHttpActionResult UpdateMemberUser(UserMemberDTO UserDetails)
        {
            if (helper.IsSessionValid())
            {
                userDAL.UpdateMemberUser(UserDetails);
                return Ok();
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        // Get Client Details for summary page:
        [HttpGet]
        public IHttpActionResult GetClientSummary(Guid id)
        {
            if (helper.IsSessionValid())
            {
                var client = userDAL.GetClientSummary(id);
                return Ok(client);
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }


        // Add email to news subscription:
        [HttpPost]
        public IHttpActionResult PostNewsSubscriber(string email)
        {
            userDAL.PostNewsSubscriber(email);
            return Ok();
        }
    }
}
