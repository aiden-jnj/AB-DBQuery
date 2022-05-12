const { querySelectJoin } = require('../src')


// table: undefined
test('querySelectJoin() occurs error', () => {
  const call = () => querySelectJoin()
  const error = new Error('[parseTable] Not passed table name to be used in query statement!')
  expect(call).toThrowError(error)
})


// table: String
test('querySelectJoin(`tblName`) returns \'SELECT * FROM tblName\'', () => {
  const table = `tblName`
  expect(querySelectJoin(table)).toBe('SELECT * FROM tblName')
})


// table: Array
test('querySelectJoin([`tbl1`, `tbl2`]) returns \'SELECT * FROM tbl1, tbl2\'', () => {
  const table = [`tbl1`, `tbl2`]
  expect(querySelectJoin(table)).toBe('SELECT * FROM tbl1, tbl2')
})


// table: String, type: String
test('querySelectJoin(`tblName`, ``) returns \'SELECT * FROM tblName\'', () => {
  const table = `tblName`
  const type = ``
  expect(querySelectJoin(table, type)).toBe('SELECT * FROM tblName')
})

test('querySelectJoin(`tblName`, `INNER`) returns \'SELECT * FROM tblName\'', () => {
  const table = `tblName`
  const type = `INNER`
  expect(querySelectJoin(table, type)).toBe('SELECT * FROM tblName')
})


// table: String, type: String, join: String
test('querySelectJoin(`tableName`, `INNER`, `tblName`) returns \'SELECT * FROM tableName INNER JOIN tblName\'', () => {
  const table = `tableName`
  const type = `INNER`
  const join = `tblName`
  expect(querySelectJoin(table, type, join)).toBe('SELECT * FROM tableName INNER JOIN tblName')
})


// table: String, type: String, join: Array
test('querySelectJoin(`tableName`, `INNER`, [`tbl1`, `tbl2`]) returns \'SELECT * FROM tableName INNER JOIN tbl1, tbl2\'', () => {
  const table = `tableName`
  const type = `INNER`
  const join = [`tbl1`, `tbl2`]
  expect(querySelectJoin(table, type, join)).toBe('SELECT * FROM tableName INNER JOIN tbl1, tbl2')
})


// table: String, type: String, join: String, on: String
test('querySelectJoin(`tableName`, `INNER`, `tblName`, `tableName.id = tblName.id`) returns \'SELECT * FROM tableName INNER JOIN tblName ON tableName.id = tblName.id\'', () => {
  const table = `tableName`
  const type = `INNER`
  const join = `tblName`
  const on = `tableName.id = tblName.id`
  expect(querySelectJoin(table, type, join, on)).toBe('SELECT * FROM tableName INNER JOIN tblName ON tableName.id = tblName.id')
})


// table: String, type: String, join: String, on: String, field: String
test('querySelectJoin(`tableName`, `INNER`, `tblName`, `tableName.id = tblName.id`, `tableName.colName`) returns \'SELECT tableName.colName FROM tableName INNER JOIN tblName ON tableName.id = tblName.id\'', () => {
  const table = `tableName`
  const type = `INNER`
  const join = `tblName`
  const on = `tableName.id = tblName.id`
  const field = `tableName.colName`
  expect(querySelectJoin(table, type, join, on, field)).toBe('SELECT tableName.colName FROM tableName INNER JOIN tblName ON tableName.id = tblName.id')
})


// table: String, type: String, join: String, on: String, field: Array
test('querySelectJoin(`tableName`, `INNER`, `tblName`, `tableName.id = tblName.id`, [`tableName.col1`, `tableName.col2`]) returns \'SELECT tableName.col1, tableName.col2 FROM tableName INNER JOIN tblName ON tableName.id = tblName.id\'', () => {
  const table = `tableName`
  const type = `INNER`
  const join = `tblName`
  const on = `tableName.id = tblName.id`
  const field = [`tableName.col1`, `tableName.col2`]
  expect(querySelectJoin(table, type, join, on, field)).toBe('SELECT tableName.col1, tableName.col2 FROM tableName INNER JOIN tblName ON tableName.id = tblName.id')
})


// table: String, type: String, join: String, on: String, field: Object
test('querySelectJoin(`tableName`, `INNER`, `tblName`, `tableName.id = tblName.id`, { "tableName.col1": `val1`, "tableName.col2": `val2` }) returns \'SELECT tableName.col1, tableName.col2 FROM tableName INNER JOIN tblName ON tableName.id = tblName.id\'', () => {
  const table = `tableName`
  const type = `INNER`
  const join = `tblName`
  const on = `tableName.id = tblName.id`
  const field = { "tableName.col1": `val1`, "tableName.col2": `val2` }
  expect(querySelectJoin(table, type, join, on, field)).toBe('SELECT tableName.col1, tableName.col2 FROM tableName INNER JOIN tblName ON tableName.id = tblName.id')
})


