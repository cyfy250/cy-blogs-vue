import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoginUserStore = defineStore('loginUser', () => {
  // 登录用户的初始值
  const loginUser = ref<any>({
    userName: '未登录',
  })

  async function fetchLoginUser() {
    // 模拟用户登录
    setTimeout(() => {
      loginUser.value = {
        userName: 'admin',
        id: 1,
      }
    }, 3000)
  }
  // 设置登录用户
  function setLoginUser(newLoginUser: any) {
    loginUser.value = newLoginUser
  }

  return { loginUser, setLoginUser, fetchLoginUser }
})
