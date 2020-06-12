app.service('EmployeeService', function ($http, $location) {

    var SaveURL = 'http://localhost:33226/api/Employee/Save';
    var LoginURL = 'http://localhost:33226/api/Employee/Login';
    var UploadFileURL = 'http://localhost:33226/api/Employee/UploadFile/';
    var UpdateURL = 'http://localhost:33226/api/Employee/Put/';
    var GetAllEmployeeURL = 'http://localhost:33226/api/Employee/GetList';
    var GetSingleEmpURL = 'http://localhost:33226/api/EmployeeApi/Get?id=';
    var DeleteURL = 'http://localhost:33226/api/Employee/Delete/';

    this.Save = function (ObjEmployee) {
        var request = $http({
            method: 'POST',
            url: SaveURL,
            data: ObjEmployee
        });
        return request;
    }

    this.Delete = function (Id) {
        var request = $http({
            method: 'Delete',
            url: DeleteURL + Id,
        });
        return request;
    }

    this.login = function (ObjStudent) {
        var request = $http({
            method: 'POST',
            url: LoginURL,
            data: ObjStudent
        });
        return request;
    }

    this.UploadFileToUrl = function (file,Id) {
        return $http({
            method: 'POST',
            url: UploadFileURL + Id,
            headers: { 'Content-Type': undefined },
            transformRequest: function (data) {
                var formData = new FormData();
                formData.append('model', angular.toJson(data.model));
                formData.append('file1', data.files);
                return formData;
            }, data: {files: file }
        })
    }  

    this.Update = function (Employee) {
        var UpdateRequest = $http({
            method: 'Put',
            url: UpdateURL,
            data: Employee
        });
        return UpdateRequest;
    }

    this.GetAllEmployees = function () {
       var token = this.GetToken();
        var Request = $http({
            method: 'Get',
            headers: {
                'Authorization': token
            },
            url: GetAllEmployeeURL
        });
        return Request;
    }
    
    this.GetForUpdate = function (id) {
        return $http.get(GetSingleEmpURL + id);
    }

    this.GetToken = function () {
        
        var Token = localStorage.getItem('token');
        if (Token == null) {
            $location.path('/Login');
        }
        return Token;

    }

});

