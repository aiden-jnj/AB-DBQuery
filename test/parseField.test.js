const { parseField } = require('../src/index')


test('[parseField] If undefined is passed, it returns \' *\'', () => {
  expect(parseField()).toBe(' *')
})

test('[parseField] If null is passed, it returns \' *\'', () => {
  expect(parseField(null)).toBe(' *')
})

test('[parseField] If \'\'(empty string) is passed, it returns \' *\'', () => {
  expect(parseField('')).toBe(' *')
})

test('[parseField] If \'fldName\' is passed, it returns \' fldName\'', () => {
  const field = 'fldName'
  expect(parseField(field)).toBe(' fldName')
})

test('[parseField] If \'fld1, fld2\' is passed, it returns \' fld1, fld2\'', () => {
  const field = 'fld1, fld2'
  expect(parseField(field)).toBe(' fld1, fld2')
})

test('[parseField] If \'*\' is passed, it returns \' *\'', () => {
  const field = '*'
  expect(parseField(field)).toBe(' *')
})

test('[parseField] If [](empty array) is passed, it returns \' *\'', () => {
  const field = []
  expect(parseField(field)).toBe(' *')
})

test('[parseField] If [\'fld1\', \'fld2\'] is passed, it returns \' fld1, fld2\'', () => {
  const field = ['fld1', 'fld2']
  expect(parseField(field)).toBe(' fld1, fld2')
})

test('[parseField] If {}(empty object) is passed, it returns \' *\'', () => {
  const field = {}
  expect(parseField(field)).toBe(' *')
})

test('[parseField] If {fld1: \'val1\', fld2: \'val2\'} is passed, it returns \' fld1, fld2\'', () => {
  const field = { fld1: 'val1', fld2: 'val2' }
  expect(parseField(field)).toBe(' fld1, fld2')
})
