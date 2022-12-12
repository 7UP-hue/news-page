<script lang="ts" setup>
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
const mode = 'default'
const editorRef = shallowRef()
const valueHtml = ref('<p>hello</p>')
const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }
onBeforeUnmount(() => {
  const editor = editorRef.value
  if(editor === null) return;
  editor.destroy()
})
const handleCreated = (editor: any) => {
  console.log('created', editor);
  editorRef.value = editor; // 记录 editor 实例，重要！
};
</script>
<template>
  <div
    class="p-4 mx-auto mt-5 rounded w-80%"
    border="~ 1px solid #ccc"
    shadow="~ lg #ddd"
  >
    <div class="font-600 text-hex-333">
      发布文章
    </div>
    <div class="mt-3 flex justify-between">
      <input
        class="w-80% rounded py-2 px-3 title-input"
        style="border: 1px solid #ccc"
        focus:boder=" 1px solid #ccc"
        placeholder="请输入标题"
      />
      <span
        class="py-2 px-4 rounded text-hex-67C23A cursor-pointer keep-bottom"
        border="~ 1px solid #67C23A"
      >
        保存草稿
      </span>
      <span
        class="py-2 px-4 rounded text-hex-409EFF cursor-pointer post-bottom"
        border="~ 1px solid #409EFF"
      >
        发布文章
      </span>
    </div>
    <div style="border: 1px solid #ccc" mt-5>
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :defaultConfig="toolbarConfig"
        :editor="editorRef"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden;"
        v-model="valueHtml"
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