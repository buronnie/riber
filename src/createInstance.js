import Component, { updateComponent } from './Component';
import { Renderer } from './renderer';
import { returnFalse } from './utils';

export function createInstance(fiber, context) {
  const { type, props } = fiber;
  const instance = new type(props, context);
  if (!(instance instanceof Component)) {
    throw `${type.name} doesn't extend React.Component`;
  }

  instance.updater = {
    mountOrder: Renderer.mountOrder++,
    enqueueSetState: updateComponent,
    isMounted: returnFalse,
  };

  fiber.stateNode = instance;
  instance._reactInternalFiber = fiber;
  return instance;
}
