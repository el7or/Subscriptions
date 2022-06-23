﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class SubscriptionsDBContext : DbContext
    {
        public SubscriptionsDBContext()
            : base("name=SubscriptionsDBContext")
        {
            this.Configuration.LazyLoadingEnabled = false;
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Branch> Branches { get; set; }
        public virtual DbSet<BranchPolicy> BranchPolicies { get; set; }
        public virtual DbSet<City> Cities { get; set; }
        public virtual DbSet<Company> Companies { get; set; }
        public virtual DbSet<CompanyModule> CompanyModules { get; set; }
        public virtual DbSet<CompanyPreference> CompanyPreferences { get; set; }
        public virtual DbSet<Country> Countries { get; set; }
        public virtual DbSet<Currency> Currencies { get; set; }
        public virtual DbSet<Division> Divisions { get; set; }
        public virtual DbSet<GenderLookup> GenderLookups { get; set; }
        public virtual DbSet<Industry> Industries { get; set; }
        public virtual DbSet<InvoiceItem> InvoiceItems { get; set; }
        public virtual DbSet<Invoice> Invoices { get; set; }
        public virtual DbSet<Item> Items { get; set; }
        public virtual DbSet<Language> Languages { get; set; }
        public virtual DbSet<Logging> Loggings { get; set; }
        public virtual DbSet<Membership> Memberships { get; set; }
        public virtual DbSet<MembershipVisit> MembershipVisits { get; set; }
        public virtual DbSet<Module> Modules { get; set; }
        public virtual DbSet<NewsSubscription> NewsSubscriptions { get; set; }
        public virtual DbSet<Party> Parties { get; set; }
        public virtual DbSet<PartiesTypeLookup> PartiesTypeLookups { get; set; }
        public virtual DbSet<Payment> Payments { get; set; }
        public virtual DbSet<ProgramConfiguration> ProgramConfigurations { get; set; }
        public virtual DbSet<ProgramPackage> ProgramPackages { get; set; }
        public virtual DbSet<Program> Programs { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<State> States { get; set; }
        public virtual DbSet<StatusCategory> StatusCategories { get; set; }
        public virtual DbSet<StatusLookup> StatusLookups { get; set; }
        public virtual DbSet<UserPreference> UserPreferences { get; set; }
        public virtual DbSet<User> Users { get; set; }
    }
}
