angular.module('AngStarter')
.controller('HttpCtrl', ['$scope', function ($scope) {

	$.get("http://www.w3schools.com/angular/customers_mysql.php").then(function (response) {
		console.log(response)
		console.log(JSON.parse(response).records);
		var records = JSON.parse(response).records
		$scope.$apply(function() {  
			$scope.records = records;
		});
		
				
		}
		
	);

	$scope.orderByMe = function(x) {
		$scope.myOrderBy = x;
		console.log(x);
		console.log($scope);
		
	}	
}])


