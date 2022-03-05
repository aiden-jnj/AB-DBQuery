const { parseInsertValues } = require('../src')


// undefined
test('(parseInsertValues() occurs error', () => {
  const call = () => parseInsertValues()
  const error = new Error('[parseInsertValues] Not passed object consisting of field and value to be used in INSERT query statement!')
  expect(call).toThrowError(error)
})

// null
test('(parseInsertValues(null) occurs error', () => {
  const call = () => parseInsertValues(null)
  const error = new Error('[parseInsertValues] Not passed object consisting of field and value to be used in INSERT query statement!')
  expect(call).toThrowError(error)
})

// String
test('(parseInsertValues(\'\') occurs error', () => {
  const values = ''
  const call = () => parseInsertValues(values)
  const error = new Error('[parseInsertValues] Not passed object consisting of field and value to be used in INSERT query statement!')
  expect(call).toThrowError(error)
})

test('(parseInsertValues(\'colName = 1\') occurs error', () => {
  const values = 'colName = 1'
  const call = () => parseInsertValues(values)
  const error = new Error('[parseInsertValues] Object consisting of fields and values for use in an INSERT query statement was specified incorrectly!')
  expect(call).toThrowError(error)
})

// Array
test('(parseInsertValues([]) occurs error', () => {
  const values = []
  const call = () => parseInsertValues(values)
  const error = new Error('[parseInsertValues] Object consisting of fields and values for use in an INSERT query statement was specified incorrectly!')
  expect(call).toThrowError(error)
})

test('(parseInsertValues([\'col1 = val1\', \'col2 = val2\']) occurs error', () => {
  const values = ['col1 = val1', 'col2 = val2']
  const call = () => parseInsertValues(values)
  const error = new Error('[parseInsertValues] Object consisting of fields and values for use in an INSERT query statement was specified incorrectly!')
  expect(call).toThrowError(error)
})


// Object
test('(parseInsertValues({}) occurs error', () => {
  const values = {}
  const call = () => parseInsertValues(values)
  const error = new Error('[parseInsertValues] Object consisting of fields and values for use in an INSERT query statement was specified incorrectly!')
  expect(call).toThrowError(error)
})

test('(parseInsertValues({colName: `"value"`}) returns \' (colName) VALUES ("value")\'', () => {
  const values = { colName: `"value"` }
  expect(parseInsertValues(values)).toBe(' (colName) VALUES ("value")')
})

test('(parseInsertValues({col1: 5, col2: `"val2"`}) returns \' (col1, col2) VALUES (5, "val2")\'', () => {
  const values = { col1: 5, col2: `"val2"` }
  expect(parseInsertValues(values)).toBe(' (col1, col2) VALUES (5, "val2")')
})
