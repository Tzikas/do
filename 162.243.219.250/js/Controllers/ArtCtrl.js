angular.module('AngStarter')
.controller('ArtCtrl', ['$scope', function ($scope) {



/**THUMBS Mo.js**/	
/**
 * demo.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2016, Codrops
 * http://www.codrops.com
 */
;(function(window) {

	'use strict';

	// taken from mo.js demos
	function isIOSSafari() {
		var userAgent;
		userAgent = window.navigator.userAgent;
		return userAgent.match(/iPad/i) || userAgent.match(/iPhone/i);
	};

	// taken from mo.js demos
	function isTouch() {
		var isIETouch;
		isIETouch = navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
		return [].indexOf.call(window, 'ontouchstart') >= 0 || isIETouch;
	};
	
	// taken from mo.js demos
	var isIOS = isIOSSafari(),
		clickHandler = isIOS || isTouch() ? 'touchstart' : 'click';

	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	function Animocon(el, options) {
		this.el = el;
		this.options = extend( {}, this.options );
		extend( this.options, options );

		this.checked = false;

		this.timeline = new mojs.Timeline();
		
		for(var i = 0, len = this.options.tweens.length; i < len; ++i) {
			this.timeline.add(this.options.tweens[i]);
		}

		var self = this;
		this.el.addEventListener(clickHandler, function() {
			if( self.checked ) {
				self.options.onUnCheck();
			}
			else {
				self.options.onCheck();
				self.timeline.start();
			}
			self.checked = !self.checked;
		});
	}

	Animocon.prototype.options = {
		tweens : [
			new mojs.Burst({
				shape : 'circle',
				isRunLess: true
			})
		],
		onCheck : function() { return false; },
		onUnCheck : function() { return false; }
	};

	// grid items:
	var items = [].slice.call(document.querySelectorAll('ul.grid > .grid__item'));

	function init() {
		/* Icon 1 */
		var el1 = items[0].querySelector('button.icobutton'), el1span = el1.querySelector('span');
		new Animocon(el1, {
			tweens : [
				// burst animation
				new mojs.Burst({
					parent: el1,
					duration: 1700,
					shape : 'circle',
					fill: '#C0C1C3',
					x: '50%',
					y: '50%',
					opacity: 0.6,
					childOptions: { radius: {15:0} },
					radius: {30:90},
					count: 6,
					isRunLess: true,
					easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
				}),
				// ring animation
				new mojs.Transit({
					parent: el1,
					duration: 700,
					type: 'circle',
					radius: {0: 60},
					fill: 'transparent',
					stroke: '#C0C1C3',
					strokeWidth: {20:0},
					opacity: 0.6,
					x: '50%',     
					y: '50%',
					isRunLess: true,
					easing: mojs.easing.sin.out
				}),
				// icon scale animation
				new mojs.Tween({
					duration : 1200,
					onUpdate: function(progress) {
						if(progress > 0.3) {
							var elasticOutProgress = mojs.easing.elastic.out(1.43*progress-0.43);
							el1span.style.WebkitTransform = el1span.style.transform = 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)';
						}
						else {
							el1span.style.WebkitTransform = el1span.style.transform = 'scale3d(0,0,1)';
						}
					}
				})
			],
			onCheck : function() {
				el1.style.color = '#988ADE';
			},
			onUnCheck : function() {
				el1.style.color = '#C0C1C3';	
			}
		});
		/* Icon 1 */

		/* Icon 2 */
		var el2 = items[1].querySelector('button.icobutton'), el2span = el2.querySelector('span');
		new Animocon(el2, {
			tweens : [
				// burst animation
				new mojs.Burst({
					parent: el2,
					duration: 1500,
					delay: 300,
					shape : 'circle',
					fill: '#C0C1C3',
					x: '50%',
					y: '50%',
					opacity: 0.6,
					radius: {40:90},
					count: 6,
					isRunLess: true,
					easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
				}),
				// ring animation
				new mojs.Transit({
					parent: el2,
					duration: 600,
					type: 'circle',
					radius: {0: 50},
					fill: 'transparent',
					stroke: '#C0C1C3',
					strokeWidth: {35:0},
					opacity: 0.6,
					x: '50%',     
					y: '50%',
					isRunLess: true,
					easing: mojs.easing.ease.inout
				}),
				// icon scale animation
				new mojs.Tween({
					duration : 1100,
					onUpdate: function(progress) {
						if(progress > 0.3) {
							var elasticOutProgress = mojs.easing.elastic.out(1.43*progress-0.43);
							el2span.style.WebkitTransform = el2span.style.transform = 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)';
						}
						else {
							el2span.style.WebkitTransform = el2span.style.transform = 'scale3d(0,0,1)';
						}
					}
				})
			],
			onCheck : function() {
				el2.style.color = '#988ADE';
			},
			onUnCheck : function() {
				el2.style.color = '#C0C1C3';	
			}
		});
		/* Icon 2 */

		/* Icon 3 */
		var el3 = items[2].querySelector('button.icobutton'), el3span = el3.querySelector('span');
		new Animocon(el3, {
			tweens : [
				// burst animation
				new mojs.Burst({
					parent: el3,
					duration: 1500,
					delay: 300,
					shape : 'circle',
					fill : [ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
					x: '50%',
					y: '50%',
					opacity: 0.6,
					radius: {40:90},
					count: 6,
					isRunLess: true,
					easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
				}),
				// ring animation
				new mojs.Transit({
					parent: el3,
					duration: 750,
					type: 'circle',
					radius: {0: 50},
					fill: 'transparent',
					stroke: '#988ADE',
					strokeWidth: {35:0},
					opacity: 0.6,
					x: '50%',     
					y: '50%',
					isRunLess: true,
					easing: mojs.easing.bezier(0, 1, 0.5, 1)
				}),
				// icon scale animation
				new mojs.Tween({
					duration : 1100,
					onUpdate: function(progress) {
						if(progress > 0.3) {
							var elasticOutProgress = mojs.easing.elastic.out(1.43*progress-0.43);
							el3span.style.WebkitTransform = el3span.style.transform = 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)';
						}
						else {
							el3span.style.WebkitTransform = el3span.style.transform = 'scale3d(0,0,1)';
						}
					}
				})
			],
			onCheck : function() {
				el3.style.color = '#988ADE';
			},
			onUnCheck : function() {
				el3.style.color = '#C0C1C3';	
			}
		});
		/* Icon 3 */

		/* Icon 4 */
		var el4 = items[3].querySelector('button.icobutton'), el4span = el4.querySelector('span');
		var scaleCurve4 = mojs.easing.path('M0,100 L25,99.9999983 C26.2328835,75.0708847 19.7847843,0 100,0');
		new Animocon(el4, {
			tweens : [
				// burst animation
				new mojs.Burst({
					parent: el4,
					duration: 1500,
					shape : 'circle',
					fill : [ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
					x: '50%',
					y: '50%',
					opacity: 0.6,
					childOptions: { radius: {20:0} },
					radius: {40:120},
					count: 6,
					isSwirl: true,
					isRunLess: true,
					easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
				}),
				// ring animation
				new mojs.Transit({
					parent: el4,
					duration: 750,
					type: 'circle',
					radius: {0: 50},
					fill: 'transparent',
					stroke: '#988ADE',
					strokeWidth: {15:0},
					opacity: 0.6,
					x: '50%',     
					y: '50%',
					isRunLess: true,
					easing: mojs.easing.bezier(0, 1, 0.5, 1)
				}),
				// icon scale animation
				new mojs.Tween({
					duration : 900,
					onUpdate: function(progress) {
						var scaleProgress = scaleCurve4(progress);
						el4span.style.WebkitTransform = el4span.style.transform = 'scale3d(' + scaleProgress + ',' + scaleProgress + ',1)';
					}
				})
			],
			onCheck : function() {
				el4.style.color = '#988ADE';
			},
			onUnCheck : function() {
				el4.style.color = '#C0C1C3';	
			}
		});
	}
	
	init();

})(window);
}])








/* 
angular.module('AngStarter', ['angulike']); 

if (window.location.href.indexOf('http') != 0) {
    alert("This demo must be run on a web server (i.e. the url must start with http/https), it won't work by opening the file directly in a browser.");
}

angular.module('AngStarter', ['angulike'])
  .run([
      '$rootScope', function ($rootScope) {
          $rootScope.facebookAppId = '[FacebookAppId]'; // set your facebook app id here
      }
  ]);
*/



