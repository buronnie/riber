export let __type = Object.prototype.toString;

export function extend(obj, props) {
  for (let i in props) {
    if (hasOwnProperty.call(props, i)) {
      obj[i] = props[i];
    }
  }
  return obj;
}

export function returnFalse() {
  return false;
}

export function returnTrue() {
  return true;
}

var fakeWindow = {};
export function getWindow() {
  try {
    return window;
  } catch (e) {
    try {
      return global; //eslint-disable-line
    } catch (e) {
      return fakeWindow;
    }
  }
}

const numberMap = {
  '[object Boolean]': 2,
  '[object Number]': 3,
  '[object String]': 4,
  '[object Function]': 5,
  '[object Symbol]': 6,
  '[object Array]': 7,
};

// undefined: 0, null: 1, boolean:2, number: 3, string: 4, function: 5, symbol:6, array: 7, object:8
export function typeNumber(data) {
  if (data === null) {
    return 1;
  }
  if (data === void 666) {
    return 0;
  }
  let a = numberMap[__type.call(data)];
  return a || 8;
}

export function isValidRoot(root) {
  return root && root.appendChild;
}
