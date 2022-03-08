const { parseUpdateValues } = require('../src')


// undefined
test('parseUpdateValues() occurs error', () => {
  const call = () => parseUpdateValues()
  const error = new Error('[parseUpdateValues] Not passed object consisting of field and value to be used in UPDATE query statement!')
  expect(call).toThrowError(error)
})

// null
test('(parseUpdateValues(null) occurs error', () => {
  const call = () => parseUpdateValues(null)
  const error = new Error('[parseUpdateValues] Not passed object consisting of field and value to be used in UPDATE query statement!')
  expect(call).toThrowError(error)
})

// String
test('(parseUpdateValues(``) occurs error', () => {
  const values = ``
  const call = () => parseUpdateValues(values)
  const error = new Error('[parseUpdateValues] Not passed object consisting of field and value to be used in UPDATE query statement!')
  expect(call).toThrowError(error)
})

test('(parseUpdateValues(`colName = 1`) occurs error', () => {
  const values = `colName = 1`
  const call = () => parseUpdateValues(values)
  const error = new Error('[parseUpdateValues] Object consisting of fields and values for use in an UPDATE query statement was specified incorrectly!')
  expect(call).toThrowError(error)
})

// Array
test('(parseUpdateValues([]) occurs error', () => {
  const values = []
  const call = () => parseUpdateValues(values)
  const error = new Error('[parseUpdateValues] Object consisting of fields and values for use in an UPDATE query statement was specified incorrectly!')
  expect(call).toThrowError(error)
})

test('(parseUpdateValues([`col1 = val1`, `col2 = val2`]) occurs error', () => {
  const values = [`col1 = val1`, `col2 = val2`]
  const call = () => parseUpdateValues(values)
  const error = new Error('[parseUpdateValues] Object consisting of fields and values for use in an UPDATE query statement was specified incorrectly!')
  expect(call).toThrowError(error)
})


// Object
test('(parseUpdateValues({}) occurs error', () => {
  const values = {}
  const call = () => parseUpdateValues(values)
  const error = new Error('[parseUpdateValues] Object consisting of fields and values for use in an UPDATE query statement was specified incorrectly!')
  expect(call).toThrowError(error)
})

test('(parseUpdateValues({colName: `"value"`}) returns \' SET colName = "value"\'', () => {
  const values = { colName: `"value"` }
  expect(parseUpdateValues(values)).toBe(' SET colName = "value"')
})

test('(parseUpdateValues({col1: 5, col2: `"val2"`}) returns \' SET col1 = 5, col2 = "val2"\'', () => {
  const values = { col1: 5, col2: `"val2"` }
  expect(parseUpdateValues(values)).toBe(' SET col1 = 5, col2 = "val2"')
})
