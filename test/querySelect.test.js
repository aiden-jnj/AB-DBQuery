const { querySelect } = require('../src')



// table: undefined
test('querySelect() occurs error', () => {
  const call = () => querySelect()
  const error = new Error('[parseTable] Not passed table name to be used in query statement!')
  expect(call).toThrowError(error)
})


// table: String
test('querySelect(`tblName`) returns \'SELECT * FROM tblName\'', () => {
  const table = `tblName`
  expect(querySelect(table)).toBe('SELECT * FROM tblName')
})


// table: Array
test('querySelect([`tbl1`, `tbl2`]) returns \'SELECT * FROM tbl1, tbl2\'', () => {
  const table = [`tbl1`, `tbl2`]
  expect(querySelect(table)).toBe('SELECT * FROM tbl1, tbl2')
})


// table: String, field: String
test('querySelect(`tblName`, ``) returns \'SELECT * FROM tblName\'', () => {
  const table = `tblName`
  const field = ``
  expect(querySelect(table, field)).toBe('SELECT * FROM tblName')
})

test('querySelect(`tblName`, `colName`) returns \'SELECT colName FROM tblName\'', () => {
  const table = `tblName`
  const field = `colName`
  expect(querySelect(table, field)).toBe('SELECT colName FROM tblName')
})

test('querySelect(`tblName`, `col1, col2`) returns \'SELECT col1, col2 FROM tblName\'', () => {
  const table = `tblName`
  const field = `col1, col2`
  expect(querySelect(table, field)).toBe('SELECT col1, col2 FROM tblName')
})


// table: String, field: Array
test('querySelect(`tblName`, []) returns \'SELECT * FROM tblName\'', () => {
  const table = `tblName`
  const field = []
  expect(querySelect(table, field)).toBe('SELECT * FROM tblName')
})

test('querySelect(`tblName`, [`colName`]) returns \'SELECT colName FROM tblName\'', () => {
  const table = `tblName`
  const field = [`colName`]
  expect(querySelect(table, field)).toBe('SELECT colName FROM tblName')
})

test('querySelect(`tblName`, [`col1`, `col2`]) returns \'SELECT col1, col2 FROM tblName\'', () => {
  const table = `tblName`
  const field = [`col1`, `col2`]
  expect(querySelect(table, field)).toBe('SELECT col1, col2 FROM tblName')
})


// table: String, field: Object
test('querySelect(`tblName`, {}) returns \'SELECT * FROM tblName\'', () => {
  const table = `tblName`
  const field = {}
  expect(querySelect(table, field)).toBe('SELECT * FROM tblName')
})

test('querySelect(`tblName`, { colName: `value` }) returns \'SELECT colName FROM tblName\'', () => {
  const table = `tblName`
  const field = { colName: `value` }
  expect(querySelect(table, field)).toBe('SELECT colName FROM tblName')
})

test('querySelect(`tblName`, { col1: `val1`, col2: `val2` }) returns \'SELECT col1, col2 FROM tblName\'', () => {
  const table = `tblName`
  const field = { col1: `val1`, col2: `val2` }
  expect(querySelect(table, field)).toBe('SELECT col1, col2 FROM tblName')
})


// table: String, field: Array, where: String
test('querySelect(`tblName`, [`col1`, `col2`], ``) returns \'SELECT col1, col2 FROM tblName\'', () => {
  const table = `tblName`
  const field = [`col1`, `col2`]
  const where = ``
  expect(querySelect(table, field, where)).toBe('SELECT col1, col2 FROM tblName')
})

test('querySelect(`tblName`, [`col1`, `col2`], `gender = "male"`) returns \'SELECT col1, col2 FROM tblName WHERE gender = "male"\'', () => {
  const table = `tblName`
  const field = [`col1`, `col2`]
  const where = `gender = "male"`
  expect(querySelect(table, field, where)).toBe('SELECT col1, col2 FROM tblName WHERE gender = "male"')
})


