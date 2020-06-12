using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Net.Http;
using System.Web.Http;
using System.Data.Entity;
using WebApi.Models;
using System.IO;
using System.Web.Http.Cors;
using System.Collections.Specialized;
using System.Net.Http.Formatting;
using System.Collections;
using System.Dynamic;
using Newtonsoft.Json;
using System.Threading;
using System.Text;
using System.Security.Principal;
using WebApi.ViewModels;
using AutoMapper;


namespace WebApi.Controllers
{
    [EnableCors(origins: "http://localhost:8091", headers: "*", methods: "*")]
    [RoutePrefix("api/Employee")]
    public class EmployeeApiController : ApiController
    {
        DetailsContext dc = new DetailsContext();

        [HttpGet]
        [Route("GetList")]
        public List<EmployeeDTO> MapperView()
        {
            var userList = dc.Employees.ToList();
            var userModel = Mapper.Map <List<Employee>, List< EmployeeDTO >> (userList);
            return userModel;
        }

        [HttpGet]
        [Route("GetAll")]
       // [BasicAuthentication]
        public List<Employee> GetList()
        {
            return dc.Employees.ToList();
        }

       // [BasicAuthentication]
        public Employee Get(int Id)
        { 
            return dc.Employees.Find(Id);
        }

        [HttpPost]
        [Route("Login")]
       // [AllowAnonymous]
        public HttpResponseMessage Login(Student Std)
        {
            try
            {
                Tokendata tokendata = new Tokendata();

                var qry = dc.Students.Where(x => x.FirstName == Std.FirstName && x.Password == Std.Password);
                if (qry.ToList().Count == 1)
                {
                    tokendata.Token = Convert.ToBase64String(Encoding.UTF8.GetBytes(string.Join(":", Std.FirstName, Std.Password)));
                    
                    return Request.CreateResponse(HttpStatusCode.OK, tokendata);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "login Not Success");
                }
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "UserName and PassWord not Exits");
            }

        }


        [HttpPost]
        [Route("Save")]
       // [BasicAuthentication]
        public HttpResponseMessage Save(Employee Emp)
        {
            try
            {   
                if (ModelState.IsValid)
                {
                    //dynamic result = new ExpandoObject();
                    Emp.Created = DateTime.Now;
                    dc.Employees.Add(Emp);
                    dc.SaveChanges();
                   // result.Message = "successfully insert";
                    //result.Id = Emp.EmpID;

                    return Request.CreateResponse(HttpStatusCode.OK, Emp.EmpID);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "Record Not Inserted");
                }
               
            }
            catch(Exception)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Record Not Inserted");

            }
        }

        [HttpPost]
        [Route("UploadFile/{id}")]
       // [BasicAuthentication]
        public HttpResponseMessage UploadFile(int Id)
        {
            try
            {
                string UrlPath = "http://localhost:33226/Uploads/";
                var file = HttpContext.Current.Request.Files.Count > 0 ?
                    HttpContext.Current.Request.Files[0] : null;

                    if (file != null && file.ContentLength > 0)
                    {
                        var fileName = Path.GetFileName(file.FileName);

                    var path = Path.Combine(
                        HttpContext.Current.Server.MapPath("~/Uploads"),fileName
                        );
                      file.SaveAs(path);
                      var filename = Path.GetFileName(path);
                        

                        var qry = dc.Employees.Find(Id);
                        qry.Photo = UrlPath + filename;
                        dc.SaveChanges();
                    }
                    return Request.CreateResponse(HttpStatusCode.OK, "insert successfully");
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Record Not Inserted");
            }
        }

        [HttpPut]
        [Route("Put")]
       // [BasicAuthentication]
        public HttpResponseMessage Put(Employee employee)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    //dynamic result = new ExpandoObject();
                    employee.Created = DateTime.Now;
                    employee.Country = null;
                    employee.State = null;
                    employee.City = null;
                    dc.Entry(employee).State = EntityState.Modified;
                    dc.SaveChanges();
                   // result.Message = "Update successfully";
                   // result.Id = employee.EmpID;
                    return Request.CreateResponse(HttpStatusCode.OK, employee.EmpID);
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Record Not Updated");
                }
            }
            catch(Exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Record Not Updated");

            }
        }

        [HttpDelete]
        [Route("Delete/{id}")]
       /*[BasicAuthentication]*/
        public HttpResponseMessage GetDelete(int id)
        {
            try
            {
                Employee Emp = dc.Employees.Find(id);
                if (Emp == null)
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "Record Not Delete");
                }
                dc.Employees.Remove(Emp);
                dc.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, "Delete Successfully");
            }
            catch(Exception)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Record Not Delete");
            }
        }

        [Route("GetCountry")]
        public IEnumerable GetCountry()
        {
            var getCountry = dc.Countrys.ToList();
            return getCountry;
        }

        [Route("GetState/{id}")]
        public IEnumerable GetState(int Id)
        {
            var getState = dc.States.Where(c => c.CountryID == Id).ToList();
            return getState;
        }

        [Route("GetCity/{id}")]
        public IEnumerable GetCity(int id)
        {
            var getCity = dc.Citys.Where(c => c.StateID == id).ToList();
            return getCity;

        }

    }
}
