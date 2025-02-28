import { getLoginUserUsingGet } from '@/api/userController'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoginUserStore = defineStore('loginUser', () => {
  // 登录用户的初始值
  const loginUser = ref<API.LoginUserVO>({
    userName: '未登录',
  })

  async function fetchLoginUser() {
    // 从服务器获取用户信息
    const res = await getLoginUserUsingGet()
    if (res.data.code === 0 && res.data.data) {
      loginUser.value = res.data.data
    }
  }
  // 设置登录用户
  function setLoginUser(newLoginUser: any) {
    loginUser.value = newLoginUser
  }
  return { loginUser, setLoginUser, fetchLoginUser }
})
