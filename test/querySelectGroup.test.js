const { querySelectGroup } = require('../src')


// table: undefiend
test('querySelectGroup() occurs error', () => {
  const call = () => querySelectGroup()
  const error = new Error('[parseTable] Not passed table name to be used in query statement!')
  expect(call).toThrowError(error)
})


// table: String
test('querySelectGroup(`tblName`) returns \'SELECT * FROM tblName\'', () => {
  const table = `tblName`
  expect(querySelectGroup(table)).toBe('SELECT * FROM tblName')
})


// table: Array
test('querySelectGroup([`tbl1`, `tbl2`]) returns \'SELECT * FROM tbl1, tbl2\'', () => {
  const table = [`tbl1`, `tbl2`]
  expect(querySelectGroup(table)).toBe('SELECT * FROM tbl1, tbl2')
})


// table: String, field: String
test('querySelectGroup(`tblName`, ``) returns \'SELECT * FROM tblName\'', () => {
  const table = `tblName`
  const field = ``
  expect(querySelectGroup(table, field)).toBe('SELECT * FROM tblName')
})

test('querySelectGroup(`tblName`, `colName`) returns \'SELECT colName FROM tblName\'', () => {
  const table = `tblName`
  const field = `colName`
  expect(querySelectGroup(table, field)).toBe('SELECT colName FROM tblName')
})

test('querySelectGroup(`tblName`, `col1, col2`) returns \'SELECT col1, col2 FROM tblName\'', () => {
  const table = `tblName`
  const field = `col1, col2`
  expect(querySelectGroup(table, field)).toBe('SELECT col1, col2 FROM tblName')
})


// table: String, field: Array
test('querySelectGroup(`tblName`, []) returns \'SELECT * FROM tblName\'', () => {
  const table = `tblName`
  const field = []
  expect(querySelectGroup(table, field)).toBe('SELECT * FROM tblName')
})

test('querySelectGroup(`tblName`, [`colName`]) returns \'SELECT colName FROM tblName\'', () => {
  const table = `tblName`
  const field = [`colName`]
  expect(querySelectGroup(table, field)).toBe('SELECT colName FROM tblName')
})

test('querySelectGroup(`tblName`, [`col1`, `col2`]) returns \'SELECT col1, col2 FROM tblName\'', () => {
  const table = `tblName`
  const field = [`col1`, `col2`]
  expect(querySelectGroup(table, field)).toBe('SELECT col1, col2 FROM tblName')
})


// table: String, field: Object
test('querySelectGroup(`tblName`, {}) returns \'SELECT * FROM tblName\'', () => {
  const table = `tblName`
  const field = {}
  expect(querySelectGroup(table, field)).toBe('SELECT * FROM tblName')
})

test('querySelectGroup(`tblName`, {colName: `value`}) returns \'SELECT colName FROM tblName\'', () => {
  const table = `tblName`
  const field = { colName: `value` }
  expect(querySelectGroup(table, field)).toBe('SELECT colName FROM tblName')
})

test('querySelectGroup(`tblName`, {col1: `val1`, col2: `val2`}) returns \'SELECT col1, col2 FROM tblName\'', () => {
  const table = `tblName`
  const field = { col1: `val1`, col2: `val2` }
  expect(querySelectGroup(table, field)).toBe('SELECT col1, col2 FROM tblName')
})


// table: String, field: Array, where: String
test('querySelectGroup(`tblName`, [`col1`, `col2`], ``) returns \'SELECT col1, col2 FROM tblName\'', () => {
  const table = `tblName`
  const field = [`col1`, `col2`]
  const where = ``
  expect(querySelectGroup(table, field, where)).toBe('SELECT col1, col2 FROM tblName')
})

test('querySelectGroup(`tblName`, [`col1`, `col2`], `gender = "male"`) returns \'SELECT col1, col2 FROM tblName WHERE gender = "male"\'', () => {
  const table = `tblName`
  const field = [`col1`, `col2`]
  const where = `gender = "male"`
  expect(querySelectGroup(table, field, where)).toBe('SELECT col1, col2 FROM tblName WHERE gender = "male"')
})


// table: String, field: Array, where: Array
test('querySelectGroup(`tblName`, [`col1`, `col2`], []) returns \'SELECT col1, col2 FROM tblName\'', () => {
  const table = `tblName`
  const field = [`col1`, `col2`]
  const where = []
  expect(querySelectGroup(table, field, where)).toBe('SELECT col1, col2 FROM tblName')
})

test('querySelectGroup(`tblName`, [`col1`, `col2`], [`gender = "male"`]) returns \'SELECT col1, col2 FROM tblName WHERE (gender = "male")\'', () => {
  const table = `tblName`
  const field = [`col1`, `col2`]
  const where = [`gender = "male"`]
  expect(querySelectGroup(table, field, where)).toBe('SELECT col1, col2 FROM tblName WHERE (gender = "male")')
})


// table: String, field: Array, where: Object
test('querySelectGroup(`tblName`, [`col1`, `col2`], {}) returns \'SELECT col1, col2 FROM tblName\'', () => {
  const table = `tblName`
  const field = [`col1`, `col2`]
  const where = {}
  expect(querySelectGroup(table, field, where)).toBe('SELECT col1, col2 FROM tblName')
})

test('querySelectGroup(`tblName`, [`col1`, `col2`], {gender: `"male"`}) returns \'SELECT col1, col2 FROM tblName WHERE (gender = "male")\'', () => {
  const table = `tblName`
  const field = [`col1`, `col2`]
  const where = { gender: `"male"` }
  expect(querySelectGroup(table, field, where)).toBe('SELECT col1, col2 FROM tblName WHERE (gender = "male")')
})


