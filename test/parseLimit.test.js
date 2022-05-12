const { parseLimit } = require('../src')


// limit: undefined
test('parseLimit() returns \'\'', () => {
  expect(parseLimit()).toBe('')
})

// limit: null
test('parseLimit(null) returns \'\'', () => {
  expect(parseLimit(null)).toBe('')
})

// limit: ''
test('parseLimit(``) returns \'\'', () => {
  expect(parseLimit(``)).toBe('')
})

// limit: 'Five'
test('parseLimit(`Five`) returns \'\'', () => {
  expect(parseLimit(`Five`)).toBe('')
})

// limit: 0
test('parseLimit() returns \'\'', () => {
  expect(parseLimit()).toBe('')
})

// limit: -5
test('parseLimit(-5) returns \'\'', () => {
  expect(parseLimit(-5)).toBe('')
})

// limit: 5
test('parseLimit() returns \' LIMIT 5\'', () => {
  expect(parseLimit(5)).toBe(' LIMIT 5')
})

// limit: '5'
test('parseLimit(`5`) returns \' LIMIT 5\'', () => {
  expect(parseLimit(`5`)).toBe(' LIMIT 5')
})
