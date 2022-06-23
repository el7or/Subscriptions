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
    public class ItemAPIController : ApiController
    {
         EFItemDAL itemDAL;
        Helper helper;
        public ItemAPIController()
        {
            itemDAL = new EFItemDAL();
        helper = new Helper();
        }

        //Get All Items:
        [HttpGet]
         public IHttpActionResult GetAllItems(Guid id)
         {
            if (helper.IsSessionValid())
            {
             var list= itemDAL.GetAllItems(id);
             return Ok(list);
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }
                
        //Insert new Item:
        [HttpPost]
        public IHttpActionResult PostItem(Item itemDetails)
        {
            if (helper.IsSessionValid())
            {
            itemDAL.AddItem(itemDetails);
            return Ok();
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        //Edit Item:
        [HttpPost]
        public IHttpActionResult UpdateItem(ItemDTO itemDetails)
        {
            if (helper.IsSessionValid())
            {
            itemDAL.UpdateItem(itemDetails);
            return Ok();
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }

        // Delete Item:
        [HttpGet]
        public IHttpActionResult DeleteItem(Guid itemID,Guid userUID)
        {
            if (helper.IsSessionValid())
            {
                //itemDAL.DeleteItem(itemID, helper.CurrentUserID);
                itemDAL.DeleteItem(itemID, userUID);
                return Ok();
            }
            else
            {
                return new HttpActionResult(HttpStatusCode.InternalServerError, "Session Expired");
            }
        }
    }
}
