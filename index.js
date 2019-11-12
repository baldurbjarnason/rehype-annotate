const matchAnnotations = require("./hast-annotations-match");

function attacher(options) {
  return transformer;
  function transformer(node, file) {
    return matchAnnotations(node, file, options);
  }
}

module.exports = attacher;
