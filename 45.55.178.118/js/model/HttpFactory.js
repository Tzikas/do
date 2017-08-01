// A service to get the JSON file.
angular.module('routerApp')
.factory('databaseInfo', function($http, $q) {
	return {
		getInfo: function() {
			var deferred = $q.defer();
			$http.get('js/model/phonyDB.json').success(function(data) {
				console.log('successfully found json');
				deferred.resolve(data);
			}).error(function(err) {
				console.log("didn't find JSON")
				deferred.reject();
			});
			return deferred.promise;
		}
	}
});
