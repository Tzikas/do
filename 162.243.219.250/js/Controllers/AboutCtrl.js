/**
 * Created by Maikel Rivero Dorta mriverodorta@gmail.com on 7/08/14.
 */
"use strict";
angular.module('AngStarter')
.controller('AboutCtrl', ['$scope', function ($scope) {
	$scope.$parent.selectedTab = 'about'


	$scope.names = [
		'Merlot',
		'Chardo',
		'Pinot',
		'Noir',
		'Jani',
		'Carl',
		'Margareth',
		'Hege',
		'Joe',
		'Gustav',
		'Birgit',
		'Mary',
		'Kaid',
		'Gustavs',
		'Birgitf',
		'Marys',
		'Kaiz',
		'Red',
		'White'
	];



	$scope.images = [
		'img/3.png',
		'img/2.png',
		'img/1.png'
	];



}])
