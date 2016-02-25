#! /usr/bin/env node

function help () {
  console.log('Help. .. well. um. Use the source luke.')
}

// define and execute command line interface
require('./cli')([
  { name: 'help',
    description: 'show help (about command)',
    run: help
  },
  { name: 'plugins',
    description: 'show available plugins',
    run: require('./commands/plugins.js')
  }
])
