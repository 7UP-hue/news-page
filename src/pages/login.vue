<script lang="ts" setup>
import { login } from '../api/login'
import { setToken } from '~/utils/cookie'
import {
  User,
  Lock,
} from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const loginRequest = ref({
  username: '',
  password: ''
})
const loginFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名' },
  ],
  password: [
    { required: true, message: '请输入密码' }
  ]
})
const myLogin = () => {
  login(loginRequest.value).then((res: any) => {
    if(res.code === 200) {
      ElMessage.success('登录成功')
      setToken(res.token)
      router.push('/editArticle')
    } else {
      ElMessage.error(res.msg)
    }
  })
}
const submitLogin = async (formEl: FormInstance | undefined) => {
  if(!formEl) return
  await formEl.validate((valid, fields) => {
    if(valid) {
      myLogin()
    }
  })
}
</script>
<template>
  <div class="login h-100vh">
    <div class="w-400px bg-white h-100% login-card px-10">
      <div class="mt-40 p-3 rounded-lg text-center" border="~ 1px solid #ccc">
        <div class="text-lg font-600">登录</div>
        <el-form
          class="mt-5"
          ref="loginFormRef"
          :model="loginRequest"
          :rules="rules"
        >
          <el-form-item prop="username">
            <el-input placeholder="请输入用户名" :prefix-icon="User" v-model="loginRequest.username" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="请输入密码" :prefix-icon="Lock" v-model="loginRequest.password" />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitLogin(loginFormRef)"
              class="w-100%"
            >登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<style scoped>
.login {
  position: relative;
  background: url('../assets/0w3pdr.jpg') 50%/cover;
}
.login-card {
  position: absolute;
  right: 0;
}
</style>
<route lang="yaml">
meta:
  layout: login
</route>