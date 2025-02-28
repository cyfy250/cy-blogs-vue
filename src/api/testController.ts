// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** test GET /api/test/test */
export async function testUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseString_>('/api/test/test', {
    method: 'GET',
    ...(options || {}),
  })
}

/** test1 GET /api/test/test1 */
export async function test1UsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseString_>('/api/test/test1', {
    method: 'GET',
    ...(options || {}),
  })
}

/** test2 GET /api/test/test2 */
export async function test2UsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseString_>('/api/test/test2', {
    method: 'GET',
    ...(options || {}),
  })
}
