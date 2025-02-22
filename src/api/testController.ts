// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** test GET /test/test */
export async function testUsingGet(options?: { [key: string]: any }) {
  return request<string>('/test/test', {
    method: 'GET',
    ...(options || {}),
  })
}
