// const debug = require("../logger")("hast-annotations-match");
const nodeSelector = require("./node-selector");
const simpleXpathSelector = require("./simple-xpath-selector");
const selectors = {
  XPathSelector: simpleXpathSelector,
  CssSelector: nodeSelector,
  FragmentSelector: (tree, value, annotation) => {
    return nodeSelector(tree, "#" + value, annotation);
  }
};

module.exports = function getNode(tree, selector, annotation) {
  return selectors[selector.type](tree, selector.value, annotation);
};
