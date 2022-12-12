<script lang="ts" setup>
import { ref } from "vue"
import {
  Delete,
  Edit,
} from '@element-plus/icons-vue'
const tableData = ref([
  {
    title: '文章1',
    createTime: '2022-12-12 16:32',
    updateTime: '2022-12-12 16:37',
    state: 1,
  },
  {
    title: '文章2',
    createTime: '2022-12-12 16:32',
    updateTime: '2022-12-12 16:37',
    state: 0,
  },
  {
    title: '文章3',
    createTime: '2022-12-12 16:32',
    updateTime: '2022-12-12 16:37',
    state: 2,
  }
])

</script>
<template>
  <div
    class="p-4 mx-auto mt-5 rounded w-80%"
    border="~ 1px solid #ccc"
    shadow="~ lg #ddd"
  >
    <div class="font-600 text-hex-333">
      管理文章
    </div>
    <div class="mt-3 p-1 min-h-75vh" border="~ 1px solid #ccc rounded">
      <el-table :data="tableData">
        <el-table-column prop="title" label="文章标题" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="updateTime" label="最后更改时间" />
        <el-table-column label="状态" align="center">
          <template #default="scope">
            <el-tag v-if="scope.row.state === 0" type="warning">待发布</el-tag>
            <el-tag v-if="scope.row.state === 1" type="success">已发布</el-tag>
            <el-tag v-if="scope.row.state === 2" type="warning">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button :icon="Edit" type="primary" size="small">编辑</el-button>
            <el-button :icon="Delete" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: manage
</route>