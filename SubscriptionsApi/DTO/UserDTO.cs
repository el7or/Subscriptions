using SubscriptionsApi.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SubscriptionsApi.DTO
{
    public class UserDTO
    {
        public Guid UserID { get; set; }
        public Guid PartyID { get; set; }
        public Guid? BranchID { get; set; }
        public Guid CompanyID { get; set; }
        public string RoleTitle { get; set; }
        public string UserName { get; set; }
        public string PartyFirstName { get; set; }
        public string PartyLastName { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }
        public string CompanyName { get; set; }
        public string Industry { get; set; }
        public int? Language { get; set; }
        public string Currency { get; set; }
        public int? AlertDays { get; set; }
        public int? AlertVisits { get; set; }
        public int? AlertPayments { get; set; }
        public bool CheckDivisions { get; set; }
        public string Logo { get; set; }
        public bool isCompanyExpired { get; set; }
        public int? ExpirationDays { get; set; }
        public Guid EditedBy { get; set; }
    }
    public class PartyDTO
    {
        public Guid PartyID { get; set; }
        public string PartyFirstName { get; set; }
        public string PartyLastName { get; set; }
        public string Telephone { get; set; }
        public Guid EditedBy { get; set; }
    }
    public class PasswordDTO
    {
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
        public Guid EditedBy { get; set; }
    }
    public class CompanyDTO
    {
        public Guid CompanyID { get; set; }
        public string CompanyName { get; set; }
        public string binaryImage { get; set; }
        public Guid EditedBy { get; set; }
        //public string Industry { get; set; }
    }
    public class UserStaffDTO
    {
        public Guid UserID { get; set; }
        public Guid? BranchID { get; set; }
        public Guid RoleID { get; set; }
        public Guid? DivisionID { get; set; }
        public string PartyFirstName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string branchTitle { get; set; }
        public string RoleTitle { get; set; }
        public int Language { get; set; }
        public bool? IsBlockedByAdmin { get; set; }
        public Guid CurrentUserID { get; set; }
    }
    public class UserMemberDTO
    {
        public Guid UserID { get; set; }
        public Guid PartyID { get; set; }
        public Guid? BranchID { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public int Language { get; set; }
        public string CompanyName { get; set; }
        public Guid EditedBy { get; set; }
    }
    public class ClientDetailsDTO
    {
        public string CompanyName { get; set; }
        public string PartyName { get; set; }
        public string  UserEmail { get; set; }
        public int? LanguageID { get; set; }
        public IEnumerable<MembershipEndingDTO> SubscriptionsObject { get; set; }
    }
}