<template>
  <div class="user-login-module">
    <div v-if="loginUserStore.loginUser.userId">
      <a-dropdown placement="bottom">
        <a-avatar
          class="ant-dropdown-link"
          style="border: 1px solid black"
          size="large"
          src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
        />
        <template #overlay>
          <a-menu class="user-dropdown-menu">
            <div class="user-dropdown-menu-info">
              用户名：{{ loginUserStore.loginUser.userName }}
              <a-menu-divider />
              其他信息
            </div>
            <a-menu-divider />
            <a-menu-item>
              <a target="_blan" rel="" href=""> 个人信息 </a>
            </a-menu-item>
            <a-menu-item>
              <a target="_blank" rel="" href=""> 占位 </a>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item @click="loginUserLogout"> 退出登录 </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <div v-else>
      <a-button type="primary" @click="showModal">登录</a-button>
      <!-- 登录弹窗 -->
        <a-modal
            v-model:open="open"
           :footer="null"
           width="480px"
           destroyOnClose
           centered>
          <!-- 登录表单 -->
          <a-tabs v-model:activeKey="activeKey" type="card" class="form-modal-tabs">
            <a-tab-pane key="login_tabs" tab="登录">
              <LoginForm :loginSuccess="handleLoginSuccess" />
            </a-tab-pane>
            <!-- 注册表单 -->
            <a-tab-pane key="register_tabs" tab="注册">
              <RegisterForm :registerSuccess="handleRegisterSuccess" />
            </a-tab-pane>
          </a-tabs>
        </a-modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LoginForm from './LoginForm.vue'
import RegisterForm from './RegisterForm.vue'
import { useLoginUserStore } from '@/stores/useLoginUserStore'
import { removeToken } from '@/utils/auth'
import { userLogoutUsingPost } from '@/api/userController'
import { message } from 'ant-design-vue'
const loginUserStore = useLoginUserStore()

// 登录用户注销
const loginUserLogout = async () => {
  const res = await userLogoutUsingPost()
  if (res.data.code === 0) {
    // 删除token
    removeToken()
    // 重置用户信息
    loginUserStore.setLoginUser({
      userName: '未登录',
    })
    message.success('退出登录成功')
    // TODO 考虑用户可能在需要特定权限的页面退出登录，后续可能需要做重定向
    // await router.push('/')
  } else {
    message.error('退出登录失败:' + res.data.message)
  }
}

// 登录注册标签
const activeKey = ref('login_tabs')

// 登录弹窗
const open = ref<boolean>(false)

const showModal = () => {
  open.value = true
}

// 处理子组件事件
const handleRegisterSuccess = (key: string) => {

  // 切换到登录标签
  activeKey.value = key
}
const handleLoginSuccess = (bool: boolean) => {
  // 关闭弹窗
  open.value = bool
}

</script>

<style scoped>
/** 下拉菜单样式 */
.user-dropdown-menu {
  width: 200px;
}

.user-dropdown-menu .user-dropdown-menu-info {
  padding-top: 20px;
  text-align: center;
  height: 100px;
}

.form-modal-tabs {
  margin-top: 40px;
  padding: 0px 24px;
}
</style>

<style>
/** 页签样式，写在组件样式中不生效，需写在全局中 */
/** 设置页签宽度与窗口相同 */
.form-modal-tabs .ant-tabs-nav-list,
.form-modal-tabs .ant-tabs-tab {
  width: 100%;
}
</style>
