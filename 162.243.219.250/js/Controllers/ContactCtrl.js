/**
 * Created by Maikel Rivero Dorta mriverodorta@gmail.com on 7/08/14.
 */
"use strict";
angular.module('AngStarter')
    .controller('ContactCtrl', ['$scope', function ($scope) {
        //$scope = true;
	console.log($scope);
	//console.log($scope.$parent.selectedTab);
	//
	$scope.$parent.selectedTab = 'contact'

    }])
