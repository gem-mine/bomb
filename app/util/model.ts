import config from '../config'
export const LIMIT = config.LIMIT

interface Pagination {
  /** sequelize 查询得到的结果集 */
  query: {
    rows: any[]
    count: number
  }
  /** 偏移量，从 0 开始 */
  offset: number
  /** 每页数量 */
  limit: number
}

/**
 * 将数据库分页结果转成 json 输出
 */
export function pagination({ query, offset = 0, limit = LIMIT }: Pagination) {
  const { rows, count } = query
  const data = rows.map(item => {
    return item.toJSON()
  })

  return {
    data,
    pagination: {
      total: count,
      offset: offset + rows.length,
      limit
    }
  }
}

interface QueryItem {
  /** 字段名 */
  field: string
  /** 值 */
  value: any
  /** 查询条件，不传表示 = */
  condition?: any
}

/**
 * 构建查询条件
 */
export function genCondition(...items: QueryItem[]) {
  const query = {}

  items.forEach(item => {
    const { field, value, condition } = item

    if (value !== undefined && value !== '') {
      query[field] = condition || value
    }
  })

  return query
}

function _filter(item, include, exclude, autoFilter) {
  const value = item.dataValues
  let result = {}
  if (include) {
    include.forEach(key => {
      result[key] = value[key]
    })
  } else {
    result = { ...value }
  }
  if (exclude) {
    exclude.forEach(key => {
      if (result.hasOwnProperty(key)) {
        delete result[key]
      }
    })
  }
  if (autoFilter) {
    Object.keys(value).forEach(key => {
      if (key.startsWith('_')) {
        delete result[key]
      }
    })
  }
  return result
}

interface ToJSON {
  /** 被转换的数据 */
  data: object[] | object
  /** 只包含的字段 */
  include?: string[]
  /** 排除的字段 */
  exclude?: string[]
  /** 是否启动自动过滤以 _ 开头的字段 */
  autoFilter?: boolean
}

export function toJSON({ data, include, exclude, autoFilter = true }: ToJSON) {
  if (Array.isArray(data)) {
    return data.map(item => {
      return _filter(item, include, exclude, autoFilter)
    })
  } else {
    return _filter(data, include, exclude, autoFilter)
  }
}
