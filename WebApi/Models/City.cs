using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Models
{
    public class City
    {

        [Key]
        public int CityID { get; set; }

        public string CityName { get; set; }

        [ForeignKey("State")]
        public int? StateID { get; set; }
        public virtual State State { get; set; }

    }
}