// table: String, type: String, join: String, on: String, field: Array, where: String
test('querySelectJoin(`tableName`, `INNER`, `tblName`, `tableName.id = tblName.id`, [`tableName.col1`, `tableName.col2`], `tableName.gender = "male"`) returns \'SELECT tableName.col1, tableName.col2 FROM tableName INNER JOIN tblName ON tableName.id = tblName.id WHERE tableName.gender = "male"\'', () => {
  const table = `tableName`
  const type = `INNER`
  const join = `tblName`
  const on = `tableName.id = tblName.id`
  const field = [`tableName.col1`, `tableName.col2`]
  const where = `tableName.gender = "male"`
  expect(querySelectJoin(table, type, join, on, field, where)).toBe('SELECT tableName.col1, tableName.col2 FROM tableName INNER JOIN tblName ON tableName.id = tblName.id WHERE tableName.gender = "male"')
})


// table: String, type: String, join: String, on: String, field: Array, where: Array
test('querySelectJoin(`tableName`, `INNER`, `tblName`, `tableName.id = tblName.id`, [`tableName.col1`, `tableName.col2`], [`tableName.gender = "male"`, `tableName.amount >= 5000`]) returns \'SELECT tableName.col1, tableName.col2 FROM tableName INNER JOIN tblName ON tableName.id = tblName.id WHERE (tableName.gender = "male") AND (tableName.amount >= 5000)\'', () => {
  const table = `tableName`
  const type = `INNER`
  const join = `tblName`
  const on = `tableName.id = tblName.id`
  const field = [`tableName.col1`, `tableName.col2`]
  const where = [`tableName.gender = "male"`, `tableName.amount >= 5000`]
  expect(querySelectJoin(table, type, join, on, field, where)).toBe('SELECT tableName.col1, tableName.col2 FROM tableName INNER JOIN tblName ON tableName.id = tblName.id WHERE (tableName.gender = "male") AND (tableName.amount >= 5000)')
})


// table: String, type: String, join: String, on: String, field: Array, where: Object
test('querySelectJoin(`tableName`, `INNER`, `tblName`, `tableName.id = tblName.id`, [`tableName.col1`, `tableName.col2`], { "tableName.gender": `"male"`, "tableName.amount": `>= 5000` }) returns \'SELECT tableName.col1, tableName.col2 FROM tableName INNER JOIN tblName ON tableName.id = tblName.id WHERE (tableName.gender = "male") AND (tableName.amount >= 5000)\'', () => {
  const table = `tableName`
  const type = `INNER`
  const join = `tblName`
  const on = `tableName.id = tblName.id`
  const field = [`tableName.col1`, `tableName.col2`]
  const where = { "tableName.gender": `"male"`, "tableName.amount": `>= 5000` }
  expect(querySelectJoin(table, type, join, on, field, where)).toBe('SELECT tableName.col1, tableName.col2 FROM tableName INNER JOIN tblName ON tableName.id = tblName.id WHERE (tableName.gender = "male") AND (tableName.amount >= 5000)')
})


// table: String, type: String, join: String, on: String, field: Array, where: Object, order: String
test('querySelectJoin(`tableName`, `INNER`, `tblName`, `tableName.id = tblName.id`, [`tableName.col1`, `tableName.col2`], { "tableName.gender": `"male"`, "tableName.amount": `>= 5000` }, `tableName.dateReg DESC`) returns \'SELECT tableName.col1, tableName.col2 FROM tableName INNER JOIN tblName ON tableName.id = tblName.id WHERE (tableName.gender = "male") AND (tableName.amount >= 5000) ORDER BY tableName.dateReg DESC\'', () => {
  const table = `tableName`
  const type = `INNER`
  const join = `tblName`
  const on = `tableName.id = tblName.id`
  const field = [`tableName.col1`, `tableName.col2`]
  const where = { "tableName.gender": `"male"`, "tableName.amount": `>= 5000` }
  const order = `tableName.dateReg DESC`
  expect(querySelectJoin(table, type, join, on, field, where, order)).toBe('SELECT tableName.col1, tableName.col2 FROM tableName INNER JOIN tblName ON tableName.id = tblName.id WHERE (tableName.gender = "male") AND (tableName.amount >= 5000) ORDER BY tableName.dateReg DESC')
})


// table: String, type: String, join: String, on: String, field: Array, where: Object, order: String, limit: Number
test('querySelectJoin(`tableName`, `INNER`, `tblName`, `tableName.id = tblName.id`, [`tableName.col1`, `tableName.col2`], { "tableName.gender": `"male"`, "tableName.amount": `>= 5000` }, `tableName.dateReg DESC`, 5) returns \'SELECT tableName.col1, tableName.col2 FROM tableName INNER JOIN tblName ON tableName.id = tblName.id WHERE (tableName.gender = "male") AND (tableName.amount >= 5000) ORDER BY tableName.dateReg DES LIMIT 5C\'', () => {
  const table = `tableName`
  const type = `INNER`
  const join = `tblName`
  const on = `tableName.id = tblName.id`
  const field = [`tableName.col1`, `tableName.col2`]
  const where = { "tableName.gender": `"male"`, "tableName.amount": `>= 5000` }
  const order = `tableName.dateReg DESC`
  const limit = 5
  expect(querySelectJoin(table, type, join, on, field, where, order, limit)).toBe('SELECT tableName.col1, tableName.col2 FROM tableName INNER JOIN tblName ON tableName.id = tblName.id WHERE (tableName.gender = "male") AND (tableName.amount >= 5000) ORDER BY tableName.dateReg DESC LIMIT 5')
})
