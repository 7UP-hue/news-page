<script lang="ts" setup>
import { ref } from 'vue' 
const menuList = ref([
  { title: '主页'},
  { title: '文章1'},
  { title: '文章1'},
  { title: '文章1'},
  { title: '文章1'},
  { title: '文章1'},
])
</script>
<template>
  <div class="w-200px mr-5">
    <div>
      <div
        v-for="item in menuList"
        :key="item"
        class="bg-hex-0099D0 menu-item"
        text-white
        text-center
        font-600
      >
        {{item.title}}
      </div>
    </div>
  </div>
</template>
<style scoped>
.menu-item {
  cursor: pointer;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 1px;
}
.menu-item:hover {
  background: #0B66A6;
}
</style>