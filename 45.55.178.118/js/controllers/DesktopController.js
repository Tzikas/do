angular.module('routerApp').controller("desktopController", function($scope, $timeout, databaseInfo) {


	if(!JSON.parse(localStorage.getItem('desktops'))){ //Load items if not already in local storage
		$scope.loading = true; //Load Spinner 
		$timeout(function(){ //To show the spinner 
		databaseInfo.getInfo()
			.then( 
			function ( data ) {
				localStorage.setItem('desktops', JSON.stringify(data[0].desktops))
				$scope.desktops = JSON.parse(localStorage.getItem('desktops'))	
				return 'Illustrating' 
			}, function ( err ) {// Handle the error somehow
				console.log('There was an error finding some images'+err);	
			})
			.then(function(str){
				return str + ' chaining '
			})
			.then(function(str){
				return console.log(str + ' callbacks!') //
			})
			.finally(function() {// Called no matter success or failure
				$scope.loading = false; //Stop Spinner
			        console.log('Finished at:', new Date())	
			});
		}, 2000);
	}else{ //Items are already in local storage so no need to load them again. 
		$scope.desktops = JSON.parse(localStorage.getItem('desktops'))	
	}

	$scope.$on('desktops', function(event, args) {  //Receives broadcast
		$scope.desktops = JSON.parse(localStorage.getItem('desktops'))
	});

	var wait = !JSON.parse(localStorage.getItem('desktops')) ? 2200 : 100;  //Fixes first load zoom bug 

	$timeout(function(){ //For the zoom effect to work properly 

		$scope.set_ratio = function (it) { //Find ratio and return style so that it can be used for zoom effect. 
			var img = new Image();	
			img.src = it.desktop.src;	
			if(img.height>img.width){
				var h = 300*(img.height/img.width)+'px'		
				return {
					"height": h
				}	
			}else{
				var w = 300*(img.width/img.height)+'px'		
				return {
					"width":w 
				}		
			}
		}
	}, wait)


	$scope.fat_or_tall = function(it){ //Find ratio and return style so that it can be used for zoom effect. 
		var img = new Image();	
		img.src = it.desktop.src;		
		if(img.height>img.width){
			return "taller"
		}else{	
			return "fatter"	
		}
	}
})


