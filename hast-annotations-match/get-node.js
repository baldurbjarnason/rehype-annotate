// const debug = require("../logger")("hast-annotations-match");
import { nodeSelector } from "./css-selector.js";
import { simpleXpathSelector } from "./simple-xpath-selector.js";
import { processPositions } from "./process-positions.js";
import { processQuotations } from "./process-quotations.js";
const selectors = {
  XPathSelector: simpleXpathSelector,
  CssSelector: nodeSelector,
  FragmentSelector: ({ tree, value, annotation, addProps = true }) => {
    return nodeSelector({
      tree,
      value: "#" + value,
      annotation,
      addProps,
    });
  },
};

/**
 *
 * @param {{tree: Object, selector: Object, annotation: Object}} param0 - selector options
 */
export function getNode({ tree, selector, annotation }) {
  // Need to check `refinedBy`. If so and refining selector is quote or text-position then process using node as root tree
  if (selector.refinedBy) {
    const node = selectors[selector.type]({
      tree,
      value: selector.value,
      annotation,
      addProps: false,
    });
    const target = { ...annotation.target, selector: selector.refinedBy };
    if (selector.refinedBy.type === "TextQuoteSelector") {
      processQuotations(node, [{ ...annotation, target }]);
    } else if (selector.refinedBy.type === "TextPositionSelector") {
      processPositions(node, [{ ...annotation, target }]);
    } else {
      return selectors[selector.refinedBy.type]({
        tree: node,
        value: selector.refinedBy.value,
        annotation: {
          ...annotation,
          target,
        },
      });
    }
  } else {
    return selectors[selector.type]({
      tree,
      value: selector.value,
      annotation,
    });
  }
}
