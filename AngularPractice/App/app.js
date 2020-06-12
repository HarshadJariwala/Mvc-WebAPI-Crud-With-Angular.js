var app = angular.module('myApp', ['ui.router', 'ui.grid', 'ui.grid.pagination', 'ui.grid.edit', 'ui.grid.autoResize', 'ui.grid.resizeColumns', 'ui.grid.moveColumns', 'ui.grid.exporter', 'ui.bootstrap']);

app.config(['$stateProvider','$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/Login');

    $stateProvider
        .state('EmployeeLogin',
            {
                url:'/Login',
                templateUrl:'/App/View/Login.html'
            }).state('EmployeeList',
            {
                url:'/List',
                templateUrl:'/App/View/EmployeeList.html'
            }).state('EmployeeInsert',
            {
                url:'/Insert',
                templateUrl:'/App/View/Index.html'
            }).state('EmployeeUpdate',
            {
                url: '/Edit/:id',
                templateUrl: '/App/View/Index.html'
            })
}]);

//app.config(function ($httpProvider) {
//    $httpProvider.interceptors = [];
//    $httpProvider.interceptors.push(function () {
//        return {
//            response: function (res) {

//                var old_response = res.businesses,
//                    new_response = [];


//                for (var i = 0; i < old_response.length; i++) {

//                    var obj = old_response[i],

//                        new_obj = {
//                            restaurant_name: obj.name,
//                            phone_number: obj.display_phone,
//                            yelp_rating: obj.rating,
//                            reservation_url: obj.reservation_url
//                        };

//                    new_response.push(new_obj);
//                }

//                return { data: new_response };
//            }
//        }
//    });
//});

//app.factory('AuthInterceptor', ['$log', '$state', '$q', function ($log, $state, $q) {
//    $log.debug('$log is here to show you that this is a regular factory with injection');

//    var authInterceptor = {
//        request: function (config) {
//            var token = localStorage.getItem('token');
//            if (token == null || token == "undefined") {
//                //$state.go("login");
//            }
//            else {
//                config.headers["Authorization"] = "Basic " + token;
//            }
//            return config;
//        },

//        requestError: function (config) {
//            //$state.go("login");
//            return config;
//        },

//        response: function (res) {
//            return res;
//        },

//        responseError: function (res) {
//            if (res.status == "401") {
//                $state.go("Login");
//            }
//            if (res.status == "400") {
//                window.location = "/App/View/Login.html";
//            }
//            if (res.status == "403") {
//                $state.go("Login");
//            }
//            if (res.status == "404") {
//                $state.go("Login");
//            }
//            $q.reject(res)
//            return res;
//        }
//    };

//    return authInterceptor;
//}]);

