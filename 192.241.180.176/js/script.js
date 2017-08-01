console.log('script js')
var HEIGHT = window.innerHeight;
var lastOffset = HEIGHT; 
var lastDate = new Date().getTime();
var firstTime = true; 
var shopClicked = false;

var debugInput = document.querySelector("input");
function updateDebugState() {
	document.body.classList.toggle('debug-on', debugInput.checked);
}
debugInput.addEventListener("click", updateDebugState);
updateDebugState();


function scrolly(i){
	$(".parallax").animate({scrollTop: HEIGHT*i}, 777, function(){})
		if(i==6){
			shopClicked = true;
			console.log(shopClicked);

			setTimeout(function(){
				shopClicked = false;
				console.log(shopClicked);
			},777)
		}
}


$('#music').click(function(){
	//document.getElementById('audioElement').play();
})


var previousHeight = 0; 

$(".parallax").scroll(function(e) {
	var height = $(".parallax").scrollTop();

	clearTimeout(t);

	

	if (height > previousHeight){
		$('#menu').addClass('hideTop');
		$('#menu').removeClass('showTop');
		previousHeight = height;

		var t = setTimeout(function(){
			$('#menu').removeClass('hideTop');	
			$('#menu').addClass('showTop');
			//$(".parallax").scrollTop($(".parallax").scrollTop()-1);			
		}, 4000)


	} else {
		$('#menu').removeClass('hideTop');	
		$('#menu').addClass('showTop');
		previousHeight = height;

	} 


	//console.log(height)
	if(height>HEIGHT*2 && height<HEIGHT*4 && firstTime==true && shopClicked==false) {
		firstTime = false; 
		var delayInMs = e.timeStamp - lastDate;
		var offset = e.target.scrollTop - lastOffset;
		var speedInpxPerMs = offset / delayInMs;
		console.log(speedInpxPerMs);

		lastDate = e.timeStamp;
		lastOffset = e.target.scrollTop;

		//window.onscroll = function () { window.scrollTo(0, 0); };	
		$('body').addClass('stop-scrolling');
		$('#playlist').addClass('show');
		//$("#menu").append('<br><a href="#" title="Play video" class="play active"></a>'); 
		
			//e.stopPropagation()
			setTimeout(function(){

				$(".parallax").animate({scrollTop: HEIGHT*3}, (1-speedInpxPerMs)*900, function(){		
					console.log('loading  the globe'); 

					$.getScript('../third-party/Detector.js', function()
						{
							console.log('Detector'); 
							$.getScript('../third-party/three.min.js', function()
								{
									console.log('three'); 

									$.getScript('../third-party/Tween.js', function()
										{
											console.log('Tween'); 

											$.getScript('../globe.js', function()
												{
													console.log('globe'); 

													$.getScript('../music.js', function()
														{
															console.log('music'); 

															$(".parallax").animate({scrollTop: HEIGHT*3}, 1, function(){})

														setTimeout(function(){$('body').removeClass('stop-scrolling')													
															$(".parallax").animate({scrollTop: HEIGHT*3}, 1, function(){})
															//console.log('now');
															document.getElementById('audioElement').play();
															//
														},5000);

														});	
												});			
										});

								});
						});

				})
			},777);
	}

	if($('.parallax').scrollTop() + $('.parallax').height() > $(window).height()*7 - 100) {
		console.log('near bottom');
		$('#bottomMenu').addClass('showBottom');
		$('#bottomMenu').removeClass('hideBottom'); 			

	}else{
		$('#bottomMenu').removeClass('showBottom'); 			
		$('#bottomMenu').addClass('hideBottom'); 			

	}


	
});



$(document).ready(function() {
	var icon = $('.play');
	icon.click(function() {
		icon.toggleClass('active');
		if($('.play').hasClass('active')){
			document.getElementById('audioElement').play()
		}else{
			document.getElementById('audioElement').pause()
		}
		return false;
	});
});

/***CLOCK***/

