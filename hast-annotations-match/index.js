// const debug = require("../logger")("hast-annotations-match");
const rangeSelector = require("./range-selector");
const getNode = require("./get-node");
const processPositions = require("./process-positions");
const processQuotations = require("./process-quotations");
const { selectAll } = require("hast-util-select");
const info = require("property-information");
const h = require("hastscript");
// const visit = require("unist-util-visit-parents");
const props = [
  "x",
  "y",
  "width",
  "height",
  "textLength",
  "font-size",
  "data-annotation-id",
  "data-annotation-x",
  "data-annotation-y",
  "data-annotation-width",
  "data-annotation-height",
  "data-annotation-offset",
  "data-annotation-highlight",
  "data-annotation-transform",
  "data-annotation-highlight-box",
  "pointer-events",
  "transform",
  "fill",
  "class"
];
const attributes = {};
for (const prop of props) {
  attributes[prop] = info.find(info.svg, prop).property;
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

function matchAnnotations(tree, file, { annotations, url, canonical, notes }) {
  // iterate through annotations
  let positionAnnotations = [];
  let quoteAnnotations = [];
  for (const annotation of annotations) {
    const { target } = annotation;
    if (testSource(target.source)) {
      const { selector } = target;
      switch (selector.type) {
        case "TextQuoteSelector":
          // debug("using TextQuoteSelector");
          quoteAnnotations = quoteAnnotations.concat(annotation);
          break;
        case "TextPositionSelector":
          // debug("using TextPositionSelector");
          positionAnnotations = positionAnnotations.concat(annotation);
          break;
        case "RangeSelector":
          // debug("using RangeSelector");
          rangeSelector({ tree, selector, annotation });
          break;
        default:
          getNode({ tree, selector, annotation });
          break;
      }
    }
  }
  processPositions(tree, positionAnnotations);
  processQuotations(tree, quoteAnnotations);
  selectAll("svg", tree).forEach(svg => {
    const svgHighlights = selectAll("tspan[data-annotation-id]", svg).map(
      node => {
        const rect = h("rect");
        rect.properties[attributes["data-annotation-highlight-box"]] = node.properties["data-annotation-id"];
        rect.properties[attributes.x] =
          node.properties[attributes["data-annotation-x"]];
        rect.properties[attributes.y] =
          node.properties[attributes["data-annotation-y"]];
        rect.properties[attributes.width] =
          node.properties[attributes["data-annotation-width"]];
        rect.properties[attributes.height] =
          node.properties[attributes["data-annotation-height"]];
        rect.properties[attributes.transform] =
          node.properties[attributes["data-annotation-transform"]];
        rect.properties[attributes.fill] = "rgba(255, 255, 0, 0.35)";
        const classes = [];
        rect.properties[attributes.class] = classes.concat(
          node.properties[attributes.class]
        );
        rect.properties[attributes["pointer-events"]] = "none";
        return rect;
      }
    );
    svg.children = svg.children.concat(svgHighlights);
  });
  const sortedAnnotationsId = selectAll("[data-annotation-id]", tree).map(
    node => node.properties.dataAnnotationId
  );
  const sortedAnnotations = Array.from(new Set(sortedAnnotationsId)).map(id =>
    annotations.find(annotation => annotation.id === id)
  );
  file.data.annotations = sortedAnnotations;
  function testSource(source) {
    return source === url || source === canonical;
  }
  return tree;
}

// function addHighlights (node, ancestors) {
//   if (node.tagName === "tspan" && node.properties[attributes["data-annotation-id"]]) {
//     const rect = h("rect[data-annotation-highlight-box]")
//     rect.properties[attributes.x] = node.properties[attributes["data-annotation-x"]];
//     rect.properties[attributes.y] = node.properties[attributes["data-annotation-y"]];
//     rect.properties[attributes.width] = node.properties[attributes["data-annotation-width"]];
//     rect.properties[attributes.height] = node.properties[attributes["data-annotation-height"]];
//     rect.properties[attributes.transform] = node.properties[attributes["data-annotation-transform"]];
//     rect.properties[attributes.fill] = "rgba(255, 255, 0, 0.5)"
//     const classes = [];
//     node.properties[attributes.class] = classes
//       .concat(node.properties[attributes.class])
//   }
// }
