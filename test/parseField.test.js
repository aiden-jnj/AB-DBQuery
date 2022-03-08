const { parseField } = require('../src')


// undefined
test('parseField() returns \' *\'', () => {
  expect(parseField()).toBe(' *')
})

// null
test('parseField(null) returns \' *\'', () => {
  expect(parseField(null)).toBe(' *')
})


// Array
test('parseField([]) returns \' *\'', () => {
  const field = []
  expect(parseField(field)).toBe(' *')
})

test('parseField([`colName`]) returns \' colName\'', () => {
  const field = [`colName`]
  expect(parseField(field)).toBe(' colName')
})

test('parseField([`col1`, `col2`]) returns \' col1, col2\'', () => {
  const field = [`col1`, `col2`]
  expect(parseField(field)).toBe(' col1, col2')
})


// String
test('parseField(``) returns \' *\'', () => {
  const field = ``
  expect(parseField(field)).toBe(' *')
})

test('parseField(`colName`) returns \' colName\'', () => {
  const field = `colName`
  expect(parseField(field)).toBe(' colName')
})

test('parseField(`col1, col2`) returns \' col1, col2\'', () => {
  const field = `col1, col2`
  expect(parseField(field)).toBe(' col1, col2')
})

test('parseField(`*`) returns \' *\'', () => {
  const field = `*`
  expect(parseField(field)).toBe(' *')
})


// Object
test('parseField({}) returns \' *\'', () => {
  const field = {}
  expect(parseField(field)).toBe(' *')
})

test('parseField({colName: `value`}) returns \' colName\'', () => {
  const field = { colName: `value` }
  expect(parseField(field)).toBe(' colName')
})

test('parseField({col1: `val1`, col2: `val2`}) returns \' col1, col2\'', () => {
  const field = { col1: `val1`, col2: `val2` }
  expect(parseField(field)).toBe(' col1, col2')
})
