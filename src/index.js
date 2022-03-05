/**
 * Returns after converting it into fields to be used in query statement using passed argument.
 *
 * @param {Array|String|Object} [field=null] Fields to be used in query statement.
 * @returns {String} String converted to field to be used in query statement.
 */
const parseField = (field = null) => {
  if (field?.constructor.name === 'Array' && field.length > 0) {
    return ` ${field.join(', ')}`
  } else if (field?.constructor.name === 'String' && field.length > 0) {
    return ` ${field}`
  } else if (field?.constructor.name === 'Object') {
    const keys = Object.keys(field)
    if (keys.length) {
      return ` ${keys.join(', ')}`
    } else {
      return ` *`
    }
  } else {
    return ` *`
  }
}

/**
 * Returns after converting it into group by clause to be used in query statement using passed argument.
 *
 * @param {String} [group=null] Group by clause to be used in query statement.
 * @param {String} [having=null] Having condition to be used in group by clause of query statement.
 * @returns {String} String converted to group by clause to be used in query statement.
 */
const parseGroup = (group = null, having = null) => {
  let clause = ``

  if (group?.constructor.name === 'String' && group.length > 0) {
    clause = ` GROUP BY ${group}`

    if (having?.constructor.name === 'String' && group.length > 0) {
      clause += ` HAVING ${having}`
    }
  }

  return clause
}

/**
 * Returns after converting to string that field names and values to be used in `INSERT` query statement.
 *
 * @param {Object} values Values object that consisting of field names and values to add to table.
 * @throws Not passed object consisting of field and value to be used in INSERT query statement!
 * @throws Object consisting of fields and values for use in an INSERT query statement was specified incorrectly!
 * @returns {String} String converted to be insert values clause to be used in `INSERT` query statement.
 */
const parseInsertValues = values => {
  if (!values) {
    throw '[parseInsertValues] Not passed object consisting of field and value to be used in INSERT query statement!'
  }

  let clause = ``

  if (values?.constructor.name === 'Object') {
    const keys = Object.keys(values)
    const vals = Object.values(values)
    clause += ` (${keys.join(', ')}) VALUES (${vals.join(', ')})`
  }

  if (!clause) {
    throw '[parseInsertValues] Object consisting of fields and values for use in an INSERT query statement was specified incorrectly!'
  }

  return clause
}

/**
 * Returns after converting it into table join clause to be used in query statement using passed argument.
 *
 * @param {String} [type=null] Join type to be used in table join query statement.
 * @param {String} [table=null] Table name of joined target table to use in join query statement.
 * @param {String} [on=null] Constraint for to use table join.
 * @returns String converted to table join clause to be used in query statement.
 */
const parseJoin = (type = null, table = null, on = null) => {
  let clause = ``

  type = type || 'INNER'
  if (!type || type.constructor.name !== 'String') return clause
  if (!table || table.constructor.name !== 'String') return clause
  if (!on || on.constructor.name !== 'String') return clause

  type = String(type).toUpperCase()

  clause += ` ${type} JOIN ${table}`
  if (type !== 'CROSS' && on.length) {
    clause += ` ON ${on}`
  }

  return clause
}

/**
 * Returns after converting it into limit clause to be used in query statement using passed argument.
 *
 * @param {Number} [limit=0] Number of rows to return to be used in query statement. If `0` no limit in used.
 * @returns {String} String converted to limit clause to be used in query statement.
 */
const parseLimit = (limit = 0) => {
  return !isNaN(limit) && limit > 0 ? ` LIMIT ${limit}` : ``
}

/**
 * Returns after converting it into order by clause to be used in query statement using passed argument.
 *
 * @param {String} [order=null] Order by clause to be used in query statement.
 * @returns {String} String converted to order by clause to be used in query statement.
 */
const parseOrder = (order = null) => {
  return order?.constructor.name === 'String' && order.length ? ` ORDER BY ${order}` : ``
}

/**
 * Returns after converting to string it to be update field names and values to be used in `UPDATE` query statement.
 *
 * @param {Object} values Values object that consisting of field names and values to be used in `UPDATE` query statement.
 * @throws Not passed object consisting of field and value to be used in UPDATE query statement!
 * @throws Object consisting of fields and values for use in an UPDATE query statement was specified incorrectly!
 * @returns {String} String converted to be update field names and values to be used in `UPDATE` query statement.
 */
const parseUpdateValues = values => {
  if (!values) {
    throw '[parseUpdateValues] Not passed object consisting of field and value to be used in UPDATE query statement!'
  }

  let clause = ``

  if (values?.constructor.name === 'Object') {
    const keys = Object.keys(values)
    if (keys.length) {
      clause += ` SET `
      keys.forEach((key, idx) => {
        clause += `${key} = ${values[key]}`
        clause += idx < keys.length - 1 ? `, ` : ``
      })
    }
  }

  if (!clause) {
    throw '[parseUpdateValues] Object consisting of fields and values for use in an UPDATE query statement was specified incorrectly!'
  }

  return clause
}

/**
 * Returns after converting it to be used in query statement using passed table name.
 *
 * @param {String} table Table name to use in query statement.
 * @throws Not passed table name to be used in query statement!
 * @returns {String} String converted to table to be used in query statement.
 */
const parseTable = table => {
  if (!table || table.constructor.name !== 'String') {
    throw '[parseTable] Not passed table name to be used in query statement!'
  }

  return ` FROM ${table}`
}

/**
 * Returns after converting it into where clause to be used in query statement using passed argument.
 *
 * @param {String|Object} [where=null] Where condition to be used in query statement.
 * @returns {String} String converted to where clause to be used in query statement.
 */
