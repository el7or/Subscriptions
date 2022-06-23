using SubscriptionsApi.DTO;
using SubscriptionsApi.Models;
using SubscriptionsApi.Utilities;
using System;
using System.Collections.Generic;
using System.Data.Entity.SqlServer;
using System.Linq;
using System.Web;

namespace SubscriptionsApi.DAL
{
    public class EFBranchDAL
    {
        SubscriptionsDBContext dbContext = null;
        Helper helper;
        public EFBranchDAL()
        {
            dbContext = new SubscriptionsDBContext();
            helper = new Helper();
        }
        public IEnumerable<BranchDTO> GetAllBranches(Guid compID)
        {
            var list = dbContext.Branches.Where(x => x.CompanyID == compID)
                .Select(b => new BranchDTO
                {
                    BranchID = b.BranchID,
                    branchTitle = b.branchTitle
                }).ToList();
            return list;
        }
        public void PostBranchPolicy(BranchPolicyDTO bP)
        {
            BranchPolicy branchPolicy = dbContext.BranchPolicies.Where(b => b.BranchID == bP.BranchID).FirstOrDefault();
            branchPolicy.OpeningHour = (bP.OpeningHour == null ? (DateTime?)null : DateTime.Parse(bP.OpeningHour));
            branchPolicy.ClosureHour = (bP.ClosureHour == null ? (DateTime?)null : DateTime.Parse(bP.ClosureHour));
            branchPolicy.EditedBy = bP.EditedBy;
            branchPolicy.EditDate = DateTime.Now;
            dbContext.Entry(branchPolicy).State = System.Data.Entity.EntityState.Modified;
            dbContext.SaveChanges();
        }
        public BranchPolicyDTO GetBranchPolicy(Guid branchID)
        {
            var bPDTO = dbContext.BranchPolicies.Where(b => b.BranchID == branchID)
                .Select(bP => new BranchPolicyDTO
                {
                    BranchID = branchID,
                    OpeningHour = (bP.OpeningHour == null ? "" : SqlFunctions.DatePart("hour", bP.OpeningHour) + ":" + SqlFunctions.DatePart("minute", bP.OpeningHour)),
                    ClosureHour = (bP.ClosureHour == null ? "" : SqlFunctions.DatePart("hour", bP.ClosureHour) + ":" + SqlFunctions.DatePart("minute", bP.ClosureHour)),
                    Logo = dbContext.Companies.Where(c=>c.Branches.Select(b=>b.BranchID).FirstOrDefault()==branchID).Select(cmp=>cmp.Logo).FirstOrDefault(),
                }).FirstOrDefault();

            return bPDTO;
        }
    }
}