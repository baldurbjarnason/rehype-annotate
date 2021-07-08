module.exports = function log(path) {
  return function (...args) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`${path}: `, ...args);
    }
  };
};
