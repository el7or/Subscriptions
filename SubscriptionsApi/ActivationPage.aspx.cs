using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SubscriptionsApi.Models;
using System.Web.Security;

namespace SubscriptionsApi
{
    public partial class ActivationPage : System.Web.UI.Page
    {
        SubscriptionsDBContext dbContext = null;
        Guid usTokenID;
        string usEmail;
        protected void Page_Load(object sender, EventArgs e)
        {
            dbContext = new SubscriptionsDBContext();

            usTokenID =Guid.Parse(Request.QueryString["id"]);
            usEmail = Request.QueryString["email"];
            Company userCompany = new Company();
            userCompany = (from users in dbContext.Users
                           join branches in dbContext.Branches
                           on users.BranchID equals branches.BranchID
                           join companies in dbContext.Companies
                           on branches.CompanyID equals companies.CompanyID
                           where users.VerificationToken == usTokenID && users.UserName== usEmail
                           select companies).FirstOrDefault();
            if (userCompany != null)
            {
                userCompany.IsActivate = true;
                dbContext.Entry(userCompany).State = System.Data.Entity.EntityState.Modified;
                dbContext.SaveChangesAsync();
            }
            else
            {
                FormsAuthentication.RedirectToLoginPage();
            }
        }

        protected void lnkToLogin_Click(object sender, EventArgs e)
        {
            Response.Redirect("~/Login.aspx?id="+ usTokenID+"&email="+usEmail);
        }
    }
}