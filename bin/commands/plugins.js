var search = require('npm-keywordsearch')
var PLUGIN_LABEL = 'graphmalizer-plugin'

module.exports = function (args) {
  search(PLUGIN_LABEL, (error, packages) => {
    if (error) {
      console.error(error)
      process.exit(-1)
    }

    // list packages
    if(packages.length === 0) {
      console.log('No packages found...')
    } else {
      packages.forEach(pkg => console.log(`${pkg.name}: ${pkg.description}`))
    }
  })
}
