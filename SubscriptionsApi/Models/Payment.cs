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
    
    public partial class Payment
    {
        public System.Guid PaymentID { get; set; }
        public System.Guid InvoiceID { get; set; }
        public System.Guid PartyID { get; set; }
        public decimal Paid { get; set; }
        public Nullable<System.DateTime> NextPaymentDate { get; set; }
        public string Notes { get; set; }
        public System.DateTime EditDate { get; set; }
        public System.Guid EditedBy { get; set; }
    
        public virtual Invoice Invoice { get; set; }
        public virtual Party Party { get; set; }
    }
}
