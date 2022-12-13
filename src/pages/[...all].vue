<!-- 404页面 -->
<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const backHome = () => {
  router.push('/')
}
</script>
<template>
  <div class="page-404 h-100vh">
    <div class="pt-60 w-40% page-attention">
      <div class="text-lg text-hex-666 pb-7">页面不存在！</div>
      <div
        class="bg-hex-1582F0 w-110px text-center h-35px rounded-3xl text-white cursor-pointer"
        style="line-height: 35px;"
        @click="backHome"
      >返回主页</div>
    </div>
  </div>
</template>

<style scoped>
.page-404 {
  position: relative;
  background: url('../../src/assets/页面不见了.png');
  background-size: 40%;
  background-position: 30% 50%;
  background-repeat: no-repeat;
}
.page-attention {
  position: absolute;
  right: 0;
}
</style>

<route lang="yaml">
meta:
  layout: login
</route>