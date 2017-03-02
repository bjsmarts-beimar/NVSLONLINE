using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace nvslonlineApi.Models
{
    public class Teams
    {
        public int Id { get; set; }
        public string TeamName { get; set; }
        public bool IsHidden { get; set; }        
        [ForeignKey("Division")]
        public int? DivisionId { get; set; }
        public Division Division { get; set; }
    }
}