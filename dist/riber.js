(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.riber = factory());
}(this, (function () { 'use strict';

  var fakeWindow = {};
  function getWindow() {
    try {
      return window;
    } catch (e) {
      try {
        return global; //eslint-disable-line
      } catch (e) {
        return fakeWindow;
      }
    }
  }

  var window$1 = getWindow();
  var React = window$1.React;
  if (!React) {
    React = window$1.React = window$1.ReactDOM = {
      createElement: function createElement(a, b, c) {
        console.log(a);
        console.log(b);
        console.log(c);
        return "vdom";
      },
      render: function render(vdom, container) {
        console.log(vdom);
        console.log(container);
      }
    };
  }
  var React$1 = React;

  return React$1;

})));
