//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SubscriptionsApi.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class MembershipVisit
    {
        public System.Guid MembershipVisitID { get; set; }
        public System.Guid MemberShipID { get; set; }
        public Nullable<System.Guid> SpecialistId { get; set; }
        public Nullable<System.DateTime> InDateTime { get; set; }
        public Nullable<System.DateTime> OutDateTime { get; set; }
        public Nullable<System.DateTime> ReservationDate { get; set; }
        public Nullable<System.Guid> ChildProgramId { get; set; }
        public Nullable<int> SequenceNo { get; set; }
    
        public virtual Membership Membership { get; set; }
    }
}
