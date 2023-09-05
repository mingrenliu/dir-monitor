import * as core from '@actions/core'
export type Inputs = {
  directories: string
  ignore?: string
  separator?: string
  token: string
}
export function GetInput(): Inputs {
  const token = core.getInput('token', { trimWhitespace: true, required: true })
  const directories = core.getInput('directories', {
    trimWhitespace: true,
    required: true
  })
  core.info(`input.directories:${directories}`)
  const ignore =
    core.getInput('ignore', { trimWhitespace: true, required: false }) ?? ''
  core.info(`input.ignore:${ignore}`)
  const separator =
    core.getInput('separator', { trimWhitespace: true, required: false }) ?? ';'
  core.info(`input.separator:${separator}`)
  const result: Inputs = {
    token,
    directories,
    separator,
    ignore
  }
  return result
}
