const { parseWhere } = require('../src')


// undefined
test('parseWhere() returns \'\'', () => {
  expect(parseWhere()).toBe('')
})

// null
test('parseWhere(null) returns \'\'', () => {
  expect(parseWhere(null)).toBe('')
})


// String
test('parseWhere(``) returns \'\'', () => {
  const where = ``
  expect(parseWhere(where)).toBe('')
})

test('parseWhere(`gender = "male"`) returns \' WHERE gender = "male"\'', () => {
  const where = `gender = "male"`
  expect(parseWhere(where)).toBe(' WHERE gender = "male"')
})

test('parseWhere(`gender = "male" AND amount >= 5000`) returns \' WHERE gender = "male" AND amount >= 5000\'', () => {
  const where = `gender = "male" AND amount >= 5000`
  expect(parseWhere(where)).toBe(' WHERE gender = "male" AND amount >= 5000')
})

test('parseWhere(`gender = "male" OR amount >= 5000`) returns \' WHERE gender = "male" OR amount >= 5000\'', () => {
  const where = `gender = "male" OR amount >= 5000`
  expect(parseWhere(where)).toBe(' WHERE gender = "male" OR amount >= 5000')
})

test('parseWhere(`gender = "male" AND age > 20 OR amount >= 5000`) returns \' WHERE gender = "male" AND age > 20 OR amount >= 5000\'', () => {
  const where = `gender = "male" AND age > 20 OR amount >= 5000`
  expect(parseWhere(where)).toBe(' WHERE gender = "male" AND age > 20 OR amount >= 5000')
})

test('parseWhere(`MATCH(memo) AGAINST("Important")`) returns \' WHERE MATCH(memo) AGAINST("Important")\'', () => {
  const where = `MATCH(memo) AGAINST("Important")`
  expect(parseWhere(where)).toBe(' WHERE MATCH(memo) AGAINST("Important")')
})

test('parseWhere(`birth BETWEEN "1975-01-01" AND "1975-12-31"`) returns \' WHERE birth BETWEEN "1975-01-01" AND "1975-12-31"\'', () => {
  const where = `birth BETWEEN "1975-01-01" AND "1975-12-31"`
  expect(parseWhere(where)).toBe(' WHERE birth BETWEEN "1975-01-01" AND "1975-12-31"')
})

test('parseWhere(`born IN ("seoul", "busan")`) returns \' WHERE born IN ("seoul", "busan")\'', () => {
  const where = `born IN ("seoul", "busan")`
  expect(parseWhere(where)).toBe(' WHERE born IN ("seoul", "busan")')
})

test('parseWhere(`week LIKE "%es___"`) returns \' WHERE week LIKE "%es___"\'', () => {
  const where = `week LIKE "%es___"`
  expect(parseWhere(where)).toBe(' WHERE week LIKE "%es___"')
})

test('parseWhere(`MATCH(memo) AGAINST("Important High")`) returns \' WHERE MATCH(memo) AGAINST("Important High")\'', () => {
  const where = `MATCH(memo) AGAINST("Important High")`
  expect(parseWhere(where)).toBe(' WHERE MATCH(memo) AGAINST("Important High")')
})


// Array
test('parseWhere([]) returns \'\'', () => {
  const where = []
  expect(parseWhere(where)).toBe('')
})

test('parseWhere([`gender = "male"`]) returns \' WHERE (gender = "male")\'', () => {
  const where = [`gender = "male"`]
  expect(parseWhere(where)).toBe(' WHERE (gender = "male")')
})

test('parseWhere([`gender = "male"`, `amount >= 5000`]) returns \' WHERE (gender = "male") AND (amount >= 5000)\'', () => {
  const where = [`gender = "male"`, `amount >= 5000`]
  expect(parseWhere(where)).toBe(' WHERE (gender = "male") AND (amount >= 5000)')
})

test('parseWhere([`gender = "male"`, `OR`, `amount >= 5000`]) returns \' WHERE (gender = "male") OR (amount >= 5000)\'', () => {
  const where = [`gender = "male"`, `OR`, `amount >= 5000`]
  expect(parseWhere(where)).toBe(' WHERE (gender = "male") OR (amount >= 5000)')
})

test('parseWhere([`gender = "male"`, `age > 20`, `OR`, `amount >= 5000`]) returns \' WHERE (gender = "male") AND (age > 20) OR (amount >= 5000)\'', () => {
  const where = [`gender = "male"`, `age > 20`, `OR`, `amount >= 5000`]
  expect(parseWhere(where)).toBe(' WHERE (gender = "male") AND (age > 20) OR (amount >= 5000)')
})

