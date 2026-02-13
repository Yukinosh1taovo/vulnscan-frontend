<script setup lang="ts">
import { ref } from 'vue'
import { Search, Download } from '@element-plus/icons-vue'

// 模拟漏洞数据
const tableData = ref([
  {
    id: 'VULN-001',
    name: 'SQL注入漏洞',
    severity: 'high',
    target: 'https://example.com/api/users',
    status: 'open',
    discoveredAt: '2026-01-31 08:30:00'
  },
  {
    id: 'VULN-002',
    name: 'XSS跨站脚本攻击',
    severity: 'medium',
    target: 'https://example.com/search',
    status: 'fixed',
    discoveredAt: '2026-01-30 16:45:00'
  },
  {
    id: 'VULN-003',
    name: '敏感信息泄露',
    severity: 'critical',
    target: 'https://example.com/config',
    status: 'open',
    discoveredAt: '2026-01-31 11:20:00'
  },
  {
    id: 'VULN-004',
    name: '弱密码策略',
    severity: 'low',
    target: 'https://example.com/login',
    status: 'ignored',
    discoveredAt: '2026-01-29 09:15:00'
  }
])

const searchKeyword = ref('')
const severityFilter = ref('')

const getSeverityType = (severity: string) => {
  const map: Record<string, string> = {
    critical: 'danger',
    high: 'warning',
    medium: 'primary',
    low: 'info'
  }
  return map[severity] || 'info'
}

const getSeverityText = (severity: string) => {
  const map: Record<string, string> = {
    critical: '严重',
    high: '高危',
    medium: '中危',
    low: '低危'
  }
  return map[severity] || severity
}

const getStatusText = (status: string) => {
  const map: Record<string, string> = {
    open: '待处理',
    fixed: '已修复',
    ignored: '已忽略'
  }
  return map[status] || status
}
</script>

<template>
  <div class="vulnerabilities-container">
    <h2 class="page-title">漏洞资产</h2>

    <!-- 工具栏 -->
    <el-card class="toolbar-card" shadow="never">
      <div class="toolbar">
        <div class="toolbar-left">
          <el-input
            v-model="searchKeyword"
            placeholder="搜索漏洞名称"
            :prefix-icon="Search"
            clearable
            style="width: 250px"
          />
          <el-select v-model="severityFilter" placeholder="危险等级" clearable style="width: 150px">
            <el-option label="严重" value="critical" />
            <el-option label="高危" value="high" />
            <el-option label="中危" value="medium" />
            <el-option label="低危" value="low" />
          </el-select>
        </div>
        <div class="toolbar-right">
          <el-button :icon="Download">导出报告</el-button>
        </div>
      </div>
    </el-card>

    <!-- 漏洞列表 -->
    <el-card class="table-card" shadow="never">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="漏洞ID" width="120" />
        <el-table-column prop="name" label="漏洞名称" min-width="180" />
        <el-table-column prop="severity" label="危险等级" width="100">
          <template #default="{ row }">
            <el-tag :type="getSeverityType(row.severity)" size="small" effect="dark">
              {{ getSeverityText(row.severity) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="target" label="影响目标" min-width="220" show-overflow-tooltip />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            {{ getStatusText(row.status) }}
          </template>
        </el-table-column>
        <el-table-column prop="discoveredAt" label="发现时间" width="180" />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default>
            <el-button type="primary" link size="small">查看详情</el-button>
            <el-button type="success" link size="small">修复</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped>
.vulnerabilities-container {
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
