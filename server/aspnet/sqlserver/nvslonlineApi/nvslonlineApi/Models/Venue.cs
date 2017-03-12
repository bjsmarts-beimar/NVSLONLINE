using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace nvslonlineApi.Models
{
    public class Venue
    {
        public int Id { get; set; }

        public string VenueName { get; set; }

        public bool IsHidden { get; set; }
    }
}