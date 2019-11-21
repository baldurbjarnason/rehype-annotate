/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
"use strict";
exports[
  `tests/index.js TAP rehype-annotate basic fixtures/css-single.input.html > fixtures/css-single.input.html annotations 1`
] = `
Array [
  Object {
    "created": "2015-10-13T13:00:00Z",
    "creator": Object {
      "id": "http://example.org/user1",
      "name": "A. Person",
      "nickname": "user1",
      "type": "Person",
    },
    "id": "http://example.com/annotations1",
    "motivation": "bookmarking",
    "stylesheet": Object {
      "id": "http://example.org/stylesheet1",
      "type": "CssStylesheet",
    },
    "target": Object {
      "selector": Object {
        "type": "CssSelector",
        "value": "h3:first-of-type",
      },
      "source": "https://example.com/tests/fixtures/css-single.input.html",
    },
    "type": "Annotation",
  },
]
`;

exports[
  `tests/index.js TAP rehype-annotate basic fixtures/fragment-multibody.input.html > fixtures/fragment-multibody.input.html annotations 1`
] = `
Array [
  Object {
    "body": Array [
      Object {
        "purpose": "tagging",
        "type": "TextualBody",
        "value": "love",
      },
      Object {
        "format": "text/html",
        "language": "fr",
        "purpose": "describing",
        "type": "TextualBody",
        "value": "<p>j'adore !</p>",
      },
    ],
    "created": "2015-10-13T13:00:00Z",
    "creator": Object {
      "id": "http://example.org/user1",
      "name": "A. Person",
      "nickname": "user1",
      "type": "Person",
    },
    "id": "http://example.com/annotations1",
    "motivation": "bookmarking",
    "stylesheet": Object {
      "id": "http://example.org/stylesheet1",
      "type": "CssStylesheet",
    },
    "target": Object {
      "selector": Object {
        "type": "FragmentSelector",
        "value": "test-id",
      },
      "source": "https://example.com/tests/fixtures/fragment-multibody.input.html",
      "styleClass": "Bookmarked",
    },
    "type": "Annotation",
  },
]
`;

exports[
  `tests/index.js TAP rehype-annotate basic fixtures/range.input.html > fixtures/range.input.html annotations 1`
] = `
Array [
  Object {
    "created": "2015-10-13T13:00:00Z",
    "creator": Object {
      "id": "http://example.org/user1",
      "name": "A. Person",
      "nickname": "user1",
      "type": "Person",
    },
    "id": "http://example.com/annotations1",
    "motivation": "bookmarking",
    "stylesheet": Object {
      "id": "http://example.org/stylesheet1",
      "type": "CssStylesheet",
    },
    "target": Object {
      "selector": Object {
        "endSelector": Object {
          "type": "CssSelector",
          "value": "h3:first-of-type",
        },
        "startSelector": Object {
          "type": "XPathSelector",
          "value": "/html[1]/body[1]/h1[1]",
        },
        "type": "RangeSelector",
      },
      "source": "https://example.com/tests/fixtures/range.input.html",
    },
    "type": "Annotation",
  },
]
`;

exports[
  `tests/index.js TAP rehype-annotate basic fixtures/refinedby.input.html > fixtures/refinedby.input.html annotations 1`
] = `
Array [
  Object {
    "body": Array [
      Object {
        "format": "text/html",
        "language": "fr",
        "purpose": "commenting",
        "type": "TextualBody",
        "value": "<p>j'adore !</p>",
      },
    ],
    "created": "2015-10-13T13:00:00Z",
    "id": "http://example.com/annotations2",
    "motivation": "highlighting",
    "target": Object {
      "selector": Object {
        "refinedBy": Object {
          "exact": "entire bygone figure",
          "type": "TextQuoteSelector",
        },
        "type": "XPathSelector",
        "value": "/html[1]/body[1]/h1[1]",
      },
      "source": "https://example.com/tests/fixtures/refinedby.input.html",
      "styleClass": "Bookmarked",
    },
    "type": "Annotation",
  },
  Object {
    "body": Array [
      Object {
        "format": "text/html",
        "language": "fr",
        "purpose": "commenting",
        "type": "TextualBody",
        "value": "<p>j'adore !</p>",
      },
    ],
    "created": "2015-10-13T13:00:00Z",
    "id": "http://example.com/annotations1",
    "motivation": "highlighting",
    "target": Object {
      "selector": Object {
        "refinedBy": Object {
          "end": 12,
          "start": 0,
          "type": "TextPositionSelector",
        },
        "type": "CssSelector",
        "value": "h3:first-of-type",
      },
      "source": "https://example.com/tests/fixtures/refinedby.input.html",
      "styleClass": "Bookmarked",
    },
    "type": "Annotation",
  },
  Object {
    "body": Array [
      Object {
        "format": "text/html",
        "language": "fr",
        "purpose": "commenting",
        "type": "TextualBody",
        "value": "<p>j'adore !</p>",
      },
    ],
    "created": "2015-10-13T13:00:00Z",
    "id": "http://example.com/annotations3-no-refine-match",
    "motivation": "highlighting",
    "target": Object {
      "selector": Object {
        "refinedBy": Object {
          "type": "CssSelector",
          "value": "li:first-of-type",
        },
        "type": "CssSelector",
        "value": "ul:first-of-type",
      },
      "source": "https://example.com/tests/fixtures/refinedby.input.html",
      "styleClass": "Bookmarked",
    },
    "type": "Annotation",
  },
]
`;

