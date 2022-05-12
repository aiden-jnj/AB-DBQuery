const { querySelectJoinGroup } = require('../src')


// table: undefined
test('querySelectJoinGroup() occurs error', () => {
  const call = () => querySelectJoinGroup()
  const error = new Error('[parseTable] Not passed table name to be used in query statement!')
  expect(call).toThrowError(error)
})


// table: String
test('querySelectJoinGroup(`tblName`) returns \'SELECT * FROM tblName\'', () => {
  const table = `tblName`
  expect(querySelectJoinGroup(table)).toBe('SELECT * FROM tblName')
})


// table: Array
test('querySelectJoinGroup([`tbl1`, `tbl2`]) returns \'SELECT * FROM tbl1, tbl2\'', () => {
  const table = [`tbl1`, `tbl2`]
  expect(querySelectJoinGroup(table)).toBe('SELECT * FROM tbl1, tbl2')
})


// table: String, type: String
test('querySelectJoinGroup(`tblName`, ``) returns \'SELECT * FROM tblName\'', () => {
  const table = `tblName`
  const type = ``
  expect(querySelectJoinGroup(table, type)).toBe('SELECT * FROM tblName')
})

test('querySelectJoinGroup(`tblName`, `INNER`) returns \'SELECT * FROM tblName\'', () => {
  const table = `tblName`
  const type = `INNER`
  expect(querySelectJoinGroup(table, type)).toBe('SELECT * FROM tblName')
})


// table: String, type: String, join: String
test('querySelectJoinGroup(`tableName`, `INNER`, `tblName`) returns \'SELECT * FROM tableName INNER JOIN tblName\'', () => {
  const table = `tableName`
  const type = `INNER`
  const join = `tblName`
  expect(querySelectJoinGroup(table, type, join)).toBe('SELECT * FROM tableName INNER JOIN tblName')
})


// table: String, type: String, join: Array
test('querySelectJoinGroup(`tableName`, `INNER`, [`tbl1`, `tbl2`]) returns \'SELECT * FROM tableName INNER JOIN tbl1, tbl2\'', () => {
  const table = `tableName`
  const type = `INNER`
  const join = [`tbl1`, `tbl2`]
  expect(querySelectJoinGroup(table, type, join)).toBe('SELECT * FROM tableName INNER JOIN tbl1, tbl2')
})


// table: String, type: String, join: String, on: String
test('querySelectJoinGroup(`tableName`, `INNER`, `tblName`, `tableName.id = tblName.id`) returns \'SELECT * FROM tableName INNER JOIN tblName ON tableName.id = tblName.id\'', () => {
  const table = `tableName`
  const type = `INNER`
  const join = `tblName`
  const on = `tableName.id = tblName.id`
  expect(querySelectJoinGroup(table, type, join, on)).toBe('SELECT * FROM tableName INNER JOIN tblName ON tableName.id = tblName.id')
})


// table: String, type: String, join: String, on: String, field: String
test('querySelectJoinGroup(`tableName`, `INNER`, `tblName`, `tableName.id = tblName.id`, `tableName.colName`) returns \'SELECT tableName.colName FROM tableName INNER JOIN tblName ON tableName.id = tblName.id\'', () => {
  const table = `tableName`
  const type = `INNER`
  const join = `tblName`
  const on = `tableName.id = tblName.id`
  const field = `tableName.colName`
  expect(querySelectJoinGroup(table, type, join, on, field)).toBe('SELECT tableName.colName FROM tableName INNER JOIN tblName ON tableName.id = tblName.id')
})


// table: String, type: String, join: String, on: String, field: Array
test('querySelectJoinGroup(`tableName`, `INNER`, `tblName`, `tableName.id = tblName.id`, [`tableName.col1`, `tableName.col2`]) returns \'SELECT tableName.col1, tableName.col2 FROM tableName INNER JOIN tblName ON tableName.id = tblName.id\'', () => {
  const table = `tableName`
  const type = `INNER`
  const join = `tblName`
  const on = `tableName.id = tblName.id`
  const field = [`tableName.col1`, `tableName.col2`]
  expect(querySelectJoinGroup(table, type, join, on, field)).toBe('SELECT tableName.col1, tableName.col2 FROM tableName INNER JOIN tblName ON tableName.id = tblName.id')
})


