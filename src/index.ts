/* eslint-disable no-console */
import { $ } from 'zx'
import { io } from 'fsxx'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import prompts from 'prompts'
import picocolors from 'picocolors'

async function example() {
  const { data: pkg } = await io.json<{ name: string; version: string }>`package.json`
  console.log(pkg.name, pkg.version)

  const argv = yargs(hideBin(process.argv)).argv
  console.log(argv)

  const response = await prompts({
    type: 'text',
    name: 'value',
    message: 'Do you need to start developing? (yes or no)',
    validate: value => ['yes', 'no'].includes(value) ? true : picocolors.inverse(picocolors.bold(picocolors.red('verification failed'))),
  })
  console.log(response.value === 'yes' ? 'let\'s start' : 'Rest awhile')

  await $`nr build`
}

example()
