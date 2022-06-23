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
    
    public partial class Item
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Item()
        {
            this.InvoiceItems = new HashSet<InvoiceItem>();
        }
    
        public System.Guid ItemID { get; set; }
        public string ItemName { get; set; }
        public decimal Price { get; set; }
        public System.Guid BranchID { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
        public System.DateTime EditDate { get; set; }
        public System.Guid EditedBy { get; set; }
    
        public virtual Branch Branch { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<InvoiceItem> InvoiceItems { get; set; }
    }
}