// const debug = require("../logger")("hast-annotations-match");
const nodeSelector = require("./css-selector");
const simpleXpathSelector = require("./simple-xpath-selector");
const processPositions = require("./process-positions");
const processQuotations = require("./process-quotations");
const selectors = {
  XPathSelector: simpleXpathSelector,
  CssSelector: nodeSelector,
  FragmentSelector: ({
    tree,
    value,
    annotation,
    addProps = true,
    stimulus
  }) => {
    return nodeSelector({
      tree,
      value: "#" + value,
      annotation,
      addProps,
      stimulus
    });
  }
};

module.exports = getNode;

/**
 *
 * @param {{tree: Object, selector: Object, annotation: Object, stimulus: boolean}} param0 - selector options
 */
function getNode({ tree, selector, annotation, stimulus }) {
  // Need to check `refinedBy`. If so and refining selector is quote or text-position then process using node as root tree
  if (selector.refinedBy) {
    const node = selectors[selector.type]({
      tree,
      value: selector.value,
      annotation,
      addProps: false,
      stimulus
    });
    const target = { ...annotation.target, selector: selector.refinedBy };
    if (selector.refinedBy.type === "TextQuoteSelector") {
      processQuotations(node, [{ ...annotation, target }], { stimulus });
    } else if (selector.refinedBy.type === "TextPositionSelector") {
      processPositions(node, [{ ...annotation, target }], { stimulus });
    } else {
      return selectors[selector.refinedBy.type]({
        tree: node,
        value: selector.refinedBy.value,
        annotation: {
          ...annotation,
          target
        },
        stimulus
      });
    }
  } else {
    return selectors[selector.type]({
      tree,
      value: selector.value,
      annotation,
      stimulus
    });
  }
}
