/**
 * Created by Maikel Rivero Dorta mriverodorta@gmail.com on 7/08/14.
 */
'use strict';
angular.module('AngStarter')
    .config(['$routeProvider', function($routeProvider) {
        var view = function(view) {
            return 'partials/' + view.split('.').join('/') + '.html';
        }
        $routeProvider
        .otherwise({redirectTo: '/'})
        .when('/', {templateUrl: view('home'), controller: 'HomeCtrl'})
        .when('/about', {templateUrl: view('about'), controller: 'AboutCtrl'})
        .when('/contact', {templateUrl: view('contact'), controller: 'ContactCtrl'})
        .when('/sql', {templateUrl: view('sql'), controller: 'SqlCtrl'})	    
        .when('/art', {templateUrl: view('art'), controller: 'ArtCtrl'})	    	    
        .when('/http', {templateUrl: view('http'), controller: 'HttpCtrl'})	    	    
        .when('/unautorized', {template: 'The server respond 401 Unautorized.'})
        ;
    }]);
