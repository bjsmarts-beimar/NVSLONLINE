using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace nvslonlineApi.Models
{
    
    public enum subject
    {
        general,
        advertise,
        playerSuspension,
        suggestions,
        other
    }


    public class Contacts
    {
        public int Id { get; set; }

        public string yourName { get; set; }

        public string email { get; set; }

        public string message { get; set; }

        public bool IsHidden { get; set; }

        public subject requestSubject { get; set; }

        public DateTime? created { get; set; }

        public string modifiedBy { get; set; }

        public string modifiedByfullName { get; set; }

        public DateTime? modified { get; set; }
    }
}