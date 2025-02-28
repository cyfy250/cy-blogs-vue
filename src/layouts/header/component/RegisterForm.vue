<template>
  <div class="register-form">
    <a-form
      :model="registerFormRef"
      name="normal_register"
      @finish="onRegisterFinish"
      @finishFailed="onRegisterFinishFailed">
      <a-form-item label="用户账号" name="userAccount" :rules="registerFormRules.userAccount">
        <a-input v-model:value="registerFormRef.userAccount">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item label="用户名" name="userAccount" :rules="registerFormRules.userAccount">
        <a-input v-model:value="registerFormRef.userAccount">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item label="联系电话" name="userAccount" :rules="registerFormRules.userAccount">
        <a-input v-model:value="registerFormRef.userAccount">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item label="用户密码" name="userPassword" :rules="registerFormRules.userPassword">
        <a-input-password v-model:value="registerFormRef.userPassword">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item label="确认密码" name="checkPassword" :rules="registerFormRules.checkPassword">
        <a-input-password v-model:value="registerFormRef.checkPassword">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item>
        <a-button :loading="registerLoading" type="primary" html-type="submit" block class="register-form-button">
          注册
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { userRegisterUsingPost } from '@/api/userController'

// 组件传值
/**
 * 组件属性类型
 */
interface Props {
  registerSuccess: (v: string) => void;
}
/**
 * 组件初始值
 */
const props = withDefaults(defineProps<Props>(), {
  registerSuccess: (v: string) => { }
})

// 注册表单
/**
 * 上传到后端的表单数据
 */
const registerFormRef = reactive<API.UserRegisterRequest>({
  userAccount: '',
  userPassword: '',
  checkPassword: ''
});


/**
 * 注册按钮载入状态
 */
const registerLoading = ref<boolean>(false);
/**
 * 校验两次密码是否一致
 */
const validateConfirmPassword = (rule: any, value: string) => {
  if (value && value !== registerFormRef.userPassword) {
    return Promise.reject('两次密码不一致');
  }
  return Promise.resolve();
};

/**
 * 定义注册表单校验规则
 */
const registerFormRules = {
  userAccount: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 4, max: 25, message: '长度在 4 到 25 个字符', trigger: 'blur' },
  ],
  userPassword: [
    { required: true, message: '登录密码不能为空', trigger: 'blur' },
    { min: 8, max: 30, message: '长度在 8 到 30 个字符', }
  ],
  checkPassword: [
    { required: true, message: '确认密码不能为空', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' },
  ],
}
const emit = defineEmits(['registerSuccess']);
/**
 * 表单校验通过时触发事件
 */
const onRegisterFinish = async (values: any) => {
  registerLoading.value = true;
  // 注册方法
  const res = await userRegisterUsingPost(values)
  // 注册成功
  if (res.data.code === 0 && res.data.data) {
    // 注册成功
    message.success("注册成功")
    // 切换到登录标签，你也可以直接调用登录方法，直接帮用户登录
    // 调用父组件的方法
    props.registerSuccess('login_tabs');

  }
  else {
    message.error("注册失败:" + res.data.message)
  }
  registerLoading.value = false;
};
/**
 * 表单校验不通过失败触发事件
 */
const onRegisterFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>

<style scoped>
/* 注册表单 */
.register-form-button {
  height: 38px;
}
</style>
