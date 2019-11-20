const info = require("property-information");

/* 
## Props
* `data-annotations-id`
* `data-selector-index`: index of mark in total number of marks for this selector
* `data-annotations-motivation`: annotations motivations
* `class` : styleClass
* `data-annotations-purpose`: body purposes
* `data-annotations-creator` 
*/
const props = [
  "data-annotations-id",
  "data-controller",
  "data-annotations-motivation",
  "class",
  "data-annotations-purpose"
];
const attributes = {};
for (const prop of props) {
  attributes[prop] = info.find(info.html, prop).property;
}

module.exports = function addPropsToNode(node, annotation) {
  const { target } = annotation;
  const { body = [] } = annotation;
  let purposes = body.map(item => item.purpose);
  purposes = [].concat(...purposes);
  node.properties[attributes["data-annotations-id"]] = annotation.id;
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
};
