const { parseOrder } = require('../src')


// undefined
test('parseOrder() returns \'\'', () => {
  expect(parseOrder()).toBe('')
})

// null
test('parseOrder(null) returns \'\'', () => {
  expect(parseOrder(null)).toBe('')
})

// ''
test('parseOrder(``) returns \'\'', () => {
  expect(parseOrder(``)).toBe('')
})

// []
test('parseOrder([]) returns \'\'', () => {
  expect(parseOrder([])).toBe('')
})

// 'age'
test('parseOrder(`age`) returns \' ORDER BY age\'', () => {
  expect(parseOrder(`age`)).toBe(' ORDER BY age')
})

// 'dateReg DESC'
test('parseOrder(`dateReg DESC`) returns \' ORDER BY dateReg DESC\'', () => {
  expect(parseOrder(`dateReg DESC`)).toBe(' ORDER BY dateReg DESC')
})

// 'dateReg DESC, age'
test('parseOrder(`dateReg DESC, age`) returns \' ORDER BY dateReg DESC, age\'', () => {
  expect(parseOrder(`dateReg DESC, age`)).toBe(' ORDER BY dateReg DESC, age')
})

// ['age']
test('parseOrder([`age`]) returns \' ORDER BY age\'', () => {
  expect(parseOrder([`age`])).toBe(' ORDER BY age')
})

// ['dateReg DESC']
test('parseOrder([`dateReg DESC`]) returns \' ORDER BY dateReg DESC\'', () => {
  expect(parseOrder([`dateReg DESC`])).toBe(' ORDER BY dateReg DESC')
})

// ['dateReg DESC', 'age']
test('parseOrder([`dateReg DESC`, `age`]) returns \' ORDER BY dateReg DESC, age\'', () => {
  expect(parseOrder([`dateReg DESC`, `age`])).toBe(' ORDER BY dateReg DESC, age')
})
