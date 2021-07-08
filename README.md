# `rehype-annotate`

## Version 1.0 and ESM support

With version 1.0+ this module is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c): Node 12+ is needed to use it and it must be imported instead of required.

## Introduction

This [`rehype`](https://github.com/rehypejs/rehype) plugin matches [W3C-style annotations](https://www.w3.org/TR/annotation-model/) to their targets in the parsed HTML file. It wraps text range selections in `mark` elements and adds attributes and hooks to matched locations that can be used in other processors or browser scripts to implement further behaviours.

Note: this modifies the original tree and in some cases can add class attributes. Make sure to sanitise the tree afterwards.

The script _does not_ embed annotation-provided styles, although that is on the roadmap. We do assign the values of the `styleClass` property to the annotated nodes so the client can provide their own stylesheet.

## License

Apache 2.0

## Install

We haven't yet published this package on `npm` but you can install it directly from the GitHub repository.

[`npm`](https://docs.npmjs.com/cli/install):

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

async function process(file, options) {
  return unified()
    .use(parse)
    .use(annotate, options)
    .use(stringify)
    .process(await vfile.read(file));
}

const options = {
  // Should be an array of W3C Web Annotations
  annotations: require("./path/to/annotations/json"),
  // the base url for the original html
  url: "https://syndicated.example.com/annotated.html",
  // the canonical url for the html
  canonical: "https://example.org/annotated.html",
};

process("path/to/example/htmlfile.html", options)
  .then((file) => {
    console.log(report(file));
    console.log(String(file));
  })
  .catch((err) => console.error(err));
```

The above code will print whatever issues are found out to the console, followed by the processed HTML.

The `file.data.annotations` property will contain the annotations that have been matched to the HTML, in the order that the appear in the HTML file itself.

## API

### `processor.use(annotate[, options])`

Configure `processor` to modify the [**hast**][hast] syntax tree to match annotations to their target locations in the HTML.

The following attributes are added when an element node is matched by a selector:

- `data-annotation-id`: the id of the matched annotation
- `data-annotation-motivation`: space-separated list of the motivations from the annotation [`motivation`](https://www.w3.org/TR/annotation-model/#motivation-and-purpose) property.
- `data-annotation-purpose` space-separated list of the purposes from the annotation _body's_ [`purpose`](https://www.w3.org/TR/annotation-model/#motivation-and-purpose) property.
- `class` the value of the annotation's [`styleClass`](https://www.w3.org/TR/annotation-model/#styles) property is added when present.

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
  data-annotation-purpose="tagging describing"
>
  Stirs ending exceeding fond muster fall Bagshot.
</h2>
```

#### Example (text range match):

If the source HTML is as follows:

```html
<p>
  Resilient Garulf key quest abandon knives lifted niceties tonight disappeared
  strongest plates. Farthing ginger large. Nobody tosses a Dwarf. Makes
  Shadowfax nearly lesser south deceive hates 22nd missing others!
</p>
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
  <mark
    data-annotation-id="http://example.com/annotations1"
    data-annotation-motivation="highlighting"
    class="Bookmarked"
    data-annotation-purpose="commenting"
    >Resilient Garulf key quest abandon knives</mark
  >
  lifted niceties tonight disappeared strongest plates. Farthing ginger large.
  Nobody tosses a Dwarf. Makes Shadowfax nearly lesser south deceive hates 22nd
  missing others!
</p>
```

#### `options`

##### `options.annotations`

An array of annotations that conform to the [W3C Web Annotations Data Model](https://www.w3.org/TR/annotation-model/). See note below on selector support.

##### `options.canonical` and `options.url`

The annotation is only matched to the html source if the `annotation.target.source` property matches either `canonical` or `url`.

## Selector Support

- `CssSelector`: limited to the selectors supported by [`hast-util-select`](https://github.com/syntax-tree/hast-util-select#support)
- `XPathSelector`: because `rehype`/`hast` doesn't come with built-in `xpath` support, these selectors only work when they are very simple. E.g. `/html/body/p[1]`
- `FragmentSelector`: supports only HTML fragment ids.
- `RangeSelector`: supported when both `startSelector` and `endSelector` resolve to element nodes.
- `TextQuoteSelector`: implementation is loosely based on the excellent [`dom-anchor-text-quote`](https://github.com/tilgovi/dom-anchor-text-quote) by Randall Leeds.
- `TextPositionSelector`

For performance reasons text quote and text position selectors that overlap each other in the document are not supported.

### `refinedBy`

You can use the `refinedBy` property on a selector that resolves to a single element node (`CssSelector`, `XPathSelector`, `FragmentSelector`) to create a new scope or root for a another selector, including the `TextPositionSelector` or the `TextQuoteSelector`.
