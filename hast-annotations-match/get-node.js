const debug = require("../logger")("hast-annotations-match");
const nodeSelector = require("./node-selector");
const simpleXpathSelector = require("./simple-xpath-selector");

module.exports = function getNode(tree, selector, annotation) {
  if (selector.type === "XPathSelector") {
    return simpleXpathSelector(tree, selector.value, annotation);
  } else if (selector.type === "CssSelector") {
    return nodeSelector(tree, selector.value, annotation);
  } else if (selector.type === "FragmentSelector") {
    return nodeSelector(tree, "#" + selector.value, annotation);
  } else {
    debug("Unsupported selector type");
    return null;
  }
};
