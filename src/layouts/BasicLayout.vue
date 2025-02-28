<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <!-- 导航栏组件 -->
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <!-- 页面主内容，通过 router-view 渲染 -->
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <!-- 页脚组件 -->
        我的博客 @残炎锋羽
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import  GlobalHeader  from '@/layouts/header/GlobalHeader.vue'

</script>

<style scoped>
#basicLayout {
}
#basicLayout .header{
  padding-inline: 20px;
  margin-bottom: 16px;
  color: unset;
  background: white;
}
#basicLayout footer{
  background: #efefef;
  padding: 16px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
