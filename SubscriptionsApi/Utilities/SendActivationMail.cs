using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;

namespace SubscriptionsApi
{
    public static class SendActivationMail
    {
        public static void sendActivation(string userEmail, string tokenID, int? languageID)
        {
            const string accountName = "support@marchesuite.com";      // # Gmail account name
            const string password = "$upp0rt3";                                   // # Gmail account password
            MailMessage message = new MailMessage();
            SmtpClient client = new SmtpClient("mail.marchesuite.com", 2525);
            string userAvtivation = "http://marchesuite.com/sms/ActivationPage.aspx?id=" + tokenID + "&email=" + userEmail + "&lang=" + languageID;
            message.From = new MailAddress("support@marchesuite.com", "SUBSCRIPTION MANAGER"); // # Remember to change here with the mail you got
            message.To.Add(new MailAddress("support@marchesuite.com"));                                            // # Email adress to send activation mail
            message.CC.Add(new MailAddress(userEmail));
            message.Subject = "Activation Mail";
            message.Body = "Hi there, click this link to activate your Marché Subscription Manager account:<br />مرحبا بك .. اضغط على الرابط التالي لتفعيل حسابكم:<br />"
                +"<a href=\""+ userAvtivation + "\" target=\"_blank\">"+ userAvtivation +"</a>"  ;
            message.IsBodyHtml = true;
            client.EnableSsl = false;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = true;
            client.Credentials = new System.Net.NetworkCredential(accountName, password);
            client.Send(message);
        }
        public static void sendClientAccess(string userEmail, string userPassword, string companyName)
        {
            const string accountName = "support@marchesuite.com";      // # Gmail account name
            const string password = "$upp0rt3";                                   // # Gmail account password
            MailMessage message = new MailMessage();
            SmtpClient client = new SmtpClient("mail.marchesuite.com", 2525);
            string loginLink = "http://www.marchesuite.com/sms/login.aspx";
            message.From = new MailAddress("support@marchesuite", "SUBSCRIPTION MANAGER"); // # Remember to change here with the mail you got
            message.To.Add(new MailAddress("support@marchesuite.com"));                                            // # Email adress to send activation mail
            message.CC.Add(new MailAddress(userEmail));                                          // # Email adress to send activation mail
            message.Subject = "Access Details";
            message.Body = "Hey there, Now you can follow your subscription in <b> " + companyName + " </b> via the link below, using the access account:<br /><b>User Name: </b>" + userEmail + "<br /><b>Password: </b>" + userPassword + "<br />" 
                + "<a href=\"" + loginLink + "\" target=\"_blank\">" + loginLink + "</a>";
            message.IsBodyHtml = true;
            client.EnableSsl = false;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;
            client.Credentials = new System.Net.NetworkCredential(accountName, password);
            client.Send(message);
        }
        public static void sendClientAccess(string userEmail, string userPassword)
        {
            const string accountName = "support@marchesuite.com";      // # Gmail account name
            const string password = "$upp0rt3";                                   // # Gmail account password
            MailMessage message = new MailMessage();
            SmtpClient client = new SmtpClient("mail.marchesuite.com", 2525);
            string loginLink = "http://www.marchesuite.com/sms/login.aspx";
            message.From = new MailAddress("support@marchesuite", "SUBSCRIPTION MANAGER"); // # Remember to change here with the mail you got
            message.To.Add(new MailAddress("support@marchesuite.com"));                                            // # Email adress to send activation mail
            message.CC.Add(new MailAddress(userEmail));                                           // # Email adress to send activation mail
            message.Subject = "Access Details";
            message.Body = "Hey there, Now you can login using the access account:<br /><b>User Name: </b>" + userEmail + "<br /><b>Password: </b>" + userPassword + "<br />" 
                + "<a href=\"" + loginLink + "\" target=\"_blank\">" + loginLink + "</a>"  ;
            message.IsBodyHtml = true;
            client.EnableSsl = false;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;
            client.Credentials = new System.Net.NetworkCredential(accountName, password);
            client.Send(message);
        }
        public static void sendClientAccessForAndroid(string userEmail, string userPassword)
        {
            const string accountName = "support@marchesuite.com";      // # Gmail account name
            const string password = "$upp0rt3";                                   // # Gmail account password
            MailMessage message = new MailMessage();
            SmtpClient client = new SmtpClient("mail.marchesuite.com", 2525);
            message.From = new MailAddress("support@marchesuite", "SUBSCRIPTION MANAGER"); // # Remember to change here with the mail you got
            message.To.Add(new MailAddress("support@marchesuite.com"));                                            // # Email adress to send activation mail
            message.CC.Add(new MailAddress(userEmail));                                           // # Email adress to send activation mail
            message.Subject = "Access Details";
            message.Body = "Hey there, Now you can login using the access account:<br /><b>User Name: </b>" + userEmail + "<br /><b>Password: </b>" + userPassword;
            message.IsBodyHtml = true;
            client.EnableSsl = false;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;
            client.Credentials = new System.Net.NetworkCredential(accountName, password);
            client.Send(message);
        }
    }
}