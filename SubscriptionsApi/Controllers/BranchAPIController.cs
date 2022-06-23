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
    public class BranchAPIController : ApiController
    {
        EFBranchDAL branchDAL;
        Helper helper;
        public BranchAPIController()
        {
            branchDAL = new EFBranchDAL();
        helper = new Helper();
        }

        // Get All Branches:
        [HttpGet]
         public IHttpActionResult GetAllBranches(Guid id)
         {
            if (helper.IsSessionValid())
            {
             var list = branchDAL.GetAllBranches(id);
             return Ok(list);
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        // Save branch policy:
        [HttpPost]
        public IHttpActionResult PostBranchPolicy(BranchPolicyDTO bP)
        {
            if (helper.IsSessionValid())
            {
            branchDAL.PostBranchPolicy(bP);
            return Ok();
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        // Get branch policy:
        [HttpGet]
        public IHttpActionResult GetBranchPolicy(Guid id)
        {
            if (helper.IsSessionValid())
            {
            var branchPolicyObj = branchDAL.GetBranchPolicy(id);
            return Ok(branchPolicyObj);
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }
    }
}
