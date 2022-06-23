using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SubscriptionsApi
{
    public partial class PaymentPage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            //if (HttpContext.Current.Session["userUID"] == null)
            //{
            //    Page.Response.Redirect("~/Login.aspx");
            //}
            //string plan = Request.QueryString["plan"];
            
        }

        protected void Button1_Click(object sender, EventArgs e)
        {

            Page.Response.Redirect("~/Login.aspx");
        }
    }
}