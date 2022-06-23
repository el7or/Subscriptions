using SubscriptionsApi.DAL;
using SubscriptionsApi.Models;
using SubscriptionsApi.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SubscriptionsApi.Controllers
{
    public class DivisionAPIController : ApiController
    {
        EFDivisionDAL divDAL;
        Helper helper;
        public DivisionAPIController()
        {
            divDAL = new EFDivisionDAL();
        helper = new Helper();
        }
        // Get Divisons List
        [HttpGet]
        public IHttpActionResult GetDivisons(Guid id)
        {
            if (helper.IsSessionValid())
            {
            var list = divDAL.GetAllDivisons(id);
            return Ok(list);
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        //Add new division
        [HttpGet]
        public IHttpActionResult PostDivision(string divName, Guid compID,Guid userUID)
        {
            if (helper.IsSessionValid())
            {
                //Guid divID = divDAL.AddDivision(divName, compID, helper.CurrentUserID);
                Guid divID = divDAL.AddDivision(divName, compID, userUID);
                return Ok(divID);
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        // Edit Division
        [HttpGet]
        public IHttpActionResult UpdateDivision(Guid divID, string divName,Guid userUID)
        {
            if (helper.IsSessionValid())
            {
                //divDAL.UpdateDivision(divID, divName, helper.CurrentUserID);
                divDAL.UpdateDivision(divID, divName, userUID);
                return Ok();
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        // Delete Division
        [HttpGet]
        public IHttpActionResult DeleteDivision(Guid divID,Guid userUID)
        {
            if (helper.IsSessionValid())
            {
                //divDAL.DeleteDivision(divID, helper.CurrentUserID);
                divDAL.DeleteDivision(divID, userUID);
                return Ok();
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }
    }
}
