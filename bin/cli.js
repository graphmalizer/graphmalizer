var minimist = require('minimist')

var pkg = require('../package.json')
console.log(`Graphmalizer ${pkg.version}`)

module.exports = function (commandSpec) {
  var bin = process.argv[0]
  var commands = commandSpec.map(c => c.name)

  console.log(process.argv.length)
  if (process.argv.length < 0) {
    console.log(`usage: ${bin} [CMD] [OPTIONS]\n`)
    console.log('commands:\n')
    commands.forEach(cmd => console.log(`\t${cmd.name}:\t${cmd.help}`))
    process.exit(-1)
  }

  var cmd = process.argv[2]
  if (commands.indexOf(cmd) < 0) {
    console.log(`no such command, "${cmd}", try one of:`)
    commands.forEach(cmd => console.log(`\t${cmd.name}:\t${cmd.help}`))
  }

  var args = minimist(process.argv.slice(3))
  if (args.debug || args.d) {
    console.dir('input:', {
      commands: commands,
      bin: bin,
      cmd: cmd,
      args: args
    })
  }

  commandSpec.forEach(c => {
    if (c.name === cmd) {
      console.log(`[${c.name}] running\n`)
      c.run(args)
    }
  })
}
