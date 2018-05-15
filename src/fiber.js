import { isValidRoot, extend } from './utils';

function emptyQueue() {
  return {
    pendingStates: [],
    pendingCbs: []
  };
}

const topFibers = [];
const topNodes = [];

export class Fiber {
  constructor(vnode) {
    extend(this, vnode);
    let type = vnode.type;
    this.name = type.displayName || type.name || type;
    this.effectTag = 1;
    this.updateQueue = emptyQueue();
  }

  mergeUpdate(state, callback) {
    if (state) {
      this.updateQueue.pendingStates.push(state);
    }
    if (callback) {
      this.updateQueue.pendingCbs.push(callback);
    }
  }
}

export function createRootFiber(root) {
  if (!isValidRoot(root)) {
    throw 'root is not valid';
  }

  const rootFiber = new Fiber({
    stateNode: root,
    tag: 5,
    name: 'hostRoot',
    boundaries: [],
    capturedValues: [],
    contextStack: [{}],
    containerStack: [root],
    microtasks: [],
    type: root.nodeName || root.type
  });
  root._reactInternalFiber = rootFiber;
  topNodes.push(root);
  topFibers.push(rootFiber);
  return rootFiber;
}

export function getFiberFromInstance(instance) {
  return instance._reactInternalFiber;
}
