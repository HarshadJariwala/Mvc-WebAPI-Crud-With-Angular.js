using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;

namespace WebApi.ViewModels
{
    public class EmployeeDTO
    {
        public int EmpID { get; set; }

        public string FirstName { get; set; }

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

    }
}