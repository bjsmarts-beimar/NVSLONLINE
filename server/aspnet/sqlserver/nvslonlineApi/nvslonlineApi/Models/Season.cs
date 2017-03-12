using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace nvslonlineApi.Models
{
    public class Season
    {
        public int Id { get; set; }

        public string SeasonName { get; set; }

        public bool Active { get; set; }

        public bool IsHidden { get; set; }

        public DateTime SeasonStart { get; set; }

        public DateTime SeasonEnd { get; set; }
    }
}