const { parseLimit } = require('../src')


// undefined
test('parseLimit() returns \'\'', () => {
  expect(parseLimit()).toBe('')
})

// null
test('parseLimit(null) returns \'\'', () => {
  expect(parseLimit(null)).toBe('')
})

// ''
test('parseLimit(``) returns \'\'', () => {
  expect(parseLimit(``)).toBe('')
})

// 'Five'
test('parseLimit(`Five`) returns \'\'', () => {
  expect(parseLimit(`Five`)).toBe('')
})

// 0
test('parseLimit() returns \'\'', () => {
  expect(parseLimit()).toBe('')
})

// -5
test('parseLimit(-5) returns \'\'', () => {
  expect(parseLimit(-5)).toBe('')
})

// 5
test('parseLimit() returns \' LIMIT 5\'', () => {
  expect(parseLimit(5)).toBe(' LIMIT 5')
})

// '5'
test('parseLimit(`5`) returns \' LIMIT 5\'', () => {
  expect(parseLimit(`5`)).toBe(' LIMIT 5')
})
