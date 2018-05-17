import { createInstance } from './createInstance';
import { typeNumber } from './utils';
import { createVText } from './createVNode';
import { extend } from './utils';
import { Fiber } from './fiber';

let lastText = null;
let lastKey = null;
let flattenObject = {};

function traverseAllChildren(children, prefix, index) {
  const type = typeNumber(children);
  
  if (type === 3 || type === 4) {
    if (lastText) {
      lastText.props.children += children;
    } else {
      lastKey = prefix + index;
      lastText = createVText(children);
    }
  } else {
    if (lastText) {
      flattenObject[lastKey] = lastText;
      lastKey = lastText = null;
    }
    if (type === 7) {
      prefix = prefix + index + '.';
      children.forEach((child, i) => {
        traverseAllChildren(child, prefix, i);
      });
      if (lastText) {
        flattenObject[lastKey] = lastText;
        lastKey = lastText = null;
      }
    } else {
      flattenObject[prefix + index] = children;
    }
  }
}

function fiberizeChildren(children, fiber) {
  flattenObject = {};
  lastKey = lastText = null;
  if (children !== void 0) {
    traverseAllChildren(children, '#', 0);
  }
  flattenObject = {};
  lastKey = lastText = null;
  return fiber.children = flattenObject;
}

function diff(parent, children) {
  const oldFibers = parent.children || {};
  const newFibers = fiberizeChildren(children);

  parent.child = null;
  let prevFiber = null;
  for (let key in newFibers) {
    let oldFiber = oldFibers[key];
    let newFiber = newFibers[key];
    if (oldFiber) {
      if (oldFiber.key === newFiber.key && oldFiber.type === newFiber.type) {
        newFiber = extend(oldFiber, newFiber);
      } else {
        newFiber = new Fiber(newFiber);
      }
      const alternate = new Fiber(oldFiber);
      newFiber.alternate = alternate;
      alternate.alternate = newFiber;
    } else {
      newFiber = new Fiber(newFiber);
    }

    newFiber.return = parent;
    if (prevFiber) {
      prevFiber.sibling = newFiber;
    } else {
      parent.child = newFiber;
    }
    prevFiber = newFiber;
  }
}

function updateClassComponent(fiber) {
  let instance = fiber.stateNode;

  if (!instance) {
    instance = createInstance(fiber, {});
  }

  // TODO: apply before update hooks

  const rendered = instance.render();
  diff(fiber, rendered);
}

function updateHostComponent(fiber) {
  const tag = fiber.tag;
  const children = fiber.props && fiber.props.children;
  const prev = fiber.alternate;
  if (tag === 5) {
    if (prev) {
      fiber.children = prev.children;
    }
    diff(fiber, children);
  }
}

export function updateEffects(fiber) {
  if (!fiber.isHostComponent()) {
    updateClassComponent(fiber);
  } else {
    updateHostComponent(fiber);
  }

  if (fiber.child) {
    return fiber.child;
  }

  let node = fiber;
  while (node) {
    if (node.sibling) {
      return node.sibling; 
    }
    node = node.return;
  }
}