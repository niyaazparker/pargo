// angular.module('LocationDataController', function($scope, $http) {
//     cities = []
// });



angular.module('LocationDataController', [])
.factory('LocationFactory', [function(){
	return{
		getContent: function(){
			var cities = [];
			return cities;
		}
	};
}])
// cities = [];