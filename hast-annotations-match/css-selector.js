import { select } from "hast-util-select";
import { addPropsToNode } from "./add-props-to-node.js";

/**
 *
 * @param {{tree: Object, value: string, annotation: Object, addProps: undefined | boolean}} param0 - selector options
 */
export function nodeSelector({ tree, value, annotation, addProps = true }) {
  const node = select(value, tree);
  if (node && addProps) {
    addPropsToNode(node, annotation);
  }
  return node;
}
