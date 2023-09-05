import { GetInput, Inputs } from './input'
import * as core from '@actions/core'
import { AllChangeDirectories } from './gitchange'
/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
//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
export async function run(): Promise<void> {
  try {
    const input: Inputs = GetInput()
    const changedfiles = await AllChangeDirectories(input)
    core.setOutput('matrix', JSON.stringify(changedfiles))
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
