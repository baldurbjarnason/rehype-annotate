const { select } = require("hast-util-select");
const info = require("property-information");
const debug = require("../logger")("hast-annotations-match");

const props = [
  "data-annotations-id",
  "data-selector-index",
  "data-annotations-motivation",
  "class",
  "data-annotations-purpose",
  "data-annotations-creator"
];
const attributes = {};
for (const prop of props) {
  attributes[prop] = info.find(info.html, prop).property;
}

module.exports = matchAnnotations;

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

## Props
* `data-annotations-id`
* `data-selector-index`: index of mark in total number of marks for this selector
* `data-annotations-motivation`: annotations motivations
* `class` : styleClass
* `data-annotations-purpose`: body purposes
* `data-annotations-creator` 
*/

function matchAnnotations(tree, file, { annotations, url, canonical }) {
  // iterate through annotations
  for (const annotation of annotations) {
    const { target } = annotation;
    if (testSource(target.source)) {
      const { selector } = target;
      switch (selector.type) {
        // if target uses fragmentSelector: select with '#' prefix
        case "FragmentSelector":
          debug("using FragmentSelector");
          nodeSelector(tree, "#" + selector.value, annotation);
          break;
        // if target uses CSS selector: use select
        case "CssSelector":
          debug("using CssSelector");
          nodeSelector(tree, selector.value, annotation);
          break;
        // if target uses Xpath selector: warn that it's unsupported using file.message
        case "XPathSelector":
          debug("using XPathSelector");
          simpleXpathSelector(tree, selector.value, annotation);
          break;
        // if target uses text position selector: add to process queue
        case "TextQuoteSelector":
          debug("using TextQuoteSelector");
          break;
        // if target uses text-quote selector: convert to text position and add to process queue
        case "TextPositionSelector":
          debug("using TextPositionSelector");
          break;
        case "RangeSelector":
          break;
        default:
          break;
      }
    }
  }
  function testSource(source) {
    return source === url || source === canonical;
  }
  return tree;
}

function nodeSelector(tree, value, annotation) {
  const node = select(value, tree);
  if (node) {
    addPropsToNode(node, annotation);
  }
}

// Based on simple-xpath-selector from https://github.com/tilgovi/simple-xpath-position/blob/master/src/xpath.js MIT license
// Doesn't actually work
function simpleXpathSelector(tree, value, annotation) {
  const node = fallbackResolve(value, tree);
  if (node) {
    addPropsToNode(node, annotation);
  }
}

function fallbackResolve(path, root) {
  const steps = path.split("/");
  let node = root;
  while (node) {
    const step = steps.shift();
    if (step === undefined) break;
    if (step === ".") continue;
    // eslint-disable-next-line
    let [name, position] = step.split(/[\[\]]/); // prettier-ignore
    name = name.replace("_default_:", "");
    position = position ? parseInt(position) : 1;
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

function addPropsToNode(node, annotation, index = 0) {
  const { target } = annotation;
  const { body = [] } = annotation;
  let purposes = body.map(item => item.purpose);
  purposes = [].concat(...purposes);
  node.properties[attributes["data-annotations-id"]] = annotation.id;
  node.properties[attributes["data-selector-index"]] = index;
  node.properties[attributes["data-annotations-motivation"]] = []
    .concat(annotation.motivation)
    .join(" ,");
  if (target.styleClass) {
    const classes = node.properties[attributes.class] || [];
    node.properties[attributes.class] = classes
      .concat(target.styleClass)
      .filter(item => item);
  }
  if (purposes.length !== 0) {
    node.properties[attributes["data-annotations-purpose"]] = purposes;
  }
  if (annotation.creator && annotation.creator.id) {
    node.properties[attributes["data-annotations-creator"]] =
      annotation.creator.id;
  }
}
