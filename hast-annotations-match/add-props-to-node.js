import { find, html } from "property-information";

/* 
## Props
* `data-annotation-id`
* `data-selector-index`: index of mark in total number of marks for this selector
* `data-annotation-motivation`: annotations motivations
* `class` : styleClass
* `data-annotation-purpose`: body purposes
*/
const props = [
  "data-annotation-id",
  "data-controller",
  "data-annotation-motivation",
  "class",
  "data-annotation-purpose",
  "data-annotation-type",
  "data-target",
];
const attributes = {};
for (const prop of props) {
  attributes[prop] = find(html, prop).property;
}

export function addPropsToNode(node, annotation) {
  // console.log("does this get called?: ", node, annotation);
  const { target } = annotation;
  const { body = [] } = annotation;
  let purposes = body.map((item) => item.purpose);
  purposes = [].concat(...purposes);
  node.properties[attributes["data-annotation-id"]] = annotation.id;
  node.properties[attributes["data-annotation-motivation"]] = []
    .concat(annotation.motivation)
    .join(" ,");
  if (target.styleClass) {
    const classes = node.properties[attributes.class] || [];
    node.properties[attributes.class] = classes
      .concat(target.styleClass)
      .filter((item) => item);
  }
  if (purposes.length !== 0) {
    node.properties[attributes["data-annotation-purpose"]] = purposes;
  }
}
