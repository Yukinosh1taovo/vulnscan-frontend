import { createRouter, createWebHistory } from 'vue-router'
import BasicLayout from '../layouts/BasicLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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

export default router
