const { parseJoin } = require('../src')


// undefined, undefined, undefined
test('parseJoin() returns \'\'', () => {
  expect(parseJoin()).toBe('')
})

// null, undefined, nudefined
test('parseJoin(null) returns \'\'', () => {
  expect(parseJoin(null)).toBe('')
})

// String, undefined, undefined
test('parseJoin(\'\') returns \'\'', () => {
  const type = ''
  expect(parseJoin(type)).toBe('')
})

test('parseJoin(\'INNER\') returns \'\'', () => {
  const type = 'INNER'
  expect(parseJoin(type)).toBe('')
})


// null, String, undefined
test('parseJoin(null, \'\') returns \'\'', () => {
  const type = null
  const table = ''
  expect(parseJoin(type, table)).toBe('')
})

test('parseJoin(null, \'tblname\') returns \' JOIN tblName\'', () => {
  const type = null
  const table = 'tblName'
  expect(parseJoin(type, table)).toBe(' JOIN tblName')
})

test('parseJoin(null, \'tbl1, tbl2\') returns \' JOIN tbl1, tbl2\'', () => {
  const type = null
  const table = 'tbl1, tbl2'
  expect(parseJoin(type, table)).toBe(' JOIN tbl1, tbl2')
})


// null, Array, undefined
test('parseJoin(null, []) returns \'\'', () => {
  const type = null
  const table = []
  expect(parseJoin(type, table)).toBe('')
})

test('parseJoin(null, [\'tblName\']) returns \' JOIN tblName\'', () => {
  const type = null
  const table = ['tblName']
  expect(parseJoin(type, table)).toBe(' JOIN tblName')
})

test('parseJoin(null, [\'tbl1\', \'tbl2\']) returns \' JOIN tbl1, tbl2\'', () => {
  const type = null
  const table = ['tbl1', 'tbl2']
  expect(parseJoin(type, table)).toBe(' JOIN tbl1, tbl2')
})


// String, String, undefined
test('parseJoin(\'\', \'\') returns \'\'', () => {
  const type = ''
  const table = ''
  expect(parseJoin(type, table)).toBe('')
})

test('parseJoin(\'\', \'tblName\') returns \' JOIN tblName\'', () => {
  const type = ''
  const table = 'tblName'
  expect(parseJoin(type, table)).toBe(' JOIN tblName')
})

test('parseJoin(\'\', \'tbl1, tbl2\') returns \' JOIN tbl1, tbl2\'', () => {
  const type = ''
  const table = 'tbl1, tbl2'
  expect(parseJoin(type, table)).toBe(' JOIN tbl1, tbl2')
})

test('parseJoin(\'INNER\', \'\') returns \'\'', () => {
  const type = 'INNER'
  const table = ''
  expect(parseJoin(type, table)).toBe('')
})

test('parseJoin(\'INNER\', \'tblName\') returns \' INNER JOIN tblName\'', () => {
  const type = 'INNER'
  const table = 'tblName'
  expect(parseJoin(type, table)).toBe(' INNER JOIN tblName')
})


// String, Array, undefined
test('parseJoin(\'\', []) returns \'\'', () => {
  const type = ''
  const table = []
  expect(parseJoin(type, table)).toBe('')
})

test('parseJoin(\'\', [\'tblName\']) returns \' JOIN tblName\'', () => {
  const type = ''
  const table = ['tblName']
  expect(parseJoin(type, table)).toBe(' JOIN tblName')
})

test('parseJoin(\'\', [\'tbl1\', \'tbl2\']) returns \' JOIN tbl1, tbl2\'', () => {
  const type = ''
  const table = ['tbl1', 'tbl2']
  expect(parseJoin(type, table)).toBe(' JOIN tbl1, tbl2')
})

test('parseJoin(\'INNER\', []) returns \'\'', () => {
  const type = 'INNER'
  const table = []
  expect(parseJoin(type, table)).toBe('')
})

test('parseJoin(\'INNER\', [\'tblName\']) returns \' INNER JOIN tblName\'', () => {
  const type = 'INNER'
  const table = ['tblName']
  expect(parseJoin(type, table)).toBe(' INNER JOIN tblName')
})


// String, String, null
test('parseJoin(\'\', \'\', null) returns \'\'', () => {
  const type = ''
  const table = ''
  const on = null
  expect(parseJoin(type, table, on)).toBe('')
})

test('parseJoin(\'INNER\', \'\', null) returns \'\'', () => {
  const type = 'INNER'
  const table = ''
  const on = null
  expect(parseJoin(type, table, on)).toBe('')
})

test('parseJoin(\'\', \'tblName\', null) returns \' JOIN tblName\'', () => {
  const type = ''
  const table = 'tblName'
  const on = null
  expect(parseJoin(type, table, on)).toBe(' JOIN tblName')
})

