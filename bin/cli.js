var minimist = require('minimist')
var debug = require('./debug')
var clr = require('chalk')

var pkg = require('../package.json')
var banner = clr.gray('⥼⤫⤙⤬⤜⤫⤖⤬⤫⬻⤬⤙⤫⤚⤬⤫⬲⤯⤣⤬⤫⤤⤬⟴⤫⤡⤬⤫⤬⥽')
console.log('\n' + banner + clr.yellow(` Graphmalizer ${pkg.version} `) + banner + '\n')

module.exports = function (commandSpec) {
  var node = process.argv[0]
  var bin = process.argv[1]

  function printAvailableCommands () {
    console.log(' commands:\n')
    commandSpec.forEach(cmd => console.log(`\t${cmd.name}: ${cmd.description}`))
    console.log('\n')
  }

  // print usage if not enough arguments are passed
  if (process.argv.length < 3) {
    console.log(' usage: ' + clr.underline(`${bin} [CMD] [OPTIONS]\n`))
    console.log(' global options:\n')
    console.log('\t`--debug` or `-D`: print debug info')
    printAvailableCommands()
    process.exit(-1)
  }

  // parse rest of command line
  var cmd = process.argv[2]
  var commands = commandSpec.map(c => c.name)
  var args = minimist(process.argv.slice(3))

  // debug if `--debug` or `-D` is passed
  debug('input:', {
    node: node,
    bin: bin,
    commands: commands,
    cmd: cmd,
    args: args
  })

  // check if command exists
  if (commands.indexOf(cmd) < 0) {
    console.log(`no such command, "${cmd}", try one of:`)
    printAvailableCommands()
  }

  commandSpec.forEach(c => {
    // find command and run it
    if (c.name === cmd) {
      console.log(`[${c.name}] running\n`)
      c.run(args)
    }
  })
}
