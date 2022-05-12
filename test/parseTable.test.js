const { parseTable } = require('../src')


// table: undefined
test('parseTable() occurs error', () => {
  const call = () => parseTable()
  const error = new Error('[parseTable] Not passed table name to be used in query statement!')
  expect(call).toThrowError(error)
})

// table: null
test('parseTable(null) occurs error', () => {
  const call = () => parseTable(null)
  const error = new Error('[parseTable] Not passed table name to be used in query statement!')
  expect(call).toThrowError(error)
})

// table: Object
test('parseTable({}) occurs error', () => {
  const table = {}
  const call = () => parseTable(table)
  const error = new Error('[parseTable] Table to use in the query statement is not specified!')
  expect(call).toThrowError(error)
})

test('parseTable({ tblName: `myTable` }) occurs error', () => {
  const table = { tblName: `myTable` }
  const call = () => parseTable(table)
  const error = new Error('[parseTable] Table to use in the query statement is not specified!')
  expect(call).toThrowError(error)
})


// table: String
test('parseTable(``) occurs error', () => {
  const table = ``
  const call = () => parseTable(table)
  const error = new Error('[parseTable] Not passed table name to be used in query statement!')
  expect(call).toThrowError(error)
})

test('parseTable(`tblName`) returns \' FROM tblName\'', () => {
  const table = `tblName`
  expect(parseTable(table)).toBe(' FROM tblName')
})

test('parseTable(`tbl1, tbl2`) returns \' FROM tbl1, tbl2\'', () => {
  const table = `tbl1, tbl2`
  expect(parseTable(table)).toBe(' FROM tbl1, tbl2')
})


// table: Array
test('parseTable([]) occurs error', () => {
  const table = []
  const call = () => parseTable(table)
  const error = new Error('[parseTable] Table to use in the query statement is not specified!')
  expect(call).toThrowError(error)
})

test('parseTable([`tblName`]) returns \' FROM tblName\'', () => {
  const table = [`tblName`]
  expect(parseTable(table)).toBe(' FROM tblName')
})

test('parseTable([`tbl1`, `tbl2`]) returns \' FROM tbl1, tbl2\'', () => {
  const table = [`tbl1`, `tbl2`]
  expect(parseTable(table)).toBe(' FROM tbl1, tbl2')
})
