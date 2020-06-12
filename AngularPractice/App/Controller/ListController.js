
app.controller('ListController', ['$scope', '$http', '$state', '$location', 'EmployeeService', function ($scope, $http, $state, $location, EmployeeService) {

    $scope.Employee = {};
    //LogOut Button Click to calling function
    $scope.logout = function () {
        localStorage.removeItem('token');
        $location.path('/Login');
    }

    //list function
    $scope.Employeelist = function () {
        var Token = EmployeeService.GetToken();
        if (Token == null)
            return alert('Unauthorized User Please Login Account!');

        $scope.Header = "Employee Details";
        var list = EmployeeService.GetAllEmployees();
        list.then(function (Response) {
            if (Response.status == 200) {
                $scope.gridData = Response.data;
                //$scope.Employees = [];
                //var employee = _.find(Response.data, function (objEmployee) {
                //    return objEmployee.EmpID == 18;
                //});
                //$scope.Employees.push(employee);
            }
        });
    }

    $scope.GridOptions = {
        data: 'gridData',
        enableFiltering: true,
        enableColumnResizing: true,
        columnDefs: [{
            field: "Action",
            SourceFieldDataType: "Text",
            cellTemplate: "<i class= 'glyphicon glyphicon-edit' ng-click='grid.appScope.GetForUpdate(row.entity.EmpID)' id = '#Edit'>&nbsp;</i><i class= 'glyphicon glyphicon-trash' ng-click='grid.appScope.DeleteRecord(row.entity.EmpID)' id = '#Delete'></i>",
            width: 60,enableFiltering: false,enableCellEdit: false
        },
            { field: 'FirstName', enableCellEdit: false, width: 150},
            { field: 'LastName', enableCellEdit: false, width: 150 },
            { field: 'Gender', enableCellEdit: false, width: 150},
            { field: 'BirthDate', enableFiltering: false, width: 150,
              cellTemplate: "<div> {{row.entity.BirthDate |  date : 'yyyy/MM/dd'}} </div>"},
            { field: 'Address', enableFiltering: false, width: 250 },
            { field: 'Salary', enableCellEdit: false, width: 150 },
            { field: 'Zipcode', enableCellEdit: false, width: 150 },
            { field: 'Hobbies', enableFiltering: true, width: 250 },
            { field: 'MarialStatus', enableFiltering: true, width: 150 },
            { field: 'Photo', enableFiltering: false, width: 75,
              cellTemplate: "<img height='50' width='50' ng-src='{{row.entity.Photo}}'>"
            }],
            paginationPageSizes: [5, 10, 15],
            paginationPageSize: 5,

            enableGridMenu: true,
            enableSelectAll: true,
            exporterCsvFilename: 'EmployeeData.csv',
            exporterPdfDefaultStyle: { fontSize: 9 },
            exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
            exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
            exporterPdfHeader: { text: "My Header", style: 'headerStyle' },
            exporterPdfFooter: function (currentPage, pageCount) {
                return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
            },
            exporterPdfCustomFormatter: function (docDefinition) {
                docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
                docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
                return docDefinition;
            },
            exporterPdfOrientation: 'portrait',
            exporterPdfPageSize: 'LETTER',
            exporterPdfMaxGridWidth: 500,
            exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
        exporterExcelFilename: 'EmployeeData.xlsx',
            exporterExcelSheetName: 'Sheet1',

            onRegisterApi: function (gridApi) {
            $scope.gridApiData = gridApi;
        }
    };

    //get list function calling
    $scope.Employeelist();
        
    //delete function with conformation Message box
    $scope.DeleteRecord = function (Id) {
        var isConfirm = confirm('Are you sure you want to delete?');
        if (isConfirm)
        {
            var DeleteData = EmployeeService.Delete(Id);
            DeleteData.then(function (Response){
                if (Response.status == 200) {
                    alert("Delete Successfully");
                    $scope.Employeelist();
                }
            }, function myError(Response)
                {
                 $scope.error = "An error has occurred while deleting employee! " + Response;
                });
        }
        
    }; 
        
    $scope.GetForUpdate = function (id) {
        $state.go('EmployeeUpdate', {
            id: id
        });
    }	

}]); 
