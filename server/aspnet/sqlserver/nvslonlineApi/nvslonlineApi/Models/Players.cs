using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace nvslonlineApi.Models
{
    public class Players
    {
        public int Id { get; set; }        
        public string FirstName {get; set; }
        public string LastName {get; set; }
        public bool IsHidden {get; set;}
        [ForeignKey("Teams")]
        public int? TeamId { get; set; }
        public Teams Teams { get; set; }        
    }
}