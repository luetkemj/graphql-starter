const debugCaller = require('debug-caller');

// enable project namespace to print log messages by default
debugCaller.debug.enable(`${process.env.npm_package_name}*`);

module.exports = function exports() {
  // set a depth of 2 to avoid using this file within debug statements
  // (since this is just a passthrough for logging)
  return debugCaller(`${process.env.npm_package_name}*`, {
    depth: 2,
    logColor: 6,
  });
};
