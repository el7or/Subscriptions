using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SubscriptionsApi.DTO
{
    public class MembershipDTO
    {
        public MembershipDTO()
        {
            IsRenewal = false;
        }
        public Guid MembershipID { get; set; }
        public Guid ProgramID { get; set; }
        public Guid InvoiceID { get; set; }
        public string ProgramName { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public int? BookedVisits { get; set; }
        public bool IsActive { get; set; }
        public int UsedVisits { get; set; }
        //public decimal? InvoiceDue { get; set; }
        public bool IsRenewal { get; set; }
        public bool IsRunning { get; set; }
    }
    public class MembershipEndingDTO
    {
        public MembershipEndingDTO()
        {
            IsRenewal = false;
        }
        public Guid MembershipID { get; set; }
        public Guid PartyID { get; set; }
        public string PartyName { get; set; }
        public string Telephone { get; set; }
        public string ProgramName { get; set; }
        public string ProgramBasis { get; set; }
        public int? RemainingDay { get; set; }
        public int? BookedVisits { get; set; }
        public int UsedVisits { get; set; }
        public bool IsRenewal { get; set; }
        public bool IsActive { get; set; }
    }
    public class MembershipVisitsDTO
    {
        public Guid MembershipVisitID { get; set; }
        public string ProgramName { get; set; }
        public string Specialist { get; set; }
        public string CheckInDate { get; set; }
        public string CheckInTime { get; set; }
        public string PartyName { get; set; }
        public string CheckInBy { get; set; }
        public string ReservationDate { get; set; }
        public string ReservationTime { get; set; }
        public int? SequenceNo { get; set; }
        public DateTime MembershipStartDate { get; set; }
    }
    public class BookedVisitsDTO
    {
        public Guid MembershipVisitID { get; set; }
        public Guid PartyID { get; set; }
        public Guid InvoiceID { get; set; }
        public string ProgramName { get; set; }
        public string PartyName { get; set; }
        public string ReservationDate { get; set; }
        public int? SequenceNo { get; set; }
    }
    public class MembershipChartDTO
    {
        public string MonthOfYear { get; set; }
        public int CountCurrentYear { get; set; }
        public int CountPrevYear { get; set; }
    }
}