const parseWhere = (where = null) => {
  let clause = ``

  if (where) {
    clause = ` WHERE`

    if (where.constructor.name === 'String') {
      clause += ` ${where}`
    } else if (where.constructor.name === 'Object') {
      const keys = Object.keys(where)
      keys.forEach((key, idx) => {
        const val = where[key] || ''

        if (val.search(/<|>|<=|>=|IS|LIKE|NOT IN/gi) > -1) {
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
 * @throws Not passed table name to be used in query statement!
 * @throws Not passed object consisting of field and value to be used in INSERT query statement!
 * @returns {String} `INSERT` query statement created using passed arguments.
 */
const queryInsert = (table, values) => {
  if (!table || table.constructor.name !== 'String') {
    throw '[queryInsert] Not passed table name to be used in query statement!'
  }

  return `INSERT INTO
    ${table}
    ${parseInsertValues(values)}`
    .replace(/\s{2,}/gi, ` `)
}

/**
 * Returns after created `SELECT` query statement using passed arguments.
 *
 * @param {String} table Table name to use in query statement.
 * @param {String|Array} [field=null] Fields to be used in query statement.
 * @param {String|Object} [where=null] Where condition to be used in query statement.
 * @param {String} [order=null] Order by clause to be used in query statement.
 * @param {Number} [limit=0] Number of rows to return to be used in query statement. If `0` no limit in used.
 * @throws Not passed table name to be used in query statement!
 * @returns {String} `SELECT` query statement created using passed arguments.
 */
const querySelect = (table, field = null, where = null, order = null, limit = 0) => {
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
 * @param {String|Array} [field=null] Fields to be used in query statement.
 * @param {String|Object} [where=null] Where condition to be used in query statement.
 * @param {String} [group=null] Group by clause to be used in query statement.
 * @param {String} [having=null] Having condition to be used in group by clause of query statement.
 * @param {String} [order=null] Order by clause to be used in query statement.
 * @param {Number} [limit=0] Number of rows to return to be used in query statement. If `0` no limit in used.
 * @throws Not passed table name to be used in query statement!
 * @returns {String} `SELECT` query statement created using passed arguments.
 */
const querySelectGroup = (
  table,
  field = null,
  where = null,
  group = null,
  having = null,
  order = null,
  limit = 0
) => {
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
 * Returns after created `SELECT` query statement for table join using passed arguments.
 *
 * @param {String} table Table name to use in query statement.
 * @param {String} [type=null] Join type to be used in table join query statement.
 * @param {String} [join=null] Table name of joined target table to use in join query statement.
 * @param {String} [on=null] Constraint for to use table join.
 * @param {String|Array} [field=null] Fields to be used in query statement.
 * @param {String|Object} [where=null] Where condition to be used in query statement.
 * @param {String} [order=null] Order by clause to be used in query statement.
 * @param {Number} [limit=0] Number of rows to return to be used in query statement. If `0` no limit in used.
 * @throws Not passed table name to be used in query statement!
 * @returns {String} `SELECT` query statement for table join created using passed arguments.
 */
const querySelectJoin = (
  table,
  type = null,
  join = null,
  on = null,
  field = null,
  where = null,
  order = null,
  limit = 0
) => {
  return `SELECT
    ${parseField(field)}
    ${parseTable(table)}
    ${parseJoin(type, join, on)}
    ${parseWhere(where)}
    ${parseOrder(order)}
    ${parseLimit(limit)}`
    .replace(/\s{2,}/gi, ` `)
}

/**
 * Returns after created `SELECT` query statement for table join using passed arguments.
 *
 * @param {String} table Table name to use in query statement.
 * @param {String} [type=null] Join type to be used in table join query statement.
 * @param {String} [join=null] Table name of joined target table to use in join query statement.
 * @param {String} [on=null] Constraint for to use table join.
 * @param {String|Array} [field=null] Fields to be used in query statement.
 * @param {String|Object} [where=null] Where condition to be used in query statement.
 * @param {String} [group=null] Group by clause to be used in query statement.
 * @param {String} [having=null] Having condition to be used in group by clause of query statement.
 * @param {String} [order=null] Order by clause to be used in query statement.
 * @param {Number} [limit=0] Number of rows to return to be used in query statement. If `0` no limit in used.
 * @throws Not passed table name to be used in query statement!
 * @returns {String} `SELECT` query statement for table join created using passed arguments.
 */
const querySelectJoinGroup = (
  table,
  type = null,
  join = null,
  on = null,
  field = null,
  where = null,
  group = null,
  having = null,
  order = null,
  limit = 0
) => {
  return `SELECT
    ${parseField(field)}
    ${parseTable(table)}
    ${parseJoin(type, join, on)}
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
 * @param {String|Object} where Where condition to be used in query statement.
 * @throws Not passed table name to be used in query statement!
 * @throws Not passed object consisting of field and value to be used in UPDATE query statement!
 * @throws Not passed update condition clause to be used in UPDATE query statement!
 * @returns {String} `UPDATE` query statement created using passed arguments.
 */
const queryUpdate = (table, values, where) => {
  if (!table || table.constructor.name !== 'String') {
    throw '[queryUpdate] Not passed table name to be used in query statement!'
  }
  if (!where) {
    throw '[queryUpdate] Not passed update condition clause to be used in UPDATE query statement!'
  }

  return `UPDATE
    ${table}
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
  querySelectJoin,
  querySelectJoinGroup,
  queryUpdate
}


module.exports = ABDBQuery
