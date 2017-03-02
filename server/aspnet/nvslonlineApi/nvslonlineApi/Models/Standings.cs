using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace nvslonlineApi.Models
{
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