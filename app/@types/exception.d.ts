interface ExceptionWithStatus {
  /** http 状态码 */
  code: number
  message: string
}

declare type Exception = {
  [key: string]: string | ExceptionWithStatus
}

export { ExceptionWithStatus }
export default Exception
