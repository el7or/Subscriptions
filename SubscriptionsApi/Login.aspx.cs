using SubscriptionsApi.Models;
using SubscriptionsApi.Utilities;
using System;
using System.Activities.Expressions;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SubscriptionsApi
{
    public partial class LoginDefault : System.Web.UI.Page
    {
        SubscriptionsDBContext dbContext = null;

        protected void Page_Load(object sender, EventArgs e)
        {
            dbContext = new SubscriptionsDBContext();
            if (!IsPostBack)
            {
                if (Request.Cookies["UserName"] != null)
                {
                    txtUserName.Text = Request.Cookies["UserName"].Value;
                }
                Bind_ddlIndustry();
                Bind_ddlCountry();
            }
        }

        // Login event
        protected void btnLogin_Click(object sender, EventArgs e)
        {
            var loginUser = dbContext.Users.Include("Roles").Where(u => u.UserName == txtUserName.Text.Trim() && u.Password == txtPassword.Text.Trim()).FirstOrDefault();

            if (loginUser == null)
            {
                lblErrorLogin.Visible = true;
                txtUserName.Text = "";
                txtPassword.Text = "";
                chkLoginkeeping.Checked = false;
            }
            else
            {
                lblErrorLogin.Visible = false;
                if (loginUser.Roles.Select(x => x.RoleID).FirstOrDefault() != GetConstID.OwnerRoleID)
                {
                    Guid? companyID = dbContext.Branches.Where(b => b.BranchID == loginUser.BranchID).Select(c => c.CompanyID).FirstOrDefault();
                    var loginCompany = dbContext.Companies.Where(c => c.CompanyID == companyID).FirstOrDefault();
                    if (loginCompany.NextPaymentDate < DateTime.Today)
                    {
                        loginUser.IsLocked = true;
                        dbContext.Entry(loginUser).State = System.Data.Entity.EntityState.Modified;
                        dbContext.SaveChanges();
                    }
                    else
                    {
                        loginUser.IsLocked = false;
                        dbContext.Entry(loginUser).State = System.Data.Entity.EntityState.Modified;
                        dbContext.SaveChanges();
                    }
                }
                if (loginUser.IsBlockedByAdmin == true || loginUser.IsLocked == true)
                {
                    lblErrorLogin2.Visible = true;
                    //txtUserName.Text = "";
                    txtPassword.Text = "";
                    chkLoginkeeping.Checked = false;
                }
                else
                {
                    lblErrorLogin2.Visible = false;
                    Session["userUID"] = loginUser.UserID;
                    loginUser.LastLoginDate = DateTime.Now.Date;
                    dbContext.Entry(loginUser).State = System.Data.Entity.EntityState.Modified;
                    dbContext.SaveChanges();
                    if (chkLoginkeeping.Checked)
                    {
                        Response.Cookies["UserName"].Expires = DateTime.Now.AddDays(30);
                    }
                    else
                    {
                        Response.Cookies["UserName"].Expires = DateTime.Now.AddDays(-1);
                    }
                    Response.Cookies["UserName"].Value = txtUserName.Text.Trim();

                    if (loginUser.Roles.Select(x => x.RoleID).FirstOrDefault() == GetConstID.ClientRoleID)
                    {
                        Page.Response.Redirect("~/ClientSummary.aspx");
                    }
                    else Page.Response.Redirect("~/Default.aspx");
                }
            }
        }

        //Register event
        string langg;
        protected void btnSignUp_Click(object sender, EventArgs e)
        {
            var oldUser = (from users in dbContext.Users
                           where users.UserName == txtEmailSignup.Text
                           select users).FirstOrDefault();
            if (oldUser != null)
            {
                //Response.Write("<script>alert('This email have already registered!');</script>");                
                lblErrorMatch.Visible = true;
                txtUserName.Text = txtEmailSignup.Text;
            }
            else
            {
                langg = ddlLanguages.SelectedValue;
                int langgID = 0;

                if (langg == "en")
                {
                    langgID = 1;
                }
                else if (langg == "ar-sa")
                {
                    langgID = 2;
                }

                Company company = new Company()
                {
                    CompanyID = Guid.NewGuid(),
                    CompanyName = txtCompany.Text,
                    IsLocked = false,
                    IndustryID = int.Parse(ddlIndustry.SelectedValue),
                    IsActivate = false,
                    CreationDate = DateTime.Today,
                    NextPaymentDate = DateTime.Today.AddMonths(1),
                    EditDate = DateTime.Now,
                    EditedBy = Guid.Empty
                };
                dbContext.Companies.Add(company);

                CompanyPreference companySetting = new CompanyPreference()
                {
                    ID = Guid.NewGuid(),
                    Company = company,
                    LastInvoiceSerial = 0
                };
                dbContext.CompanyPreferences.Add(companySetting);

                Module module = dbContext.Modules.Where(x => x.ModuleID == GetConstID.moduleID).SingleOrDefault();
                CompanyModule companymodule = new CompanyModule()
                {                    
                    Company = company,
                    Module = module
                };
                dbContext.CompanyModules.Add(companymodule);

                Branch branch = new Branch()
                {
                    BranchID = Guid.NewGuid(),
                    Company = company,
                    branchTitle = txtCompany.Text,
                    isMainBranch = true,
                    isLocked = false,
                    EditDate = DateTime.Now,
                    EditedBy = Guid.Empty
                };
                dbContext.Branches.Add(branch);

                BranchPolicy branchPolicy = new BranchPolicy()
                {
                    BranchPolicyID = Guid.NewGuid(),
                    Branch = branch,
                    CreationBy = Guid.Empty,
                    CreationDate = DateTime.Now,
                    EditedBy = Guid.Empty,
                    EditDate = DateTime.Now
                };
                dbContext.BranchPolicies.Add(branchPolicy);

                Party party = new Party()
                {
                    PartyID = Guid.NewGuid(),
                    PartyFirstName = txtFirstName.Text,
                    PartyLastName = txtLastName.Text,
                    Branch = branch,
                    PartyTypeId = GetConstID.partyUserTypeID,
                    Address = txtAddress.Text,
                    Telephone = txtPhone.Text,
                    Email = txtEmailSignup.Text,
                    CountryID = int.Parse(ddlCountry.SelectedValue),
                    CityID = ddlCity.SelectedValue == "" ? (int?)null : int.Parse(ddlCity.SelectedValue),
                    IsIndividual = false,
                    EditDate = DateTime.Now,
                    EditedBy = Guid.Empty
                };
                dbContext.Parties.Add(party);

                User user = new User()
                {
                    UserID = Guid.NewGuid(),
                    Party = party,
                    Branch = branch,
                    UserName = txtEmailSignup.Text,
                    Password = txtPasswordSignup.Text,
                    VerificationToken = Guid.NewGuid(),
                    FailedPasswordAttemptCount = 0,
                    IsLocked = false,
                    IsAdmin = true,
                    IsBlockedByAdmin = false,
                    SubscriptionDate = DateTime.Now,
                    MustChangePassword = false,
                    ShowUserDataOnly = false,
                    IsDeleted = false,
                    EditDate = DateTime.Now,
                    EditedBy = Guid.Empty
                };
                Role role = dbContext.Roles.Where(x => x.RoleID == GetConstID.OwnerRoleID).SingleOrDefault();
                user.Roles.Add(role);
                dbContext.Users.Add(user);

                UserPreference userSetting = new UserPreference()
                {
                    SettingsID = Guid.NewGuid(),
                    User = user,
                    LanguageID = langgID,
                    currencyID = 2,
                    AlertDays = 3,
                    AlertVisits = 3,
                    AlertPayments = 3
                };
                dbContext.UserPreferences.Add(userSetting);

                dbContext.SaveChanges();

                company.EditedBy = user.UserID;
                dbContext.Entry(company).State = System.Data.Entity.EntityState.Modified;
                branch.EditedBy = user.UserID;
                dbContext.Entry(branch).State = System.Data.Entity.EntityState.Modified;
                party.EditedBy = user.UserID;
                dbContext.Entry(party).State = System.Data.Entity.EntityState.Modified;
                user.EditedBy = user.UserID;
                dbContext.Entry(user).State = System.Data.Entity.EntityState.Modified;
                branchPolicy.CreationBy = user.UserID;
                branchPolicy.EditedBy = user.UserID;
                dbContext.Entry(branchPolicy).State = System.Data.Entity.EntityState.Modified;

                dbContext.SaveChanges();

                Session["userUID"] = user.UserID;
                SendActivationMail.sendActivation(user.UserName, user.VerificationToken.ToString(), userSetting.LanguageID);
                Response.Cookies["UserName"].Value = user.UserName;
                ScriptManager.RegisterStartupScript(UpdatePanel2, UpdatePanel2.GetType(), "confirmSignup", "confirmSignup();", true);
                if (ddlPlans.SelectedValue != "free")
                {
                    Page.Response.Redirect("~/PaymentPage.aspx?plan=" + ddlPlans.SelectedValue);
                }
                //Page.Response.Redirect("~/Login.aspx");
            }
        }

        // fill list of Industry from db:
        private void Bind_ddlIndustry()
        {
            ddlIndustry.DataSource = (from industries in dbContext.Industries
                                      select industries).Distinct().ToList();
            ddlIndustry.DataValueField = "IndustryID";
            ddlIndustry.DataTextField = "IndustryTitle";
            ddlIndustry.DataBind();
        }
        // fill list of Country from db:
        private void Bind_ddlCountry()
        {
            ddlCountry.DataSource = (from countries in dbContext.Countries
                                     select new { countries.CountryID, countries.CountryName }).Distinct().ToList();
            ddlCountry.DataValueField = "CountryID";
            ddlCountry.DataTextField = "CountryName";
            ddlCountry.DataBind();
        }

        // fill list of City from db based on selected Country:
        protected void ddlCountry_SelectedIndexChanged(object sender, EventArgs e)
        {
            ddlCity.Items.Clear();
            ddlCity.Items.Add(new ListItem("--Choose--", ""));
            int countryId = int.Parse(ddlCountry.SelectedValue);
            ddlCity.DataSource = (from cities in dbContext.Cities
                                  join states in dbContext.States
                                  on cities.StateID equals states.StateID
                                  join countries in dbContext.Countries
                                  on states.CountryID equals countries.CountryID
                                  where states.CountryID == countryId
                                  orderby cities.CityName
                                  select new { cities.CityID, cities.CityName }).ToList();
            ddlCity.DataValueField = "CityID";
            ddlCity.DataTextField = "CityName";
            ddlCity.DataBind();
        }

        // btn forget password
        protected void lnkForget_Click(object sender, EventArgs e)
        {
            var loginUser = dbContext.Users.Where(u => u.UserName == txtUserName.Text.Trim()).FirstOrDefault();

            if (loginUser == null)
            {
                lblErrorForget.Visible = true;
                txtUserName.Text = "";
                txtPassword.Text = "";
                chkLoginkeeping.Checked = false;
            }
            else
            {
                lblErrorForget.Visible = false;
                this.ClientScript.RegisterStartupScript(typeof(Page), "Popup", "confirmForget();", true);
                SendActivationMail.sendClientAccess(loginUser.UserName, loginUser.Password);
            }
        }
    }
}