exports[
  `tests/index.js TAP rehype-annotate basic fixtures/text-position.input.html > fixtures/text-position.input.html annotations 1`
] = `
Array [
  Object {
    "body": Array [
      Object {
        "format": "text/html",
        "language": "fr",
        "purpose": "commenting",
        "type": "TextualBody",
        "value": "<p>j'adore !</p>",
      },
    ],
    "created": "2015-10-13T13:00:00Z",
    "id": "http://example.com/annotations1",
    "motivation": "highlighting",
    "target": Object {
      "selector": Object {
        "end": 368,
        "start": 176,
        "type": "TextPositionSelector",
      },
      "source": "https://example.com/tests/fixtures/text-position.input.html",
      "styleClass": "Bookmarked",
    },
    "type": "Annotation",
  },
  Object {
    "body": Array [
      Object {
        "format": "text/html",
        "language": "fr",
        "purpose": "commenting",
        "type": "TextualBody",
        "value": "<p>j'adore !</p>",
      },
    ],
    "created": "2015-10-13T13:00:00Z",
    "id": "http://example.com/annotations2",
    "motivation": "highlighting",
    "target": Object {
      "selector": Object {
        "end": 586,
        "start": 559,
        "type": "TextPositionSelector",
      },
      "source": "https://example.com/tests/fixtures/text-position.input.html",
      "styleClass": "Bookmarked",
    },
    "type": "Annotation",
  },
  Object {
    "body": Array [
      Object {
        "format": "text/html",
        "language": "fr",
        "purpose": "commenting",
        "type": "TextualBody",
        "value": "<p>j'adore !</p>",
      },
    ],
    "created": "2015-10-13T13:00:00Z",
    "id": "http://example.com/annotations3",
    "motivation": "highlighting",
    "target": Object {
      "selector": Object {
        "end": 1684,
        "start": 1664,
        "type": "TextPositionSelector",
      },
      "source": "https://example.com/tests/fixtures/text-position.input.html",
      "styleClass": "Bookmarked",
    },
    "type": "Annotation",
  },
  Object {
    "body": Array [
      Object {
        "format": "text/html",
        "language": "fr",
        "purpose": "commenting",
        "type": "TextualBody",
        "value": "<p>j'adore !</p>",
      },
    ],
    "created": "2015-10-13T13:00:00Z",
    "id": "http://example.com/annotations4",
    "motivation": "highlighting",
    "target": Object {
      "selector": Object {
        "end": 1792,
        "start": 1779,
        "type": "TextPositionSelector",
      },
      "source": "https://example.com/tests/fixtures/text-position.input.html",
      "styleClass": "Bookmarked",
    },
    "type": "Annotation",
  },
]
`;

