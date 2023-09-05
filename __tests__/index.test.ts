import { inputPattern } from '../src/gitchange'
import { Inputs } from '../src/input'

it('test file not /', () => {
  const inputs: Inputs = {
    directories: 'test/test',
    token: ''
  }
  for (const element of inputPattern(inputs).patterns) {
    expect(element).toBe('test/test/**')
  }
})
it('test file with /', () => {
  const inputs: Inputs = {
    directories: 'test/test/',
    token: ''
  }
  for (const element of inputPattern(inputs).patterns) {
    expect(element).toBe('test/test/**')
  }
})
it('test ignore', () => {
  const inputs: Inputs = {
    directories: 'test/test',
    ignore: 'test/test1/,test/tet2/*.md,test/test3.txt,test/test4',
    separator: ',',
    token: ''
  }
  const result = inputPattern(inputs)
  expect(result.patterns[0]).toBe('test/test/**')
  expect(result.ignores[0]).toBe('!test/test1/**')
  expect(result.ignores[1]).toBe('!test/tet2/*.md')
  expect(result.ignores[2]).toBe('!test/test3.txt')
  expect(result.ignores[3]).toBe('!test/test4/**')
})
