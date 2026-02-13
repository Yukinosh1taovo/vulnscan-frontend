<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Search, Refresh } from '@element-plus/icons-vue'

// 模拟任务数据
const tableData = ref([
  {
    id: 1,
    name: 'Web应用扫描-生产环境',
    target: 'https://example.com',
    status: 'running',
    progress: 65,
    createdAt: '2026-01-31 10:30:00'
  },
  {
    id: 2,
    name: 'API接口安全检测',
    target: 'https://api.example.com',
    status: 'completed',
    progress: 100,
    createdAt: '2026-01-30 14:20:00'
  },
  {
    id: 3,
    name: '内网资产扫描',
    target: '192.168.1.0/24',
    status: 'pending',
    progress: 0,
    createdAt: '2026-01-31 09:00:00'
  }
])

const searchKeyword = ref('')

const getStatusType = (status: string) => {
  const map: Record<string, string> = {
    running: 'primary',
    completed: 'success',
    pending: 'info',
    failed: 'danger'
  }
  return map[status] || 'info'
}

const getStatusText = (status: string) => {
  const map: Record<string, string> = {
    running: '运行中',
    completed: '已完成',
    pending: '等待中',
    failed: '失败'
  }
  return map[status] || status
}
</script>

<template>
  <div class="scan-tasks-container">
    <h2 class="page-title">扫描任务</h2>

    <!-- 工具栏 -->
    <el-card class="toolbar-card" shadow="never">
      <div class="toolbar">
        <div class="toolbar-left">
          <el-input
            v-model="searchKeyword"
            placeholder="搜索任务名称"
            :prefix-icon="Search"
            clearable
            style="width: 250px"
          />
          <el-button :icon="Refresh">刷新</el-button>
        </div>
        <div class="toolbar-right">
          <el-button type="primary" :icon="Plus">新建任务</el-button>
        </div>
      </div>
    </el-card>

    <!-- 任务列表 -->
    <el-card class="table-card" shadow="never">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="任务名称" min-width="200" />
        <el-table-column prop="target" label="扫描目标" min-width="200" />
        <el-table-column prop="status" label="状态" width="120">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)" size="small">
              {{ getStatusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="progress" label="进度" width="180">
          <template #default="{ row }">
            <el-progress :percentage="row.progress" :status="row.progress === 100 ? 'success' : ''" />
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" width="180" />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default>
            <el-button type="primary" link size="small">详情</el-button>
            <el-button type="danger" link size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped>
.scan-tasks-container {
  padding: 0;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 20px;
}

.toolbar-card {
  margin-bottom: 16px;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toolbar-left {
  display: flex;
  gap: 12px;
}

.table-card {
  margin-bottom: 20px;
}
</style>