// table: String, field: Array, where: Array
test('querySelect(`tblName`, [`col1`, `col2`], []) returns \'SELECT col1, col2 FROM tblName\'', () => {
  const table = `tblName`
  const field = [`col1`, `col2`]
  const where = []
  expect(querySelect(table, field, where)).toBe('SELECT col1, col2 FROM tblName')
})

test('querySelect(`tblName`, [`col1`, `col2`], [`gender = "male"`]) returns \'SELECT col1, col2 FROM tblName WHERE (gender = "male")\'', () => {
  const table = `tblName`
  const field = [`col1`, `col2`]
  const where = [`gender = "male"`]
  expect(querySelect(table, field, where)).toBe('SELECT col1, col2 FROM tblName WHERE (gender = "male")')
})


// table: String, field: Array, where: Object
test('querySelect(`tblName`, [`col1`, `col2`], {}) returns \'SELECT col1, col2 FROM tblName\'', () => {
  const table = `tblName`
  const field = [`col1`, `col2`]
  const where = {}
  expect(querySelect(table, field, where)).toBe('SELECT col1, col2 FROM tblName')
})

test('querySelect(`tblName`, [`col1`, `col2`], { gender: `"male"` }) returns \'SELECT col1, col2 FROM tblName WHERE (gender = "male")\'', () => {
  const table = `tblName`
  const field = [`col1`, `col2`]
  const where = { gender: `"male"` }
  expect(querySelect(table, field, where)).toBe('SELECT col1, col2 FROM tblName WHERE (gender = "male")')
})


// table: String, field: Array, where: Object, order: String
test('querySelect(`tblName`, [`col1`, `col2`], { gender: `"male"` }, ``) returns \'SELECT col1, col2 FROM tblName WHERE (gender = "male")\'', () => {
  const table = `tblName`
  const field = [`col1`, `col2`]
  const where = { gender: `"male"` }
  const order = ``
  expect(querySelect(table, field, where, order)).toBe('SELECT col1, col2 FROM tblName WHERE (gender = "male")')
})

test('querySelect(`tblName`, [`col1`, `col2`], { gender: `"male"` }, `dateReg DESC`) returns \'SELECT col1, col2 FROM tblName WHERE (gender = "male") ORDER BY dateReg DESC\'', () => {
  const table = `tblName`
  const field = [`col1`, `col2`]
  const where = { gender: `"male"` }
  const order = `dateReg DESC`
  expect(querySelect(table, field, where, order)).toBe('SELECT col1, col2 FROM tblName WHERE (gender = "male") ORDER BY dateReg DESC')
})


// table: String, field: Array, where: Object, order: String, limit: Number
test('querySelect(`tblName`, [`col1`, `col2`], { gender: `"male"` }, `dateReg DESC`, 0) returns \'SELECT col1, col2 FROM tblName WHERE (gender = "male") ORDER BY dateReg DESC\'', () => {
  const table = `tblName`
  const field = [`col1`, `col2`]
  const where = { gender: `"male"` }
  const order = `dateReg DESC`
  const limit = 0
  expect(querySelect(table, field, where, order, limit)).toBe('SELECT col1, col2 FROM tblName WHERE (gender = "male") ORDER BY dateReg DESC')
})

test('querySelect(`tblName`, [`col1`, `col2`], { gender: `"male"` }, `dateReg DESC`, 5) returns \'SELECT col1, col2 FROM tblName WHERE (gender = "male") ORDER BY dateReg DESC LIMIT 5\'', () => {
  const table = `tblName`
  const field = [`col1`, `col2`]
  const where = { gender: `"male"` }
  const order = `dateReg DESC`
  const limit = 5
  expect(querySelect(table, field, where, order, limit)).toBe('SELECT col1, col2 FROM tblName WHERE (gender = "male") ORDER BY dateReg DESC LIMIT 5')
})
