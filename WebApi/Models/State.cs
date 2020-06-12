using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Common;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Models
{
    public class State
    {
        [Key]
        public int StateID { get; set; }

        public string StateName { get; set; }

        [ForeignKey("Country")]
        public int? CountryID { get; set; }
        public virtual Country Country { get; set; }
    }
}