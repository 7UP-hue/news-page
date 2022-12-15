<script lang="ts" setup>
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { IEditorConfig } from '@wangeditor/editor'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { ElMessage } from 'element-plus'
import Compressor from 'compressorjs'
import { uploadFile } from '~/api/upload'
import { postArticle, editArticle, getArticleById } from '~/api/article'
import { useRoute, useRouter } from 'vue-router'

const mode = 'default'
const editorRef = shallowRef()
const showLoading = ref(true)
const route = useRoute()
const articleId = route.query.id

// 去除视频上传
const toolbarConfig = {
  excludeKeys: ['insertVideo', 'uploadVideo', 'group-video']
}

// 编辑器配置
const editorConfig: Partial<IEditorConfig> = { 
  placeholder: '请输入内容...',
  MENU_CONF: {}
}

// 自定义上传图片
editorConfig.MENU_CONF['uploadImage'] = {
  async customUpload(file: File, insertFn: any) {
    const fileName = file.name
    const m = fileName.match(/\.(\w+)(#|\?|$)/)
    const fileType = (m && m[1]).toString().toLowerCase()
    const allowType = ['jpg', 'jpeg', 'png']
    const validType = (allowType).includes(fileType)
    if(!validType) {
      ElMessage.error("仅支持'.jpg'、'.jpeg'、'.png'格式的图片")
      return false
    }
    if(file.size / 1024 / 1024 > 5) {
      ElMessage.error("图片大小不能超过5MB！")
      return false
    }
    new Compressor(file, {
      // 压缩图片
      quality: 0.6,
      convertTypes: ['image/png', 'image/jpg'],
      convertSize: 1000000,
      success(result: any) {
        const formData = new FormData()
        formData.append('file', result, result.name)
        uploadImage(formData).then((res: any) => {
          insertFn(res)
        }).catch((error) => {
          return false
        })
      },
      error(err) {
        ElMessage.error(err.message)
        return false
      }
    })
  }
}
// 上传图片
function uploadImage(file: FormData) {
  return new Promise((resolve, reject) => {
    uploadFile(file).then((res: any) => {
      if(res.errno === 0) {
        resolve(res.data[0].url)
      } else {
        ElMessage.error(res.msg)
        resolve(res)
      }
    }).catch(error => {
      ElMessage.error(error.msg)
      resolve(error)
    }) 
  })
}

//链接
// 自定义校验链接
function checkLink(text: string, url: string): string | boolean | undefined {
  if(!url) {
    ElMessage.error('链接不能为空')
    return 
  }
  if(url.indexOf('http') !== 0) {
    ElMessage.error('链接必须以http/https开头')
    return '链接必须以http/https开头'
  }
  return true
}
// 自定义转换链接url
function parseLink(url: string): string {
  if (url.indexOf('http') !== 0) {
    console.log(url)
    return `http://${url}`
  }
  return url
}
// 插入链接
editorConfig.MENU_CONF['insertLink'] = {
    checkLink: checkLink,
    parseLinkUrl: parseLink,
}
// 更新链接
editorConfig.MENU_CONF['editLink'] = {
    checkLink: checkLink, 
    parseLinkUrl: parseLink,
}

const postRequest = ref({
  articleTitle: '',
  articleContent: '<p>hello</p>',
  id: '',
  status: 1
})

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if(editor === null) return;
  editor.destroy()
})

const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

//发布文章
const onPost = (status: any) => {
  postRequest.value.status = status
  if(!postRequest.value.articleTitle) {
    ElMessage.error('标题不能为空')
  } else if(postRequest.value.articleContent === '<p><br></p>') {
    ElMessage.error('内容不能为空')
  } else {
    showLoading.value = true
    if(articleId !== null && articleId !== '' && articleId !== undefined) {
      //修改文章
      postRequest.value.id = articleId
      editArticle(postRequest.value).then((res: any) => {
        if(res.code === 200) {
          ElMessage.success({
            message: '修改成功',
            duration: 1000
          })
        } else {
          ElMessage.error(res.message)
        }
      }).finally(() => {
        showLoading.value = false
      })
    } else {
      //发布文章
      postArticle(postRequest.value).then((res: any) => {
        if(res.code === 200) {
          ElMessage.success({
            message: '发布成功',
            duration: 1000
          })
        } else {
          ElMessage.error(res.message)
        }
      }).finally(() => {
        showLoading.value = false
      })
    }
  }
}


const onSave = () => {
  postRequest.value.status = 0
  onPost(0)
}

onMounted(() => {
  if(articleId !== null && articleId !== '' && articleId !== undefined) {
    getArticleById(articleId).then((res: any) => {
      if(res.code === 200) {
        postRequest.value.articleTitle = res.data.articleTitle
        postRequest.value.articleContent = res.data.articleContent
        showLoading.value = false
      }
    })
  } else {
    showLoading.value = false
  }
})
</script>
<template>
  <div
    class="p-4 mx-auto mt-5 rounded w-1100px"
    border="~ 1px solid #ccc"
    shadow="~ lg #ddd"
  >
    <div class="font-600 text-hex-333">
      发布文章
    </div>
    <div class="mt-3 flex justify-between">
      <input
        class="w-77% rounded py-2 px-3 title-input"
        style="border: 1px solid #ccc"
        focus:boder=" 1px solid #ccc"
        placeholder="请输入标题"
        v-model="postRequest.articleTitle"
      />
      <span
        class="py-2 px-4 rounded text-hex-67C23A cursor-pointer keep-bottom"
        border="~ 1px solid #67C23A"
        @click="onSave"
      >
        保存草稿
      </span>
      <span
        class="py-2 px-4 rounded text-hex-409EFF cursor-pointer post-bottom"
        border="~ 1px solid #409EFF"
        @click="onPost(1)"
      >
        发布文章
      </span>
    </div>
    <div style="border: 1px solid #ccc" mt-5 v-loading="showLoading">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :defaultConfig="toolbarConfig"
        :editor="editorRef"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden;"
        v-model="postRequest.articleContent"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
    </div>
  </div>
</template>

<style scoped>
.title-input {
  transition: all .5s;
}
.title-input:focus {
  outline: 0;
  border: 1px solid #409EFF !important;
}
.keep-bottom {
  background: rgba(103,194,58,.1);
  transition: all .3s;
}
.keep-bottom:hover {
  background: #67C23A;
  color: white;
}
.post-bottom {
  background: rgba(64,158,255,.1);
  transition: all .3s;
}
.post-bottom:hover {
  background: #409EFF;
  color: white;
}
</style>

<route lang="yaml">
meta:
  layout: manage
</route>