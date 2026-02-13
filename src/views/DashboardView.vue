<script setup lang="ts">
import { ref } from 'vue'
import { Odometer, Aim, Warning, CircleCheck } from '@element-plus/icons-vue'

// 统计数据
const stats = ref([
  { title: '扫描任务总数', value: 128, icon: Aim, color: '#409EFF' },
  { title: '已发现漏洞', value: 56, icon: Warning, color: '#E6A23C' },
  { title: '已修复漏洞', value: 42, icon: CircleCheck, color: '#67C23A' },
  { title: '运行中任务', value: 3, icon: Odometer, color: '#909399' }
])
</script>

<template>
  <div class="dashboard-container">
    <h2 class="page-title">仪表盘</h2>
    
    <!-- 统计卡片 -->
    <el-row :gutter="20" class="stats-row">
      <el-col :xs="24" :sm="12" :md="6" v-for="stat in stats" :key="stat.title">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-content">
            <div class="stat-info">
              <div class="stat-title">{{ stat.title }}</div>
              <div class="stat-value">{{ stat.value }}</div>
            </div>
            <div class="stat-icon" :style="{ backgroundColor: stat.color }">
              <el-icon :size="28"><component :is="stat.icon" /></el-icon>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 占位内容 -->
    <el-row :gutter="20" class="content-row">
      <el-col :span="16">
        <el-card class="chart-card">
          <template #header>
            <span>漏洞趋势</span>
          </template>
          <div class="chart-placeholder">
            <el-empty description="图表区域" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="activity-card">
          <template #header>
            <span>最近活动</span>
          </template>
          <div class="activity-placeholder">
            <el-empty description="活动列表" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.dashboard-container {
  padding: 0;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 20px;
}

.stats-row {
  margin-bottom: 20px;
}

.stat-card {
  margin-bottom: 12px;
}

.stat-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-info {
  flex: 1;
}

.stat-title {
  font-size: 14px;
  color: #909399;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 28px;
  font-weight: 600;
  color: #303133;
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.content-row {
  margin-top: 20px;
}

.chart-card,
.activity-card {
  min-height: 360px;
}

.chart-placeholder,
.activity-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 280px;
}
</style>
