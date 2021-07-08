import { matchAnnotations } from "./hast-annotations-match/index.js";

export function attacher(options) {
  return transformer;
  function transformer(node, file) {
    return matchAnnotations(node, file, options);
  }
}

export default attacher;
