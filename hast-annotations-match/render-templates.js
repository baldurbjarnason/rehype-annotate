// @ts-ignore
const gh = require("hast-util-sanitize/lib/github");
const sanitize = require("rehype-sanitize");
const unified = require("unified");
const parse = require("rehype-parse");
const info = require("property-information");
const markdown = require("remark-parse");
const remark2rehype = require("remark-rehype");
const stringify = require("rehype-stringify");
const raw = require("rehype-raw");
const h = require("hastscript");

/* 
## Props
* `data-annotation-id`
* `data-selector-index`: index of mark in total number of marks for this selector
* `data-annotation-motivation`: annotations motivations
* `class` : styleClass
* `data-annotation-purpose`: body purposes
*/
const props = [
  "data-template-id",
  "data-controller",
  "data-template-purpose",
  "class",
  "lang",
  "data-target"
];
const attributes = {};
for (const prop of props) {
  attributes[prop] = info.find(info.html, prop).property;
}
const htmlProcessor = unified()
  .use(parse, { fragment: true })
  .use(sanitize, gh);

const markdownProcessor = unified()
  .use(markdown, { commonmark: true, footnotes: true })
  .use(remark2rehype, { allowDangerousHTML: true, commonmark: true })
  .use(raw)
  .use(stringify);

module.exports = function renderTemplates(annotations) {
  // This line flattens the resulting map and filters out undefineds/nulls.
  return Array.prototype.concat
    .apply([], annotations.map(renderTemplate))
    .filter(item => item);
};

function renderTemplate(annotation) {
  if (annotation.body) {
    return annotation.body.map(renderBody);
  }
  function renderBody(body, index) {
    if (body.type === "TextualBody") {
      let wrapper;
      if (body.format === "text/html") {
        wrapper = htmlProcessor.parse(`<template>${body.value}</template>`)
          .children[0];
      } else if (body.format === "text/markdown") {
        const html = markdownProcessor.processSync(`${body.value}`);
        wrapper = htmlProcessor.parse(`<template>${String(html)}</template>`)
          .children[0];
      } else {
        wrapper = h("template", body.value);
      }
      wrapper.properties[attributes["data-template-id"]] = `${annotation.id}`;
      wrapper.properties[attributes["data-controller"]] = "template";
      if (body.purpose) {
        wrapper.properties[attributes["data-template-purpose"]] = body.purpose;
      }
      if (body.language) {
        wrapper.properties[attributes.lang] = body.language;
      }
      wrapper.properties[attributes["data-target"]] = "annotations.template";
      return wrapper;
    }
  }
}
