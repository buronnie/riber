import { createRootFiber, Fiber } from './fiber';
import Unbatch from './Unbatch';
import { createInstance } from './createInstance';
import { returnTrue } from './utils';
import { emptyElement } from './renderer';
import { updateComponent } from './Component';

// TOP LEVEL API
export function render(vnode, root, cb) {
  const rootFiber = createRootFiber(root);
  
  if (!rootFiber.hostRoot) {
    const unbatchFiber = new Fiber({
      type: Unbatch,
      tag: 2,
      props: {},
      memoizedState: {},
      return: rootFiber
    });
    rootFiber.child = unbatchFiber;
    const unbatchInstance = createInstance(unbatchFiber, {});
    unbatchInstance.updater.isMounted = returnTrue;
    rootFiber.hostRoot = unbatchInstance;
    emptyElement(rootFiber.stateNode);
  }

  updateComponent(rootFiber.hostRoot, { child: vnode });
}
