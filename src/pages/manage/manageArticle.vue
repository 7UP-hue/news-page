<script lang="ts" setup>
import { onMounted, ref } from "vue"
import { getArticles, delArticle } from '~/api/article'
import type { FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'
import {
  Delete,
  Edit,
  Search,
  Refresh
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from "element-plus"
const tableData = ref([])
const showLoading = ref(true)
const searchForm = ref<FormInstance>()
const router = useRouter()
const searchValue = ref({
  articleTitle: null,
  articleContent: null,
  status: null,
  createTime: null
})
const options = ref([
  {label: '待发布', value: '0'},
  {label: '已发布', value: '1'}
])
/** 获取文章列表 */
const getList = () => {
  showLoading.value = true
  getArticles(searchValue.value).then((res: any) => {
    if(res.code === 200) {
      tableData.value = res.rows
      showLoading.value = false
    }
  }).catch((err) => {
    ElMessage.error(err.message)
  })
}
/** 删除 */
const onDelete = (id: any) => {
  ElMessageBox.confirm(
    '你确定删除id为'+id+'的文章吗',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(() => {
      delArticle(id).then((res: any) => {
        if(res.code === 200) {
          ElMessage.success('删除成功')
          getList()
        }
      })
    }).catch(() => {
      ElMessage('取消')
    })
}
/** 重置 */
const onReset = (formRef: any) => {
  formRef.resetFields()
}
/** 编辑 */
const onEdit = (id: any) => {
  router.push(`/manage/editArticle?id=${id}`)
}
onMounted(() => {
  getList()
})
</script>
<template>
  <div
    class="p-4 mx-auto mt-5 rounded w-1100px"
    border="~ 1px solid #ccc"
    shadow="~ lg #ddd"
  >
    <div class="font-600 text-hex-333">
      管理文章
    </div>
    <div class="mt-5">
      <el-form
        :inline="true" 
        label-width="80px"
        ref="searchForm"
        :model="searchValue"
      >
        <el-form-item label="状态" prop="status">
          <el-select v-model="searchValue.status" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item"
              :label="item.label"
              :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="articleTitle">
          <el-input v-model="searchValue.articleTitle" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="searchValue.content" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="发布时间" prop="createTime">
          <el-date-picker
            v-model="searchValue.createTime"
            type="data"
            placeholder="请选择时间"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="getList">
            <el-icon class="mr-1"><Search /></el-icon>查询
          </el-button>
          <el-button type="default" size="small" @click="onReset(searchForm)">
            <el-icon class="mr-1"><Refresh /></el-icon>重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="mt-3 p-1 min-h-70vh" border="~ 1px solid #ccc rounded" v-loading="showLoading">
      <el-table :data="tableData">
        <el-table-column prop="id" label="id" width="100px" />
        <el-table-column prop="articleTitle" label="文章标题" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="updateTime" label="最后更改时间" />
        <el-table-column label="状态" align="center">
          <template #default="scope">
            <el-tag v-if="scope.row.status == 0" type="warning">待发布</el-tag>
            <el-tag v-if="scope.row.status == 1" type="success">已发布</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button :icon="Edit" type="primary" size="small" @click="onEdit(scope.row.id)">编辑</el-button>
            <el-button :icon="Delete" type="danger" size="small" @click="onDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<style>
label {
  font-weight: 700;
}
</style>
<route lang="yaml">
meta:
  layout: manage
</route>