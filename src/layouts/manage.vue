<template>
  <div class="w-80% mx-auto flex justify-center mt-5">
    <span
      class="py-2 px-4 rounded cursor-pointer post-bottom text-hex-777 mr-5 flex items-center"
      border="~ 1px solid #999"
      @click="jump(1)"
    ><el-icon class="mr-2"><Edit /></el-icon>发布文章</span>
    <span
      class="py-2 px-4 rounded cursor-pointer post-bottom text-hex-777 flex items-center"
      border="~ 1px solid #999"
      @click="jump(2)"
    ><el-icon class="mr-2"><Setting /></el-icon>管理文章</span>
  </div>
  <router-view />
</template>