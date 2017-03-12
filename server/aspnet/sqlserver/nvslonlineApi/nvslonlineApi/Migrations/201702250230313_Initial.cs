namespace nvslonlineApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Divisions",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        DivisionName = c.String(),
                        IsHidden = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Schedules",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        SeasonId = c.Int(),
                        DivisionId = c.Int(),
                        VenueId = c.Int(),
                        Status = c.String(),
                        DateTime = c.DateTime(nullable: false),
                        HomeTeamId = c.Int(),
                        GoalsHomeTeam = c.Int(),
                        AwayTeamId = c.Int(),
                        GoalsAwayTeam = c.Int(),
                        IsHidden = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Teams", t => t.AwayTeamId)
                .ForeignKey("dbo.Divisions", t => t.DivisionId)
                .ForeignKey("dbo.Teams", t => t.HomeTeamId)
                .ForeignKey("dbo.Seasons", t => t.SeasonId)
                .ForeignKey("dbo.Venues", t => t.VenueId)
                .Index(t => t.SeasonId)
                .Index(t => t.DivisionId)
                .Index(t => t.VenueId)
                .Index(t => t.HomeTeamId)
                .Index(t => t.AwayTeamId);
            
            CreateTable(
                "dbo.Teams",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TeamName = c.String(),
                        IsHidden = c.Boolean(nullable: false),
                        DivisionId = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Divisions", t => t.DivisionId)
                .Index(t => t.DivisionId);
            
            CreateTable(
                "dbo.Seasons",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        SeasonName = c.String(),
                        Active = c.Boolean(nullable: false),
                        IsHidden = c.Boolean(nullable: false),
                        SeasonStart = c.DateTime(nullable: false),
                        SeasonEnd = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Venues",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        VenueName = c.String(),
                        IsHidden = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Standings",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Wins = c.Int(nullable: false),
                        Losses = c.Int(nullable: false),
                        Ties = c.Int(nullable: false),
                        Points = c.Int(nullable: false),
                        GoalsFor = c.Int(nullable: false),
                        GoalsAgainst = c.Int(nullable: false),
                        IsHidden = c.Boolean(nullable: false),
                        Divisions_Id = c.Int(),
                        Teams_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Divisions", t => t.Divisions_Id)
                .ForeignKey("dbo.Teams", t => t.Teams_Id)
                .Index(t => t.Divisions_Id)
                .Index(t => t.Teams_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Standings", "Teams_Id", "dbo.Teams");
            DropForeignKey("dbo.Standings", "Divisions_Id", "dbo.Divisions");
            DropForeignKey("dbo.Schedules", "VenueId", "dbo.Venues");
            DropForeignKey("dbo.Schedules", "SeasonId", "dbo.Seasons");
            DropForeignKey("dbo.Schedules", "HomeTeamId", "dbo.Teams");
            DropForeignKey("dbo.Schedules", "DivisionId", "dbo.Divisions");
            DropForeignKey("dbo.Schedules", "AwayTeamId", "dbo.Teams");
            DropForeignKey("dbo.Teams", "DivisionId", "dbo.Divisions");
            DropIndex("dbo.Standings", new[] { "Teams_Id" });
            DropIndex("dbo.Standings", new[] { "Divisions_Id" });
            DropIndex("dbo.Teams", new[] { "DivisionId" });
            DropIndex("dbo.Schedules", new[] { "AwayTeamId" });
            DropIndex("dbo.Schedules", new[] { "HomeTeamId" });
            DropIndex("dbo.Schedules", new[] { "VenueId" });
            DropIndex("dbo.Schedules", new[] { "DivisionId" });
            DropIndex("dbo.Schedules", new[] { "SeasonId" });
            DropTable("dbo.Standings");
            DropTable("dbo.Venues");
            DropTable("dbo.Seasons");
            DropTable("dbo.Teams");
            DropTable("dbo.Schedules");
            DropTable("dbo.Divisions");
        }
    }
}
