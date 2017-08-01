'use strict';
angular.module('AngStarter')
    .config(['$httpProvider', function($httpProvider) {

        /**
         * Configure the $httpProvider here
         */

	//$.get("http://www.w3schools.com/angular/customers_mysql.php")
        //.then(function (response) {$scope.names = response.data.records;});

        
        // Push the Request and Response Interceptor here
        // $httpProvider.interceptors.push('RequestInterceptor');
        // $httpProvider.interceptors.push('ResponseInterceptor');
    }])
