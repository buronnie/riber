import { extend } from './utils.js';
export function createRenderer(methods) {
  return extend(Renderer, methods);
}

export const Renderer = {
  controlledCbs: [],
  mountOrder: 1,
  macrotasks:[],
  boundaries: [],
  //catchError
  //catchBoundary
  //catchTry
  //hasError
  currentOwner: null, //vnode
};
