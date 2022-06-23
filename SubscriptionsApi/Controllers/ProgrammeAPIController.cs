using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SubscriptionsApi.DAL;
using SubscriptionsApi.DTO;
using SubscriptionsApi.Models;
using System.Data.Entity;
using SubscriptionsApi.Utilities;

namespace SubscriptionsApi.Controllers
{
    public class ProgrammeAPIController : ApiController
    {
         EFProgrammeDAL progDAL;
        Helper helper;
        public ProgrammeAPIController()
        {
            progDAL = new EFProgrammeDAL();
        helper = new Helper();
        }

        //Get All Programmes:
        [HttpGet]
         public IHttpActionResult GetAllProgrammes(Guid id)
         {
            if (helper.IsSessionValid())
            {
            var list = progDAL.GetAllProgrammes(id);
            return Ok(list);
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        //Get programs by division:
        [HttpGet]
        public IHttpActionResult GetProgrammesByDivision(Guid id)
        {
            if (helper.IsSessionValid())
            {
            var list = progDAL.GetProgrammesByDivision(id);
            return Ok(list);
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        //Get all fixed programmes:
        [HttpGet]
        public IHttpActionResult GetAllCalendarProgrammes(Guid id)
        {
            if (helper.IsSessionValid())
            {
            var list = progDAL.GetAllCalendarProgrammes(id);
            return Ok(list);
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }
        
        //Insert new programme:
        [HttpPost]
        public IHttpActionResult PostProgram(Program prog)
        {
            if (helper.IsSessionValid())
            {
            progDAL.AddProgram(prog);
            return Ok();
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        //Edit programme:
        [HttpPost]
        public IHttpActionResult UpdateProgram(ProgrammeDTO programDetails)
        {
            if (helper.IsSessionValid())
            {
            progDAL.UpdateProgramme(programDetails);
            return Ok();
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        // Stop/Rerun programme:
        [HttpGet]
        public IHttpActionResult ChangeProgramStatus(Guid progID,Guid userUID, bool isActive)
        {
            if (helper.IsSessionValid())
            {
            //progDAL.ChangeProgramStatus(progID, helper.CurrentUserID, isActive);
            progDAL.ChangeProgramStatus(progID, userUID, isActive);
            return Ok();
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        // Delete programme:
        [HttpGet]
        public IHttpActionResult DeleteProgram(Guid progID,Guid userUID)
        {
            if (helper.IsSessionValid())
            {
                //progDAL.DeleteProgramme(progID, helper.CurrentUserID);
                progDAL.DeleteProgramme(progID, userUID);
                return Ok();
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        //Get Programmes for chart:
        [HttpGet]
        public IHttpActionResult GetProgrammesChart(Guid id)
         {
            if (helper.IsSessionValid())
            {
             var list = progDAL.GetProgrammesChart(id);
            return Ok(list);
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }
    }
}
