const { queryInsert } = require('../src')


// table: undefined, values: undefined
test('queryInsert() occurs error', () => {
  const call = () => queryInsert()
  const error = new Error('[queryInsert] Not passed table name to be used in query statement!')
  expect(call).toThrowError(error)
})

// table: String, values: undefined
test('queryInsert(`tblName`) occurs error', () => {
  const table = `tblName`
  const call = () => queryInsert(table)
  const error = new Error('[parseInsertValues] Not passed object consisting of field and value to be used in INSERT query statement!')
  expect(call).toThrowError(error)
})


// table: String, values: Array
test('queryInsert(`tblName`, []) occurs error', () => {
  const table = `tblName`
  const values = []
  const call = () => queryInsert(table, values)
  const error = new Error('[parseInsertValues] Object consisting of fields and values for use in an INSERT query statement was specified incorrectly!')
  expect(call).toThrowError(error)
})

test('queryInsert(`tblName`, [`"value"`]) returns \'INSERT INTO tblName VALUES ("value")\'', () => {
  const table = `tblName`
  const values = [`"value"`]
  expect(queryInsert(table, values)).toBe('INSERT INTO tblName VALUES ("value")')
})

test('queryInsert(`tblName`, [`"val1"`, `"val2"`]) returns \'INSERT INTO tblName VALUES ("val1", "val2")\'', () => {
  const table = `tblName`
  const values = [`"val1"`, `"val2"`]
  expect(queryInsert(table, values)).toBe('INSERT INTO tblName VALUES ("val1", "val2")')
})


// table: String, values: Object
test('queryInsert(`tblName`, {}) occurs error', () => {
  const table = `tblName`
  const values = {}
  const call = () => queryInsert(table, values)
  const error = new Error('[parseInsertValues] Object consisting of fields and values for use in an INSERT query statement was specified incorrectly!')
  expect(call).toThrowError(error)
})

test('queryInsert(`tblName`, { colName: `"value"` }) returns \'INSERT INTO tblName (colName) VALUES ("value")\'', () => {
  const table = `tblName`
  const values = { colName: `"value"` }
  expect(queryInsert(table, values)).toBe('INSERT INTO tblName (colName) VALUES ("value")')
})

test('queryInsert(`tblName`, { col1: `"val1"`, col2: `"val2"` }) returns \'INSERT INTO tblName (col1, col2) VALUES ("val1", "val2")\'', () => {
  const table = `tblName`
  const values = { col1: `"val1"`, col2: `"val2"` }
  expect(queryInsert(table, values)).toBe('INSERT INTO tblName (col1, col2) VALUES ("val1", "val2")')
})
