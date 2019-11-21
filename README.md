# `rehype-annotate`

This [`rehype`](https://github.com/rehypejs/rehype) plugin matches [W3C-style annotations](https://www.w3.org/TR/annotation-model/) to their targets in the parsed HTML file. It wraps text range selections in `mark` elements and adds attributes and hooks to matched locations that can be used in other processors or browser scripts to implement further behaviours.

Note: this modifies the original tree and in some cases can add class attributes. Make sure to sanitise the tree afterwards.

The script _does not_ embed annotation-provided CSS as there don't seem to be many tools in the `unified`/`rehype` ecosystem for sanitising user-provided CSS. If a tool like that appears, then I'll reconsider embedding CSS.

## License

To be decided.

## Install

I haven't yet published this package on npm but you can install it directly from the GitHub repository.

[npm](https://docs.npmjs.com/cli/install):

```sh
npm install RebusFoundation/rehype-annotate
```

## Use

`rehype-annotate` should be used as a `rehype` or `unified` plugin to match annotations to a `hast` syntax tree.

```js
const vfile = require("to-vfile");
const unified = require("unified");
const annotate = require("rehype-annotate");
const parse = require("rehype-parse");
const stringify = require("rehype-stringify");
const report = require("vfile-reporter");
const glob = require("glob");
const path = require("path");

async function process (file, options) {
  return unified()
    .use(parse)
    .use(annotate, options)
    .use(stringify)
    .process(await vfile.read(file));
}

const options = {
  // Should be an array of W3C Web Annotations
  annotations: require('./path/to/annotations/json'),
  // the base url for the original html
  url: "https://syndicated.example.com/annotated.html",
  // the canonical url for the html
  canonical: "https://example.org/annotated.html",
  // Enable or disable stimulusJS support
  stimulus: true
}

process('path/to/example/htmlfile.html', options)
  .then(file => {
    console.log(report(file));
    console.log(String(file))
  })
  .catch(err => console.error(err))
```

The above code will print whatever issues are found out to the console, followed by the processed HTML.

## API

### `processor.use(annotate[, options])`

Configure `processor` to modify the [**hast**][hast] syntax tree to match annotations to their target locations in the HTML.

The following attributes are added when an element node is matched by a selector:
* `data-annotation-id`: the id of the matched annotation
* `data-annotation-motivation`: space-separated list of the motivations from the annotation [`motivation`](https://www.w3.org/TR/annotation-model/#motivation-and-purpose) property.
* `data-annotation-purpose` space-separated list of the purposes from the annotation _body's_ [`purpose`](https://www.w3.org/TR/annotation-model/#motivation-and-purpose) property.
* `class` the value of the annotation's [`styleClass`](https://www.w3.org/TR/annotation-model/#styles) property is added when present.

#### Example (single node match):

If the source HTML is as follows:

```html
<h2 id="test-id">Stirs ending exceeding fond muster fall Bagshot.</h2>
```

And `rehype-annotate` is run with the following annotation:

```json
{
  "id": "http://example.com/annotations1",
  "type": "Annotation",
  "motivation": "bookmarking",
  "creator": {
    "id": "http://example.org/user1",
    "type": "Person",
    "name": "A. Person",
    "nickname": "user1"
  },
  "created": "2015-10-13T13:00:00Z",
  "stylesheet": {
    "id": "http://example.org/stylesheet1",
    "type": "CssStylesheet"
  },
  "body": [
    {
      "type": "TextualBody",
      "purpose": "tagging",
      "value": "love"
    },
    {
      "type": "TextualBody",
      "value": "<p>j'adore !</p>",
      "format": "text/html",
      "language": "fr",
      "purpose": "describing"
    }
  ],
  "target": {
    "source": "https://example.com/tests/fixtures/fragment-multibody.input.html",
    "styleClass": "Bookmarked",
    "selector": {
      "type": "FragmentSelector",
      "value": "test-id"
    }
  }
}
```

Then the result should be (provided the `url` or `canonical` options match the `source`):

```html
<h2 
  id="test-id" 
  data-annotation-id="http://example.com/annotations1" 
  data-annotation-motivation="bookmarking" 
  class="Bookmarked" 
  data-annotation-purpose="tagging describing">Stirs ending exceeding fond muster fall Bagshot.</h2>
```

#### Example (text range match):

If the source HTML is as follows:

```html
<p>Resilient Garulf key quest abandon knives lifted niceties tonight disappeared strongest plates. Farthing ginger large. Nobody tosses a Dwarf. Makes Shadowfax nearly lesser south deceive hates 22nd missing others!</p>
```

And `rehype-annotate` is run with the following annotation:

```json
{
  "id": "http://example.com/annotations1",
  "type": "Annotation",
  "motivation": "highlighting",
  "created": "2015-10-13T13:00:00Z",
  "body": [
    {
      "type": "TextualBody",
      "value": "<p>j'adore !</p>",
      "format": "text/html",
      "language": "fr",
      "purpose": "commenting"
    }
  ],
  "target": {
    "source": "https://example.com/tests/fixtures/text-quote.input.html",
    "styleClass": "Bookmarked",
    "selector": {
      "type": "TextQuoteSelector",
      "exact": "Resilient Garulf key quest abandon knives"
    }
  }
}
```

Then the result should be (provided the `url` or `canonical` options match the `source`):

```html
<p>
  <mark data-annotation-id="http://example.com/annotations1" data-annotation-motivation="highlighting" class="Bookmarked" data-annotation-purpose="commenting">Resilient Garulf key quest abandon knives</mark> lifted niceties tonight disappeared strongest plates. Farthing ginger large. Nobody tosses a Dwarf. Makes Shadowfax nearly lesser south deceive hates 22nd missing others!
</p>
```

#### `options`

##### `options.annotations`

An array of annotations that conform to the [W3C Web Annotations Data Model](https://www.w3.org/TR/annotation-model/). See note below on selector support.

##### `options.canonical` and `options.url`

The annotation is only matched to the html source if the `annotation.target.source` property matches either `canonical` or `url`.

##### `options.stimulus`

[stimulus](https://stimulusjs.org) support.

When true, `rehype-annotate` will add attributes and sanitised templates for annotation bodies to the HTML. This lets you write your own `stimulus` controllers to add custom annotation behaviours.

Attributes added to `body`:
* `data-controller="annotations"`

Attributes added to a matched node:
* `data-controller="annotation"`
* `data-target="annotations.node"`
* `data-annotation-type="node"`

Attributes added to a `mark` element that's created to wrap a selected text range:
* `data-controller="annotation"`
* `data-target="annotations.mark"`
* `data-annotation-type="mark"`

For every `annotation.body` of the type `TextualBody` and whose `format` is `text/html`, the html of the body is parsed and sanitised and inserted as a template tag:

```html
<template 
  data-template-id="http://example.com/annotations1" 
  data-controller="template" 
  data-template-purpose="commenting"
  lang="fr"
  data-target="annotations.template">
    <p>j'adore !</p>
</template>
```

The `data-template-id` attribute matches the `id` of the parent annotation. **Note:** *annotations can have multiple bodies*.

*TODO: implement support for `text/plain` and `text/markdown` annotation bodies.*

## Selector Support

* `CssSelector`: limited to the selectors supported by [`hast-util-select`](https://github.com/syntax-tree/hast-util-select#support)
* `XPathSelector`: because `rehype`/`hast` doesn't come with built-in `xpath` support, these selectors only work when they are very simple. E.g. `/html/body/p[1]`
* `FragmentSelector`: supports only HTML fragment ids.
* `RangeSelector`: supported when both `startSelector` and `endSelector` resolve to element nodes.
* `TextQuoteSelector`: implementation is loosely based on the excellent [`dom-anchor-text-quote`](https://github.com/tilgovi/dom-anchor-text-quote) by Randall Leeds.
* `TextPositionSelector`

For performance reasons text quote and text position selectors that overlap each other in the document are not supported.

### `refinedBy`

You can use the `refinedBy` property on a selector that resolves to an element node (`CssSelector`, `XPathSelector`, `FragmentSelector`) to create a new scope or root for a `TextPositionSelector` or a `TextQuoteSelector`.