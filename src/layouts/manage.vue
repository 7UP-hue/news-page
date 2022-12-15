<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, watchEffect } from 'vue'
const router = useRouter()
const route = useRoute()
const currentPath = ref()
const jump = (path: any) => {
  if(currentPath !== path) {
    router.replace(path)
  }
}
watchEffect(() => {
  currentPath.value = route.path
})
</script>
<template>
  <div class="w-80% mx-auto flex justify-center mt-5">
    <span
      class="py-2 px-4 rounded cursor-pointer mr-5 flex items-center "
      :class="currentPath!=='/manage/editArticle'?'menu':'active-menu'"
      @click="jump('/manage/editArticle')"
    ><el-icon class="mr-2"><Edit /></el-icon>发布文章</span>
    <span
      class="py-2 px-4 rounded cursor-pointer mr-5 flex items-center"
      :class="currentPath!=='/manage/manageArticle'?'menu':'active-menu'"
      @click="jump('/manage/manageArticle')"
    ><el-icon class="mr-2"><Memo /></el-icon>文章管理</span>
    <span
      class="py-2 px-4 rounded cursor-pointer mr-5 flex items-center"
      :class="currentPath!=='/manage/managePage'?'menu':'active-menu'"
      @click="jump('/manage/managePage')"
    ><el-icon class="mr-2"><PieChart /></el-icon>页面管理</span>
    <span
      class="py-2 px-4 rounded cursor-pointer flex items-center"
      :class="currentPath!=='/manage/manageSchedule'?'menu':'active-menu'"
      @click="jump('/manage/manageSchedule')"
    ><el-icon class="mr-2"><Calendar /></el-icon>日程管理</span>
  </div>
  <router-view />
</template>
<style scoped>
.menu {
  color: #777;
  border: 1px solid #999;
}
.active-menu {
  color: #409EFF;
  border: 1px solid #409EFF;
}
</style>