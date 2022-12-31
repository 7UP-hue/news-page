// quasar.d.ts (or vite-env.d.ts)
/// <reference types="vite-plugin-pages/client" />
/// <reference types="vite-plugin-vue-layouts/client" />

import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '~/utils/cookie'
import { ElMain, ElMessage } from 'element-plus'

export const routes = setupLayouts(generatedRoutes)

const baseURL = import.meta.env.VITE_APP_BASE_URL //设置网址后缀 比如http://www.cloud-conf.org/cscloud/2023/

const router = createRouter({
  history: createWebHistory(baseURL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.path.indexOf('manage') === -1) {
    next()
  } else {
    const token = getToken()
    if(token) {
      next()
    } else {
      ElMessage.error('请先登录')
      next('/login')
    }
  }
})

export default router
