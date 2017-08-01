
angular.module('routerApp').controller('MainController', function($rootScope, $scope, $http, $location, databaseInfo, fileUpload, changeImageLocation) {
	



	$scope.saveImg = function(title, src, target, dimension){ //Creates new image, and add's it into localStorage. 
		//uploadFile();	
		var targets = target + 's';
		downloadURI(src, title, target); //Download image if on correct device.
		var src = src.replace(window.location.origin+'/', '');
		if(!JSON.parse(localStorage.getItem(targets))){ //If I drag it into a target that hasn't been loaded yet, I need to load it.  There's a better solution then this. 
			var arr = loadAll(targets)
		} else {
			var arr = JSON.parse(localStorage.getItem(targets))
		}
		var dimension;
		var img = new Image();	
		img.src = src;

		if(img.height > img.width){ 
			dimension='taller';//image is taller 
		}else{ 
			dimension='fatter';//image is fatter 
		} 

		arr.push({
			'title':title,
			'src':src,
			'created':Date.now(),
			'class':dimension
		})
		localStorage.setItem(targets, JSON.stringify(arr))
		//$rootScope.$broadcast(targets);
		//$scope.$apply() //Make images refresh witout manually refreshing. 
		changeMenuBack()
		function cast(callback){ //Used a callback so that $scope.$apply() came after the broadcast. 
			$rootScope.$broadcast(targets);	
			callback()
		}
		cast(function(){ $scope.$apply()})//Make images refresh witout manually refreshing. 					
	}




	function downloadURI(uri, name, target) {
		if(target == 'mobile' && /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
			downloadImg(uri, name, target)	
		}else if(target == 'tablet' && /iPad/i.test(navigator.userAgent)) 
			downloadImg(uri, name, target)
		else if(target == 'desktop'){
			downloadImg(uri, name, target)		
		}else {return} 
	}

	function downloadImg(uri, name, target){
		var link = document.createElement("a");
		link.download = name;
		link.href = uri;
		link.click();
	}	


	function moveImage(img){  //Update Image location since it's already on the server. 
		console.log('Already on server theoretically - Collection.update({_id:'+currentEvent.target.id+'},{etc...');
		var url = "/phonyURL"; 
		changeImageLocation.updateImageLocation(img, url)			
	};

	function uploadFile(file){
		console.log('Collection.insert({name:'+file.name+'},{etc...');
		console.log(file)			
	        var uploadUrl = "/phonyURL";
		fileUpload.uploadFileToUrl(file, uploadUrl);
	};



	var currentEvent; //This global variable stores the current event, for deleting image.  Certainly there's a better way.  
	function dragAndDrop(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		var imageUrl = event.dataTransfer.getData('URL');
		var target = evt.target.id; 
		//evt.dataTransfer.title = title; //attach title to obj. 
		var title = '';
		var files = evt.dataTransfer.files; // FileList object.
		

		if(imageUrl.length > 0){ //See if the dragAndDrop happened from  the website  
			var src = imageUrl.replace(window.location.origin+'/', ''); 
			$scope.saveImg(title, imageUrl, target);
			var key = $location.$$path.slice(1)+'s'
			deleteImg(key, currentEvent);
			moveImage(currentEvent.target.id)


		} else { //The dragAndDrop happened from the desktop;    
			var output = [];
			for (var i = 0, f; f = files[i]; i++) {

				//var title = prompt("Would you like to name this pic?")
				//if (title.length < 1){title = 'untitled'}
				uploadFile(files[i])
				// Only process image files.
				if (!f.type.match('image.*')) {
					continue;
				}
				
				var reader = new FileReader();

				// Closure to capture the file information.
				reader.onload = (function(theFile) {

					return function(e) {
						$scope.saveImg(title, e.target.result, target);
						var data = [title, e.target.result, target];
					};
				})(f);

				// Read in the image file as a data URL.
				reader.readAsDataURL(f);

				output.push('<strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
				  f.size, ' bytes, last modified: ',
				  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a');
				  
			}
			//document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
			document.getElementById('instructions').innerHTML =  '<p>You last added ' + output.join('') + ' to '+target+'</p>';
				
		}	
	}

	function loadAll(targets){
		databaseInfo.getInfo().then( //Inserts JSON into localStorage.  Each controller takes the data from localStorage and adds it into it's $scope.  
		function(data){
			console.log(data);
			localStorage.setItem('desktops', JSON.stringify(data[0].desktops))
			localStorage.setItem('mobiles', JSON.stringify(data[1].mobiles))
			localStorage.setItem('tablets', JSON.stringify(data[2].tablets))
		}).then(function(){
			return JSON.parse(localStorage.getItem(targets))
		})	
	}



	function handleDragOver(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.	
	}

/*
	function onDragStart(){
		var format = "Text";
		var title = 'niko';
		evt.dataTransfer.setData(format,title); 
	}
*/


	// Setup the dnd listeners.
	var desktop = document.getElementById('desktop');
	desktop.addEventListener('dragover', handleDragOver, false);
	desktop.addEventListener('drop', dragAndDrop, false);

	var mobile = document.getElementById('mobile');
	mobile.addEventListener('dragover', handleDragOver, false);
	mobile.addEventListener('drop', dragAndDrop, false);

	var tablet = document.getElementById('tablet');
	tablet.addEventListener('dragover', handleDragOver, false);
	tablet.addEventListener('drop', dragAndDrop, false);


	

	 
	var take_a_drag = true; //Sry for the global, but don't_be_a_drag
	document.addEventListener('dragover', function(e){ //Change menu styles when something is being dragged over.  
		if(take_a_drag == true){ 
			changeMenu();
			currentEvent = e; 
			take_a_drag = false
			return;
		}
	});
	function changeMenu(){
		document.getElementById('menu').classList.add('drop_zone');
		document.getElementById('trashcan').classList.remove('footer');
		
		scrollTo(document.body, 0, 350); //Scroll to Top 
		
	}
	function changeMenuBack(){
		take_a_drag = true;
		document.getElementById('menu').classList.remove('drop_zone');
		document.getElementById('trashcan').classList.add('footer');
		
	}

	function scrollTo(element, to, duration) {
		if (duration <= 0) return;
		var difference = to - element.scrollTop;
		var perTick = difference / duration * 10;

		setTimeout(function() {
			element.scrollTop = element.scrollTop + perTick;
			if (element.scrollTop == to) return;
			scrollTo(element, to, duration - 10);
		}, 10);
	}


	function deleteImg(key, e) { //DELETE image functionality
				var arr = JSON.parse(localStorage.getItem(key)) //Get local items 
				for(var a=0; a<arr.length; a++){ //loop through them 
					//var path = e.target.src.replace(window.location.origin+'/', '');					
					if(arr[a].created == parseInt(e.target.id)){ //if the unique id (Date.now()) of the one being dragged then splice it. 
						arr.splice(a,1); //delete item 
						localStorage.setItem(key, JSON.stringify(arr)) //replace local items with one less item 
						
						break;
					}
				}
			function cast(callback){ //Used a callback so that $scope.$apply() came after the broadcast. 
				$rootScope.$broadcast(key);	
				callback()
			}
			cast(function(){ $scope.$apply()})//Make images refresh witout manually refreshing. 		
				
	} 


	document.addEventListener('dragend', function(e){ //DELETE image functionality, by dragging off page or over trash.  
		changeMenuBack();
		var top = e.pageY;
		var right = document.body.clientWidth - e.pageX;
		var bottom = document.body.clientHeight - e.pageY;
		var left = e.pageX;
		var trash = document.getElementById("trash");
		var rect = trash.getBoundingClientRect();
		var menu = document.getElementById("menu");
		var menu_rect = menu.getBoundingClientRect();
		var inTrash = false; 
		if(rect.top - top < 0 && rect.left - left < 0 && (rect.left - left) + (rect.right - rect.left) > 0){ //The image was dragged over the trashcan
			inTrash = true;
		}	
		
		if(top < 0 || right < 0 || bottom < 0 || left < 0 || inTrash===true){
			console.log('Mouse has moved out of window');
			if (e.target !== e.currentTarget) {
				var clickedItem = e.target.id;
				var key = $location.$$path.slice(1)+'s'	
				deleteImg(key, e); 
			}
			e.stopPropagation();
		}
			
	});




})
