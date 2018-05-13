import { getWindow } from './utils';
import { createElement } from './createElement.js';

const window = getWindow();
let React = window.React;
if (!React) {
  React = window.React = window.ReactDOM = {
    createElement: (a, b, c) => { 
      console.log(a);
      console.log(b); 
      console.log(c);
      return "vdom";
    },
    render: (vdom, container) => {
      console.log(vdom);
      console.log(container);
    },
  };
}
export default React;
