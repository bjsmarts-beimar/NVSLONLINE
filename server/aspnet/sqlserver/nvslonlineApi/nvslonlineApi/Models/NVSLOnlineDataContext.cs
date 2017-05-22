using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace nvslonlineApi.Models
{
    public class NVSLOnlineDataContext : DbContext
    {
        public NVSLOnlineDataContext()
            : base("name=nvslOnlineConnection")
        {

        }

        public System.Data.Entity.DbSet<nvslonlineApi.Models.Season> Seasons { get; set; }

        public System.Data.Entity.DbSet<nvslonlineApi.Models.Division> Divisions { get; set; }

        public System.Data.Entity.DbSet<nvslonlineApi.Models.Venue> Venues { get; set; }

        public System.Data.Entity.DbSet<nvslonlineApi.Models.Teams> Teams { get; set; }

        public System.Data.Entity.DbSet<nvslonlineApi.Models.Players> Players { get; set; }

        public System.Data.Entity.DbSet<nvslonlineApi.Models.Standings> Standings { get; set; }

        public System.Data.Entity.DbSet<nvslonlineApi.Models.Schedule> Schedules { get; set; }

        public System.Data.Entity.DbSet<nvslonlineApi.Models.News> News { get; set; }

        public System.Data.Entity.DbSet<nvslonlineApi.Models.Contacts> Contacts { get; set; }
    }
}