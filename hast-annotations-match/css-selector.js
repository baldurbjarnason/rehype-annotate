const { select } = require("hast-util-select");
const addPropsToNode = require("./add-props-to-node");

module.exports = function nodeSelector({
  tree,
  value,
  annotation,
  addProps = true,
  stimulus
}) {
  const node = select(value, tree);
  if (node && addProps) {
    addPropsToNode(node, annotation, { stimulus });
  }
  return node;
};
