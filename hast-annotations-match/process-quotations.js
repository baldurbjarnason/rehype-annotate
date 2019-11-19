const processPositions = require("./process-positions");

// Based on https://github.com/tilgovi/dom-anchor-text-quote/blob/master/src/index.js MIT Licensed

const DiffMatchPatch = require("diff-match-patch");
// The DiffMatchPatch bitap has a hard 32-character pattern length limit.
const SLICE_LENGTH = 32;
const SLICE_RE = new RegExp("(.|[\r\n]){1," + String(SLICE_LENGTH) + "}", "g");
const toString = require("hast-util-to-string");

module.exports = function processQuotations(tree, file, quoteAnnotations) {
  const positionAnnotations = quoteAnnotations.map(processQuote);
  function processQuote(annotation, index) {
    return processor(tree, annotation);
  }
  processPositions(tree, file, positionAnnotations);
};

function processor(tree, annotation, options = {}) {
  const { selector } = annotation.target;
  const { prefix, exact, suffix } = selector;

  const { hint } = options;
  const dmp = new DiffMatchPatch();

  const textContent = toString(tree);
  dmp.Match_Distance = textContent.length * 2;

  // Work around a hard limit of the DiffMatchPatch bitap implementation.
  // The search pattern must be no more than SLICE_LENGTH characters.
  const slices = exact.match(SLICE_RE);
  let loc = hint === undefined ? (textContent.length / 2) | 0 : hint;
  let start = Number.POSITIVE_INFINITY;
  let end = Number.NEGATIVE_INFINITY;
  let result = -1;
  const havePrefix = prefix !== undefined;
  const haveSuffix = suffix !== undefined;
  let foundPrefix = false;

  // If the prefix is known then search for that first.
  if (havePrefix) {
    result = dmp.match_main(textContent, prefix, loc);
    if (result > -1) {
      loc = result + prefix.length;
      foundPrefix = true;
    }
  }

  // If we have a suffix, and the prefix wasn't found, then search for it.
  if (haveSuffix && !foundPrefix) {
    result = dmp.match_main(textContent, suffix, loc + exact.length);
    if (result > -1) {
      loc = result - exact.length;
    }
  }

  // Search for the first slice.
  const firstSlice = slices.shift();
  result = dmp.match_main(textContent, firstSlice, loc);
  if (result > -1) {
    start = result;
    loc = end = start + firstSlice.length;
  } else {
    return null;
  }

  // Create a fold function that will reduce slices to positional extents.
  const foldSlices = (acc, slice) => {
    if (!acc) {
      // A search for an earlier slice of the pattern failed to match.
      return null;
    }

    const result = dmp.match_main(textContent, slice, acc.loc);
    if (result === -1) {
      return null;
    }

    // The next slice should follow this one closely.
    acc.loc = result + slice.length;

    // Expand the start and end to a quote that includes all the slices.
    acc.start = Math.min(acc.start, result);
    acc.end = Math.max(acc.end, result + slice.length);

    return acc;
  };
  // Use the fold function to establish the full quote extents.
  // Expect the slices to be close to one another.
  // This distance is deliberately generous for now.
  dmp.Match_Distance = 64;
  const acc = slices.reduce(foldSlices, { start, end, loc });
  if (!acc) {
    return null;
  }
  const target = {
    ...annotation.target,
    selector: {
      type: "TextPositionSelector",
      start: acc.start,
      end: acc.end
    }
  };
  return { ...annotation, target };
}
