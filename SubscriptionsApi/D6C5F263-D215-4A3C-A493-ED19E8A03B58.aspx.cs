using SubscriptionsApi.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.SqlServer;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SubscriptionsApi
{
    public partial class D6C5F263_D215_4A3C_A493_ED19E8A03B58 : System.Web.UI.Page
    {
        SubscriptionsDBContext dbContext = new SubscriptionsDBContext();
        protected void Page_Load(object sender, EventArgs e)
        {
            var usersList = (from users in dbContext.Users
                             join parties in dbContext.Parties
                             on users.PartyID equals parties.PartyID
                             join branches in dbContext.Branches
                             on users.BranchID equals branches.BranchID
                             join companies in dbContext.Companies
                             on branches.CompanyID equals companies.CompanyID
                             orderby users.LastLoginDate descending
                             select new 
                             {
                                 UserID = users.UserID,
                                 Email = users.UserName,
                                 FirstName = parties.PartyFirstName,
                                 LastName = parties.PartyLastName,
                                 CompanyName = companies.CompanyName, 
                                 Telephone = parties.Telephone,
                                 SubscriptionDate = SqlFunctions.DatePart("year", users.SubscriptionDate) + "-" + SqlFunctions.DatePart("month", users.SubscriptionDate) + "-" + SqlFunctions.DatePart("day", users.SubscriptionDate),
                                 LastLoginDate = SqlFunctions.DatePart("year", users.LastLoginDate) + "-" + SqlFunctions.DatePart("month", users.LastLoginDate) + "-" + SqlFunctions.DatePart("day", users.LastLoginDate),
                             }).ToList();
            GridViewUsers.DataSource = usersList;
            GridViewUsers.RowDataBound += GridViewUsers_RowDataBound;
            GridViewUsers.DataBind();
        }

        private void GridViewUsers_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            e.Row.Cells[0].Visible = false;
        }
    }
}