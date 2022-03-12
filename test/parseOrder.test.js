const { parseOrder } = require('../src')


// order: undefined
test('parseOrder() returns \'\'', () => {
  expect(parseOrder()).toBe('')
})

// order: null
test('parseOrder(null) returns \'\'', () => {
  expect(parseOrder(null)).toBe('')
})

// order: ''
test('parseOrder(``) returns \'\'', () => {
  expect(parseOrder(``)).toBe('')
})

// order: []
test('parseOrder([]) returns \'\'', () => {
  expect(parseOrder([])).toBe('')
})

// order: 'age'
test('parseOrder(`age`) returns \' ORDER BY age\'', () => {
  expect(parseOrder(`age`)).toBe(' ORDER BY age')
})

// order: 'dateReg DESC'
test('parseOrder(`dateReg DESC`) returns \' ORDER BY dateReg DESC\'', () => {
  expect(parseOrder(`dateReg DESC`)).toBe(' ORDER BY dateReg DESC')
})

// order: 'dateReg DESC, age'
test('parseOrder(`dateReg DESC, age`) returns \' ORDER BY dateReg DESC, age\'', () => {
  expect(parseOrder(`dateReg DESC, age`)).toBe(' ORDER BY dateReg DESC, age')
})

// order: ['age']
test('parseOrder([`age`]) returns \' ORDER BY age\'', () => {
  expect(parseOrder([`age`])).toBe(' ORDER BY age')
})

// order: ['dateReg DESC']
test('parseOrder([`dateReg DESC`]) returns \' ORDER BY dateReg DESC\'', () => {
  expect(parseOrder([`dateReg DESC`])).toBe(' ORDER BY dateReg DESC')
})

// order: ['dateReg DESC', 'age']
test('parseOrder([`dateReg DESC`, `age`]) returns \' ORDER BY dateReg DESC, age\'', () => {
  expect(parseOrder([`dateReg DESC`, `age`])).toBe(' ORDER BY dateReg DESC, age')
})
