const TokenKey = 'cyfyblogkeyvalue'
// 获取本地存储的token
export function getToken() {
  return localStorage.getItem(TokenKey)
}
// 将token存放到localStorage
export function setToken(token: string) {
  return localStorage.setItem(TokenKey, token)
}
// 移除本地存储的token
export function removeToken() {
  return localStorage.removeItem(TokenKey)
}
