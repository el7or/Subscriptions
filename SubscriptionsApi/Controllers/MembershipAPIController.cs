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
    public class MembershipAPIController : ApiController
    {
        EFMembershipDAL memsDAL;
        Helper helper;
        public MembershipAPIController()
        {
            memsDAL = new EFMembershipDAL();
            helper = new Helper();
        }

        //Get All Memberships by member:
        [HttpGet]
        public IHttpActionResult GetAllMembershipsByMember(Guid id)
        {
            if (helper.IsSessionValid())
            {
                var list = memsDAL.GetAllMembershipsByMember(id);
                return Ok(list);
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        //Get All Memberships ending after now:
        [HttpGet]
        public IHttpActionResult GetMembershipsEndingSoon(Guid id)
        {
            if (helper.IsSessionValid())
            {
                var list = memsDAL.GetMembershipsEndingSoon(id);
                return Ok(list);
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }


        // Suspend/Reactivate Membership:
        [HttpGet]
        public IHttpActionResult ChangeMembershipStatus(Guid memsID, Guid userUID, bool isActive)
        {
            if (helper.IsSessionValid())
            {
                //memsDAL.ChangeMembershipStatus(memsID, helper.CurrentUserID, isActive);
                memsDAL.ChangeMembershipStatus(memsID, userUID, isActive);
                return Ok();
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        //Get All visits of memberships:
        [HttpGet]
        public IHttpActionResult GetAllCheckins(Guid id)
        {
            if (helper.IsSessionValid())
            {
                var list = memsDAL.GetAllCheckins(id);
                return Ok(list);
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        //Get visits of membership by membershipID:
        [HttpGet]
        public IHttpActionResult GetCheckinsByMembership(Guid id)
        {
            if (helper.IsSessionValid())
            {
                var list = memsDAL.GetCheckinsByMembership(id);
                return Ok(list);
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        //Insert new visit of membership (non per visits):
        [HttpGet]
        public IHttpActionResult PostMembershipVisit(Guid id)
        {
            if (helper.IsSessionValid())
            {
                memsDAL.AddMembershipVisit(id);
                return Ok();
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        //Check-in visit of membership (per visits):
        [HttpGet]
        public IHttpActionResult PostVisit(Guid id)
        {
            if (helper.IsSessionValid())
            {
                memsDAL.PostVisit(id);
                return Ok();
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        // Edit visit details:
        [HttpPost]
        public IHttpActionResult UpdateMembershipVisit(MembershipVisitsDTO VisitDetails)
        {
            int? seq = memsDAL.UpdateMembershipVisit(VisitDetails);
            return Ok(seq);
        }

        //Get memberships for line chart:
        [HttpGet]
        public IHttpActionResult GetSubscriptionsChart(Guid id)
        {
            if (helper.IsSessionValid())
            {
                var list = memsDAL.GetSubscriptionsChart(id);
                return Ok(list);
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        //Get memberships by member for android:
        [HttpGet]
        public IHttpActionResult GetSubscriptions(Guid subsid)
        {
            var list = memsDAL.GetSubscriptions(subsid);
            return Ok(list);
        }

        // Get reservations by specialist id
        [HttpGet]
        public IHttpActionResult GetBookedVisits(Guid id)
        {
            var list = memsDAL.GetBookedVisits(id);
            return Ok(list);
        }
    }
}