test('parseJoin(\'INNER\', \'tblName\', null) returns \' INNER JOIN tblName\'', () => {
  const type = 'INNER'
  const table = 'tblName'
  const on = null
  expect(parseJoin(type, table, on)).toBe(' INNER JOIN tblName')
})


// String, Array, null
test('parseJoin(\'\', [], null) returns \'\'', () => {
  const type = ''
  const table = []
  const on = null
  expect(parseJoin(type, table, on)).toBe('')
})

test('parseJoin(\'INNER\', [], null) returns \'\'', () => {
  const type = 'INNER'
  const table = []
  const on = null
  expect(parseJoin(type, table, on)).toBe('')
})

test('parseJoin(\'\', [\'tblName\'], null) returns \' JOIN tblName\'', () => {
  const type = ''
  const table = ['tblName']
  const on = null
  expect(parseJoin(type, table, on)).toBe(' JOIN tblName')
})

test('parseJoin(\'INNER\', [\'tblName\'], null) returns \' INNER JOIN tblName\'', () => {
  const type = 'INNER'
  const table = 'tblName'
  const on = null
  expect(parseJoin(type, table, on)).toBe(' INNER JOIN tblName')
})


// String, String, String
test('parseJoin(\'\', \'\', \'\') returns \'\'', () => {
  const type = ''
  const table = ''
  const on = ''
  expect(parseJoin(type, table, on)).toBe('')
})

test('parseJoin(\'INNER\', \'\', \'\') returns \'\'', () => {
  const type = 'INNER'
  const table = ''
  const on = ''
  expect(parseJoin(type, table, on)).toBe('')
})

test('parseJoin(\'\', \'tblName\', \'\') returns \' JOIN tblName\'', () => {
  const type = ''
  const table = 'tblName'
  const on = ''
  expect(parseJoin(type, table, on)).toBe(' JOIN tblName')
})

test('parseJoin(\'INNER\', \'tblName\', \'\') returns \' INNER JOIN tblName\'', () => {
  const type = 'INNER'
  const table = 'tblName'
  const on = ''
  expect(parseJoin(type, table, on)).toBe(' INNER JOIN tblName')
})

test('parseJoin(\'\', \'tblName\', \'tableName.id = tblName.id\') returns \' JOIN tblName ON tableName.id = tblName.id\'', () => {
  const type = ''
  const table = 'tblName'
  const on = 'tableName.id = tblName.id'
  expect(parseJoin(type, table, on)).toBe(' JOIN tblName ON tableName.id = tblName.id')
})

test('parseJoin(\'INNER\', \'tblName\', \'tableName.id = tblName.id\') returns \' INNER JOIN tblName ON tableName.id = tblName.id\'', () => {
  const type = 'INNER'
  const table = 'tblName'
  const on = 'tableName.id = tblName.id'
  expect(parseJoin(type, table, on)).toBe(' INNER JOIN tblName ON tableName.id = tblName.id')
})


// String, Array, String
test('parseJoin(\'\', [], \'\') returns \'\'', () => {
  const type = ''
  const table = []
  const on = ''
  expect(parseJoin(type, table, on)).toBe('')
})

test('parseJoin(\'INNER\', [], \'\') returns \'\'', () => {
  const type = 'INNER'
  const table = []
  const on = ''
  expect(parseJoin(type, table, on)).toBe('')
})

test('parseJoin(\'\', [\'tblName\'], \'\') returns \' JOIN tblName\'', () => {
  const type = ''
  const table = ['tblName']
  const on = ''
  expect(parseJoin(type, table, on)).toBe(' JOIN tblName')
})

test('parseJoin(\'INNER\', [\'tblName\'], \'\') returns \' INNER JOIN tblName\'', () => {
  const type = 'INNER'
  const table = ['tblName']
  const on = ''
  expect(parseJoin(type, table, on)).toBe(' INNER JOIN tblName')
})

test('parseJoin(\'\', [\'tblName\'], \'tableName.id = tblName.id\') returns \' JOIN tblName ON tableName.id = tblName.id\'', () => {
  const type = ''
  const table = ['tblName']
  const on = 'tableName.id = tblName.id'
  expect(parseJoin(type, table, on)).toBe(' JOIN tblName ON tableName.id = tblName.id')
})

test('parseJoin(\'INNER\', [\'tblName\'], \'tableName.id = tblName.id\') returns \' INNER JOIN tblName ON tableName.id = tblName.id\'', () => {
  const type = 'INNER'
  const table = ['tblName']
  const on = 'tableName.id = tblName.id'
  expect(parseJoin(type, table, on)).toBe(' INNER JOIN tblName ON tableName.id = tblName.id')
})

test('parseJoin(\'CROSS\', [\'tblName\'], \'tableName.id = tblName.id\') returns \' INNER JOIN tblName ON tableName.id = tblName.id\'', () => {
  const type = 'CROSS'
  const table = ['tblName']
  const on = 'tableName.id = tblName.id'
  expect(parseJoin(type, table, on)).toBe(' CROSS JOIN tblName')
})
