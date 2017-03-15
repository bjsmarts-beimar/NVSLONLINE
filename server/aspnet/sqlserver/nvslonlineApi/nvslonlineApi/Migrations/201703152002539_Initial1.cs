namespace nvslonlineApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Teams", "SeasonId", c => c.Int());
            CreateIndex("dbo.Teams", "SeasonId");
            AddForeignKey("dbo.Teams", "SeasonId", "dbo.Seasons", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Teams", "SeasonId", "dbo.Seasons");
            DropIndex("dbo.Teams", new[] { "SeasonId" });
            DropColumn("dbo.Teams", "SeasonId");
        }
    }
}
