using SubscriptionsApi.DTO;
using SubscriptionsApi.Models;
using SubscriptionsApi.Utilities;
using System;
using System.Collections.Generic;
using System.Data.Entity.SqlServer;
using System.Data.Objects;
using System.Linq;
using System.Web;

namespace SubscriptionsApi.DAL
{
    public class EFProgrammeDAL
    {
        SubscriptionsDBContext dbContext = null;
        Helper helper;
        public EFProgrammeDAL()
        {
            dbContext = new SubscriptionsDBContext();
            helper = new Helper();
        }
        public IEnumerable<ProgrammeDTO> GetAllProgrammes(Guid compID)
        {
            var list = (from programs in dbContext.Programs
                        join divisions in dbContext.Divisions
                        on programs.DivisionID equals divisions.DivisionID
                        join companies in dbContext.Companies
                        on divisions.CompanyID equals companies.CompanyID
                        where divisions.CompanyID == compID && programs.IsDeleted == false
                        orderby programs.IsActive descending, programs.CreationDate descending
                        select new ProgrammeDTO
                        {
                            ProgramID = programs.ProgramID,
                            ProgramName = programs.ProgramName,
                            DivisionID = programs.DivisionID,
                            ProgramFees = programs.ProgramFees,
                            ProgramBasis = programs.ProgramBasis,
                            Length = programs.Length,
                            LengthUnit = programs.LengthUnit,
                            StartDate = programs.StartDate.ToString(),
                            EndDate = programs.EndDate.ToString(),
                            No_Of_Visists = programs.No_Of_Visists,
                            Description = programs.Description,
                            IsActive = programs.IsActive,
                            ProgramMembers = (from memberships in dbContext.Memberships
                                              where memberships.ProgramID == programs.ProgramID
                                              select memberships.MembershipID).Count(),
                            isAvailable = (programs.EndDate < DateTime.Today ? false : true),
                            ClonedFrom = programs.ClonedFrom,
                            ProgramDays = programs.ProgramConfigurations.FirstOrDefault().ProgramDays,
                            ProgramTimeFrom = (programs.ProgramConfigurations.FirstOrDefault().ProgramTimeFrom == null ? "" : SqlFunctions.DatePart("hour", programs.ProgramConfigurations.FirstOrDefault().ProgramTimeFrom) + ":" + SqlFunctions.DatePart("minute", programs.ProgramConfigurations.FirstOrDefault().ProgramTimeFrom)),
                            ProgramTimeTo = (programs.ProgramConfigurations.FirstOrDefault().ProgramTimeTo == null ? "" : SqlFunctions.DatePart("hour", programs.ProgramConfigurations.FirstOrDefault().ProgramTimeTo) + ":" + SqlFunctions.DatePart("minute", programs.ProgramConfigurations.FirstOrDefault().ProgramTimeTo)),
                            ValidationDuration = programs.ProgramConfigurations.FirstOrDefault().ValidationDuration,
                            ProgramCapacity = programs.ProgramConfigurations.FirstOrDefault().ProgramCapacity,
                            GrossIncome = (from invoices in dbContext.Invoices
                                           where invoices.InvoiceItems.Select(x => x.Membership.ProgramID).FirstOrDefault() == programs.ProgramID
                                           select (invoices.InvoiceItems.Sum(x => x.Price * x.Quantity) - invoices.DiscountValue.Value) + invoices.TaxValue.Value).FirstOrDefault(),
                            PaidIncome = (from invoices in dbContext.Invoices
                                          where invoices.InvoiceItems.Select(x => x.Membership.ProgramID).FirstOrDefault() == programs.ProgramID
                                          select ((invoices.Payments.Count > 0 ? invoices.Payments.Sum(x => x.Paid) : 0))).FirstOrDefault(),
                            ProgramPackages = programs.ProgramPackages
                        }).ToList();
            return list;
        }
        public IEnumerable<ProgrammeDTO> GetProgrammesByDivision(Guid divID)
        {
            var list = (from programs in dbContext.Programs
                        where programs.DivisionID == divID && programs.IsDeleted == false
                        orderby programs.IsActive descending, programs.CreationDate descending
                        select new ProgrammeDTO
                        {
                            ProgramID = programs.ProgramID,
                            ProgramName = programs.ProgramName,
                            DivisionID = programs.DivisionID,
                            ProgramFees = programs.ProgramFees,
                            ProgramBasis = programs.ProgramBasis,
                            Length = programs.Length,
                            LengthUnit = programs.LengthUnit,
                            StartDate = programs.StartDate.Value.ToString(),
                            EndDate = programs.EndDate.Value.ToString(),
                            No_Of_Visists = programs.No_Of_Visists,
                            Description = programs.Description,
                            IsActive = programs.IsActive,
                            ProgramMembers = (from memberships in dbContext.Memberships
                                              where memberships.ProgramID == programs.ProgramID
                                              select memberships).Count(),
                            isAvailable = (programs.EndDate < DateTime.Today ? false : true),
                            ClonedFrom = programs.ClonedFrom,
                            ProgramDays = programs.ProgramConfigurations.FirstOrDefault().ProgramDays,
                            ProgramTimeFrom = (programs.ProgramConfigurations.FirstOrDefault().ProgramTimeFrom == null ? "" : SqlFunctions.DatePart("hour", programs.ProgramConfigurations.FirstOrDefault().ProgramTimeFrom) + ":" + SqlFunctions.DatePart("minute", programs.ProgramConfigurations.FirstOrDefault().ProgramTimeFrom)),
                            ProgramTimeTo = (programs.ProgramConfigurations.FirstOrDefault().ProgramTimeTo == null ? "" : SqlFunctions.DatePart("hour", programs.ProgramConfigurations.FirstOrDefault().ProgramTimeTo) + ":" + SqlFunctions.DatePart("minute", programs.ProgramConfigurations.FirstOrDefault().ProgramTimeTo)),
                            ValidationDuration = programs.ProgramConfigurations.FirstOrDefault().ValidationDuration,
                            ProgramCapacity = programs.ProgramConfigurations.FirstOrDefault().ProgramCapacity
                        }).ToList();
            return list;
        }
        public IEnumerable<CalendarProgramsDTO> GetAllCalendarProgrammes(Guid compID)
        {
            var list1 = (from programs in dbContext.Programs
                         join divisions in dbContext.Divisions
                         on programs.DivisionID equals divisions.DivisionID
                         where divisions.CompanyID == compID && programs.ProgramBasis == "fixedProgram" && programs.IsDeleted == false
                         select new CalendarProgramsDTO
                         {
                             ProgramID = programs.ProgramID,
                             ProgramName = programs.ProgramName,
                             StartDate = programs.StartDate.ToString(),
                             EndDate = SqlFunctions.DateAdd("day", 1, programs.EndDate).ToString(),
                             ProgramMembers = (from memberships in dbContext.Memberships
                                               where memberships.ProgramID == programs.ProgramID
                                               select memberships.PartyID).Distinct().Count(),
                             ProgramBasis = programs.ProgramBasis,
                             IsActive = programs.IsActive,
                             isAvailable = (programs.EndDate < DateTime.Today || programs.IsActive == false ? false : true),
                             ProgramDays = programs.ProgramConfigurations.FirstOrDefault().ProgramDays,
                             ProgramTimeFrom = (programs.ProgramConfigurations.FirstOrDefault().ProgramTimeFrom == null ? "" : SqlFunctions.DatePart("hour", programs.ProgramConfigurations.FirstOrDefault().ProgramTimeFrom) + ":" + SqlFunctions.DatePart("minute", programs.ProgramConfigurations.FirstOrDefault().ProgramTimeFrom)),
                             ProgramTimeTo = (programs.ProgramConfigurations.FirstOrDefault().ProgramTimeTo == null ? "" : SqlFunctions.DatePart("hour", programs.ProgramConfigurations.FirstOrDefault().ProgramTimeTo) + ":" + SqlFunctions.DatePart("minute", programs.ProgramConfigurations.FirstOrDefault().ProgramTimeTo))
                         }).ToList();

            var list2 = (from programs in dbContext.Programs
                         join divisions in dbContext.Divisions
                         on programs.DivisionID equals divisions.DivisionID
                         where divisions.CompanyID == compID
                         && programs.ProgramBasis != "fixedProgram"
                         && programs.IsDeleted == false
                         select new CalendarProgramsDTO
                         {
                             ProgramID = programs.ProgramID,
                             ProgramName = programs.ProgramName,
                             StartDate = SqlFunctions.DatePart("year", programs.CreationDate) + "-" + SqlFunctions.DatePart("month", programs.CreationDate) + "-" + SqlFunctions.DatePart("day", programs.CreationDate),
                             EndDate = "2920-1-1",
                             ProgramMembers = (from memberships in dbContext.Memberships
                                               where memberships.ProgramID == programs.ProgramID
                                               select memberships.PartyID).Distinct().Count(),
                             ProgramBasis = programs.ProgramBasis,
                             IsActive = programs.IsActive,
                             isAvailable = (programs.IsActive == false ? false : true),
                             ProgramDays = programs.ProgramConfigurations.FirstOrDefault().ProgramDays,
                             ProgramTimeFrom = (programs.ProgramConfigurations.FirstOrDefault().ProgramTimeFrom == null ? "" : SqlFunctions.DatePart("hour", programs.ProgramConfigurations.FirstOrDefault().ProgramTimeFrom) + ":" + SqlFunctions.DatePart("minute", programs.ProgramConfigurations.FirstOrDefault().ProgramTimeFrom)),
                             ProgramTimeTo = (programs.ProgramConfigurations.FirstOrDefault().ProgramTimeTo == null ? "" : SqlFunctions.DatePart("hour", programs.ProgramConfigurations.FirstOrDefault().ProgramTimeTo) + ":" + SqlFunctions.DatePart("minute", programs.ProgramConfigurations.FirstOrDefault().ProgramTimeTo))
                         }).ToList();

            var list = list1.Union(list2);
            return list;
        }
        public void AddProgram(Program p)
        {
            //p.MaxNo_Of_Members = 20;
            Guid progID = Guid.NewGuid();
            p.ProgramID = progID;
            p.CreationDate = DateTime.Now;
            p.CreationBy = p.CreationBy;
            p.EditDate = DateTime.Now;
            p.EditedBy = p.EditedBy;
            p.ProgramConfigurations.FirstOrDefault().ProgramID = progID;
            foreach (var item in p.ProgramPackages)
            {
                item.PackageID = Guid.NewGuid();
                item.ParentProgramId = progID;
            }

            dbContext.Programs.Add(p);
            dbContext.SaveChangesAsync();
        }
        public void UpdateProgramme(ProgrammeDTO programDetails)
        {
            var prog = dbContext.Programs.Find(programDetails.ProgramID);

            prog.ProgramName = programDetails.ProgramName;
            prog.DivisionID = programDetails.DivisionID;
            prog.ProgramFees = programDetails.ProgramFees;
            prog.ProgramBasis = programDetails.ProgramBasis;
            prog.Length = programDetails.Length;
            prog.LengthUnit = programDetails.LengthUnit;
            prog.StartDate = (programDetails.StartDate == null ? (DateTime?)null : DateTime.Parse(programDetails.StartDate));
            prog.EndDate = (programDetails.EndDate == null ? (DateTime?)null : DateTime.Parse(programDetails.EndDate));
            prog.No_Of_Visists = programDetails.No_Of_Visists;
            prog.Description = programDetails.Description;
            prog.EditedBy = programDetails.EditedBy;
            prog.EditDate = DateTime.Now;
            dbContext.Entry(prog).State = System.Data.Entity.EntityState.Modified;

            var progConfiguration = dbContext.ProgramConfigurations.Where(p => p.ProgramID == programDetails.ProgramID).FirstOrDefault();
            if (progConfiguration == null)
            {
                ProgramConfiguration pc = new ProgramConfiguration()
                {
                    ProgramID = programDetails.ProgramID,
                    BrunchID = programDetails.BrunchID,
                    ProgramDays = programDetails.ProgramDays,
                    ProgramTimeFrom = (programDetails.ProgramTimeFrom == "" ? (DateTime?)null : DateTime.Parse(programDetails.ProgramTimeFrom)),
                    ProgramTimeTo = (programDetails.ProgramTimeTo == "" ? (DateTime?)null : DateTime.Parse(programDetails.ProgramTimeTo)),
                    ValidationDuration = programDetails.ValidationDuration,
                    ProgramCapacity = programDetails.ProgramCapacity
                };
                dbContext.ProgramConfigurations.Add(pc);
            }
            else
            {
                progConfiguration.ProgramDays = programDetails.ProgramDays;
                progConfiguration.ProgramTimeFrom = (programDetails.ProgramTimeFrom == "" ? (DateTime?)null : DateTime.Parse(programDetails.ProgramTimeFrom));
                progConfiguration.ProgramTimeTo = (programDetails.ProgramTimeTo == "" ? (DateTime?)null : DateTime.Parse(programDetails.ProgramTimeTo));
                progConfiguration.ValidationDuration = programDetails.ValidationDuration;
                progConfiguration.ProgramCapacity = programDetails.ProgramCapacity;
                dbContext.Entry(progConfiguration).State = System.Data.Entity.EntityState.Modified;
            }

            foreach (var item in dbContext.ProgramPackages)
            {
                if (item.ParentProgramId == programDetails.ProgramID)
                {
                    dbContext.ProgramPackages.Remove(item);
                }
            }
            foreach (var item in programDetails.ProgramPackages)
            {                
                item.PackageID = Guid.NewGuid();
                dbContext.ProgramPackages.Add(item);
            }

            dbContext.SaveChangesAsync();
        }
        public void ChangeProgramStatus(Guid progID, Guid userUID, bool isActive)
        {
            var program = dbContext.Programs.Find(progID);

            program.IsActive = isActive;
            program.EditedBy = userUID;
            program.EditDate = DateTime.Now;

            dbContext.Entry(program).State = System.Data.Entity.EntityState.Modified;
            dbContext.SaveChangesAsync();
        }
        public void DeleteProgramme(Guid progID, Guid userUID)
        {
            var program = dbContext.Programs.Find(progID);

            program.IsDeleted = true;
            program.EditedBy = userUID;
            program.EditDate = DateTime.Now;

            dbContext.Entry(program).State = System.Data.Entity.EntityState.Modified;
            dbContext.SaveChangesAsync();
        }
        public IEnumerable<ProgramChartDTO> GetProgrammesChart(Guid compID)
        {
            var list = (from programs in dbContext.Programs
                        where programs.Division.CompanyID == compID
                        orderby programs.IsActive descending, programs.CreationDate descending
                        select new ProgramChartDTO
                        {
                            ProgramID = programs.ProgramID,
                            ProgramName = programs.ProgramName,
                            IsActive = programs.IsActive,
                            SubsCount = programs.Memberships.Count()
                        }).ToList();
            return list;
        }
    }
}