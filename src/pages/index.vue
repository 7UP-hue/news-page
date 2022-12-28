<script lang="ts" setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import { getArticleById } from '~/api/article'
import { getPages } from '~/api/page'
import { getSchedules } from '~/api/date'
import { useRouter, useRoute } from 'vue-router'
import bg1 from '../assets/bg.jpg'
import bg2 from '../assets/bg2.jpg'
import bg3 from '../assets/bg3.png'
import bg4 from '../assets/bg4.jpg'
import bg5 from '../assets/bg5.jpg'
const menuList = ref([])
const router = useRouter()
const route = useRoute()
const articleId = ref('')
const showBackTop = ref(false)
const importantDateList = ref([])
const isLoading = ref(true)
const detailValue = ref({
  articleTitle: '',
  articleContent: ''
})
const imgList = ref([
  bg1,
  bg2,
  bg3,
  bg4,
  bg5
])
function getMenus() {
  return new Promise((resolve, reject) => {
    getPages({pageNum: 1, pageSize: 100}).then((res: any) => {
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
    isLoading.value = false
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
  getSchedules({pageNum: 1, pageSize: 100}).then((res: any) => {
    if(res.code === 200) {
      importantDateList.value = res.rows
    }
  })
  window.addEventListener('scroll', handleScroll)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
<template>
  <div class="min-w-1100px">
    <div class="my-header">
      <div class="min-h-200px max-h-250px overflow-hidden">
        <el-carousel trigger="click">
          <el-carousel-item v-for="item in imgList" :key="item">
            <img :src="item" class="w-100% block">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="header-content py-7">
        <div class="flex justify-center text-3xl font-600 text-hex-811300">
          <p class="py-3 px-5 header-name rounded-xl mb-0 cursor-pointer">IEEE EDGECOM 2023</p>
        </div>
        <div class="flex justify-center font-600">
          <p class="py-3 px-5 header-name rounded-xl">Xiangtan, July 1-2, 2023</p>
        </div>
      </div>
    </div>
    <div class="header-menu">
      <div class="menu-main w-1300px mx-auto flex flex-wrap justify-center font-600">
        <span
          class="py-3 text-white px-5 border-r-2 border-hex-7BF7FE cursor-pointer menu-items"
          hover:color="#811300"
          v-for="item in menuList"
          :key="item"
          @click="onChange(item)"
        >
          {{item.title}}
        </span>
      </div>
    </div>
    <div class="bg-hex-F1F1F1 py-10 min-h-50vh">
      <div class="w-1100px mx-auto flex justify-between">
        <div class="w-830px">
          <div class="bg-white text-3xl py-5 px-8 rounded text-center leading-relaxed tracking-wide">
            {{detailValue.articleTitle}}
          </div>
          <div class="bg-white p-4 rounded min-h-200px mt-10">
            <div v-html="detailValue.articleContent"></div>
            <div v-if="detailValue.articleContent == '' &&!isLoading" class="flex items-center justify-center">
              <img src="../assets/暂无记录.png" class="w-30%">
              <span class="text-lg text-hex-666">文章走丢啦,去看看别的吧~</span>
            </div>
          </div>
          <div class="text-center bg-white py-3">
            <!-- <div class="py-2 font-600 text-13px">Organizers:</div>
            <img src="../assets/hnust-logo.png" class="w-110px" />
            <img src="../assets/xtdx-logo.png" class="w-110px ml-5" /> -->
            <a href="https://www.ieee.org/index.html" target="_blank" rel="noopener">
              <img src="../assets/IEEE1.jpg" class="w-156px" />
            </a>
            <a href="https://www.computer.org/" target="_blank" rel="noopener" class="ml-3">
              <img src="../assets/IEEE2.png" class="w-147px" />
            </a>
            <a href="https://www.computer.org/web/tandc/tcsc" target="_blank" rel="noopener" class="ml-3">
              <img src="../assets/IEEE3.png" class="w-87px" />
            </a>
            <a href="https://www.computer.org/web/stc-smart-computing" target="_blank" rel="noopener" class="ml-3">
              <img src="../assets/stcsmart.png" class="w-233px" />
            </a>
          </div>
        </div>
        <div class="w-240px">
          <div class="rounded bg-white py-3 px-5 important-date">
            <div class="important-content px-1 py-4 text-13px rounded">
              IMPORTANT DATES
            </div>
            <div
              v-for="item in importantDateList"
              :key="item"
              class="mt-3"
            >
              {{item.scheduleContent}}: {{item.scheduleTime}}
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
* {
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
.my-header {
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
  background-color: rgba(255,255,255,.7);
}
.header-menu {
  /* position: sticky;
  top: -2px; */
  width: 100%;
  background: #1FA5E4;
}
.menu-items {
  transition: all .5s;
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
.important-date {
  position: relative;
}
.important-content {
  left: -15px;
  position: absolute;
  writing-mode: vertical-rl;
  background: #1FA5E4;
  color: #fff;
  transform: rotate(180deg);
}
</style>