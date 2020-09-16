const info = require("property-information");
const toString = require("hast-util-to-string");

/* 
## Props
* `data-annotation-id`
* `data-selector-index`: index of mark in total number of marks for this selector
* `data-annotation-motivation`: annotations motivations
* `class` : styleClass
* `data-annotation-purpose`: body purposes
*/
const props = [
  "x",
  "y",
  "width",
  "height",
  "textLength",
  "font-size",
  "data-annotation-x",
  "data-annotation-y",
  "data-annotation-width",
  "data-annotation-height",
  "data-annotation-offset",
  "data-annotation-highlight",
  "data-annotation-transform",
  "transform"
];
const attributes = {};
for (const prop of props) {
  attributes[prop] = info.find(info.svg, prop).property;
}

module.exports = function addPropsToNode(svg, node, parent) {
  if (!svg) return;
  const parentLength = toString(parent).length;
  const nodeLength = toString(node).length;
  const offset = parentLength - nodeLength;
  const width = Number.parseFloat(
    parent.properties[attributes.textLength] ||
      parent.properties[attributes.width]
  );
  const nodeWidth = String((nodeLength / parentLength) * width + 30);
  const offsetWidth = (offset / parentLength) * width;
  const height = String(
    Number.parseFloat(parent.properties[attributes["font-size"]]) + 30
  );
  const x = Number.parseFloat(parent.properties[attributes.x] || 0) - 15;
  const y = Number.parseFloat(parent.properties[attributes.y] || 0) - 15 - height;
  node.properties[attributes["data-annotation-x"]] = String(x + offsetWidth);
  node.properties[attributes["data-annotation-y"]] = String(y);
  node.properties[attributes["data-annotation-width"]] = nodeWidth;
  node.properties[attributes["data-annotation-height"]] = height;
  node.properties[attributes["data-annotation-transform"]] =
    node.properties[attributes.transform];
};
