import { createRouter, createWebHistory } from 'vue-router'
import BasicLayout from '../layouts/BasicLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 登录与注册页面（不需要主布局）
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue'),
      meta: { public: true, title: '登录' }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/Register.vue'),
      meta: { public: true, title: '注册' }
    },
    // 受保护的后台主布局
    {
      path: '/',
      component: BasicLayout,
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: () => import('../views/DashboardView.vue'),
          meta: { title: '仪表盘' }
        },
        {
          path: 'scan-tasks',
          name: 'ScanTasks',
          component: () => import('../views/ScanTasksView.vue'),
          meta: { title: '扫描任务' }
        },
        {
          path: 'vulnerabilities',
          name: 'Vulnerabilities',
          component: () => import('../views/VulnerabilitiesView.vue'),
          meta: { title: '漏洞资产' }
        },
        {
          path: 'settings',
          name: 'Settings',
          component: () => import('../views/SettingsView.vue'),
          meta: { title: '系统设置' }
        }
      ]
    }
  ]
})

// 路由守卫：检查 Token，未登录访问受保护页面时跳转登录页
router.beforeEach((to, _from, next) => {
  const isPublic = to.meta.public
  const token = window.localStorage.getItem('token')

  if (!isPublic && !token) {
    // 未登录，跳转登录页
    return next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }

  if (to.path === '/login' && token) {
    // 已登录访问登录页，直接跳到首页
    return next('/')
  }

  next()
})

export default router

