<script lang="ts" setup>
import { ref } from 'vue'
import { getArticles } from '~/api/article'
import { useRouter, useRoute } from 'vue-router'
const menuList = ref([])
const router = useRouter()
const route = useRoute()
const getMenus = () => {
  getArticles({}).then((res: any) => {
    if(res.code === 200) {
      menuList.value = res.rows.map((value: any) => {
        const temp = {
          title: value.articleTitle,
          id: value.id
        }
        return temp
      })
      if(route.path === '/article') {
        router.replace(`/${menuList.value[0].id}`)
      }
    }
  })
}
const jump = (item: any) => {
  router.push(`/${item.id}`)
}
getMenus()
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
        @click="jump(item)"
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