using SubscriptionsApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SubscriptionsApi.DTO
{   
    public class ProgrammeDTO
    {
       public ProgrammeDTO()
        {
            isAvailable = true;
        }
        public Guid ProgramID { get; set; }
        public Guid BrunchID { get; set; }
        public string ProgramName { get; set; }
        public Guid DivisionID { get; set; }
        public decimal ProgramFees { get; set; }
        public string ProgramBasis { get; set; }
        public int? Length { get; set; }
        public string LengthUnit { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public int? No_Of_Visists { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public int ProgramMembers { get; set; }
        public bool isAvailable { get; set; }
        public Guid? ClonedFrom { get; set; }
        public string ProgramDays { get; set; }
        public string ProgramTimeFrom { get; set; }
        public string ProgramTimeTo { get; set; }
        public int? ProgramCapacity { get; set; }
        public int? ValidationDuration { get; set; }
        public decimal GrossIncome { get; set; }
        public decimal PaidIncome { get; set; }
        public ICollection<ProgramPackage> ProgramPackages { get; set; }
        public Guid EditedBy { get; set; }
    }
    public class CalendarProgramsDTO
    {
        public CalendarProgramsDTO()
        {
            isAvailable = true;
        }
        public Guid ProgramID { get; set; }
        public string ProgramName { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public int ProgramMembers { get; set; }
        public string ProgramBasis { get; set; }
        public bool IsActive { get; set; }
        public bool isAvailable { get; set; }
        public string ProgramDays { get; set; }
        public string ProgramTimeFrom { get; set; }
        public string ProgramTimeTo { get; set; }
    }

    public class ProgramChartDTO
    {
        public Guid ProgramID { get; set; }
        public string ProgramName { get; set; }
        public bool IsActive { get; set; }
        public int SubsCount { get; set; }
    }
}