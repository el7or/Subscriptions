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
    
    public partial class CompanyModule
    {
        public System.Guid CompanyID { get; set; }
        public System.Guid ModuleID { get; set; }
        public Nullable<System.DateTime> SubscriptionDate { get; set; }
    
        public virtual Company Company { get; set; }
        public virtual Module Module { get; set; }
    }
}