function analogClock(){
}
analogClock.prototype.run = function() {
	var date = new Date();
	var second = date.getSeconds()* 6;
	var minute = date.getMinutes()* 6 + second / 60;
	var hour = ((date.getHours() % 12) / 12) * 360 + 90 + minute / 12;
	$('#hour').css("transform", "rotate(" + hour + "deg)");
	$('#minute').css("transform", "rotate(" + minute + "deg)");
	$('#second').css("transform", "rotate(" + second + "deg)");
	//$('#display-time').text(getDateTime);
	if(date.getHours() >= 12 || date.getHours() < 4){ //This isn't too efficient but whateva 
		$('.clock-face h6').text('open')
	} else {
		$('.clock-face h6').text('closed')	
	} 
};

$(document).ready(function(){
	var analogclock = new analogClock();
	window.setInterval(function(){ 
		analogclock.run(); 
	}, 1000);
});

/*

   function getDateTime() {

   var date = new Date();

   var hour = date.getHours();
   hour = (hour < 10 ? "0" : "") + hour;

   var min  = date.getMinutes();
   min = (min < 10 ? "0" : "") + min;

   var sec  = date.getSeconds();
   sec = (sec < 10 ? "0" : "") + sec;


   return romanize(hour) + ":" + romanize(min)+ ":" + romanize(sec) 

   }


   function romanize (num) {
   if (!+num)
   return false;
   var digits = String(+num).split(""),
   key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
   "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
   "","I","II","III","IV","V","VI","VII","VIII","IX"],
   roman = "",
   i = 3;
   while (i--)
   roman = (key[+digits.pop() + (i * 10)] || "") + roman;
   return Array(+digits.join("") + 1).join("M") + roman;
   }

/*
function scrollSpeed(height){
var lastOffset = height; 
var lastDate = new Date().getTime();
$( '.parallax' ).scroll(function(e) {
var delayInMs = e.timeStamp - lastDate;
var offset = e.target.scrollTop - lastOffset;
var speedInpxPerMs = offset / delayInMs;
console.log(speedInpxPerMs);

lastDate = e.timeStamp;
lastOffset = e.target.scrollTop;
});
return;

}




/*
var checkScrollSpeed = (function(settings){
settings = settings || {};

var lastPos, newPos, timer, delta, 
delay = settings.delay || 50; // in "ms" (higher means lower fidelity )

function clear() {
lastPos = null;
delta = 0;
}

clear();

return function(){
newPos = window.scrollY;
if ( lastPos != null ){ // && newPos < maxScroll 
delta = newPos -  lastPos;
}
lastPos = newPos;
clearTimeout(timer);
timer = setTimeout(clear, delay);
return delta;
};
})();

// listen to "scroll" event
window.onscroll = function(){
console.log( checkScrollSpeed() );
};

//$('#container').load(['../music.js', '../third-party/Detector.js', '../third-party/three.min.js', '../third-party/Tween.js','../globe.js']);  


//$('body').html('<script src="music.js"></script><script type="text/javascript" src="third-party/Detector.js"></script> <script type="text/javascript" src="third-party/three.min.js"></script> <script type="text/javascript" src="third-party/Tween.js"></script> <script type="text/javascript" src="globe.js"></script>');


/*
$.holdReady(true);
$.getScript( "../music.js" ),function() {
$.holdReady(false);
});
*/

/*
   $.when(
   $.getScript( "../third-party/Detector.js" ),
   $.getScript( "../third-party/three.min.js" ),
   $.getScript( "../third-party/Tween.js" ),
   $.getScript( "../globe.js" ),

   $.Deferred(function( deferred ){
   $( deferred.resolve );
   console.log(deferred.resolve + ' whats up');
   })
   ).done(function(){

   console.log('donte');
//place your code here, the scripts are all loaded

});

//getScripts(['../music.js', '../third-party/Detector.js', '../third-party/three.min.js', '../third-party/Tween.js','../globe.js'], function () { doSomething(); });
*/

/*
   function getScripts(scripts, callback) {
   console.log('in get scripts');
   var progress = 0;
   var internalCallback = function () {
   if (++progress == scripts.length) { callback(); }
   };

   scripts.forEach(function(script) { $.getScript(script, internalCallback); });
   };





   function doSomething(){
   console.log('somethin'); 
   }
/*
 *
 *
 * <script src="music.js"></script>

 <script type="text/javascript" src="third-party/Detector.js"></script>
 <script type="text/javascript" src="third-party/three.min.js"></script>
 <script type="text/javascript" src="third-party/Tween.js"></script>
 <script type="text/javascript" src="globe.js"></script>-->
 */

//document.getElementById('audioElement').play() On load 

