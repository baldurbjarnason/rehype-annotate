// const debug = require("../logger")("hast-annotations-match");
const nodeSelector = require("./css-selector");
const simpleXpathSelector = require("./simple-xpath-selector");
const processPositions = require("./process-positions");
const processQuotations = require("./process-quotations");
const selectors = {
  XPathSelector: simpleXpathSelector,
  CssSelector: nodeSelector,
  FragmentSelector: (tree, value, annotation, addProps = true) => {
    return nodeSelector(tree, "#" + value, annotation, addProps);
  }
};

module.exports = function getNode(tree, selector, annotation) {
  // Need to check `refinedBy`. If so and refining selector is quote or text-position then process using node as root tree
  if (selector.refinedBy) {
    const node = selectors[selector.type](
      tree,
      selector.value,
      annotation,
      false
    );
    const target = { ...annotation.target, selector: selector.refinedBy };
    if (selector.refinedBy.type === "TextQuoteSelector") {
      processQuotations(node, null, [{ ...annotation, target }]);
    } else if (selector.refinedBy.type === "TextPositionSelector") {
      processPositions(node, null, [{ ...annotation, target }]);
    } else {
      return selectors[selector.refinedBy.type](
        node,
        selector.refinedBy.value,
        {
          ...annotation,
          target
        }
      );
    }
  } else {
    return selectors[selector.type](tree, selector.value, annotation);
  }
};
