using SubscriptionsApi.DAL;
using SubscriptionsApi.DTO;
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
    public class MemberAPIController : ApiController
    {
         EFMemberDAL memDAL;
        Helper helper;
        public MemberAPIController()
        {
            memDAL = new EFMemberDAL();
        helper = new Helper();
        }

        //Get All Members:
        [HttpGet]
         public IHttpActionResult GetAllMembers(Guid id)
         {
            if (helper.IsSessionValid())
            {
             var list = memDAL.GetAllMembers(id);
             return Ok(list);
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        //Get member by ID:
        [HttpGet]
        public IHttpActionResult GetMemberByID(Guid id)
        {
            if (helper.IsSessionValid())
            {
            var member = memDAL.GetMemberDTOByID(id);
            return Ok(member);
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        //Get list of Members by programID:
        [HttpGet]
        public IHttpActionResult GetAllMembersByProgID(Guid id)
        {
            if (helper.IsSessionValid())
            {
            var list = memDAL.GetAllMembersByProgID(id);
            return Ok(list);
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        //Insert new member:
        [HttpPost]
        public IHttpActionResult PostMember(MemberDTO member)
        {
            if (helper.IsSessionValid())
            {
            Guid memberID =  memDAL.AddMember(member);
            return Ok(memberID);
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        //Update Member:
        [HttpPost]
        public IHttpActionResult UpdateMember(MemberDTO member)
        {
            if (helper.IsSessionValid())
            {
            memDAL.UpdateMemberDetails(member);
            return Ok();
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }
    }
}
