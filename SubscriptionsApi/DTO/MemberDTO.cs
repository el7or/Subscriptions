using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SubscriptionsApi.DTO
{
    public class MemberDTO
    {
        public Guid PartyID { get; set; }
        public string PartyFirstName { get; set; }
        public string PartyLastName { get; set; }
        public Guid CompanyBranchId { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }
        public string Address { get; set; }
        public int? GenderID { get; set; }
        public string Birthday { get; set; }
        public string Picture { get; set; }
        public int MembershipsCount { get; set; }
        public decimal? TotalDue { get; set; }
        public string AccountUserID { get; set; }
        public bool? IsBlocked { get; set; }
        public string JoiningDate { get; set; }
        public int? PartyCode { get; set; }
        public Guid EditedBy { get; set; }
    }
    public class MemberSearchDTO
    {
        public Guid PartyID { get; set; }
        public Guid? MembershipID { get; set; }
        public string PartyFirstName { get; set; }
        public string PartyLastName { get; set; }
        public string Telephone { get; set; }
        public string ProgramName { get; set; }
        public string JoiningDate { get; set; }
        public int? PartyCode { get; set; }
    }
    public class MemberCalendarDTO
    {
        public Guid PartyID { get; set; }
        public Guid MembershipID { get; set; }
        public string PartyName { get; set; }
        public string Telephone { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public int? BookedVisits { get; set; }
        public int UsedVisits { get; set; }
        public bool IsRunning { get; set; }
    }
}