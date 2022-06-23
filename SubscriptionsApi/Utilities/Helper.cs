using SubscriptionsApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SubscriptionsApi.Utilities
{
    public class Helper
    {
        SubscriptionsDBContext dbContext = null;
        public Helper()
        {
            dbContext = new SubscriptionsDBContext();
        }
        public enum UserObjects
        {
            Company, Subscriber, Subscription, Program
        }

        public bool IsSessionValid()
        {
            //if (HttpContext.Current.Session["userUID"] != null)
            //{
            //    return true;
            //}
            return true;
        }
        public bool IsUserRoleValid(Guid userRoleID)
        {
            string userRole = dbContext.Roles.Where(r => r.RoleID == userRoleID).Select(t=>t.RoleTitle).FirstOrDefault();
            Guid userID = new Guid();
            Guid.TryParse(HttpContext.Current.Session["userUID"].ToString(), out userID);
            string currentUserRole = dbContext.Users.Include("Roles").Where(u => u.UserID == userID).Select(r => r.Roles.Select(x => x.RoleTitle).FirstOrDefault()).FirstOrDefault();
            if (currentUserRole == "Basic")
            {
                return false;
            }
            if (currentUserRole=="Admin"&&(userRole=="Owner"||userRole=="Admin"))
            {
                return false;
            }
            return true;
        }
        public bool IsObjectReleatedToUserCompany(UserObjects userObj, Guid userObjId)
        {
            if (userObj == UserObjects.Company)
            {
                Guid? compID = dbContext.Users.Where(u=>u.UserID==CurrentUserID).Select(b => b.Branch.CompanyID).FirstOrDefault();
                if (compID.HasValue)
                {
                    return compID == userObjId;
                }
            }
            return false;
        }
        public Guid CurrentUserID
        {
            get
            {
                Guid userID = new Guid();
                Guid.TryParse(HttpContext.Current.Session["userUID"].ToString(), out userID);
                return userID;
            }
        }
        public void WriteLog(Guid userID,string methodName, string exceptionMsg)
        {
            dbContext.Loggings.Add(new Logging
            {
                UserId = (userID != null ? userID : Guid.Empty),
                DateTime = DateTime.Now,
                Exception = "Method: " + methodName
                    + ", Exception: " + exceptionMsg
            });
        }
    }
}