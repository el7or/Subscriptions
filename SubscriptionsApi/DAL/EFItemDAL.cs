using SubscriptionsApi.DTO;
using SubscriptionsApi.Models;
using SubscriptionsApi.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SubscriptionsApi.DAL
{
    public class EFItemDAL
    {
        SubscriptionsDBContext dbContext = null;
        Helper helper;
        public EFItemDAL()
        {
            dbContext = new SubscriptionsDBContext();
            helper = new Helper();
        }
        public IEnumerable<Item> GetAllItems(Guid brunchID)
        {
            var items = dbContext.Items.Where(x => x.BranchID == brunchID && x.IsDeleted==false).OrderBy(x=>x.EditDate).ToList();
            return items;
        }
        public void AddItem(Item itemDetails)
        {
            itemDetails.EditDate = DateTime.Now;
            itemDetails.EditedBy = itemDetails.EditedBy;

            dbContext.Items.Add(itemDetails);
            dbContext.SaveChangesAsync();
        }
        public void UpdateItem(ItemDTO itemDetails)
        {
            var item = dbContext.Items.Find(itemDetails.ItemID);

            item.ItemName = itemDetails.ItemName;
            item.Price = itemDetails.Price;
            item.EditedBy = itemDetails.EditedBy;
            item.EditDate = DateTime.Now;

            dbContext.Entry(item).State = System.Data.Entity.EntityState.Modified;
            dbContext.SaveChangesAsync();
        }
        public void DeleteItem(Guid itemID, Guid userUID)
        {
            var item = dbContext.Items.Find(itemID);

            item.IsDeleted = true;
            item.EditedBy = userUID;
            item.EditDate = DateTime.Now;

            dbContext.Entry(item).State = System.Data.Entity.EntityState.Modified;
            dbContext.SaveChangesAsync();
        }
    }
}