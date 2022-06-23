using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SubscriptionsApi.DTO
{
    public class ItemDTO
    {
        public Guid ItemID { get; set; }
        public string ItemName { get; set; }
        public decimal Price { get; set; }
        public Guid EditedBy { get; set; }
    }
}