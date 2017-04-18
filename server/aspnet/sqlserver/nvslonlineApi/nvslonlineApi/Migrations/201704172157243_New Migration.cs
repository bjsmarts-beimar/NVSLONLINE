namespace nvslonlineApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class NewMigration : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Seasons", "SeasonStart", c => c.DateTime());
            AlterColumn("dbo.Seasons", "SeasonEnd", c => c.DateTime());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Seasons", "SeasonEnd", c => c.DateTime(nullable: false));
            AlterColumn("dbo.Seasons", "SeasonStart", c => c.DateTime(nullable: false));
        }
    }
}
