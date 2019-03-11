import Exception from '../../@types/exception'

const EXCEPTION: Exception = {
  ITEM_NOT_EXIST: '不存在指定的项',
  UNAUTHORIZED: {
    code: 401,
    message: '无权限访问'
  },
  EXAMPLE_TRANSACTION: '样例事务异常'
}

export default EXCEPTION
