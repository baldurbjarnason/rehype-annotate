/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`tests/index.js TAP rehype-annotate basic fixtures/css-single.input.html > fixtures/css-single.input.html annotations 1`] = `
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
`

exports[`tests/index.js TAP rehype-annotate basic fixtures/fragment-multibody.input.html > fixtures/fragment-multibody.input.html annotations 1`] = `
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
`

exports[`tests/index.js TAP rehype-annotate basic fixtures/poetry-linebreaks.input.html > fixtures/poetry-linebreaks.input.html annotations 1`] = `
Array [
  Object {
    "body": Array [
      Object {
        "content": String(
          <div class="stanzanoindent" data-ink-location="25">Notre barque glisse sur l’onde<br>
          Que dorent de brûlants rayons;<br>
          Sa marche lente et vagabonde<br>
          Témoigne que des bras mignons,<br>
          Pleins d’ardeur, mais encore novices,<br>
          Tout fiers de ce nouveau travail,<br>
          Mènent au gré de leurs caprices<br>
          Les rames et le gouvernail.</div>
        ),
        "language": null,
      },
    ],
    "id": "https://ink-api-dev-dot-thematic-cider-139815.appspot.com/notes/ePBawQ5aWWfiN6nyLprBmH-9fe723b3cf",
    "motivation": "highlighting",
    "published": "2020-08-12T11:11:32.527Z",
    "shortId": "ePBawQ5aWWfiN6nyLprBmH-9fe723b3cf",
    "source": Object {
      "author": Array [],
      "contributor": Array [],
      "copyrightHolder": Array [],
      "creator": Array [],
      "editor": Array [],
      "id": "https://ink-api-dev-dot-thematic-cider-139815.appspot.com/sources/ePBawQ5aWWfiN6nyLprBmH-f2e212bc7d/",
      "illustrator": Array [],
      "name": "Alice",
      "published": "2020-07-14T16:23:55.125Z",
      "publisher": Array [],
      "shortId": "ePBawQ5aWWfiN6nyLprBmH-f2e212bc7d",
      "translator": Array [],
      "type": "Source",
      "updated": "2020-07-14T16:23:55.125Z",
    },
    "tags": Array [],
    "target": Object {
      "selector": Object {
        "exact": String(
          Notre barque glisse sur l’onde
          Que dorent de brûlants rayons;
          Sa marche lente et vagabonde
          Témoigne que des bras mignons,
          Pleins d’ardeur, mais encore novices,
          Tout fiers de ce nouveau travail,
          Mènent au gré de leurs caprices
          Les rames et le gouvernail.
        ),
        "prefix": String(
          T TAYLOR, BREAD STREET HILL.
          
          
          
          
        ),
        "suffix": String(
          
          Soudain trois cris se font ente
        ),
        "type": "TextQuoteSelector",
      },
      "source": "https://example.com/tests/fixtures/poetry-linebreaks.input.html",
    },
    "type": "Note",
    "updated": "2020-08-12T11:11:32.527Z",
  },
]
`

exports[`tests/index.js TAP rehype-annotate basic fixtures/range.input.html > fixtures/range.input.html annotations 1`] = `
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
`

exports[`tests/index.js TAP rehype-annotate basic fixtures/refinedby.input.html > fixtures/refinedby.input.html annotations 1`] = `
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
`

exports[`tests/index.js TAP rehype-annotate basic fixtures/text-position.input.html > fixtures/text-position.input.html annotations 1`] = `
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
`

exports[`tests/index.js TAP rehype-annotate basic fixtures/text-quote.input.html > fixtures/text-quote.input.html annotations 1`] = `
Array [
  Object {
    "body": Array [
      Object {
        "format": "text/plain",
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
        "exact": String(
          pottery on? It must be taken deep into Mordor and cast back into the fiery chasm from whence it came.
          Stirs ending exceeding fond muster fall Bagshot.
          Resilient Garulf key quest abandon knives
        ),
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
        "suffix": String(
          
          Feeling panic
        ),
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
        "value": String(
          
          
          j'adore !
          
          
        ),
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
`

exports[`tests/index.js TAP rehype-annotate basic fixtures/xpath-single.input.html > fixtures/xpath-single.input.html annotations 1`] = `
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
`
