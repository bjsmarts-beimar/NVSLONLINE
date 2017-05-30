using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace NvslOnlineCoreWebApi.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Contacts> contacts { get; set; }
        public DbSet<Division> divisions { get; set; }
        public DbSet<News> news { get; set; }
        public DbSet<Season> season { get; set; }
        public DbSet<Teams> teams { get; set; }
        public DbSet<Players> players { get; set; }
        public DbSet<Venue> venue { get; set; }
        public DbSet<Schedule> schedule { get; set; }
        public DbSet<Standings> standings { get; set; }

    }

    public enum subject
    {
        general,
        advertise,
        playerSuspension,
        suggestions,
        other
    }


    public class Contacts
    {
        public int Id { get; set; }

        public string yourName { get; set; }

        public string email { get; set; }

        public string message { get; set; }

        public bool IsHidden { get; set; }

        public subject requestSubject { get; set; }

        public DateTime? created { get; set; }

        public string modifiedBy { get; set; }

        public string modifiedByfullName { get; set; }

        public DateTime? modified { get; set; }
    }

    public class Division
    {
        public int Id { get; set; }

        public string DivisionName { get; set; }

        public bool IsHidden { get; set; }
    }

    public class News
    {
        public int Id { get; set; }

        public string title { get; set; }

        public string description { get; set; }

        public bool IsHidden { get; set; }

        public DateTime? created { get; set; }

        public string modifiedBy { get; set; }

        public string modifiedByfullName { get; set; }

        public DateTime? modified { get; set; }
    }

    public class Season
    {
        public int Id { get; set; }

        public string SeasonName { get; set; }

        public bool Active { get; set; }

        public bool IsHidden { get; set; }

        public DateTime? SeasonStart { get; set; }

        public DateTime? SeasonEnd { get; set; }
    }

    public class Teams
    {
        public int Id { get; set; }
        public string TeamName { get; set; }
        public bool IsHidden { get; set; }
        [ForeignKey("Division")]
        public int? DivisionId { get; set; }
        public Division Division { get; set; }
        [ForeignKey("Season")]
        public int? SeasonId { get; set; }
        public Season Season { get; set; }
    }

    public class Players
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsHidden { get; set; }
        [ForeignKey("Teams")]
        public int? TeamId { get; set; }
        public Teams Teams { get; set; }
    }

    public class Venue
    {
        public int Id { get; set; }

        public string VenueName { get; set; }

        public bool IsHidden { get; set; }
    }

    public class Schedule
    {
        public int Id { get; set; }

        //public int Fk_SeasonId { get; set; }
        [ForeignKey("Season")]
        public int? SeasonId { get; set; }
        public Season Season { get; set; }

        //public int Fk_DivisionId { get; set; }
        [ForeignKey("Division")]
        public int? DivisionId { get; set; }
        public Division Division { get; set; }


        //public int Fk_VenueId { get; set; }
        [ForeignKey("Venue")]
        public int? VenueId { get; set; }
        public Venue Venue { get; set; }

        public string Status { get; set; }

        public DateTime DateTime { get; set; }

        //public int Fk_HomeTeamId { get; set; }
        [ForeignKey("HomeTeam")]
        public int? HomeTeamId { get; set; }
        // public int? AwayTeamId { get; set; }
        public Teams HomeTeam { get; set; }
        //public Teams HomeTeam { get; set; }

        public int? GoalsHomeTeam { get; set; }

        //public string Score { get; set; }

        //public int FK_AwayTeamId { get; set; }
        [ForeignKey("AwayTeam")]
        public int? AwayTeamId { get; set; }
        public Teams AwayTeam { get; set; }

        public int? GoalsAwayTeam { get; set; }

        public bool IsHidden { get; set; }
    }

    public class Standings
    {
        public int Id { get; set; }

        //public int Fk_TeamId { get; set; }
        public Teams Teams { get; set; }

        //public int Fk_DivisionId { get; set; }
        public Division Divisions { get; set; }

        public int Wins { get; set; }

        public int Losses { get; set; }

        public int Ties { get; set; }

        public int Points { get; set; }

        public int GoalsFor { get; set; }

        public int GoalsAgainst { get; set; }

        public bool IsHidden { get; set; }
    }
}
