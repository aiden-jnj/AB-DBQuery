const { queryUpdate } = require('../src')


// table: undefined, values: undefined
test('queryUpdate() occurs error', () => {
  const call = () => queryUpdate()
  const error = new Error('[queryUpdate] Not passed table name to be used in query statement!')
  expect(call).toThrowError(error)
})

// table: String, values: undefined
test('queryUpdate(`tblName`) occurs error', () => {
  const table = `tblName`
  const call = () => queryUpdate(table)
  const error = new Error('[queryUpdate] Not passed update condition clause to be used in UPDATE query statement!')
  expect(call).toThrowError(error)
})


// table: String, values: Array
test('queryUpdate(`tblName`, []) occurs error', () => {
  const table = `tblName`
  const values = []
  const call = () => queryUpdate(table, values)
  const error = new Error('[queryUpdate] Not passed update condition clause to be used in UPDATE query statement!')
  expect(call).toThrowError(error)
})

test('queryUpdate(`tblName`, [`"value"`]) returns \'INSERT INTO tblName VALUES ("value")\'', () => {
  const table = `tblName`
  const values = [`"value"`]
  const call = () => queryUpdate(table, values)
  const error = new Error('[queryUpdate] Not passed update condition clause to be used in UPDATE query statement!')
  expect(call).toThrowError(error)
})


// table: String, values: Object
test('queryUpdate(`tblName`, {}) occurs error', () => {
  const table = `tblName`
  const values = {}
  const call = () => queryUpdate(table, values)
  const error = new Error('[queryUpdate] Not passed update condition clause to be used in UPDATE query statement!')
  expect(call).toThrowError(error)
})

test('queryUpdate(`tblName`, { colName: `"value"` }) returns \'INSERT INTO tblName (colName) VALUES ("value")\'', () => {
  const table = `tblName`
  const values = { colName: `"value"` }
  const call = () => queryUpdate(table, values)
  const error = new Error('[queryUpdate] Not passed update condition clause to be used in UPDATE query statement!')
  expect(call).toThrowError(error)
})

test('queryUpdate(`tblName`, { col1: `"val1"`, col2: `"val2"` }) returns \'INSERT INTO tblName (col1, col2) VALUES ("val1", "val2")\'', () => {
  const table = `tblName`
  const values = { col1: `"val1"`, col2: `"val2"` }
  const call = () => queryUpdate(table, values)
  const error = new Error('[queryUpdate] Not passed update condition clause to be used in UPDATE query statement!')
  expect(call).toThrowError(error)
})


// table: String, values: Object, where: null
test('queryUpdate(`tblName`, {}, null) occurs error', () => {
  const table = `tblName`
  const values = { colName: `"value"` }
  const where = null
  const call = () => queryUpdate(table, values, where)
  const error = new Error('[queryUpdate] Not passed update condition clause to be used in UPDATE query statement!')
  expect(call).toThrowError(error)
})


// table: String, values: Object, where: String
test('queryUpdate(`tblName`, {}, ``) occurs error', () => {
  const table = `tblName`
  const values = { colName: `"value"` }
  const where = ``
  const call = () => queryUpdate(table, values, where)
  const error = new Error('[queryUpdate] Not passed update condition clause to be used in UPDATE query statement!')
  expect(call).toThrowError(error)
})

test('queryUpdate(`tblName`, {}, `gender = "mail"`) returns \'UPDATE tblName SET colName = \"value\" WHERE gender = \"mail\"\'', () => {
  const table = `tblName`
  const values = { colName: `"value"` }
  const where = `gender = "mail"`
  expect(queryUpdate(table, values, where)).toBe('UPDATE tblName SET colName = \"value\" WHERE gender = \"mail\"')
})
