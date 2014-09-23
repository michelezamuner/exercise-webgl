'use strict';
var myfun = require('./myfun.js');
myfun();
// commento

var gl = null;
function getGLContext() {
  var canvas = document.getElementById('canvas-element-id');
  if (canvas === null) {
    alert('there is no canvas on this page');
    return;
  }
  
  var names =[ 'webgl',
               'experimental-webgl',
               'webkit-3d',
               'moz-webgl' ];

  for (var i = 0; i < names.length; ++i) {
    try {
      gl = canvas.getContext(names[i]);
    } catch (e) {}
    if (gl) { break; }
  }

  if (gl === null) {
    alert('WebGL is not available');
  } else {
    alert('Hooray! You got a WebGL context');
  }
}

window.onload = getGLContext();
