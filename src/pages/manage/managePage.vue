<script lang="ts" setup>
import { onMounted, ref, reactive, nextTick } from "vue"
import { getPages, delPage, editPage, addPage } from '~/api/page'
import { getArticles } from '~/api/article'
import type { FormInstance, FormRules  } from 'element-plus'
import { useRouter } from 'vue-router'
import {
  Delete,
  Edit,
  Search,
  Refresh,
  CirclePlus
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from "element-plus"
const tableData = ref([])
const showLoading = ref(true)
const searchForm = ref<FormInstance>()
const dialogForm = ref<FormInstance>()
const router = useRouter()
const articleList = ref([])
const searchValue = ref({
  pageName: null,
  articleContent: null,
  status: null,
  pageNum: 1,
  pageSize: 10
})
const pageNum = ref(1)
const totalSize = ref(0)
const dialogData = ref({
  isShow: false,
  title: '编辑页面',
  id: '',
  articleId: '',
  pageName: ''
})
const dialogFormRules = reactive<FormRules>({
  pageName: [
    { required: true, message: '请输入页面名称' }
  ],
  articleId: [
    { required: true, message: '请选择页面文章' }
  ]
})

/** 获取页面列表 */
const getList = () => {
  showLoading.value = true
  searchValue.value.pageNum = pageNum.value
  getPages(searchValue.value).then((res: any) => {
    if(res.code === 200) {
      totalSize.value = res.total
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
    '你确定删除id为'+id+'的页面吗',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(() => {
      delPage(id).then((res: any) => {
        if(res.code === 200) {
          ElMessage.success({
            message: '删除成功',
            duration: 1000
          })
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
const onEdit = (item: any) => {
  dialogData.value.isShow = true
  nextTick(() => {
    dialogData.value.title = '编辑页面'
    dialogData.value.id = item.id
    dialogData.value.articleId = item.articleId
    dialogData.value.pageName = item.pageName
  })
}
// 确定编辑或确定修改
const onConfirm = async (formEl: FormInstance | undefined) => {
  if(!formEl) return 
  await formEl.validate((valid, fields) => {
    if(valid) {
      if(dialogData.value.title === '编辑页面') {
        editPage({
          pageName: dialogData.value.pageName,
          articleId: dialogData.value.articleId,
          id: dialogData.value.id
        }).then((res: any) => {
          if(res.code === 200) {
            ElMessage.success({
              message: '编辑成功',
              duration: 1000
            })
            getList()
          } else {
            ElMessage.error(res.msg)
          }
        }).finally(() => {
          onCancel()
        })
      } else {
        addPage({
          pageName: dialogData.value.pageName,
          articleId: dialogData.value.articleId
        }).then((res: any) => {
          if(res.code === 200) {
            ElMessage.success({
              message: '新增成功',
              duration: 1000
            })
            getList()
          } else {
            ElMessage.error(res.msg)
          }
        }).finally(() => {
          onCancel()
        })
      }
    }
  })
}
// 取消添加或取消修改
const onCancel = () => {
  console.log(dialogForm.value)
  dialogForm.value?.resetFields()
  dialogData.value.isShow = false
}

// 新增
const onAdd = () => {
  dialogData.value.title = '新增页面'
  dialogData.value.isShow = true
}

onMounted(() => {
  getList()
  getArticles({status: 1, pageNum: 1, pageSize: 100}).then((res: any) => {
    if(res.code === 200) {
      articleList.value = res.rows
    }
  })
})
</script>
<template>
  <div
    class="p-4 mx-auto mt-5 rounded w-1100px"
    border="~ 1px solid #ccc"
    shadow="~ lg #ddd"
  >
    <div class="font-600 text-hex-333">
      管理页面
    </div>
    <div class="mt-5">
      <el-form
        :inline="true" 
        ref="searchForm"
        :model="searchValue"
      >
        <el-form-item label="页面名称" prop="pageName">
          <el-input v-model="searchValue.pageName" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="发布时间" prop="createTime">
          <el-date-picker
            v-model="searchValue.createTime"
            type="date"
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
        <el-form-item>
          <el-button type="success" size="small" @click="onAdd">
            <el-icon class="mr-1"><CirclePlus /></el-icon>新增
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="mt-3 p-1 min-h-70vh" border="~ 1px solid #ccc rounded" v-loading="showLoading">
      <el-table :data="tableData">
        <el-table-column prop="id" label="id" width="100px" />
        <el-table-column prop="pageName" label="页面名称" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="updateTime" label="最后更改时间" />
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button :icon="Edit" type="primary" size="small" @click="onEdit(scope.row)">编辑</el-button>
            <el-button :icon="Delete" type="danger" size="small" @click="onDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex justify-end mt-1">
        <el-pagination
          layout="prev, pager, next"
          :total="totalSize"
          v-model:current-page="pageNum"
          @current-change="getList"
        />
      </div>
    </div>
    <el-dialog v-model="dialogData.isShow" :title="dialogData.title" :before-close="onCancel">
      <el-form
        ref="dialogForm"
        :rules="dialogFormRules"
        :model="dialogData"
      >
        <el-form-item label="页面名称" prop="pageName">
          <el-input placeholder="请输入页面名称" v-model="dialogData.pageName" />
        </el-form-item>
        <el-form-item label="页面文章" prop="articleId">
          <el-select placeholder="请选择" v-model="dialogData.articleId">
            <el-option
              v-for="item in articleList"
              :key="item"
              :label="'id: '+ item.id + '文章标题: ' + item.articleTitle"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="onCancel()">取消</el-button>
        <el-button @click="onConfirm(dialogForm)" type="primary">确定</el-button>
      </template>
    </el-dialog>
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