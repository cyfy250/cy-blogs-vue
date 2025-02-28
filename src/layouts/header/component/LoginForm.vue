<template>
  <div class="login-form">
    <a-form
      :model="loginFormRef"
      name="normal_login"
      @finish="onFinish"
      >
      <a-form-item label="账号" name="userAccount" :rules="loginFormRules.userAccount">
        <a-input v-model:value="loginFormRef.userAccount">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item label="密码" name="userPassword" :rules="loginFormRules.userPassword">
        <a-input-password v-model:value="loginFormRef.userPassword">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item>
        <a-form-item name="remember" no-style>
          <a-checkbox v-model:checked="loginFormRef.remember">记住密码</a-checkbox>
        </a-form-item>
        <a class="login-form-forgot" href="">忘记密码</a>
      </a-form-item>

      <a-form-item >
        <a-button
          :loading="loginLoading"
          type="primary"
          html-type="submit"
          block
          class="login-form-button">
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import {  ref, reactive } from 'vue';
import {  UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { useLoginUserStore } from '@/stores/useLoginUserStore'
import { userLoginUsingPost } from '@/api/userController'
import { setToken } from '@/utils/auth'
import Cookies from "js-cookie";
import { Encrypt, Decrypt } from '@/utils/encrypt'
import { onMounted } from 'vue';
const loginUserStore = useLoginUserStore()



// 组件传值
/**
 * 组件属性类型
 */
 interface Props{
  loginSuccess: (v: boolean) => void;
}
/**
 * 组件初始值
 */
const props = withDefaults(defineProps<Props>(), {
    loginSuccess: (v: boolean) => {},
})


// 登录表单
/**
 * 上传到后端的表单数据
 */
const loginForm = reactive<API.UserLoginRequest>({
  userAccount: '',
  userPassword: '',
});

/**
 * 表单字段
 */
const loginFormRef = reactive({
  ...loginForm,
  remember: false
})

/**
 * 登录按钮载入状态
 */
const loginLoading = ref<boolean>(false);


/**
 * 密码长度校验规则，绕过加密密码
 */
 const validatePasswordLength = (rule: any, value: string) => {
  const userPassword = Cookies.get('loginPassword')
  // 如果当前登录密码和缓存密码一致，则通过校验
  if (userPassword && value === userPassword) {
    return Promise.resolve();
  }
  // 否则，判断长度是否符合要求
  if ( value.length < 8 || value.length > 30 ) {
    return Promise.reject('长度在 8 到 30 个字符');
  }
  return Promise.resolve();
};


/**
 * 定义登录表单校验规则
 */
const loginFormRules = {
  userAccount: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 4, max: 25, message: '长度在 4 到 25 个字符', trigger: 'blur' },
  ],
  userPassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { validator: validatePasswordLength, trigger: 'blur' } // 自定义密码长度校验
    // { min: 8, max: 30, message: '长度在 8 到 30 个字符', }
  ]
}

/**
 * 从Cookie中加载用户信息
 */
const resetLoginForm = async () => {
  // 读取账号、密码
  const userAccount = Cookies.get('loginAccount')
  const userPassword = Cookies.get('loginPassword')
  if (userAccount) {
    loginFormRef.userAccount = userAccount
  }
  if (userPassword) {
    // 如果存在密码，则说明用户勾选了记住密码，则自动勾选记住密码
    loginFormRef.userPassword = userPassword
    loginFormRef.remember = true
  }
}
/**
 * 打开表单时加载一次
 */
onMounted(() => {
  resetLoginForm()
});

/**
 * 表单校验通过时触发事件
 */
const onFinish = async (values: any) => {
  loginLoading.value = true;

  // 将登录账号存储到cookie中,有效期 30 天
  Cookies.set('loginAccount', values.userAccount, { expires: 30 })
  const oldPassword = Cookies.get('loginPassword')
  // 如果当前输入框中的密码与cookie中的一致，就做解密处理
  if (oldPassword && oldPassword === values.userPassword){
    // 解析加密后的数据
    values.userPassword = await JSON.parse(Decrypt(values.userPassword));
  }
  const res = await userLoginUsingPost(values)
  // 登录成功
  if (res.data.code === 0 && res.data.data) {
    // 将token保存到cookie中
    setToken(res.data.data)

    // 如果用户勾选了记住密码，则将加密后的密码保存到cookie中
    if (values.remember) {
      // 对密码进行加密
      const encryptPassword = Encrypt(JSON.stringify(values.userPassword))
      // 将登录账号存储到cookie中,有效期 30 天
      Cookies.set('loginPassword', encryptPassword, { expires: 30 })
    } else {
      // 删除cookie
      Cookies.remove('loginPassword')
    }

    // 登录成功，更新登录用户信息
    await loginUserStore.fetchLoginUser()
    message.success("登录成功")

    // 关闭登录弹窗
    // 调用父组件的方法
    props.loginSuccess(false)
  }
  else {
    message.error("登录失败:" + res.data.message)
  }
  loginLoading.value = false;
};



</script>

<style scoped>
.login-form-button {
  height:38px;
}
</style>
