# Slide Carousel for jQuery
Displays carousel items a singular slides using CSS3 Animations for transitioning.


## Documentation
### Simple Usage
The following example would create a carousel using mostly default values, but setting the autoplay and looping to true as well as the duration to 6 seconds.

```javascript
var carousel = $( "#carousel" ).slideCarousel( { 
	autoplay: true,
	duration: 6000,
	looping: true
} );
```


### Options
**autoplay** (Boolean) Set to true to have the carousel play the next slide automatically.  Default `false`.

**duration** (Number) The duration for that each slide is displayed before continuing to the next slide in milleseconds.  Only used when autoplay is set to true.  Default `10000`.

**looping** (Boolean) Set to true to allow the carousel to wrap from the last slide to first slide and vice versa.  Default `false`.

**slideSelector** (String) The selector string jQuery will use to select carousel slides.  It is recommended this is a CSS class name.  Default `.carousel-slide`.

**navPrevSelector** (String) The selector string jQuery will use to select the previous slide button.  A `click` event will be added to this element, so that when clicked the `playPrev()` method will be called.  It is recommended that this be an ID.  Default `#carousel-nav-prev`.

**navNextSelector** (String) The selector string jQuery will use to select the next slide button.  A `click` event will be added to this element, so that when clicked the `playNext()` method will be called.  It is recommended that this be an ID.  Default `#carousel-nav-next`.

**pipsSelector** (String) The selector string jQuery will use to select the container that holds all the pips.  Pips will be added as children to this element as `li` elements.  It is recommened that this element be a `ul` and have an ID.  Default `#carousel-pips`.

**styles** (Object) Holds properties for the CSS classes assigned to pips and slides.  More details are below.

**onEnter** (Function) Callback for when a slide shows.  Passes the index of the slide to the callback.

**onEnterComplete** (Function) Callback for when a slide has finished its' show animation.  Passes the index of the slide to the callback.

**onLeave** (Function) Callback for when a slide hides.  Passes the index of the slide to the callback.

**onLeaveComplete** (Function) Callback for when a slide has finished its' hide animation.  Passes the index of the slide to the callback.


#### Style Options
(TBD)


### Methods
**getAnimating()** (Boolean) Returns true if any slide is currently animating.

**getAutoplay()** (Boolean) Returns the current autoplay value.
**setAutoplay( value:Boolean )** (Void) Sets the autoplay value, and if set to true starts the autoplay timer.

**getCurrentIndex()** (Number)

**getDuration()** (Number)

**destroy()** (Void)

**enable()** (Void)

**disable()** (Void)

**play()** (Void)

**stop()** (Void)

**playPrev()** (Void)

**playNext()** (Void)

**slideTo( index:Number, animated:Boolean, dir:Number )** (Void)

## Examples
(TBD)


## History
### v0.0.6
Removed enter and leave active styles.  Added enter and leave end styles, and changed logic so these are used whenever a slide is changed with the animated parameter is false.

### v0.0.5
Added CSS animation detection, so that onAnimationEnd is called immediately if not supported.

### v0.0.4
Carousel navigation is now hidden if number of slides is 1 or less.

### v0.0.3
Added to GitHub after using in several projects.
