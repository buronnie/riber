import { getWindow } from './utils';
import { createElement } from './createVNode';
import { render } from './DOMRender';

const window = getWindow();
let React = window.React;
if (!React) {
  React = window.React = window.ReactDOM = {
    createElement,
    render,
  };
}
export default React;
