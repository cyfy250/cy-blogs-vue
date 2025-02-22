declare namespace API {
  type BaseResponseString_ = {
    code?: number
    data?: string
    message?: string
  }

  type deleteUsingPOSTParams = {
    /** id */
    id?: number
  }

  type getUsingPOSTParams = {
    /** id */
    id?: number
  }

  type UserInfo = {
    createTime?: string
    isDelete?: number
    updateTime?: string
    userAccount?: string
    userAvatar?: string
    userEmail?: string
    userId?: number
    userPassword?: string
  }
}
