import Exception from '../../@types/exception'

const EXCEPTION: Exception = {
  ITEM_NOT_EXIST: '不存在指定的项',
  UNAUTHORIZED: {
    code: 403,
    message: '无权限访问'
  }
}

export default EXCEPTION
