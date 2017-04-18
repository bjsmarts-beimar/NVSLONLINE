using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace nvslonlineApi.Models
{
    public class News
    {
        public int Id { get; set; }

        public string title { get; set; }

        public string description { get; set; }

        public bool IsHidden { get; set; }

        public DateTime? created { get; set; }

        public string modifiedBy { get; set; }

        public string modifiedByfullName { get; set; }

        public DateTime? modified { get; set; }
    }
}