interface ExceptionWithStatus {
  /** http 状态码 */
  code: number
  message: string
}

declare type Exception = {
  [key: string]: string | ExceptionWithStatus
}

interface ErrnoException extends Error {
  errno?: number
  code?: string
  path?: string
  syscall?: string
  stack?: string
}

export { ExceptionWithStatus, ErrnoException }
export default Exception
