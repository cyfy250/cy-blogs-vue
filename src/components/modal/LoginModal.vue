<template>
  <div class="LoginModal">
    <a-modal
      v-model:open="localOpen"
      style="top: 250px;"
      :title="modalTitle"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref,watch } from 'vue';

const modalTitle = ref('登录');



// 定义接入的数据的类型
interface LoginModalProps {
  open: boolean;
}
// 设置
const props = withDefaults(defineProps<LoginModalProps>(),{
  open: false
});

// 使用本地响应式状态
const localOpen = ref(props.open);

// 监听 props.open 的变化，更新 localOpen
watch(
  () => props.open,
  (newVal) => {
    localOpen.value = newVal;
  }
);

// 定义一个事件，通知父组件关闭模态窗口
const emit = defineEmits(['update:open']);

/**
 *
 * @param e 点击确认按钮触发事件
 */
const handleOk = (e: MouseEvent) => {
  console.log(e);

  // 关闭模态窗口
  localOpen.value = false;
  emit('update:open', false);
};

/**
 * 点击其他区域关闭模态窗口
 */
const handleCancel = () => {
  localOpen.value = false;
  emit('update:open', false);
};

</script>

<style scoped>
</style>
