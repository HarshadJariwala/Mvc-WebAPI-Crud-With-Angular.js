    
app.controller('EmployeeController', function ($scope, $filter, $http, EmployeeService, $state, $stateParams, $location, uibDateParser)
{
    //WebApi URL Connection Link
    var CountryURL = 'http://localhost:33226/api/Employee/GetCountry/';
    var StateURL = 'http://localhost:33226/api/Employee/GetState/';
    var CityURL = 'http://localhost:33226/api/Employee/GetCity/';
    var GetEmployeeURL = 'http://localhost:33226/api/Employee/GetAll';
     
    $scope.hasError = false;
    $scope.Employee = {
        EmpID: 0
    };
    
    $scope.today = function () {
        $scope.BirthDate = new Date();
    };

    $scope.open2 = function () {
        $scope.popup.opened = true;
    };

    $scope.popup = {
        opened: false
    };

    $scope.ZipCodePattren = /^\d{6}$/;
    $scope.EmailPattren = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]*\.([a-z]{2,4})$/; 
    $scope.Header = "Employee Details";
    $scope.Employee.Gender = "Male";
    //$scope.Employee.BirthDate = null;
    $scope.Employee.Hobbies = [];
    
    //Age Function To Check is 18 > Age
    $scope.GetAge = function (DOB) {
            var Today = new Date();
            var BirthDate = new Date(DOB);
            var Age = Today.getFullYear() - BirthDate.getFullYear();
            var m = Today.getMonth() - BirthDate.getMonth();
            if (m < 0 || (m === 0 && Today.getDate() < BirthDate.getDate())) {
                Age--;
            }
            if (Age < 18)
                $scope.IsInvalidage = true;
            else
                $scope.IsInvalidage = false;
    }

    // Load Employee Function
    $scope.loadEmployees = function () {
        
        var EmpId = $state.params.id;
        if (EmpId != null) {
            var EmployeeRecords = EmployeeService.GetForUpdate(EmpId);
            EmployeeRecords.then(function (Response) {
                
                $scope.GetState(Response.data.CountryID);
                $scope.GetCity(Response.data.StateID);
                $scope.Employee = Response.data;
               
                $scope.Employee.Hobbies = Response.data.Hobbies.split(',');
                $scope.Employee.BirthDate = new Date( $filter('date')(Response.data.BirthDate, "yyyy-MM-dd"));
            });
        }
        
    }

    //get single record fetch in Employee table
    $scope.loadEmployees();

    //get country function
    $scope.GetCountry = function () {
        $http.get(CountryURL).then(function (Response) {
            $scope.CountryList = Response.data;
        }, function (error) {
            alert('No data Available');
        });
    }
 
    //get country function calling list
    $scope.GetCountry();

    //get state list
    $scope.GetState = function (CountryID) {

        $http.get( StateURL + CountryID).then(function (Response) {
            $scope.StateList = Response.data;
        },function (error) {
            alert('No Record Available');
        });

    }

    //get city list
    $scope.GetCity = function (StateID) {
        $http.get( CityURL + StateID).then(function (Response) {
            $scope.CityList = Response.data;
        }, function (error) {
            alert('No Record Available');
        });

    }

    //Cancel Button to List Employees
    $scope.Cancel = function () {
        $location.path('/List');
    }

    //get list function
    $scope.list = function () {
        $scope.Header = "Employee Details";
        $http.get(GetEmployeeURL).then(function (Response) {
            $scope.Employees = Response.data;
        });
    }

    //File Upload Function
    $scope.UploadFileToUrl = function (file,Id) {
        var file = $scope.myFile;
        var SaveFile = EmployeeService.UploadFileToUrl(file, Id);
        SaveFile.then(function (Response) {
            if (Response.status == 200) {
                $location.path('/List');
            }

        });
    }
   
    //Insert and Edit Employee function
    $scope.Save = function () {

        $scope.hasError = true;
        if (!$scope.myForm.$valid) {
            return;
        }

        //var ObjEmployee = angular.copy($scope.Employee);
        var ObjEmployee = $scope.Employee;
        var file = $scope.myFile;

        ObjEmployee.Hobbies = ObjEmployee.Hobbies.join(",");
        $scope.Photo = $scope.Employee.Photo;

        if (ObjEmployee.EmpID == 0)
        {
            var SaveRecords = EmployeeService.Save(ObjEmployee,file);
            SaveRecords.then(function (Response)
            {
                if (Response.status == 200)
                {
                    $scope.UploadFileToUrl(file, Response.data);
                    alert("Employee Insert Successfully");
                }
                else
                {
                    alert("Employee Not Insert SuccessfUlly");
                    $location.path('/List');
                    
                }
            },
                function (error) {
                    $location.path('/List');
                    alert("Employee Not Insert SuccessfUlly");
                });
                }else{
            
            var UpdateRecords = EmployeeService.Update(ObjEmployee);
            UpdateRecords.then(function (Response)
            {
                if (Response.status == 200)
                {
                    $scope.UploadFileToUrl(file, Response.data);
                    alert("Employee Update successfully");
                }
                else
                {
                    $location.path('/List');
                    alert("Employee Update Not successfully");
                }
            },
                function (error) {
                    $location.path('/List');
                    alert("Record Not Update");
                });
        }
    }
});


