using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;

namespace WebApi.Models
{
    public class Employee
    {
        [Key]
        public int EmpID { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        public string Gender { get; set; }

        public string Email { get; set; }

        public bool MarialStatus { get; set; }

        public DateTime BirthDate { get; set; }

        public string Hobbies { get; set; }

        public string Photo { get; set; }

        public decimal Salary { get; set; }

        public string Address { get; set; }

        public string Zipcode { get; set; }

        public string Password { get; set; }

        public DateTime Created { get; set; }



        [ForeignKey("Country")]
        public int? CountryID { get; set; }
        public virtual Country Country { get; set; }


        [ForeignKey("City")]
        public int? CityID { get; set; }
        public virtual City City { get; set; }


        [ForeignKey("State")]
        public int? StateID { get; set; }
        public virtual State State { get; set; }
    }
}