const { parseGroup } = require('../src')


// undefined, undefined
test('parseGroup() returns \'\'', () => {
  expect(parseGroup()).toBe('')
})

// null, undefined
test('parseGroup(null) returns \'\'', () => {
  expect(parseGroup(null)).toBe('')
})


// Array, undefined
test('parseGroup([]) returns \'\'', () => {
  const group = []
  expect(parseGroup(group)).toBe('')
})

test('parseGroup([`colName`]) returns \' GROUP BY colName\'', () => {
  const group = [`colName`]
  expect(parseGroup(group)).toBe(' GROUP BY colName')
})

test('parseGroup([`col1`, `col2`]) returns \' GROUP BY col1, col2\'', () => {
  const group = [`col1`, `col2`]
  expect(parseGroup(group)).toBe(' GROUP BY col1, col2')
})


// String, undefined
test('parseGroup(``) returns \'\'', () => {
  const group = ``
  expect(parseGroup(group)).toBe('')
})

test('parseGroup(`colName`) returns \' GROUP BY colName\'', () => {
  const group = `colName`
  expect(parseGroup(group)).toBe(' GROUP BY colName')
})

test('parseGroup(`col1, col2`) returns \' GROUP BY col1, col2\'', () => {
  const group = `col1, col2`
  expect(parseGroup(group)).toBe(' GROUP BY col1, col2')
})


// Object, undefined
test('parseGroup({}) returns \'\'', () => {
  const group = {}
  expect(parseGroup(group)).toBe('')
})

test('parseGroup({colName: `value`}) returns \' GROUP BY colName\'', () => {
  const group = { colName: `value` }
  expect(parseGroup(group)).toBe(' GROUP BY colName')
})

test('parseGroup({col1: `val1`, col2: `val2`}) returns \' GROUP BY col1, col2\'', () => {
  const group = { col1: `val1`, col2: `val2` }
  expect(parseGroup(group)).toBe(' GROUP BY col1, col2')
})


// null, null
test('parseGroup(null, null) returns \'\'', () => {
  expect(parseGroup(null, null)).toBe('')
})


// null, String
test('parseGroup(null, ``) returns \'\'', () => {
  const group = null
  const having = ``
  expect(parseGroup(group, having)).toBe('')
})

test('parseGroup(null, `COUNT(*) > 10`) returns \'\'', () => {
  const group = null
  const having = `COUNT(*) > 10`
  expect(parseGroup(group, having)).toBe('')
})


// Array, String
test('parseGroup([], `COUNT(*) > 10`) returns \'\'', () => {
  const group = []
  const having = `COUNT(*) > 10`
  expect(parseGroup(group, having)).toBe('')
})

test('parseGroup([`colName`], ``) returns \' GROUP BY colName\'', () => {
  const group = [`colName`]
  const having = ``
  expect(parseGroup(group, having)).toBe(' GROUP BY colName')
})

test('parseGroup([`colName`], `COUNT(*) > 10`) returns \' GROUP BY colName HAVING COUNT(*) > 10\'', () => {
  const group = [`colName`]
  const having = `COUNT(*) > 10`
  expect(parseGroup(group, having)).toBe(' GROUP BY colName HAVING COUNT(*) > 10')
})

test('parseGroup([`col1`, `col2`], \'COUNT(*) > 10`) returns \' GROUP BY col1, col2\'', () => {
  const group = [`col1`, `col2`]
  const having = `COUNT(*) > 10`
  expect(parseGroup(group, having)).toBe(' GROUP BY col1, col2 HAVING COUNT(*) > 10')
})


// String, String
test('parseGroup(``, `COUNT(*) > 10`) returns \'\'', () => {
  const group = ``
  const having = `COUNT(*) > 10`
  expect(parseGroup(group, having)).toBe('')
})

test('parseGroup(`colName`, ``) returns \' GROUP BY colName\'', () => {
  const group = `colName`
  const having = ``
  expect(parseGroup(group, having)).toBe(' GROUP BY colName')
})

test('parseGroup(`colName`, `COUNT(*) > 10`) returns \' GROUP BY colName HAVING COUNT(*) > 10\'', () => {
  const group = `colName`
  const having = `COUNT(*) > 10`
  expect(parseGroup(group, having)).toBe(' GROUP BY colName HAVING COUNT(*) > 10')
})

test('parseGroup(`col1, col2`, `COUNT(*) > 10`) returns \' GROUP BY col1, col2 HAVING COUNT(*) > 10\'', () => {
  const group = `col1, col2`
  const having = `COUNT(*) > 10`
  expect(parseGroup(group, having)).toBe(' GROUP BY col1, col2 HAVING COUNT(*) > 10')
})


// Object, String
test('parseGroup({}, \'COUNT(*) > 10`) returns \'\'', () => {
  const group = {}
  const having = `COUNT(*) > 10`
  expect(parseGroup(group, having)).toBe('')
})

test('parseGroup({colName: `value`}, \'`) returns \' GROUP BY colName\'', () => {
  const group = { colName: `value` }
  const having = ``
  expect(parseGroup(group, having)).toBe(' GROUP BY colName')
})

test('parseGroup({colName: `value`}, \'COUNT(*) > 10`) returns \' GROUP BY colName HAVING COUNT(*) > 10\'', () => {
  const group = { colName: `value` }
  const having = `COUNT(*) > 10`
  expect(parseGroup(group, having)).toBe(' GROUP BY colName HAVING COUNT(*) > 10')
})

test('parseGroup({col1: `val1`, col2: `val2`}, \'COUNT(*) > 10`) returns \' GROUP BY col1, col2 HAVING COUNT(*) > 10\'', () => {
  const group = { col1: `val1`, col2: `val2` }
  const having = `COUNT(*) > 10`
  expect(parseGroup(group, having)).toBe(' GROUP BY col1, col2 HAVING COUNT(*) > 10')
})