test('parseWhere([`MATCH(memo) AGAINST("Important")`]) returns \' WHERE (MATCH(memo) AGAINST("Important"))\'', () => {
  const where = [`MATCH(memo) AGAINST("Important")`]
  expect(parseWhere(where)).toBe(' WHERE (MATCH(memo) AGAINST("Important"))')
})

test('parseWhere([`birth BETWEEN "1975-01-01" AND "1975-12-31"`]) returns \' WHERE (birth BETWEEN "1975-01-01" AND "1975-12-31")\'', () => {
  const where = [`birth BETWEEN "1975-01-01" AND "1975-12-31"`]
  expect(parseWhere(where)).toBe(' WHERE (birth BETWEEN "1975-01-01" AND "1975-12-31")')
})

test('parseWhere([`born IN ("seoul", "busan")`]) returns \' WHERE (born IN ("seoul", "busan"))\'', () => {
  const where = [`born IN ("seoul", "busan")`]
  expect(parseWhere(where)).toBe(' WHERE (born IN ("seoul", "busan"))')
})

test('parseWhere([`week LIKE "%es___"`]) returns \' WHERE (week LIKE "%es___")\'', () => {
  const where = [`week LIKE "%es___"`]
  expect(parseWhere(where)).toBe(' WHERE (week LIKE "%es___")')
})

test('parseWhere([`MATCH(memo) AGAINST("Important High")`]) returns \' WHERE (MATCH(memo) AGAINST("Important High"))\'', () => {
  const where = [`MATCH(memo) AGAINST("Important High")`]
  expect(parseWhere(where)).toBe(' WHERE (MATCH(memo) AGAINST("Important High"))')
})


// Object
test('parseWhere({}) returns \'\'', () => {
  const where = {}
  expect(parseWhere(where)).toBe('')
})

test('parseWhere({gender: `"male"`}) returns \' WHERE (gender = "male")\'', () => {
  const where = { gender: `"male"` }
  expect(parseWhere(where)).toBe(' WHERE (gender = "male")')
})

test('parseWhere({gender: `"male"`, amount: `>= 5000`}) returns \' WHERE (gender = "male") AND (amount >= 5000)\'', () => {
  const where = { gender: `"male"`, amount: `>= 5000` }
  expect(parseWhere(where)).toBe(' WHERE (gender = "male") AND (amount >= 5000)')
})

test('parseWhere({gender: `"male"`, OR: true, amount: `>= 5000`}) returns \' WHERE (gender = "male") OR (amount >= 5000)\'', () => {
  const where = { gender: `"male"`, OR: true, amount: `>= 5000` }
  expect(parseWhere(where)).toBe(' WHERE (gender = "male") OR (amount >= 5000)')
})

test('parseWhere({gender: `"male"`, age: `> 20`, OR: true, amount: `>= 5000`}) returns \' WHERE (gender = "male") AND (age > 20)  OR (amount >= 5000)\'', () => {
  const where = { gender: `"male"`, age: `> 20`, OR: true, amount: `>= 5000` }
  expect(parseWhere(where)).toBe(' WHERE (gender = "male") AND (age > 20) OR (amount >= 5000)')
})

test('parseWhere({memo: `AGAINST("Important")`]) returns \' WHERE (MATCH(memo) AGAINST("Important"))\'', () => {
  const where = { memo: `AGAINST("Important")` }
  expect(parseWhere(where)).toBe(' WHERE (MATCH(memo) AGAINST("Important"))')
})

test('parseWhere({birth: `BETWEEN "1975-01-01" AND "1975-12-31"`}) returns \' WHERE (birth BETWEEN "1975-01-01" AND "1975-12-31")\'', () => {
  const where = { birth: `BETWEEN "1975-01-01" AND "1975-12-31"` }
  expect(parseWhere(where)).toBe(' WHERE (birth BETWEEN "1975-01-01" AND "1975-12-31")')
})

test('parseWhere({born: `IN ("seoul", "busan")`}) returns \' WHERE (born IN ("seoul", "busan"))\'', () => {
  const where = { born: `IN ("seoul", "busan")` }
  expect(parseWhere(where)).toBe(' WHERE (born IN ("seoul", "busan"))')
})

test('parseWhere({week: `LIKE "%es___"`}) returns \' WHERE (week LIKE "%es___")\'', () => {
  const where = { week: `LIKE "%es___"` }
  expect(parseWhere(where)).toBe(' WHERE (week LIKE "%es___")')
})

test('parseWhere([`MATCH(memo) AGAINST("Important High")`]) returns \' WHERE (MATCH(memo) AGAINST("Important High"))\'', () => {
  const where = { memo: `MATCH AGAINST("Important High")` }
  expect(parseWhere(where)).toBe(' WHERE (MATCH(memo) AGAINST("Important High"))')
})