exports[
  `tests/index.js TAP rehype-annotate basic fixtures/text-quote.input.html > fixtures/text-quote.input.html annotations 1`
] = `
Array [
  Object {
    "body": Array [
      Object {
        "format": "text/html",
        "language": "fr",
        "purpose": "commenting",
        "type": "TextualBody",
        "value": "<p>j'adore !</p>",
      },
    ],
    "created": "2015-10-13T13:00:00Z",
    "id": "http://example.com/annotations1",
    "motivation": "highlighting",
    "target": Object {
      "selector": Object {
        "exact": "pottery on? It must be taken deep into Mordor and cast back into the fiery chasm from whence it came.\\nStirs ending exceeding fond muster fall Bagshot.\\nResilient Garulf key quest abandon knives",
        "type": "TextQuoteSelector",
      },
      "source": "https://example.com/tests/fixtures/text-quote.input.html",
      "styleClass": "Bookmarked",
    },
    "type": "Annotation",
  },
  Object {
    "body": Array [
      Object {
        "format": "text/html",
        "language": "fr",
        "purpose": "commenting",
        "type": "TextualBody",
        "value": "<p>j'adore !</p>",
      },
    ],
    "created": "2015-10-13T13:00:00Z",
    "id": "http://example.com/annotations2",
    "motivation": "highlighting",
    "target": Object {
      "selector": Object {
        "exact": " tobacco chicken ridiculous",
        "prefix": "World bodies gifted",
        "type": "TextQuoteSelector",
      },
      "source": "https://example.com/tests/fixtures/text-quote.input.html",
      "styleClass": "Bookmarked",
    },
    "type": "Annotation",
  },
  Object {
    "body": Array [
      Object {
        "format": "text/html",
        "language": "fr",
        "purpose": "commenting",
        "value": "<p>j'adore !</p>",
      },
    ],
    "created": "2015-10-13T13:00:00Z",
    "id": "http://example.com/annotations1-inexact",
    "motivation": "highlighting",
    "target": Object {
      "selector": Object {
        "exact": "Skins fouler Rhosgobel you've about values blingon heirloom?",
        "prefix": "well-earned machine?\\n",
        "suffix": "\\nFeeling panic",
        "type": "TextQuoteSelector",
      },
      "source": "https://example.com/tests/fixtures/text-quote.input.html",
      "styleClass": "Bookmarked",
    },
    "type": "Annotation",
  },
  Object {
    "body": Array [
      Object {
        "format": "text/markdown",
        "language": "fr",
        "purpose": "commenting",
        "type": "TextualBody",
        "value": "<p>j'adore !</p>",
      },
    ],
    "created": "2015-10-13T13:00:00Z",
    "id": "http://example.com/annotations2-inexact",
    "motivation": "highlighting",
    "target": Object {
      "selector": Object {
        "exact": "quarry Bilbo captive",
        "prefix": "bogomips",
        "suffix": "bogomips",
        "type": "TextQuoteSelector",
      },
      "source": "https://example.com/tests/fixtures/text-quote.input.html",
      "styleClass": "Bookmarked",
    },
    "type": "Annotation",
  },
  Object {
    "body": Array [
      Object {
        "format": "text/html",
        "language": "fr",
        "purpose": "commenting",
        "type": "TextualBody",
        "value": "<p>j'adore !</p>",
      },
    ],
    "created": "2015-10-13T13:00:00Z",
    "id": "http://example.com/annotations3",
    "motivation": "highlighting",
    "target": Object {
      "selector": Object {
        "exact": "chap. Big grey beard",
        "prefix": "Elderly ",
        "suffix": ", pointy hat.",
        "type": "TextQuoteSelector",
      },
      "source": "https://example.com/tests/fixtures/text-quote.input.html",
      "styleClass": "Bookmarked",
    },
    "type": "Annotation",
  },
  Object {
    "body": Array [
      Object {
        "format": "text/html",
        "type": "TextualBody",
        "value": "<p>I adore!</p>",
      },
    ],
    "created": "2015-10-13T13:00:00Z",
    "id": "http://example.com/annotations4",
    "motivation": "highlighting",
    "target": Object {
      "selector": Object {
        "exact": "pon windlance",
        "suffix": ". Didn't stage",
        "type": "TextQuoteSelector",
      },
      "source": "https://example.com/tests/fixtures/text-quote.input.html",
      "styleClass": "Bookmarked",
    },
    "type": "Annotation",
  },
]
`;

exports[
  `tests/index.js TAP rehype-annotate basic fixtures/xpath-single.input.html > fixtures/xpath-single.input.html annotations 1`
] = `
Array [
  Object {
    "created": "2015-10-13T13:00:00Z",
    "creator": Object {
      "id": "http://example.org/user1",
      "name": "A. Person",
      "nickname": "user1",
      "type": "Person",
    },
    "id": "http://example.com/annotations1",
    "motivation": "bookmarking",
    "stylesheet": Object {
      "id": "http://example.org/stylesheet1",
      "type": "CssStylesheet",
    },
    "target": Object {
      "selector": Object {
        "type": "XPathSelector",
        "value": "/html[1]/body[1]/h1[1]",
      },
      "source": "https://example.com/tests/fixtures/xpath-single.input.html",
      "styleClass": "Bookmarked",
    },
    "type": "Annotation",
  },
]
`;