// table: String, type: String, join: String, on: String, field: Object
test('querySelectJoinGroup(`tableName`, `INNER`, `tblName`, `tableName.id = tblName.id`, { "tableName.col1": `val1`, "tableName.col2": `val2` }) returns \'SELECT tableName.col1, tableName.col2 FROM tableName INNER JOIN tblName ON tableName.id = tblName.id\'', () => {
  const table = `tableName`
  const type = `INNER`
  const join = `tblName`
  const on = `tableName.id = tblName.id`
  const field = { "tableName.col1": `val1`, "tableName.col2": `val2` }
  expect(querySelectJoinGroup(table, type, join, on, field)).toBe('SELECT tableName.col1, tableName.col2 FROM tableName INNER JOIN tblName ON tableName.id = tblName.id')
})


// table: String, type: String, join: String, on: String, field: Array, where: String
test('querySelectJoinGroup(`tableName`, `INNER`, `tblName`, `tableName.id = tblName.id`, [`tableName.col1`, `tableName.col2`], `tableName.gender = "male"`) returns \'SELECT tableName.col1, tableName.col2 FROM tableName INNER JOIN tblName ON tableName.id = tblName.id WHERE tableName.gender = "male"\'', () => {
  const table = `tableName`
  const type = `INNER`
  const join = `tblName`
  const on = `tableName.id = tblName.id`
  const field = [`tableName.col1`, `tableName.col2`]
  const where = `tableName.gender = "male"`
  expect(querySelectJoinGroup(table, type, join, on, field, where)).toBe('SELECT tableName.col1, tableName.col2 FROM tableName INNER JOIN tblName ON tableName.id = tblName.id WHERE tableName.gender = "male"')
})


// table: String, type: String, join: String, on: String, field: Array, where: Array
test('querySelectJoinGroup(`tableName`, `INNER`, `tblName`, `tableName.id = tblName.id`, [`tableName.col1`, `tableName.col2`], [`tableName.gender = "male"`, `tableName.amount >= 5000`]) returns \'SELECT tableName.col1, tableName.col2 FROM tableName INNER JOIN tblName ON tableName.id = tblName.id WHERE (tableName.gender = "male") AND (tableName.amount >= 5000)\'', () => {
  const table = `tableName`
  const type = `INNER`
  const join = `tblName`
  const on = `tableName.id = tblName.id`
  const field = [`tableName.col1`, `tableName.col2`]
  const where = [`tableName.gender = "male"`, `tableName.amount >= 5000`]
  expect(querySelectJoinGroup(table, type, join, on, field, where)).toBe('SELECT tableName.col1, tableName.col2 FROM tableName INNER JOIN tblName ON tableName.id = tblName.id WHERE (tableName.gender = "male") AND (tableName.amount >= 5000)')
})


// table: String, type: String, join: String, on: String, field: Array, where: Object
test('querySelectJoinGroup(`tableName`, `INNER`, `tblName`, `tableName.id = tblName.id`, [`tableName.col1`, `tableName.col2`], { "tableName.gender": `"male"`, "tableName.amount": `>= 5000` }) returns \'SELECT tableName.col1, tableName.col2 FROM tableName INNER JOIN tblName ON tableName.id = tblName.id WHERE (tableName.gender = "male") AND (tableName.amount >= 5000)\'', () => {
  const table = `tableName`
  const type = `INNER`
  const join = `tblName`
  const on = `tableName.id = tblName.id`
  const field = [`tableName.col1`, `tableName.col2`]
  const where = { "tableName.gender": `"male"`, "tableName.amount": `>= 5000` }
  expect(querySelectJoinGroup(table, type, join, on, field, where)).toBe('SELECT tableName.col1, tableName.col2 FROM tableName INNER JOIN tblName ON tableName.id = tblName.id WHERE (tableName.gender = "male") AND (tableName.amount >= 5000)')
})


