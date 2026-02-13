<script setup lang="ts">
import { ref, reactive } from 'vue'

// 系统设置表单
const settingsForm = reactive({
  siteName: 'VulnScan Pro',
  adminEmail: 'admin@example.com',
  maxConcurrentScans: 5,
  scanTimeout: 3600,
  enableNotifications: true,
  notifyOnComplete: true,
  notifyOnVulnerability: true
})

// 表单引用
const formRef = ref()

// 保存设置
const handleSave = () => {
  console.log('保存设置:', settingsForm)
}

// 重置设置
const handleReset = () => {
  formRef.value?.resetFields()
}
</script>

<template>
  <div class="settings-container">
    <h2 class="page-title">系统设置</h2>

    <el-row :gutter="20">
      <el-col :span="16">
        <!-- 基本设置 -->
        <el-card class="settings-card">
          <template #header>
            <span>基本设置</span>
          </template>
          <el-form
            ref="formRef"
            :model="settingsForm"
            label-width="140px"
            label-position="right"
          >
            <el-form-item label="系统名称" prop="siteName">
              <el-input v-model="settingsForm.siteName" placeholder="请输入系统名称" />
            </el-form-item>
            <el-form-item label="管理员邮箱" prop="adminEmail">
              <el-input v-model="settingsForm.adminEmail" placeholder="请输入管理员邮箱" />
            </el-form-item>
            <el-form-item label="最大并发扫描数" prop="maxConcurrentScans">
              <el-input-number v-model="settingsForm.maxConcurrentScans" :min="1" :max="20" />
            </el-form-item>
            <el-form-item label="扫描超时时间(秒)" prop="scanTimeout">
              <el-input-number v-model="settingsForm.scanTimeout" :min="60" :max="86400" :step="60" />
            </el-form-item>
          </el-form>
        </el-card>

        <!-- 通知设置 -->
        <el-card class="settings-card">
          <template #header>
            <span>通知设置</span>
          </template>
          <el-form :model="settingsForm" label-width="140px" label-position="right">
            <el-form-item label="启用通知">
              <el-switch v-model="settingsForm.enableNotifications" />
            </el-form-item>
            <el-form-item label="扫描完成通知">
              <el-switch
                v-model="settingsForm.notifyOnComplete"
                :disabled="!settingsForm.enableNotifications"
              />
            </el-form-item>
            <el-form-item label="发现漏洞通知">
              <el-switch
                v-model="settingsForm.notifyOnVulnerability"
                :disabled="!settingsForm.enableNotifications"
              />
            </el-form-item>
          </el-form>
        </el-card>

        <!-- 操作按钮 -->
        <div class="form-actions">
          <el-button type="primary" @click="handleSave">保存设置</el-button>
          <el-button @click="handleReset">重置</el-button>
        </div>
      </el-col>

      <el-col :span="8">
        <!-- 系统信息 -->
        <el-card class="info-card">
          <template #header>
            <span>系统信息</span>
          </template>
          <el-descriptions :column="1" border>
            <el-descriptions-item label="版本号">v1.0.0</el-descriptions-item>
            <el-descriptions-item label="构建时间">2026-01-31</el-descriptions-item>
            <el-descriptions-item label="运行环境">Production</el-descriptions-item>
            <el-descriptions-item label="数据库状态">
              <el-tag type="success" size="small">正常</el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.settings-container {
  padding: 0;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 20px;
}

.settings-card {
  margin-bottom: 20px;
}

.info-card {
  margin-bottom: 20px;
}

.form-actions {
  display: flex;
  gap: 12px;
}

:deep(.el-form-item) {
  margin-bottom: 22px;
}
</style>
