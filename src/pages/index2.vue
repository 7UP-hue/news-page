<script lang="ts" setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import { getArticleById } from '~/api/article'
import { getPages } from '~/api/page'
import { useRouter, useRoute } from 'vue-router'
const menuList = ref([])
const router = useRouter()
const route = useRoute()
const articleId = ref('')
const showBackTop = ref(false)
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
// 回到顶部
const backTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
}

// 监听页面滚动
const handleScroll = () => {
  let scrollTop = document.documentElement.scrollTop
  if(scrollTop > 300) {
    showBackTop.value = true
  } else {
    showBackTop.value = false
  }
}
onMounted(async () => {
  getMenus().then((value: any) => {
    menuList.value = value
    getArticleDetail()
  })
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
<template>
  <div class="bg-hex-F2F2F2">
    <div class="my-container pb-10">
      <div class="header">
        <img src="../assets/bg3.jpg" class="w-1100px">
      </div>
      <div class="mt-5 flex">
        <div class="w-200px mr-5">
          <div
            v-for="item in menuList"
            :key="item"
            class="bg-hex-0099D0 menu-item"
            text-white
            text-center
            font-600
            @click="onChange(item)"
          >
            {{item.title}}
          </div>
        </div>
        <div class="w-880px bg-white">
          <div class="bg-hex-0099D0 py-3 text-white text-center font-600 rounded">
            {{detailValue.articleTitle}}
          </div>
          <div
            class="min-h-300px mt-3 rounded p-3"
            border="~ solid #00CCFF"
          >
            <div v-html="detailValue.articleContent"></div>
            <div v-if="detailValue.articleContent == ''" class="flex items-center justify-center">
              <img src="../assets/暂无记录.png" class="w-30%">
              <span class="text-lg text-hex-666">文章走丢啦,去看看别的吧~</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="h-30px w-30px text-hex-1FA5E4 flex items-center justify-center back-top font-700"
      rounded-lg
      text-xl
      cursor-pointer
      border="~ 2px solid #1FA5E4"
      hover:bg="#1FA5E4"
      hover:color="#fff"
      v-if="showBackTop"
      @click="backTop"
    >
      <el-icon><Top /></el-icon>
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
.my-container {
  position: relative;
  width: 1100px;
  margin: 0 auto;
}
.back-top {
  position: fixed;
  right: 50px;
  bottom: 30px;
  transition: all .5s;
}
.back-top:hover {
  border-radius: 50%;
  scale: 1.3;
}
</style>