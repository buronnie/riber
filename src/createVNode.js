import { REACT_ELEMENT_TYPE } from './const';
import { typeNumber } from './utils';
import { Renderer } from './renderer';

const RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true,
};

function createTag(type) {
  let tag = 5; // default HostComponent
  if (type.call) {
    tag = 2; // ClassComponent
    if (type.prototype && type.prototype.render) {
      tag = 1; // FunctionalComponent
    }
  }
  return tag;
}

function createProps(type, config, children) {
  const props = {};
  let propName;
  for (propName in config) {
    if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
      props[propName] = config[propName];
    }
  }

  // Resolve default props
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }

  // Handle cases when children is not an array
  if (children.length === 1) {
    props.children = children[0];
  } else {
    props.children = children;
  }
  
  return props;
}

function createVNode(type, tag, props, key, ref, owner) {
  const ret = {
    type,
    tag,
    props,
  };
  if (tag === 6) {
    return ret;
  }
  ret.$$typeof = REACT_ELEMENT_TYPE;
  const refType = typeNumber(ref);

  if (refType === 2 || refType === 3 || refType === 4 || refType === 5 || refType === 8) {
    //boolean, number, string, function, object
    if (refType < 4) {
      ref += '';
    }
    ret.ref = ref;
  } else {
    ret.ref = null;
  }
  ret._owner = owner;

  return ret;
}

export function createVText(text) {
  return {
    type: '#text',
    tag: 6,
    props: { children: text },
  };
}

// Public API to create virtual dom nodes
export function createElement(type, config, ...children) {
  const tag = createTag(type);
  config = config || {};
  const ref = config.ref || null;
  const key = config.key || null;
  const props = createProps(type, config, children);

  return createVNode(type, tag, props, key, ref, Renderer.currentOwner);
}
