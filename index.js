var objectility = require('objectility');

//our to be exposed object literal
var omniscroll = {};

//default settings
omniscroll.settings = {
  keyboardFactor: 15,
  wheelFactor: 5,
  touchFactor: 2,
  preventDefault: true
};

//store user defined plugins here
omniscroll.plugins = {};

//store user defined transforms here
omniscroll.transforms = [];

//registers a plugin
omniscroll.plugin = function(name,fn) {
  return omniscroll.plugins[name] = fn;
};

//initializes omniscroll
omniscroll.init = function(config) {
  
  if (config && typeof config !== 'object') {
    throw new Error("Provide and object for omniscroll configuration");
  }

  objectility.extend(omniscroll.settings,config);

  //register default plugins
  var omniscrollKeyboard = require('../omniscroll-keyboard/index.js')(omniscroll,omniscroll.settings);
  var omniscrollWheel = require('../omniscroll-wheel/index.js')(omniscroll,omniscroll.settings);
  var omniscrollTouch = require('../omniscroll-touch/index.js')(omniscroll,omniscroll.settings);

  return omniscroll;
};

//consume delta values.
//provide a transform function as a the second argument for further transforms.
omniscroll.consume = function(delta,source){

  if (delta === undefined || typeof delta !== 'number') {
    throw new Error("omniscroll.consume wants an integer. hungry.");
  }

  //make the transforms happen
  if (omniscroll.transforms.length) {
    for (var i = 0; i < omniscroll.transforms.length; i++) {
      delta = omniscroll.transforms[i](delta);
    }
  }

  var output = {
    delta: delta,
    source: source
  };

  if (this.callback) {
    this.callback(output);
  }
};

omniscroll.transform = function(fn) {
  if (!fn || typeof fn !== 'function') {
    throw new Error("omniscroll.transform wants a function");
  }
  omniscroll.transforms.push(fn);
  return omniscroll;
};

omniscroll.onDelta = function(fn) {
  if (!fn || typeof fn !== 'function') {
    throw new Error("omniscroll.delta wants a function");
  }
  omniscroll.callback = fn;
};

//bind plugins
omniscroll.bind = function(element) {
  for (var p in this.plugins) {
    this.plugins[p].bind(element);
  }
  return omniscroll;
};

//unbind plugins
omniscroll.unbind = function(element) {
  for (var p in this.plugins) {
    this.plugins[p].unbind(element);
  }
  return omniscroll;
};

module.exports = omniscroll;