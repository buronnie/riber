import { updateEffects } from './diff';
import { commitWork } from './commit';
import { Renderer } from './renderer';

const macrotasks = Renderer.macrotasks;

function getNextUnitOfWork() {
  if (macrotasks.length > 0) {
    return macrotasks.shift();
  }
}

function workLoop(deadline) {
  let fiber = getNextUnitOfWork();
  while (fiber && deadline > 0) {
    fiber = updateEffects(fiber);
  }

  commitWork();
}

function performWork() {
  workLoop(1);
}

export function scheduleWork() {
  performWork();
}