// table: String, type: String, join: String, on: String, field: Array, where: Object, group: String
test('querySelectJoinGroup(`tableName`, `INNER`, `tblName`, `tableName.id = tblName.id`, [`tableName.col1`, `tableName.col2`], { "tableName.gender": `"male"`, "tableName.amount": `>= 5000` }, `tableName.colName`) returns \'SELECT tableName.col1, tableName.col2 FROM tableName INNER JOIN tblName ON tableName.id = tblName.id WHERE (tableName.gender = "male") AND (tableName.amount >= 5000) GROUP BY tableName.colName\'', () => {
  const table = `tableName`
  const type = `INNER`
  const join = `tblName`
  const on = `tableName.id = tblName.id`
  const field = [`tableName.col1`, `tableName.col2`]
  const where = { "tableName.gender": `"male"`, "tableName.amount": `>= 5000` }
  const group = `tableName.colName`
  expect(querySelectJoinGroup(table, type, join, on, field, where, group)).toBe('SELECT tableName.col1, tableName.col2 FROM tableName INNER JOIN tblName ON tableName.id = tblName.id WHERE (tableName.gender = "male") AND (tableName.amount >= 5000) GROUP BY tableName.colName')
})


// table: String, type: String, join: String, on: String, field: Array, where: Object, group: Array
test('querySelectJoinGroup(`tableName`, `INNER`, `tblName`, `tableName.id = tblName.id`, [`tableName.col1`, `tableName.col2`], { "tableName.gender": `"male"`, "tableName.amount": `>= 5000` }, [`tableName.col1`, `tableName.col2`]) returns \'SELECT tableName.col1, tableName.col2 FROM tableName INNER JOIN tblName ON tableName.id = tblName.id WHERE (tableName.gender = "male") AND (tableName.amount >= 5000) GROUP BY tableName.col1, tableName.col2\'', () => {
  const table = `tableName`
  const type = `INNER`
  const join = `tblName`
  const on = `tableName.id = tblName.id`
  const field = [`tableName.col1`, `tableName.col2`]
  const where = { "tableName.gender": `"male"`, "tableName.amount": `>= 5000` }
  const group = [`tableName.col1`, `tableName.col2`]
  expect(querySelectJoinGroup(table, type, join, on, field, where, group)).toBe('SELECT tableName.col1, tableName.col2 FROM tableName INNER JOIN tblName ON tableName.id = tblName.id WHERE (tableName.gender = "male") AND (tableName.amount >= 5000) GROUP BY tableName.col1, tableName.col2')
})


// table: String, type: String, join: String, on: String, field: Array, where: Object, group: Object
test('querySelectJoinGroup(`tableName`, `INNER`, `tblName`, `tableName.id = tblName.id`, [`tableName.col1`, `tableName.col2`], { "tableName.gender": `"male"`, "tableName.amount": `>= 5000` }, { "tableName.colName": `"value"` }) returns \'SELECT tableName.col1, tableName.col2 FROM tableName INNER JOIN tblName ON tableName.id = tblName.id WHERE (tableName.gender = "male") AND (tableName.amount >= 5000) GROUP BY tableName.colName\'', () => {
  const table = `tableName`
  const type = `INNER`
  const join = `tblName`
  const on = `tableName.id = tblName.id`
  const field = [`tableName.col1`, `tableName.col2`]
  const where = { "tableName.gender": `"male"`, "tableName.amount": `>= 5000` }
  const group = { "tableName.colName": `"value"` }
  expect(querySelectJoinGroup(table, type, join, on, field, where, group)).toBe('SELECT tableName.col1, tableName.col2 FROM tableName INNER JOIN tblName ON tableName.id = tblName.id WHERE (tableName.gender = "male") AND (tableName.amount >= 5000) GROUP BY tableName.colName')
})


