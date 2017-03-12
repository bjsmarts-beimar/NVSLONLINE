using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace nvslonlineApi.Models
{
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
}