// table: String, field: Array, where: Object, group: String
test('querySelectGroup(`tblName`, [`col1`, `col2`], {gender: `"male"`}, `colName`) returns \'SELECT col1, col2 FROM tblName WHERE (gender = "male") GROUP BY colName\'', () => {
  const table = `tblName`
  const field = [`col1`, `col2`]
  const where = { gender: `"male"` }
  const group = `colName`
  expect(querySelectGroup(table, field, where, group)).toBe('SELECT col1, col2 FROM tblName WHERE (gender = "male") GROUP BY colName')
})

test('querySelectGroup(`tblName`, [`col1`, `col2`], {gender: `"male"`}, `col1, col2`) returns \'SELECT col1, col2 FROM tblName WHERE (gender = "male") GROUP BY col1, col2\'', () => {
  const table = `tblName`
  const field = [`col1`, `col2`]
  const where = { gender: `"male"` }
  const group = `col1, col2`
  expect(querySelectGroup(table, field, where, group)).toBe('SELECT col1, col2 FROM tblName WHERE (gender = "male") GROUP BY col1, col2')
})


// table: String, field: Array, where: Object, group: Array
test('querySelectGroup(`tblName`, [`col1`, `col2`], {gender: `"male"`}, [`colName`]) returns \'SELECT col1, col2 FROM tblName WHERE (gender = "male") GROUP BY colName\'', () => {
  const table = `tblName`
  const field = [`col1`, `col2`]
  const where = { gender: `"male"` }
  const group = [`colName`]
  expect(querySelectGroup(table, field, where, group)).toBe('SELECT col1, col2 FROM tblName WHERE (gender = "male") GROUP BY colName')
})

test('querySelectGroup(`tblName`, [`col1`, `col2`], {gender: `"male"`}, [`col1`, `col2`]) returns \'SELECT col1, col2 FROM tblName WHERE (gender = "male") GROUP BY col1, col2\'', () => {
  const table = `tblName`
  const field = [`col1`, `col2`]
  const where = { gender: `"male"` }
  const group = [`col1`, `col2`]
  expect(querySelectGroup(table, field, where, group)).toBe('SELECT col1, col2 FROM tblName WHERE (gender = "male") GROUP BY col1, col2')
})


// table: String, field: Array, where: Object, group: Object
test('querySelectGroup(`tblName`, [`col1`, `col2`], {gender: `"male"`}, {colName: `value`}) returns \'SELECT col1, col2 FROM tblName WHERE (gender = "male") GROUP BY colName\'', () => {
  const table = `tblName`
  const field = [`col1`, `col2`]
  const where = { gender: `"male"` }
  const group = { colName: `value` }
  expect(querySelectGroup(table, field, where, group)).toBe('SELECT col1, col2 FROM tblName WHERE (gender = "male") GROUP BY colName')
})

test('querySelectGroup(`tblName`, [`col1`, `col2`], {gender: `"male"`}, {col1: `val1`, col2: `val2`}) returns \'SELECT col1, col2 FROM tblName WHERE (gender = "male") GROUP BY col1, col2\'', () => {
  const table = `tblName`
  const field = [`col1`, `col2`]
  const where = { gender: `"male"` }
  const group = { col1: `val1`, col2: `val2` }
  expect(querySelectGroup(table, field, where, group)).toBe('SELECT col1, col2 FROM tblName WHERE (gender = "male") GROUP BY col1, col2')
})


// table: String, field: Array, where: Object, group: String, having: String
test('querySelectGroup(`tblName`, [`col1`, `col2`], {gender: `"male"`}, `colName`) returns \'SELECT col1, col2 FROM tblName WHERE (gender = "male") GROUP BY colName HAVING SUM(amount) > 10000\'', () => {
  const table = `tblName`
  const field = [`col1`, `col2`]
  const where = { gender: `"male"` }
  const group = `colName`
  const having = `SUM(amount) > 10000`
  expect(querySelectGroup(table, field, where, group, having)).toBe('SELECT col1, col2 FROM tblName WHERE (gender = "male") GROUP BY colName HAVING SUM(amount) > 10000')
})


// table: String, field: Array, where: Object, group: String, having: String, order: String
test('querySelectGroup(`tblName`, [`col1`, `col2`], {gender: `"male"`}, `colName`, `dateReg DESC`) returns \'SELECT col1, col2 FROM tblName WHERE (gender = "male") GROUP BY colName HAVING SUM(amount) > 10000 ORDER BY dateReg DESC\'', () => {
  const table = `tblName`
  const field = [`col1`, `col2`]
  const where = { gender: `"male"` }
  const group = `colName`
  const having = `SUM(amount) > 10000`
  const order = `dateReg DESC`
  expect(querySelectGroup(table, field, where, group, having, order)).toBe('SELECT col1, col2 FROM tblName WHERE (gender = "male") GROUP BY colName HAVING SUM(amount) > 10000 ORDER BY dateReg DESC')
})

// table: String, field: Array, where: Object, group: String, having: String, order: String, limit: Number
test('querySelectGroup(`tblName`, [`col1`, `col2`], {gender: `"male"`}, `colName`, `dateReg DESC`, 5) returns \'SELECT col1, col2 FROM tblName WHERE (gender = "male") GROUP BY colName HAVING SUM(amount) > 10000 ORDER BY dateReg DESC LIMIT 5\'', () => {
  const table = `tblName`
  const field = [`col1`, `col2`]
  const where = { gender: `"male"` }
  const group = `colName`
  const having = `SUM(amount) > 10000`
  const order = `dateReg DESC`
  const limit = 5
  expect(querySelectGroup(table, field, where, group, having, order, limit)).toBe('SELECT col1, col2 FROM tblName WHERE (gender = "male") GROUP BY colName HAVING SUM(amount) > 10000 ORDER BY dateReg DESC LIMIT 5')
})
