const { parseGroup } = require('../src')


// group: undefined, having: undefined
test('parseGroup() returns \'\'', () => {
  expect(parseGroup()).toBe('')
})


// group: null, having: undefined
test('parseGroup(null) returns \'\'', () => {
  expect(parseGroup(null)).toBe('')
})


// group: null, having: null
test('parseGroup(null, null) returns \'\'', () => {
  expect(parseGroup(null, null)).toBe('')
})


// group: null, having: String
test('parseGroup(null, ``) returns \'\'', () => {
  const group = null
  const having = ``
  expect(parseGroup(group, having)).toBe('')
})

test('parseGroup(null, `SUM(amount) > 10000`) returns \'\'', () => {
  const group = null
  const having = `SUM(amount) > 10000`
  expect(parseGroup(group, having)).toBe('')
})


// group: String, having: undefined
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


// group: Array, having: undefined
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


// group: Object, having: undefined
test('parseGroup({}) returns \'\'', () => {
  const group = {}
  expect(parseGroup(group)).toBe('')
})

test('parseGroup({ colName: `value` }) returns \' GROUP BY colName\'', () => {
  const group = { colName: `value` }
  expect(parseGroup(group)).toBe(' GROUP BY colName')
})

test('parseGroup({ col1: `val1`, col2: `val2` }) returns \' GROUP BY col1, col2\'', () => {
  const group = { col1: `val1`, col2: `val2` }
  expect(parseGroup(group)).toBe(' GROUP BY col1, col2')
})


// group: String, having: String
test('parseGroup(``, `SUM(amount) > 10000`) returns \'\'', () => {
  const group = ``
  const having = `SUM(amount) > 10000`
  expect(parseGroup(group, having)).toBe('')
})

test('parseGroup(`colName`, ``) returns \' GROUP BY colName\'', () => {
  const group = `colName`
  const having = ``
  expect(parseGroup(group, having)).toBe(' GROUP BY colName')
})

test('parseGroup(`colName`, `SUM(amount) > 10000`) returns \' GROUP BY colName HAVING SUM(amount) > 10000\'', () => {
  const group = `colName`
  const having = `SUM(amount) > 10000`
  expect(parseGroup(group, having)).toBe(' GROUP BY colName HAVING SUM(amount) > 10000')
})

test('parseGroup(`col1, col2`, `SUM(amount) > 10000`) returns \' GROUP BY col1, col2 HAVING SUM(amount) > 10000\'', () => {
  const group = `col1, col2`
  const having = `SUM(amount) > 10000`
  expect(parseGroup(group, having)).toBe(' GROUP BY col1, col2 HAVING SUM(amount) > 10000')
})


// group: Array, having: String
test('parseGroup([], `SUM(amount) > 10000`) returns \'\'', () => {
  const group = []
  const having = `SUM(amount) > 10000`
  expect(parseGroup(group, having)).toBe('')
})

test('parseGroup([`colName`], ``) returns \' GROUP BY colName\'', () => {
  const group = [`colName`]
  const having = ``
  expect(parseGroup(group, having)).toBe(' GROUP BY colName')
})

test('parseGroup([`colName`], `SUM(amount) > 10000`) returns \' GROUP BY colName HAVING SUM(amount) > 10000\'', () => {
  const group = [`colName`]
  const having = `SUM(amount) > 10000`
  expect(parseGroup(group, having)).toBe(' GROUP BY colName HAVING SUM(amount) > 10000')
})

test('parseGroup([`col1`, `col2`], \'SUM(amount) > 10000`) returns \' GROUP BY col1, col2\'', () => {
  const group = [`col1`, `col2`]
  const having = `SUM(amount) > 10000`
  expect(parseGroup(group, having)).toBe(' GROUP BY col1, col2 HAVING SUM(amount) > 10000')
})


// group: Object, having: String
test('parseGroup({}, \'SUM(amount) > 10000`) returns \'\'', () => {
  const group = {}
  const having = `SUM(amount) > 10000`
  expect(parseGroup(group, having)).toBe('')
})

test('parseGroup({ colName: `value` }, \'`) returns \' GROUP BY colName\'', () => {
  const group = { colName: `value` }
  const having = ``
  expect(parseGroup(group, having)).toBe(' GROUP BY colName')
})

test('parseGroup({ colName: `value` }, \'SUM(amount) > 10000`) returns \' GROUP BY colName HAVING SUM(amount) > 10000\'', () => {
  const group = { colName: `value` }
  const having = `SUM(amount) > 10000`
  expect(parseGroup(group, having)).toBe(' GROUP BY colName HAVING SUM(amount) > 10000')
})

test('parseGroup({ col1: `val1`, col2: `val2` }, \'SUM(amount) > 10000`) returns \' GROUP BY col1, col2 HAVING SUM(amount) > 10000\'', () => {
  const group = { col1: `val1`, col2: `val2` }
  const having = `SUM(amount) > 10000`
  expect(parseGroup(group, having)).toBe(' GROUP BY col1, col2 HAVING SUM(amount) > 10000')
})