// table: String, type: String, join: String, on: String, field: Array, where: Object, group: String, having: String
test('querySelectJoinGroup(`tableName`, `INNER`, `tblName`, `tableName.id = tblName.id`, [`tableName.col1`, `tableName.col2`], { "tableName.gender": `"male"`, "tableName.amount": `>= 5000` }, `tableName.colName`, `SUM(tblName.amount) > 10000`) returns \'SELECT tableName.col1, tableName.col2 FROM tableName INNER JOIN tblName ON tableName.id = tblName.id WHERE (tableName.gender = "male") AND (tableName.amount >= 5000) GROUP BY tableName.colName HAVING SUM(tblName.amount) > 10000\'', () => {
  const table = `tableName`
  const type = `INNER`
  const join = `tblName`
  const on = `tableName.id = tblName.id`
  const field = [`tableName.col1`, `tableName.col2`]
  const where = { "tableName.gender": `"male"`, "tableName.amount": `>= 5000` }
  const group = `tableName.colName`
  const having = `SUM(tblName.amount) > 10000`
  expect(querySelectJoinGroup(table, type, join, on, field, where, group, having)).toBe('SELECT tableName.col1, tableName.col2 FROM tableName INNER JOIN tblName ON tableName.id = tblName.id WHERE (tableName.gender = "male") AND (tableName.amount >= 5000) GROUP BY tableName.colName HAVING SUM(tblName.amount) > 10000')
})


// table: String, type: String, join: String, on: String, field: Array, where: Object, group: String, having: String, order: String
test('querySelectJoinGroup(`tableName`, `INNER`, `tblName`, `tableName.id = tblName.id`, [`tableName.col1`, `tableName.col2`], { "tableName.gender": `"male"`, "tableName.amount": `>= 5000` }, `tableName.colName`, `SUM(tblName.amount) > 10000`, `tableName.dateReg DESC`) returns \'SELECT tableName.col1, tableName.col2 FROM tableName INNER JOIN tblName ON tableName.id = tblName.id WHERE (tableName.gender = "male") AND (tableName.amount >= 5000) GROUP BY tableName.colName HAVING SUM(tblName.amount) > 10000 ORDER BY tableName.dateReg DESC\'', () => {
  const table = `tableName`
  const type = `INNER`
  const join = `tblName`
  const on = `tableName.id = tblName.id`
  const field = [`tableName.col1`, `tableName.col2`]
  const where = { "tableName.gender": `"male"`, "tableName.amount": `>= 5000` }
  const group = `tableName.colName`
  const having = `SUM(tblName.amount) > 10000`
  const order = `tableName.dateReg DESC`
  expect(querySelectJoinGroup(table, type, join, on, field, where, group, having, order)).toBe('SELECT tableName.col1, tableName.col2 FROM tableName INNER JOIN tblName ON tableName.id = tblName.id WHERE (tableName.gender = "male") AND (tableName.amount >= 5000) GROUP BY tableName.colName HAVING SUM(tblName.amount) > 10000 ORDER BY tableName.dateReg DESC')
})


// table: String, type: String, join: String, on: String, field: Array, where: Object, group: String, having: String, order: String, limit: Number
test('querySelectJoinGroup(`tableName`, `INNER`, `tblName`, `tableName.id = tblName.id`, [`tableName.col1`, `tableName.col2`], { "tableName.gender": `"male"`, "tableName.amount": `>= 5000` }, `tableName.colName`, `SUM(tblName.amount) > 10000`, `tableName.dateReg DESC`, 5) returns \'SELECT tableName.col1, tableName.col2 FROM tableName INNER JOIN tblName ON tableName.id = tblName.id WHERE (tableName.gender = "male") AND (tableName.amount >= 5000) GROUP BY tableName.colName HAVING SUM(tblName.amount) > 10000 ORDER BY tableName.dateReg DESC LIMIT 5\'', () => {
  const table = `tableName`
  const type = `INNER`
  const join = `tblName`
  const on = `tableName.id = tblName.id`
  const field = [`tableName.col1`, `tableName.col2`]
  const where = { "tableName.gender": `"male"`, "tableName.amount": `>= 5000` }
  const group = `tableName.colName`
  const having = `SUM(tblName.amount) > 10000`
  const order = `tableName.dateReg DESC`
  const limit = 5
  expect(querySelectJoinGroup(table, type, join, on, field, where, group, having, order, limit)).toBe('SELECT tableName.col1, tableName.col2 FROM tableName INNER JOIN tblName ON tableName.id = tblName.id WHERE (tableName.gender = "male") AND (tableName.amount >= 5000) GROUP BY tableName.colName HAVING SUM(tblName.amount) > 10000 ORDER BY tableName.dateReg DESC LIMIT 5')
})
