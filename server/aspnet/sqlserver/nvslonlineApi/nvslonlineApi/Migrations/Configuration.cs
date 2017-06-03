namespace nvslonlineApi.Migrations
{
    using nvslonlineApi.Models;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<nvslonlineApi.Models.NVSLOnlineDataContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(nvslonlineApi.Models.NVSLOnlineDataContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //

            var Divisiones = new List<Division>
            {
                new Division
                {
                    Id = 1,
                    DivisionName = "NVSL 40",
                    IsHidden = false
                },
                new Division
                {
                    Id = 2,
                    DivisionName = "Premier",
                    IsHidden = false
                },
                new Division
                {
                    Id = 3,
                    DivisionName = "First",
                    IsHidden = false
                },               
                new Division
                {
                    Id = 6,
                    DivisionName = "Masters",
                    IsHidden = false
                },                
            };
            Divisiones.ForEach(s => context.Divisions.Add(s));
            context.SaveChanges();
            var Venues = new List<Venue>
                {
                    new Venue
                    {
                        Id = 1,
                        VenueName = "Robinson Stadium",
                        IsHidden = false
                    },
                    new Venue
                    {
                        Id = 2,
                        VenueName = "Wakefield #5",
                        IsHidden = false
                    },
                    new Venue
                    {
                        Id = 3,
                        VenueName = "Franconia #4",
                        IsHidden = false
                    },
                    new Venue
                    {
                        Id = 4,
                        VenueName = "Woodson Auxillary",
                        IsHidden = false
                    },
                    new Venue
                    {
                        Id = 5,
                        VenueName = "Greenbriar #5",
                        IsHidden = false
                    },
                     new Venue
                    {
                        Id = 6,
                        VenueName = "Woodson Stadium",
                        IsHidden = false
                    },
                      new Venue
                    {
                        Id = 7,
                        VenueName = "Robinson Auxiliary",
                        IsHidden = false
                    },
                      new Venue
                    {
                        Id = 8,
                        VenueName = "Jackson MS",
                        IsHidden = false
                    }
                      ,
                      new Venue
                    {
                        Id = 9,
                        VenueName = "Arrowhead Park#3",
                        IsHidden = false
                    },
                      new Venue
                    {
                        Id = 10,
                        VenueName = "Mason District - Front #3",
                        IsHidden = false
                    }
                };
            Venues.ForEach(s => context.Venues.Add(s));
            context.SaveChanges();
        }
    }
}
