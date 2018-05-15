import { Renderer } from './renderer';
import { returnTrue, returnFalse } from './utils';
import { scheduleWork } from './scheduler';
import { getFiberFromInstance } from './fiber';

const fakeObject = {
  isMounted: returnFalse,
  enqueueSetState: returnFalse,
};

export function updateComponent(instance, state) {
  const fiber = getFiberFromInstance(instance);
  Renderer.macrotasks.push(fiber);
  fiber.mergeUpdate(state);
  scheduleWork();
}

export default class Component {
  constructor(props, context) {
    Renderer.currentOwner = this;
    this.context = context;
    this.props = props;
    this.refs = fakeObject;
    this.updater = null;
    this.state = null;
  }

  replaceState() {
  }

  isReactComponent() {
    returnTrue();
  }

  isMounted() {
    return this.updater.isMounted(this);
  }

  setState(state, cb) {
    this.updater.enqueueSetState(this, state, cb);
  }

  forceUpdate(cb) {
    this.updater.enqueueSetState(this, true, cb);
  }

  render() {
    throw 'must implement render';
  }
}