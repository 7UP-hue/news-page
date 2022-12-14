<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getArticleById } from '~/api/article'
import { getPages } from '~/api/page'
import { useRouter, useRoute } from 'vue-router'
const menuList = ref([])
const router = useRouter()
const route = useRoute()
const articleId = ref('')
const detailValue = ref({
  articleTitle: '',
  articleContent: ''
})
function getMenus() {
  return new Promise((resolve, reject) => {
    getPages({}).then((res: any) => {
      if(res.code === 200) {
        const menuList = res.rows.map((value: any) => {
          const temp = {
            title: value.pageName,
            id: value.id,
            articleId: value.articleId
          }
          return temp
        })
        resolve(menuList)
      }
    })
  })
  
}
const getArticleDetail = () => {
  if(articleId.value === '') {
    articleId.value = menuList.value[0].articleId
  }
  getArticleById(articleId.value).then((res: any) => {
    if(res.code === 200) {
      if(res.data) {
        detailValue.value.articleTitle = res.data.articleTitle
        detailValue.value.articleContent = res.data.articleContent
      } else {
        detailValue.value.articleTitle = '文章不存在'
        detailValue.value.articleContent = ''
      }
    } else {
      detailValue.value.articleTitle = '文章不存在'
      detailValue.value.articleContent = ''
    }
  })
}
const onChange = (item: any) => {
  articleId.value = item.articleId
  getArticleDetail()
}
onMounted(async () => {
  getMenus().then((value: any) => {
    menuList.value = value
    getArticleDetail()
  })
})
</script>
<template>
  <div class="min-w-1100px">
    <div class="header h-330px">
      <div class="h-300px overflow-hidden">
        <img src="../assets/xian.jpg" class="w-100%">
      </div>
      <div class="header-content py-5">
        <div class="flex justify-center text-3xl font-600 text-hex-811300">
          <p class="py-3 px-5 header-name rounded-xl mb-0 cursor-pointer">Metaverse 2022</p>
        </div>
        <div class="flex justify-center font-600">
          <p class="py-3 px-5 header-name rounded-xl">Xi'an, June 25-27, 2022</p>
        </div>
      </div>
      <div class="header-menu">
        <div class="menu-main w-1100px mx-auto flex flex-wrap justify-center">
          <span
            class="py-3 text-white px-5 border-r-2 border-hex-777 cursor-pointer menu-items"
            hover:color="#0099D0"
            v-for="item in menuList"
            :key="item"
            @click="onChange(item)"
          >
            {{item.title}}
          </span>
        </div>
      </div>
    </div>
    <div class="bg-hex-F1F1F1 py-10 min-h-50vh">
      <div class="w-1100px mx-auto bg-white text-3xl py-5 px-8 rounded text-center leading-relaxed tracking-wide">
        {{detailValue.articleTitle}}
      </div>
      <div class="w-1100px mx-auto bg-white p-4 rounded min-h-200px mt-10">
        <div v-html="detailValue.articleContent"></div>
          <div v-if="detailValue.articleContent == ''" class="flex items-center justify-center">
            <img src="../assets/暂无记录.png" class="w-30%">
            <span class="text-lg text-hex-666">文章走丢啦,去看看别的吧~</span>
          </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}
.header {
  position: relative;
}
.header-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200px;
}
.header-name {
  background-color: rgba(255,255,255,.5);
}
.header-menu {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #4E0B00;
}
.menu-items {
  transition: all .5s;
}
</style>