Omniscroll
==========

Consumes events. Provides delta values.

		var wheel = require('uniwheel');
		var omniscroll = require('../index.js');
		var omniscrollKeyboard = require('omniscroll-keyboard')(omniscroll);

		function wheelHandler(e) {
		  var scrollValue = omniscroll.event(e);
		  console.log(scrollValue);
		}

		function keydownHandler(e) {
		  var scrollValue = omniscroll.event(e,'omniscroll-keyboard');
		  console.log(scrollValue);
		}

		document.addEventListener('keydown',keydownHandler);

		wheel.on(window,wheelHandler);