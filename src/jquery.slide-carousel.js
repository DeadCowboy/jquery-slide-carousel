/**
 * @title Slide Carousel for jQuery
 * @description Displays carousel items a singular slides using CSS3 Animations for transitioning.
 * @version 0.0.5
 * @author Richard Nelson
 * @github https://github.com/DeadCowboy
 */

(function( $ ) {

	$.fn.slideCarousel = function( options ) {
		log( "new SlideCarousel" );

		/*************************************************
		 * PRIVATE
		 *************************************************/

		// ----- PRIVATE VARS -----//
		var $container;
		var $navPrev;
		var $navNext;
		var $pips;

		var animatingShow;
		var animatingHide;		
		var autoplay;		
		var currentIndex;
		var duration;
		var looping;
		var slides;
		var slideSelector;
		var styles;
		var styleClasses;
		var timer;
		var timerDelay;

		var isAnimationSupported;


		// ----- PRIVATE CONSTANTS ----- //
		var EVENT_ANIMATION_END = "animationend webkitAnimationEnd oanimationend MSAnimationEnd";


		// ----- PRIVATE FUNCTIONS ----- //
		function log( obj ) {

			console.log( "%c SlideCarousel: " + obj + " ", "background:#369;color:#fff;" );

		};

		function init( elem, options ) {
			log( "init" );

			// Set Carousel Element
			$container = elem;

			// Options
			options = options || {};

			// Animation Support?
			animatingShow = false;
			animatingHide = false;

			// Autoplay
			autoplay = ( options.autoplay != undefined )
				? options.autoplay
				: false;

			// Looping
			looping = ( options.looping != undefined )
				? options.looping
				: false;

			// Set Slide Selector
			slideSelector = ( options.slideSelector )
				? options.slideSelector
				: ".carousel-slide";

			// Set Nav Elements
			$navPrev = ( options.navPrevSelector ) 
				? $container.find( options.navPrevSelector )
				: $container.find( "#carousel-nav-prev" );

			$navNext = ( options.navNextSelector ) 
				? $container.find( options.navNextSelector )
				: $container.find( "#carousel-nav-next" );

			if ( $navPrev.length == 0 ) $navPrev = undefined;
			if ( $navNext.length == 0 ) $navNext = undefined;

			// Set Pips Container Element
			$pips = ( options.pipsSelector ) 
				? $container.find( options.pipsSelector )
				: $container.find( "#carousel-pips" );

			if ( $pips.length == 0 ) $pips = undefined;

			// Set Styles
			styles = {
				pip: "carousel-pip",
				pipSelected: "carousel-pip-selected",
				enter: "carousel-slide-enter",
				leave: "carousel-slide-leave",
				enterActive: "carousel-slide-enter-active",
				leaveActive: "carousel-slide-leave-active",
				enterReverse: "carousel-slide-enter-reverse",
				leaveReverse: "carousel-slide-leave-reverse",
				enterReverseActive: "carousel-slide-enter-reverse-active",
				leaveReverseActive: "carousel-slide-leave-reverse-active"
			};

			if ( options.styles ) {
				
				if ( options.styles.pip ) styles.pip = options.styles.pip;
				if ( options.styles.pipSelected ) styles.pip = options.styles.pipSelected;
				if ( options.styles.enter ) styles.enter = options.styles.enter;
				if ( options.styles.leave ) styles.leave = options.styles.leave;
				if ( options.styles.enterActive ) styles.enterActive = options.styles.enterActive;
				if ( options.styles.leaveActive ) styles.leaveActive = options.styles.leaveActive;
				if ( options.styles.enterReverse ) styles.enterReverse = options.styles.enterReverse;
				if ( options.styles.leaveReverse ) styles.leaveReverse = options.styles.leaveReverse;
				if ( options.styles.enterReverseActive ) styles.enterReverseActive = options.styles.enterReverseActive;
				if ( options.styles.leaveReverseActive ) styles.leaveReverseActive = options.styles.leaveReverseActive;

			}

			styleClasses = [ styles.enter, styles.leave, styles.enterActive, styles.leaveActive, styles.enterReverse, styles.leaveReverse, styles.enterReverseActive, styles.leaveReverseActive ].join( " " );

			// Timer Delay
			timerDelay = ( options.duration >= 0 ) 
				? options.duration
				: 10000;

			// Callbacks
			if ( options.onEnter ) carousel.onEnter = options.onEnter;
			if ( options.onEnterComplete ) carousel.onEnterComplete = options.onEnterComplete;
			if ( options.onLeave ) carousel.onLeave = options.onLeave;
			if ( options.onLeaveComplete ) carousel.onLeaveComplete = options.onLeaveComplete;

			// Detect CSS Animation Support
			isAnimationSupported = detectAnimationSupport();

			// Create Carousel
			createCarousel();

			// Hide Navigation for Single Slides
			if ( slides.length <= 1 ) {

				if ( $pips )
					$pips.hide();

				if ( $navPrev )
					$navPrev.hide();

				if ( $navNext )
					$navNext.hide();

			}

			// Set Current Index
			currentIndex = -1;

		};

		function detectAnimationSupport() {
			log( "detectAnimationSupport" );

			var animation = false;
			var animationString = "animation";
			var keyframePrefix = "";
			var domPrefixes = "Webkit Moz O ms Khtml".split(" ");
			var pfx  = "";

			if ( $container[0].style.animationName !== undefined ) { animation = true; }    

			if ( animation === false ) {

				for( var i = 0; i < domPrefixes.length; i++ ) {

					if( $container[0].style[ domPrefixes[i] + "AnimationName" ] !== undefined ) {
						pfx = domPrefixes[ i ];
						animationString = pfx + "Animation";
						keyframePrefix = "-" + pfx.toLowerCase() + "-";
						animation = true;
						break;
					}
				}
			}

			return animation;

		};

		function createCarousel() {
			log( "createCarousel" );

			slides = [];

			var $slide;

			$container.find( slideSelector ).each( function( i ) {

				console.log( "adding slide " + i );

				// Assign Slide
				$slide = $( this );

				// Hide Slide
				$slide.addClass( styles.leaveActive );

				// Add Slide to Array
				slides.push( {
					id: i,
					element: $slide[0]
				} );

				// Add Pip
				if ( $pips ) {

					var $pip = $( "<li></li>" );
					$pip.addClass( styles.pip );
					$pips.append( $pip );

				}

			} );

		};

		function getSlideById( id ) {

			var i;
			var length = slides.length;

			for ( i = 0; i < length; i++ ) {

				if ( slides[i].id == id )
					return slides[i];

			}

			return null;

		};

		function showSlide( index, animated, dir ) {
			log( "showSlide: " + index );

			animatingShow = true;

			var $slide = $( slides[ index ].element );
			$slide.removeClass( styleClasses );

			if ( dir > 0 )
				$slide.addClass( styles.enter );
			else
				$slide.addClass( styles.enterReverse );

			// Call onEnter
			if ( typeof( carousel.onEnter ) == "function" )
				carousel.onEnter( index );

			// Animation End Function
			var onAnimationEnd = function( e ) {
				log( "onAnimationEnd" );

				animatingShow = false;

				$slide.off( EVENT_ANIMATION_END, onAnimationEnd );
				$slide.removeClass( styleClasses );

				if ( dir > 0 )
					$slide.addClass( styles.enterActive );
				else
					$slide.addClass( styles.enterReverseActive );

				// Call onEnterComplete
				if ( typeof( carousel.onEnterComplete ) == "function" )
					carousel.onEnterComplete( index );

			};

			// Add Event Listener -or- Call Animation End
			if ( isAnimationSupported && animated )
				$slide.on( EVENT_ANIMATION_END, onAnimationEnd );
			else
				onAnimationEnd();

		};

		function hideSlide( index, animated, dir ) {
			log( "hideSlide: " + index );

			animatingHide = true;

			var $slide = $( slides[ index ].element );
			$slide.removeClass( styleClasses );

			if ( dir > 0 )
				$slide.addClass( styles.leave );
			else
				$slide.addClass( styles.leaveReverse );

			// Call onLeave
			if ( typeof( carousel.onLeave ) == "function" )
				carousel.onLeave( index );			

			// Animation End Function
			var onAnimationEnd = function( e ) {
				log( "onAnimationEnd" );

				animatingHide = false;

				$slide.off( EVENT_ANIMATION_END, onAnimationEnd );
				$slide.removeClass( styleClasses );

				if ( dir > 0 )
					$slide.addClass( styles.leaveActive );
				else
					$slide.addClass( styles.leaveReverseActive );

				// Call onLeaveComplete
				if ( typeof( carousel.onLeaveComplete ) == "function" )
					carousel.onLeaveComplete( index );

			};

			// Add Event Listener -or- Call Animation End
			if ( isAnimationSupported && animated )
				$slide.on( EVENT_ANIMATION_END, onAnimationEnd );
			else
				onAnimationEnd();

		};

		function updatePips() {
			log( "updatePips" );

			if ( $pips ) {

				// Remove Selected
				$pips.find( "." + styles.pipSelected ).removeClass( styles.pipSelected );

				// Add Selected
				$pips.find( "." + styles.pip ).eq( currentIndex ).addClass( styles.pipSelected );

			}

		};


		// ----- PRIVATE EVENT LISTENERS ----- //
		function onTimeout( e ) {
			log( "onTimeout" );

			carousel.playNext();

		};

		function onNavPrevClick( e ) {
			log( "onNavPrevClick" );

			carousel.playPrev();

		};

		function onNavNextClick( e ) {
			log( "onNavNextClick" );

			carousel.playNext();

		};

		function onPipClick( e ) {
			log( "onPipClick" );

			var $pip = $( e.currentTarget );
			carousel.slideTo( $pip.index() );

		};


		/*************************************************
		 * PUBLIC
		 *************************************************/

		// ----- OBJECT ----- //
		var carousel = {};


		// ----- PUBLIC VARS ----- //
		carousel.onEnter = undefined;
		carousel.onEnterComplete = undefined;
		carousel.onLeave = undefined;
		carousel.onLeaveComplete = undefined;


		// ----- PUBLIC GET/SET FUNCTIONS ----- //
		carousel.getAnimating = function() { 
			
			return ( animatingShow || animatingHide ); 

		};

		carousel.getAutoplay = function() { return autoplay; };
		carousel.setAutoplay = function( value ) {

			autoplay = value;

			if ( autoplay )
				carousel.play();
			else
				carousel.stop();

		};

		carousel.getCurrentIndex = function() { return currentIndex; };

		carousel.getDuration = function() { return duration; };


		// ----- PUBLIC FUNCTIONS ----- //
		carousel.destroy = function() {
			log( "destroy" );

			// Remove Listeners
			carousel.disable();

			// Remove Callbacks
			carousel.onEnter = undefined;
			carousel.onEnterComplete = undefined;
			carousel.onLeave = undefined;
			carousel.onLeaveComplete = undefined;

			// Timer
			carousel.stop();
			timer = undefined;

			// Remove Navigation
			if ( $navPrev ) $navPrev = undefined;
			if ( $navNext ) $navNext = undefined;

			// Remove Pips
			if ( $pips ) {

				$pips.empty();
				$pips = undefined;

			}

			// Remove Animation Classes from Slides
			var $slide;

			$container.find( slideSelector ).each( function( i ) {

				$slide = $( this );
				$slide.off();
				$slide.removeClass( styleClasses );				

			} );

			// Remove Slides Array
			slides = undefined;

			// Remove Styles
			styles = undefined;

		};

		carousel.enable = function() {
			log( "enable" );

			// Nav
			if ( $navPrev ) 
				$navPrev.on( "click", onNavPrevClick );

			if ( $navNext ) 
				$navNext.on( "click", onNavNextClick );

			// Pips
			if ( $pips )
				$pips.find( "li" ).on( "click", onPipClick );

		};

		carousel.disable = function() {
			log( "disable" );

			// Nav
			if ( $navPrev ) 
				$navPrev.off( "click", onNavPrevClick );

			if ( $navNext ) 
				$navNext.off( "click", onNavNextClick );

			// Pips
			if ( $pips )
				$pips.find( "li" ).off( "click", onPipClick );

		};


		carousel.play = function() {
			log( "play" );

			clearTimeout( timer );
			timer = setTimeout( onTimeout, timerDelay );

		};

		carousel.stop = function() {
			log( "stop" );

			clearTimeout( timer );

		};

		carousel.playPrev = function() {
			log( "playPrev" );

			var index = currentIndex - 1;
			if ( looping && index < 0 ) index = slides.length - 1;

			carousel.slideTo( index, true, -1 );

		};

		carousel.playNext = function() {
			log( "playNext" );

			var index = currentIndex + 1;
			if ( looping && index > slides.length - 1 ) index = 0;

			carousel.slideTo( index, true, 1 );

		};

		carousel.slideTo = function( index, animated, dir ) {
			log( "slideTo: " + index + ", " + animated + ", " + dir );

			if ( index >= 0 && 
				 index < slides.length &&
				 index != currentIndex ) {

				// Direction
				if ( dir == undefined )
					dir = ( index - currentIndex > 0 ) ? 1 : -1;

				// Animated
				animated = ( animated != undefined )
					? animated
					: true;

				// Stop
				carousel.stop();

				// Set Current Index
				var prevIndex = currentIndex;
				currentIndex = index;

				// Hide
				if ( prevIndex > -1 ) 
					hideSlide( prevIndex, animated, dir );

				// Show
				updatePips();
				showSlide( index, animated, dir );

				// Play
				if ( autoplay )
					carousel.play();

			}

		};


		/*************************************************
		 * CALL
		 *************************************************/
		init( this, options );


		/*************************************************
		 * RETURN
		 *************************************************/
		return carousel;


	}

}( jQuery ));

