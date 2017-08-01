var routerApp = angular.module('routerApp', ['ui.router'])
routerApp.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/desktop');

	$stateProvider

	.state('desktop', {
		url: '/desktop',
		views: {
			'': { 
				templateUrl: 'views/desktop.html',
				controller: 'desktopController'	
			}
		}
	})

	.state('mobile', {
		url: '/mobile',
		views: {
			'': { 
				templateUrl: 'views/mobile.html',
				controller: 'mobileController'
		       	}
		}
	})

	.state('tablet', {
		url: '/tablet',
		views: {
			'': { 
				templateUrl: 'views/tablet.html',
				controller: 'tabletController'
		       	}
		}
	});

});


