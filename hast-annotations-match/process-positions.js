const visit = require("unist-util-visit-parents");
const addPropsToNode = require("./add-props-to-node");
const h = require("hastscript");
const addParentProps = require("./add-parent-props");
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

module.exports = function processPositions(tree, positionAnnotations) {
  // Sort annotations based on selector.start
  positionAnnotations.sort(
    (a, b) => a.target.selector.start - b.target.selector.start
  );
  // shift first annotation
  let annotation = getAnnotation(positionAnnotations);
  // visit tree with parents, filtering on text nodes, maintaining character count
  let count = 0;
  const replacementActions = [];
  visit(tree, "text", visitor);
  replacementActions.forEach(fn => fn());
  function visitor(node, ancestors) {
    if (!annotation) return;
    visitNode({
      count,
      currentAnnotation: annotation,
      node,
      ancestors
    });
    count = count + node.value.length;
  }
  function visitNode({ count, currentAnnotation, node, ancestors }) {
    const parent = ancestors[ancestors.length - 1];
    let textElement = node;
    if (node.tagName !== "text") {
      textElement = ancestors.find(node => node.tagName === "text");
    }
    const { end } = currentAnnotation.target.selector;
    const startInNode = startIsInNode(count, currentAnnotation, node);
    const endInNode = endIsInNode(count, currentAnnotation, node);
    const { replacement, suffix } = processNode({
      startInNode,
      endInNode,
      count,
      node,
      svg: ancestors[ancestors.map(node => node.tagName).lastIndexOf("svg")],
      currentAnnotation,
      parent: textElement
    });
    if (replacement) {
      replacementActions.push(() => {
        const newIndex = parent.children.indexOf(node);
        parent.children.splice(newIndex, 1, ...replacement);
      });
    }
    if (endInNode) {
      annotation = getAnnotation(positionAnnotations);
      if (suffix && annotation) {
        visitNode({
          count: end,
          currentAnnotation: annotation,
          node: suffix,
          ancestors
        });
      }
    }
  }
};

function wrapNode(text, annotation, svg, parent) {
  // If we decide to support linking purposes by rendering actual links then we need to change this and make sure we don't render nested links.
  // It's actually simpler in the meantime to support linking purposes by rendering a link button either after highlight or in sidebar.
  const node = h(svg ? "tspan" : "mark", text);
  addPropsToNode(node, annotation);
  addParentProps(svg, node, parent);
  return node;
}
function getAnnotation(positionAnnotations) {
  const annotation = positionAnnotations.shift();
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
  currentAnnotation,
  svg,
  parent
}) {
  const { start, end } = currentAnnotation.target.selector;
  let replacement;
  let suffix;
  if (startInNode && endInNode) {
    const firstSplit = start - count;
    const secondSplit = end - count;
    const prefix = { type: "text", value: node.value.slice(0, firstSplit) };
    const nodeValue = node.value.slice(firstSplit, secondSplit);
    if (nodeValue.trim()) {
      const wrappedNode = wrapNode(
        node.value.slice(firstSplit, secondSplit),
        currentAnnotation,
        svg,
        parent
      );
      const suffixValue = node.value.slice(secondSplit);
      suffix = { type: "text", value: suffixValue };
      replacement = [prefix, wrappedNode, suffix];
    }
    // else if (start) split at start, wrap the rest
  } else if (startInNode) {
    const firstSplit = start - count;
    const prefix = { type: "text", value: node.value.slice(0, firstSplit) };
    const nodeValue = node.value.slice(firstSplit);
    if (nodeValue.trim()) {
      const wrappedNode = wrapNode(
        node.value.slice(firstSplit),
        currentAnnotation,
        svg,
        parent
      );
      replacement = [prefix, wrappedNode];
    }
    // else if (end) split at end, wrap beginning
  } else if (endInNode) {
    const secondSplit = end - count;
    const wrappedNode = wrapNode(
      node.value.slice(0, secondSplit),
      currentAnnotation,
      svg,
      parent
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
    replacement = [wrapNode(node.value, currentAnnotation, svg, parent)];
  }
  return { replacement, suffix };
}
