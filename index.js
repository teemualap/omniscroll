(function(factory){
  if ( typeof define === 'function' && define.amd ) {
    // AMD. Register as an anonymous module.
    define([], factory());
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    module.exports = factory();
  } else {
    // Browser globals
    window.omniscroll = factory();
  }
}
(function(){

  var objectility = require('objectility');

  //clamp delta values based on min/max values from settings
  function clamp(value) {
    return Math.min( Math.max(omniscroll.settings.clamp.min, value), omniscroll.settings.clamp.max );
  }

  //Return clamped event delta. Sets delta values to 0 if no delta present.
  function getDeltaObj(event,plugin) {

    return {
      y: clamp(event.deltaY || 0),
      x: clamp(event.deltaX || 0)
    }

  }

  //our to be exposed object literal
  var omniscroll = {};

  //default settings
  omniscroll.settings = {
    clamp: {
      min: -100,
      max: 100
    }
  };

  //store user defined plugins here
  omniscroll.plugins = {};

  //configure settings
  omniscroll.configure = function(config){

    if (typeof config !== 'object') {
      throw new Error("Provide and object for omniscroll configuration");
    }

    objectility.extend(this.settings,config);

  };

  omniscroll.event = function(event,plugin){

    if (!event) {
      throw new Error("omniscroll.event can only consume events");
    }

    var delta = getDeltaObj(event);
    

    if (plugin) {

      var transform;

      //search for a registered plugin
      if (typeof plugin === 'string') {
        if (this.plugins[plugin]) {
          transform = this.plugins[plugin];
        }
        else {
          throw new Error('Could not found a registered plugin: ' + plugin);
        }
      }

      //use a plain function
      else if (typeof plugin === 'function') {
        transform = plugin;
      }
      else {
        throw new Error('Please register your plugin via omniscroll.plugin(name,fn) or use a plain function');
      }

      //make it so
      transform(event,delta);

    }

    var omniEvent = {
      originalEvent: event,
      delta: delta,
      type: 'omniscroll'
    };

    return omniEvent;
  };

  omniscroll.plugin = function(name,fn) {
    return omniscroll.plugins[name] = fn;
  };

  //register a noop plugin
  omniscroll.plugins['noop'] = function() {};

  return omniscroll;

}));