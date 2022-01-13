/**
 * Returns after converting it into fields to be used in query statement using passed argument.
 *
 * @param {String|Array} [field='*'] Fields to be used in query statement.
 * @returns {String} String converted to field to be used in query statement.
 */
const parseField = field => {
  if (field && field.constructor.name === 'Array') {
    return ` ${field.join(', ')}`
  } else if (field && field.constructor.name === 'String') {
    return ` ${field}`
  } else {
    return ` *`
  }
}

/**
 * Returns after converting it into group by clause to be used in query statement using passed argument.
 *
 * @param {String} [group=undefined] Group by clause to be used in query statement.
 * @param {String} [having=undefined] Having condition to be used in group by clause of query statement.
 * @returns {String} String converted to group by clause to be used in query statement.
 */
const parseGroup = (group, having) => {
  let clause = ``

  if (group && group.constructor.name === 'String') {
    clause = ` GROUP BY ${group}`

    if (having && having.constructor.name === 'String') {
      clause += ` HAVING ${having}`
    }
  }

  return clause
}

/**
 * Returns after converting to string that field names and values to be used in `INSERT` query statement.
 *
 * @param {Object} values Values object that consisting of field names and values to add to table.
 * @returns {String} String converted to be insert values clause to be used in `INSERT` query statement.
 */
const parseInsertValues = values => {
  let clause = ``

  if (values && values.constructor.name === 'Object') {
    const keys = Object.keys(values)
    const vals = Object.values(values)
    clause += ` (${keys}) VALUES (${vals})`
  }

  return clause
}

/**
 * Returns after converting it into limit clause to be used in query statement using passed argument.
 *
 * @param {Number} [limit=undefined] Number of rows to return to be used in query statement. If `0` no limit in used.
 * @returns {String} String converted to limit clause to be used in query statement.
 */
const parseLimit = limit => {
  return !isNaN(limit) && limit > 0 ? ` LIMIT ${limit}` : ``
}

/**
 * Returns after converting it into order by clause to be used in query statement using passed argument.
 *
 * @param {String} [order=undefined] Order by clause to be used in query statement.
 * @returns {String} String converted to order by clause to be used in query statement.
 */
const parseOrder = order => {
  return order.constructor.name === 'String' ? ` ORDER BY ${order}` : ``
}

/**
 * Returns after converting to string it to be update field names and values to be used in `UPDATE` query statement.
 *
 * @param {Object} values Values object that consisting of field names and values to be used in `UPDATE` query statement.
 * @returns {String} String converted to be update field names and values to be used in `UPDATE` query statement.
 */
const parseUpdateValues = values => {
  let clause = ``

  if (values && values.constructor.name === 'Object') {
    const keys = Object.keys(values)
    if (keys.length) {
      clause += ` SET `
      keys.forEach((key, idx) => {
        clause += `${key} = ${values[key]}`
        clause += idx < keys.length - 1 ? `, ` : ``
      })
    }
  }

  return clause
}

/**
 * Returns after converting it to be used in query statement using passed table name.
 *
 * @param {String} [table=undefined] Table name to use in query statement.
 * @returns {String} String converted to table to be used in query statement.
 */
const parseTable = table => {
  return table && table.constructor.name === 'String' ? ` FROM ${table}` : ``
}

/**
 * Returns after converting it into where clause to be used in query statement using passed argument.
 *
 * @param {String|Object} [where=undefined] Where condition to be used in query statement.
 * @returns {String} String converted to where clause to be used in query statement.
 */
const parseWhere = where => {
  let clause = ``

  if (where) {
    clause = ` WHERE`

    if (where.constructor.name === 'String') {
      clause += ` ${where}`
    } else if (where.constructor.name === 'Object') {
      const keys = Object.keys(where)
      keys.forEach((key, idx) => {
        const val = where[key] || ''

        if (val.search(/<|>|<=|>=|LIKE|NOT IN/gi) > -1) {
          clause += ` (${key} ${val})`
        } else if (val.search(/BETWEEN/gi) > -1) {
          clause += ` (${key} ${val})`
        } else if (val.search(/MATCH/gi) > -1) {
          clause += ` (${val})`
        } else {
          clause += ` (${key} = ${val})`
        }

        clause += idx < keys.length - 1 ? ` AND` : ``
      })
    }
  }

  return clause
}

/**
 * Returns after created `INSERT` query statement using passed arguments.
 *
 * @param {String} table Table name to use in query statement.
 * @param {Object} values Values object that consisting of field names and values to add to table.
 * @returns {String} `INSERT` query statement created using passed arguments.
 */
const queryInsert = (table, values) => {
  return `INSERT INTO
    ${parseTable(table)}
    ${parseInsertValues(values)}`
    .replace(/\s{2,}/gi, ` `)
}

/**
 * Returns after created `SELECT` query statement using passed arguments.
 *
 * @param {String} table Table name to use in query statement.
 * @param {String|Array} [field='*'] Fields to be used in query statement.
 * @param {String|Object} [where=undefined] Where condition to be used in query statement.
 * @param {String} [order=undefined] Order by clause to be used in query statement.
 * @param {Number} [limit=undefined] Number of rows to return to be used in query statement. If `0` no limit in used.
 * @returns {String} `SELECT` query statement created using passed arguments.
 */
const querySelect = (table, field, where, order, limit) => {
  return `SELECT
    ${parseField(field)}
    ${parseTable(table)}
    ${parseWhere(where)}
    ${parseOrder(order)}
    ${parseLimit(limit)}`
    .replace(/\s{2,}/gi, ` `)
}

/**
 * Returns after created `SELECT` query statement using passed arguments.
 *
 * @param {String} table Table name to use in query statement.
 * @param {String|Array} [field='*'] Fields to be used in query statement.
 * @param {String|Object} [where=undefined] Where condition to be used in query statement.
 * @param {String} [group=undefined] Group by clause to be used in query statement.
 * @param {String} [having=undefined] Having condition to be used in group by clause of query statement.
 * @param {String} [order=undefined] Order by clause to be used in query statement.
 * @param {Number} [limit=undefined] Number of rows to return to be used in query statement. If `0` no limit in used.
 * @returns {String} `SELECT` query statement created using passed arguments.
 */
const querySelectGroup = (table, field, where, group, having, order, limit) => {
  return `SELECT
    ${parseTable(table)}
    ${parseField(field)}
    ${parseWhere(where)}
    ${parseGroup(group, having)}
    ${parseOrder(order)}
    ${parseLimit(limit)}`
    .replace(/\s{2,}/gi, ` `)
}

/**
 * Returns after created `UPDATE` query statement using passed arguments.
 *
 * @param {String} table Table name to use in query statement.
 * @param {Object} values Values object that consisting of field names and values to be used in `UPDATE` query statement.
 * @param {String|Object} [where=undefined] Where condition to be used in query statement.
 * @returns {String} `UPDATE` query statement created using passed arguments.
 */
const queryUpdate = (table, values, where) => {
  return `UPDATE
    ${parseTable(table)}
    ${parseUpdateValues(values)}
    ${parseWhere(where)}`
    .replace(/\s{2,}/gi, ` `)
}

const ABDBQuery = {
  parseField,
  parseGroup,
  parseInsertValues,
  parseLimit,
  parseOrder,
  parseUpdateValues,
  parseWhere,
  queryInsert,
  querySelect,
  querySelectGroup,
  queryUpdate
}


module.exports = ABDBQuery
