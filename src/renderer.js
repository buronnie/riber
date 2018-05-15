export const Renderer = {
  macrotasks: [],
  currentOwner: null,
  mountOrder: 0,
};

export function emptyElement(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}
