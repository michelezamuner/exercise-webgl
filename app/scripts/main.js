'use strict';
var myfun = require('./myfun.js');
myfun();

var Modernizr = window.Modernizr;
if (undefined === Modernizr) {
  throw 'Modernizr not found!';
}

var jquery = require('jquery');

jquery(function($) {
  console.log('Inside jquery!');
  console.log($('body'));
  if (Modernizr.webgl) {
    console.log('WebGL Yes!');
  } else {
    console.log('WebGL No!');
  }
});
