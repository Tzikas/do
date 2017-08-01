var myApp = angular.module('routerApp');

/*
myApp.directive('fileModel', ['$parse', function ($parse) {
	return {
		restrict: 'A',
	link: function(scope, element, attrs) {
		var model = $parse(attrs.fileModel);
		var modelSetter = model.assign;

		element.bind('change', function(){
			scope.$apply(function(){
				modelSetter(scope, element[0].files[0]);
			});
		});
	}
	};
}]);*/

myApp.service('fileUpload', ['$http', function ($http) {
	this.uploadFileToUrl = function(file, uploadUrl){
		var fd = new FormData();
		fd.append('file', file);
		$http.post(uploadUrl, fd, {
			transformRequest: angular.identity,
			headers: {'Content-Type': undefined}
		})
		.success(function(){
			console.log('succuess whoa! ');
		})
		.error(function(){
			console.log('No!!! Theres no DB :(')
		});
	}
}]);
myApp.service('changeImageLocation', ['$http', function ($http) {
	this.updateImageLocation = function(url){
		$http.post(url)
		.success(function(){
			console.log('succuess whoa! ');
		})
		.error(function(){
			console.log('Cannot find database :(')
		});
	}
}]);


/*
   myApp.controller('myCtrl', ['$scope', 'fileUpload', function($scope, fileUpload){

   $scope.uploadFile = function(){
   var file = $scope.myFile;
   console.log('file is ' );
   console.dir(file);
   var uploadUrl = "/fileUpload";
   fileUpload.uploadFileToUrl(file, uploadUrl);
   };

   }]);
   */
