 using SubscriptionsApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SubscriptionsApi.DAL
{
    public class EFDivisionDAL
    {
         SubscriptionsDBContext dbContext = null;
         public EFDivisionDAL()
        {
            dbContext = new SubscriptionsDBContext();
        }
         public IEnumerable<Division> GetAllDivisons(Guid companyID)
         {
             var list = from divisons in dbContext.Divisions
                        where divisons.CompanyID == companyID && divisons.IsActive == true
                        select divisons;
             return list;
         }
         public Guid AddDivision(string divName, Guid compID, Guid userID)
         {
             Division division = new Division()
             {
                 DivisionName = divName,
                 CompanyID = compID,
                 IsActive = true,
                 EditDate = DateTime.Now,
                 EditedBy = userID
             };
             dbContext.Divisions.Add(division);
             dbContext.SaveChanges();

             return division.DivisionID;
         }
         public void UpdateDivision(Guid divID, string divName, Guid userUID)
         {
             var division = dbContext.Divisions.Find(divID);

             division.DivisionName = divName;
             division.EditedBy = userUID;
             division.EditDate = DateTime.Now;

             dbContext.Entry(division).State = System.Data.Entity.EntityState.Modified;
             dbContext.SaveChangesAsync();
         }
         public void DeleteDivision(Guid divID, Guid userUID)
         {
             var division = dbContext.Divisions.Find(divID);

             division.IsActive = false;
             division.EditedBy = userUID;
             division.EditDate = DateTime.Now;

             dbContext.Entry(division).State = System.Data.Entity.EntityState.Modified;
             dbContext.SaveChangesAsync();
         }
    }
}