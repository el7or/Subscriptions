using SubscriptionsApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SubscriptionsApi.DTO
{
    public class InvoiceDTO
    {
        //public ICollection<Membership> InvoiceMemberships { get; set; }
        public long InvoiceSerial { get; set; }
        public string InvoiceDate { get; set; }
        public string InvoiceTime { get; set; }
        public IEnumerable<Membership> InvoiceMemberships { get; set; }
        public IEnumerable<InvoiceItem> InvoiceItems { get; set; }
        public Guid PartyID { get; set; }
        public Guid BranchID { get; set; }
        public decimal? DiscountPercent { get; set; }
        public decimal? DiscountValue { get; set; }
        public decimal? TaxPercent { get; set; }
        public decimal? TaxValue { get; set; }
        public decimal Paid { get; set; }
        public string NextPaymentDate { get; set; }
        public Guid EditedBy { get; set; }
    }
    public class InvoiceListDTO
    {
        public InvoiceListDTO()
        {
            IsMembershipActive = true;
        }
        public Guid InvoiceID { get; set; }
        public Guid PartyID { get; set; }
        public Guid? MembershipID { get; set; }
        public string PartyName { get; set; }
        public string Telephone { get; set; }
        public long InvoiceSerial { get; set; }
        public string InvoiceDate { get; set; }
        public decimal? Total { get; set; }
        public decimal Paid { get; set; }
        public Guid? ProgramID { get; set; }
        public string NextPaymentDate { get; set; }
        public bool IsHasMembership { get; set; }
        public bool IsMembershipActive { get; set; }
        public string MembershipName { get; set; }
    }
    public class InvoiceChartDTO
    {
        public string MonthOfYear { get; set; }
        public decimal TotalCurrentPay { get; set; }
        public decimal TotalPrevPay { get; set; }
    }
}