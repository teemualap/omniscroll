Omniscroll
==========

Provides unified, configurable, transformable delta values via plugins regardless of source. Includes default support for wheel, keyboard and touch.

On it's own, omniscroll doesn't actually do any scrolling. It's up to you to do anything you want with the values.

Usage:
------

		var omniscroll = require('omniscroll');

		//an example and optional transform function
		function inverter(value) {
			return -value;
		}

		omniscroll
			.init({
				//configure
				keyboardFactor: 30,
				wheelFactor: 15,
				touchFactor: 5,
				preventDefault: false
			})
			.bind(document)
			.transform(inverter)
			.onDelta(function(delta){
				//do stuff with delta
			});

License
-------
MIT