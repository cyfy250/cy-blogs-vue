<template>
  <div>
    主页
  </div>
</template>

<script setup lang="ts">
import { testUsingGet } from "@/api/testController";

testUsingGet().then((res) => {
  console.log(res);
})

</script>

<style scoped>
</style>
