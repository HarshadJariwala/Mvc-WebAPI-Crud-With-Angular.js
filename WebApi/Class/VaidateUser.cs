using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApi.Models;

namespace WebApi.Class
{
    public class VaidateUser
    {
        public static bool Login(string username, string password)
        {
            using (DetailsContext entities = new DetailsContext())
            {
                return entities.Students.Any(user => user.FirstName.Equals(username, StringComparison.OrdinalIgnoreCase)
                                          && user.Password == password);
            }


        }
    }
}