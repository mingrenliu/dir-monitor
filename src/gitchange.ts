import { Inputs } from './input'
import * as core from '@actions/core'
import * as github from '@actions/github'
import * as mm from 'micromatch'
type matchResult = {
  directories: string[]
  ignores: string[]
  patterns: string[]
}
export const AllChangeDirectories = async (
  input: Inputs
): Promise<string[]> => {
  core.info(`monitor directories: ${input.directories}`)
  core.info(`ignore files: ${input.ignore}`)
  const patterns = inputPattern(input)
  const files = await GetAllChangedFiles(input)
  const results: string[] = []

  if (patterns.directories.length === 0) return results
  for (let index = 0; index < patterns.directories.length; index++) {
    for (const file of files) {
      if (
        mm.isMatch(file, patterns.patterns[index]) &&
        (patterns.ignores.length === 0 || mm.isMatch(file, patterns.ignores))
      ) {
        results.push(patterns.directories[index])
        break
      }
    }
  }
  core.info(`changed directories: ${JSON.stringify(results)}`)
  return results
}
async function GetAllChangedFiles(input: Inputs): Promise<string[]> {
  const results: string[] = []
  const octokit = github.getOctokit(input.token)
  const data = await octokit.rest.repos.getCommit({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    ref: github.context.sha
  })
  const files = data.data.files
  core.info(JSON.stringify(files))
  if (files && files.length > 0) {
    for (const item of files) {
      results.push(item.filename)
    }
  }
  return results
}
export function inputPattern(input: Inputs): matchResult {
  const result: matchResult = { directories: [], ignores: [], patterns: [] }
  if (input.directories === '') return result
  const separator = input.separator ?? ';'
  result.directories = input.directories.split(separator)
  for (const element of result.directories) {
    result.patterns.push(ParsePattern(element))
  }
  if (input.ignore && input.ignore !== '') {
    const ignors = input.ignore.split(separator)
    for (const element of ignors) {
      result.ignores.push(`!${ParsePattern(element)}`)
    }
  }
  return result
}
function ParsePattern(model: string): string {
  if (model.endsWith('/')) {
    return `${model}**`
  } else {
    const parts = model.split('/')
    const last = parts[parts.length - 1]
    if (!last.includes('.') && !last.includes('*')) {
      return `${model}/**`
    } else {
      return model
    }
  }
}
