app.controller('LoginController', function ($scope, $location, EmployeeService)
{

    $scope.Header = " Student Login ";
    $scope.hasError = false;
    $scope.DispalyDate = moment().format('MMMM Do YYYY, h:mm:ss a');

    //login user
    $scope.login = function ()
    {
        $scope.hasError = true;
        if (!$scope.myForm.$valid) {
            return;
        }

        //var ObjStudent = angular.copy($scope.Student);
        var ObjStudent = $scope.Student;
        var loginRecord = EmployeeService.login(ObjStudent);

        loginRecord.then(function (Response)
        {
            if (Response.status == 200)
            {
                var CheckToken = 'Basic ' + Response.data.Token;
                localStorage.setItem('token', CheckToken);
                $location.path('/List');
                alert("Login successfully");
            }
            else
            {
                $location.path('/Login');
                alert("Login error");
            }
        },
            function (error)
            {
                $location.path('/Login');
                alert("UserName and password Not Exits");
            });
    }
    

    

}); 