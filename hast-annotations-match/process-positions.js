const visit = require("unist-util-visit");
const addPropsToNode = require("./add-props-to-node");
const h = require("hastscript");
// const debug = require("../logger")("process-positions");

/* 
## `hast-annotations-match`
_called with -> (tree, annotations) -> modified tree with annotations data prop_

Modifies the hast tree to include annotations properties and marks for highlights. Returns a modified tree with a sorted annotations collection under `data.annotations` on the root element.

For each selector:
1. Match to node: 
	* Node-based: select node and add properties (id, index, motivation, styleClass).
		* If has refinedBy, call Quote-based processing with selected node as root.
	* Quote-based: convert to text positions
2. Visit tree with parents:
	1. If highlight motivation
		1. Node-based: if highlight motivation, add marks to all text children. Add props to marks
		2. If text position, split at offsets and wrap selected in marks, then links (if it has linking purpose). Do not wrap Text nodes that already have mark parents. Add props to marks.
3. Add included stylesheets to head.
4. Add default annotations stylesheet to head.
5. Add link to annotations collection id in head
*/

module.exports = function processPositions(tree, file, positionAnnotations) {
  // Sort annotations based on selector.start, merge overlapping annotations
  positionAnnotations.sort((a, b) => a.start - b.start);
  // shift first annotation
  let annotation = getAnnotation(positionAnnotations);
  // visit tree with parents, filtering on text nodes, maintaining character count
  let count = 0;
  const replacementActions = [];
  visit(tree, "text", visitor);
  replacementActions.forEach(fn => fn());
  function visitor(node, index, parent) {
    if (!annotation) return;
    // What should we do if the node selector has a highlighting purpose?
    // -> The sensible solution is that highlights with a node selector are rendered differently (e.g. border or background behind entire node)
    // That way we have fewer nestd marks to worry about.
    // const { start, end } = annotation.target.selector;
    // debug("visitor start: ", count, start, end, count + node.value.length);
    visitNode({ count, currentAnnotation: annotation, node, parent, index });
    count = count + node.value.length;
  }
  function visitNode({ count, currentAnnotation, node, parent, index }) {
    const { end } = currentAnnotation.target.selector;
    const startInNode = startIsInNode(count, currentAnnotation, node);
    const endInNode = endIsInNode(count, currentAnnotation, node);
    const { replacement, suffix } = processNode({
      startInNode,
      endInNode,
      count,
      node,
      currentAnnotation
    });
    if (replacement) {
      replacementActions.push(() => {
        parent.children.splice(index, 1, ...replacement);
      });
    }
    if (endInNode) {
      annotation = getAnnotation(positionAnnotations);
      if (suffix && annotation) {
        visitNode({
          count: end,
          currentAnnotation: annotation,
          node: suffix,
          parent,
          index: parent.children.indexOf(suffix)
        });
      }
    }
  }
};

function wrapNode(text, index, annotation) {
  // If we decide to support linking purposes by rendering actual links then we need to change this and make sure we don't render nested links.
  // It's actually simpler in the meantime to support linking purposes by rendering a link button either after highlight or in sidebar.
  const node = h("mark", text);
  addPropsToNode(node, annotation, index);
  return node;
}
function getAnnotation(positionAnnotations) {
  const annotation = positionAnnotations.shift();
  if (annotation) {
    annotation.__index = 0;
  }
  return annotation;
}

function startIsInNode(count, currentAnnotation, node) {
  const { start } = currentAnnotation.target.selector;
  let startInNode = false;
  if (count <= start && start <= count + node.value.length) {
    startInNode = true;
    // debug("start is in node");
  }
  return startInNode;
}

function endIsInNode(count, currentAnnotation, node) {
  const { end } = currentAnnotation.target.selector;
  let endInNode = false;
  if (count <= end && end <= count + node.value.length) {
    endInNode = true;
    // debug("end is in node");
  }
  return endInNode;
}

function processNode({
  startInNode,
  endInNode,
  count,
  node,
  currentAnnotation
}) {
  const { start, end } = currentAnnotation.target.selector;
  let replacement;
  let suffix;
  if (startInNode && endInNode) {
    const firstSplit = start - count;
    const secondSplit = end - count;
    const prefix = { type: "text", value: node.value.slice(0, firstSplit) };
    const wrappedNode = wrapNode(
      node.value.slice(firstSplit, secondSplit),
      currentAnnotation.__index,
      currentAnnotation
    );
    const suffixValue = node.value.slice(secondSplit);
    if (suffixValue.length !== 0) {
      suffix = { type: "text", value: node.value.slice(secondSplit) };
    }
    replacement = [prefix, wrappedNode, suffix];
    // else if (start) split at start, wrap the rest
  } else if (startInNode) {
    const firstSplit = start - count;
    const prefix = { type: "text", value: node.value.slice(0, firstSplit) };
    const wrappedNode = wrapNode(
      node.value.slice(firstSplit),
      currentAnnotation.__index,
      currentAnnotation
    );
    replacement = [prefix, wrappedNode];
    // else if (end) split at end, wrap beginning
  } else if (endInNode) {
    const secondSplit = end - count;
    const wrappedNode = wrapNode(
      node.value.slice(0, secondSplit),
      currentAnnotation.__index,
      currentAnnotation
    );
    suffix = { type: "text", value: node.value.slice(secondSplit) };
    replacement = [wrappedNode, suffix];
    // if node is entirely within selector range, wrap contents
  } else if (
    start < count &&
    count + node.value.length < end &&
    node.value.trim()
  ) {
    // debug("whitespace: ", !node.value.trim());
    replacement = [wrapNode(node.value, 0, currentAnnotation)];
  }
  return { replacement, suffix };
}
