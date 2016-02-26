'use strict'

// parse rest of command line
var args = require('minimist')(process.argv.slice(3))

if (args.debug || args.D) {
  // debug if `--debug` or `-D` is passed
  module.exports = function () {
    console.error(this.arguments)
  }
} else {
  // do nothing
  module.exports = function () {}
}
