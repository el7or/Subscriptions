using SubscriptionsApi.DAL;
using SubscriptionsApi.DTO;
using SubscriptionsApi.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SubscriptionsApi.Controllers
{
    public class InvoiceAPIController : ApiController
    {
        EFInvoiceDAL invoiceDAL;
        Helper helper;
        public InvoiceAPIController()
        {
            invoiceDAL = new EFInvoiceDAL();
        helper = new Helper();
        }

        // Get invoice details by ID
        [HttpGet]
        public IHttpActionResult GetAllInvoiceDetails(Guid id)
        {
            if (helper.IsSessionValid())
            {
            InvoiceDTO invoiceDetails = invoiceDAL.GetAllInvoiceDetails(id);
            return Ok(invoiceDetails);
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        // Get last Invoice serial
        [HttpGet]
        public IHttpActionResult GetLastInvoiceSerial(Guid id)
        {
            if (helper.IsSessionValid())
            {
            long? lastSerial = invoiceDAL.GetLastInvoiceSerial(id);
            return Ok(lastSerial);
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }
        
        //Insert new Invoice:
        [HttpPost]
        public IHttpActionResult PostInvoice(InvoiceDTO invoiceDetails)
        {
            if (helper.IsSessionValid())
            {
            Guid membershipID = invoiceDAL.AddNewInvoice(invoiceDetails);
            return Ok(membershipID);
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        //update exist Invoice:
        [HttpPost]
        public IHttpActionResult UpdateInvoice(InvoiceDTO invoiceDetails,Guid id)
        {
            if (helper.IsSessionValid())
            {
            invoiceDAL.UpdateInvoice(invoiceDetails,id);
            return Ok();
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        // Get All invoices to report:
        [HttpGet]
        public IHttpActionResult GetAllInvoices(Guid id)
        {
            if (helper.IsSessionValid())
            {
            var list = invoiceDAL.GetAllInvoices(id);
            return Ok(list);
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        // Refund invoice:
        [HttpGet]
        public IHttpActionResult RefundInvoice(Guid invoiecId,Guid userUID)
        {
            if (helper.IsSessionValid())
            {
                //invoiceDAL.RefundInvoice(invoiecId, helper.CurrentUserID);
                invoiceDAL.RefundInvoice(invoiecId, userUID);
                return Ok();
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        //Get invoices for line chart:
        [HttpGet]
        public IHttpActionResult CashFlowChart(Guid id)
        {
            if (helper.IsSessionValid())
            {
            var list = invoiceDAL.CashFlowChart(id);
            return Ok(list);
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }
    }
}
