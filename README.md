# jquery-popup

### Easy to implement jQuery interrupter popup

I tried to think of all the common situations we use our interrupters for and make it easy to implement those features.

## Usage

1. Include jQuery:

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	```

2. Include plugin's code:

	```html
	<script src="dist/jquery.ipop.min.js"></script>
	```

3. Call the plugin:
  @see example in demo/index.html


## Options

  ```javascript
  defaults = {
    ipopbk: 'ipopbk', // class applied to background shade
    ipop: 'ipop', // class applied to popup
    closer: 'x-closer', // class applied to closer button
    html: '', // path to html
    css: '', // path to css
    height: '400px', // max-height
    width: '400px', // max-width
    delay: 1000, // delay in milliseconds
    page: 1, // which page view do we show on -- not yet implemented
    timer: false, // auto start/stop requires timerStart & timerEnd
    timerStart: 'Aug 10, 2015 07:00:00 CDT', // date/time to start requires timer: true
    timerEnd: 'Aug 17, 2015 07:00:00 CDT', // date/time to stop requires timer: true
    ltc: 'formSubmitted', // long term cookie name
    stc: 'formDismissed', // short term cookie name
    callbacks: { // onclick callback functions
      '.x-submit': 'submit', // default submit - validates form -> sets a long term cookie -> submits form
      '.x-closer': 'dismiss', // default dismiss - sets a short term cookie -> dismisses the popup
      '.x-nothanks': 'longTermDismiss', // default longTermDismiss - sets a long term cookie -> dismisses the popup
      '.ipopbk': 'dismiss' // default dismiss - sets a short term cookie -> dismisses the popup
    }
  };

  ```


## Builtin callbacks

  * dismiss - sets a short term cookie -> dismisses the popup
  * submit - validates form -> sets a long term cookie -> submits form
  * longTermDismiss - sets a long term cookie -> dismisses the popup
  * gotoLink - sets a short term cookie -> navigates to callee's href value


## Built with
  [jQuery Boilerplate](https://github.com/jquery-boilerplate/jquery-boilerplate)
  Thanks guys!

## License

[MIT License](http://zenorocha.mit-license.org/) ©Wayne Patterson
