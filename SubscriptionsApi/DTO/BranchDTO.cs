using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SubscriptionsApi.DTO
{
    public class BranchDTO
    {
        public Guid BranchID { get; set; }
        public string branchTitle { get; set; }
        //public Nullable<Guid> CompanyID { get; set; }
        //public Nullable<Guid> ManagerID { get; set; }
        //public string address { get; set; }
        //public string telephone { get; set; }
        //public Nullable<DateTime> startDate { get; set; }
        //public bool isMainBranch { get; set; }
    }
    public class BranchPolicyDTO
    {
        public Guid BranchID { get; set; }
        public string OpeningHour { get; set; }
        public string ClosureHour { get; set; }
        public string Logo { get; set; }
        public Guid EditedBy { get; set; }
    }
}