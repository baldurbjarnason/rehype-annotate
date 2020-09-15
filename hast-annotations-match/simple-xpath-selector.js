const addPropsToNode = require("./add-props-to-node");

// Based on simple-xpath-selector from https://github.com/tilgovi/simple-xpath-position/blob/master/src/xpath.js MIT license

module.exports = simpleXpathSelector;

/**
 *
 * @param {{tree: Object, value: string, annotation: Object, addProps: undefined | boolean}} param0 - selector options
 */
function simpleXpathSelector({ tree, value, annotation, addProps = true }) {
  const node = fallbackResolve(value, tree);
  if (node && addProps) {
    addPropsToNode(node, annotation);
  }
  return node;
}

/**
 *
 * @param {string} path - the xpath string
 * @param {*} root
 */
function fallbackResolve(path, root) {
  const steps = path.split("/");
  let node = root;
  while (node) {
    const step = steps.shift();
    if (step === undefined) break;
    if (step === ".") continue;
    // eslint-disable-next-line
    let [name, xpathPosition] = step.split(/[\[\]]/); // prettier-ignore
    name = name.replace("_default_:", "");
    const position = xpathPosition ? parseInt(xpathPosition) : 1;
    node = findChild(node, name, position);
  }
  return node;
}
function findChild(node, name, position) {
  const parent = node;
  while (node) {
    if (nodeName(node) === name && --position === 0) break;
    node = nextNode(node, parent);
  }
  return node;
}

function nextNode(node, parent) {
  const index = parent.children.indexOf(node);
  if (parent.children[index + 1]) {
    return parent.children[index + 1];
  } else {
    return null;
  }
}

function nodeName(node) {
  if (node.tagName) {
    return node.tagName.toLowerCase();
  }
  return "";
}
