// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** add POST /user/add */
export async function addUsingPost(body: API.UserInfo, options?: { [key: string]: any }) {
  return request<API.BaseResponseString_>('/user/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** delete POST /user/delete */
export async function deleteUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUsingPOSTParams,
  options?: { [key: string]: any }
) {
  return request<string>('/user/delete', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** get POST /user/get */
export async function getUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUsingPOSTParams,
  options?: { [key: string]: any }
) {
  return request<API.UserInfo>('/user/get', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** login POST /user/login */
export async function loginUsingPost(body: API.UserInfo, options?: { [key: string]: any }) {
  return request<API.BaseResponseString_>('/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** update POST /user/update */
export async function updateUsingPost(body: API.UserInfo, options?: { [key: string]: any }) {
  return request<string>('/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
