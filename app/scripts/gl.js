'use strict';

var GL = function($canvas) {
  if (0 === $canvas.length) {
    throw 'There is no canvas on this page';
  }

  this._$canvas = $canvas;
  this._context = this._initContext();

  if (null === this._context) {
    throw 'WebGL is not available';
  }
};

GL.prototype.getContext = function() {
  return this._context;
};

GL.prototype.getClearColor = function() {
  return this._context.getParameter(this._context.COLOR_CLEAR_VALUE);
};

GL.prototype.setClearColor = function(r, g, b, a) {
  this._context.clearColor(r, g, b, a);
  this._context.clear(this._context.COLOR_BUFFER_BIT);
  this._context.viewport(0, 0, 0, 0);
};

GL.prototype._initContext = function() {
  var names = [ 'webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl' ];
  var context = null;

  for (var i = 0; i < names.length; i++) {
    try {
      context = this._$canvas[0].getContext(names[i]);
    } catch (e) {}
    if (context) { break; }
  }

  return context;
};

module.exports = GL;
