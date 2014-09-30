'use strict';
require('script!jquery');

var GL = require('./gl.js');

var Modernizr = window.Modernizr;
if (undefined === Modernizr) {
  throw 'Modernizr not found!';
}

jQuery(function($) {
  if (Modernizr.webgl) {
    console.log('WebGL Yes!');
  } else {
    console.log('WebGL No!');
  }

  var $canvas = $('#canvas-element-id');
  var gl = new GL($canvas);

  $(window).keydown(function(event) {
    switch (event.which) {
      case 49: {
        gl.setClearColor(0.3, 0.7, 0.2, 1.0);
        break;
      }
      case 50: {
        gl.setClearColor(0.3, 0.2, 0.7, 1.0);
        break;
      }
      case 51: {
        var color = gl.getClearColor();
        console.log('clearColor = (' +
          window.Math.round(color[0] * 10) / 10 +
          ', ' + window.Math.round(color[1] * 10) / 10 +
          ', ' + window.Math.round(color[2] * 10) / 10 + ')');
        window.focus();
        break;
      }
    }
  });
});
