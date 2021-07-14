import { find, svg } from "property-information";
import pixelWidth from "string-pixel-width";
import toString from "hast-util-to-string";

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
  "transform",
];
const attributes = {};
for (const prop of props) {
  attributes[prop] = find(svg, prop).property;
}

export function addParentProps(svg, node, parent) {
  if (!svg) return;
  const fontSize = Number.parseFloat(
    parent.properties[attributes["font-size"]] || 16
  );
  const parentPixelWidth = pixelWidth(toString(parent), {
    size: fontSize,
    font: "helvetica",
  });
  const nodePixelWidth = pixelWidth(toString(node), {
    size: fontSize,
    font: "helvetica",
  });
  // const offset = parentLength - nodeLength;
  const width = Number.parseFloat(
    parent.properties[attributes.textLength] || parentPixelWidth
  );
  const nodeWidth = (nodePixelWidth / parentPixelWidth) * width;
  const offsetWidth = width - nodeWidth;
  const height = fontSize + 40;
  const x = Number.parseFloat(parent.properties[attributes.x] || 0);
  const y =
    Number.parseFloat(parent.properties[attributes.y] || 0) - 20 - fontSize;
  node.properties[attributes["data-annotation-x"]] = String(
    x + offsetWidth - 20
  );
  node.properties[attributes["data-annotation-y"]] = String(y);
  node.properties[attributes["data-annotation-width"]] = String(nodeWidth + 40);
  node.properties[attributes["data-annotation-height"]] = String(height);
  node.properties[attributes["data-annotation-transform"]] =
    node.properties[attributes.transform];
}
