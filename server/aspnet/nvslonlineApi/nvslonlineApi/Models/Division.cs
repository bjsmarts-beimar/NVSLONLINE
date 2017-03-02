using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace nvslonlineApi.Models
{
    public class Division
    {
        public int Id { get; set; }

        public string DivisionName { get; set; }

        public bool IsHidden { get; set; }
    }
}