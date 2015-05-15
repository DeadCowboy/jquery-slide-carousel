# Slide Carousel for jQuery
Displays carousel items a singular slides using CSS3 Animations for transitioning.


## Documentation
### Simple Usage
The following example would create a carousel using mostly default values, but setting the autoplay and looping to true as well as the duration to 6 seconds.  Calling the plugin returns a carousel instance.

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
The following are the properties of the style parameter option used when creating a new carousel.

**pip** (String) The CSS class to assign pips.  Default `carousel-pip`.

**pipSelected** (String) The CSS class to assign the currently selected pip.  Default `carousel-pip-selected`.

**enter** (String) The CSS class added to slides when they enter in a forward direction.  Default `carousel-slide-enter`.

**leave** (String) The CSS class added to slides when they leave in a forward direction.  Default `carousel-slide-leave`.

**enterReverse** (String) The CSS class added to slides when they enter in a backward direction.  Default `carousel-slide-enter-reverse`.

**leaveReverse** (String) The CSS class added to slides when they leave in a backward direction.  Default `carousel-slide-leave-reverse`.

**enterEnd** (String) The CSS class added to slides when they enter in a forward direction without animation.  Default `carousel-slide-enter-end`.

**leaveEnd** (String) The CSS class added to slides when they leave in a forward direction without animation.  Default `carousel-slide-leave-end`.

**enterReverseEnd** (String) The CSS class added to slides when they enter in a backward direction without animation.  Default `carousel-slide-enter-reverse-end`.

**leaveReverseEnd** (String) The CSS class added to slides when they leave in a backward direction without animation.  Default `carousel-slide-leave-reverse-end`.


### Methods
**getAnimating()** (Boolean) Returns true if any slide is currently animating.

**getAutoplay()** (Boolean) Returns the current autoplay value.

**setAutoplay( value:Boolean )** (Void) Sets the autoplay value.  If set to true starts the autoplay timer, else it stops the autoplay timer.

**getCurrentIndex()** (Number) Returns the index number of the currently shown slide.

**getDuration()** (Number) Returns the time in milleseconds that each slide holds before it autoplays to the next slide.

**destroy()** (Void) Destroys the carousel.

**enable()** (Void) Turns on interaction for navigation buttons and pips.

**disable()** (Void) Turns off interaction for navigation buttons and pips.

**play()** (Void) Starts the autoplay timer.

**stop()** (Void) Stops the autoplay timer.

**playPrev()** (Void) Shows the previous slide.

**playNext()** (Void) Shows the next slide.

**slideTo( index:Number, animated:Boolean, dir:Number )** (Void) Shows the slide designated by the `index` parameter.  If the `animated` parameter is set to true, then the slides will be assigned CSS classes that use CSS Animation.  Otherwise, the slides will be assinged the CSS classes without CSS Animation (e.g. "enterEnd", "leaveEnd", etc).  The `dir` designates the direction the animation should go in.  A positive number will designate a forward direction (e.g. "enter", "leave"), while a negative number will designate a backward direction (e.g. "enterReverse", "leaveReverse").

## Examples
(TBD)


## History
### v0.0.7
Made improvements to the code so that it is more [JSHint](http://jshint.com/) friendly, however more could be done.

### v0.0.6
Removed enter and leave active styles.  Added enter and leave end styles, and changed logic so these are used whenever a slide is changed with the animated parameter is false.

### v0.0.5
Added CSS animation detection, so that onAnimationEnd is called immediately if not supported.

### v0.0.4
Carousel navigation is now hidden if number of slides is 1 or less.

### v0.0.3
Added to GitHub after using in several projects.
