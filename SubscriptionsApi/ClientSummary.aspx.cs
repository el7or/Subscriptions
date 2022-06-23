using SubscriptionsApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SubscriptionsApi
{
    public partial class ClientSummary : System.Web.UI.Page
    {
        SubscriptionsDBContext dbContext = null;
        protected void Page_Load(object sender, EventArgs e)
        {
            dbContext = new SubscriptionsDBContext();

            if (Session["userUID"] != null)
            {
                var loginUser = dbContext.Users.Find(Session["userUID"]);
                if (loginUser == null)
                {
                    FormsAuthentication.RedirectToLoginPage();
                }
                else
                {
                    userUID.Value = Session["userUID"].ToString();
                }
            }
            else
            {
                FormsAuthentication.RedirectToLoginPage();
            }
        }
        protected void btnLogOut_Click1(object sender, EventArgs e)
        {
            FormsAuthentication.SignOut();
            Session.Abandon();

            // clear authentication cookie
            HttpCookie cookie1 = new HttpCookie(FormsAuthentication.FormsCookieName, "");
            cookie1.Expires = DateTime.Now.AddYears(-1);
            Response.Cookies.Add(cookie1);

            // clear session cookie (not necessary for your current problem but i would recommend you do it anyway)
            SessionStateSection sessionStateSection = (SessionStateSection)WebConfigurationManager.GetSection("system.web/sessionState");
            HttpCookie cookie2 = new HttpCookie(sessionStateSection.CookieName, "");
            cookie2.Expires = DateTime.Now.AddYears(-1);
            Response.Cookies.Add(cookie2);

            FormsAuthentication.RedirectToLoginPage();
        }        

    }
}