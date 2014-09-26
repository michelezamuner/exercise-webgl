'use strict';
var myfun = require('./myfun.js');
myfun();

var Modernizr = window.Modernizr;
if (undefined === Modernizr) {
  throw 'Modernizr not found!';
}

var jquery = require('jquery');

var gl = null;
var cWidth = 0;
var cHeight = 0;

function clear(ctx) {
  ctx.clear(ctx.COLOR_BUFFER_BIT);
  ctx.viewport(0, 0, cWidth, cHeight);
}

function checkKey(ev) {
  switch(ev.keyCode) {
    case 49: { // 1
      gl.clearColor(0.3, 0.7, 0.2, 1.0);
      clear(gl);
      break;
    }
    case 50: { // 2
      gl.clearColor(0.3, 0.2, 0.7, 1.0);
      clear(gl);
      break;
    }
    case 51: { // 3
      var color = gl.getParameter(gl.COLOR_CLEAR_VALUE);
      console.log('clearColor = (' + 
        window.Math.round(color[0] * 10) / 10 +
        ', ' + window.Math.round(color[1] * 10) / 10 +
        ', ' + window.Math.round(color[2] * 10) / 10 + ')');
      window.focus();
      break;
    }
  }
}

window.onkeydown = checkKey;

function getGLContext() {
  var canvas = document.getElementById('canvas-element-id');
  if( null === canvas) {
    console.log('there is no canvas on this page');
    return;
  }

  var names = [ 'webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];
  var ctx = null;
  for (var i = 0; i < names.length; ++i) {
    try {
      ctx = canvas.getContext(names[i]);
    } catch (e) {}
    if (ctx) { break; }
  }

  if (null === ctx) {
    console.log('WebGL is not available');
  } else {
    return ctx;
  }
}

jquery(function($) {
  console.log('Inside jquery!');
  console.log($('body'));
  if (Modernizr.webgl) {
    console.log('WebGL Yes!');
  } else {
    console.log('WebGL No!');
  }

  gl = getGLContext();
});
