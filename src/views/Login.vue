<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { login } from '@/api/auth'

interface LoginForm {
  username: string
  password: string
}

const router = useRouter()

const formRef = ref<FormInstance | null>(null)

const form = reactive<LoginForm>({
  username: '',
  password: ''
})

const loading = ref(false)

const rules: FormRules<LoginForm> = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于 6 位', trigger: 'blur' }
  ]
}

const handleLogin = () => {
  if (!formRef.value) return
  formRef.value.validate(async (valid) => {
    if (!valid) return
    loading.value = true
    try {
      const res = await login({
        username: form.username,
        password: form.password
      })
      if (res.code !== 1) {
        ElMessage.error(res.msg || '登录失败，请检查用户名或密码')
        return
      }

      const token = (res.data as any)?.accessToken
      if (token) {
        // 保留 Authorization 头中的 Bearer 前缀逻辑，这里只存 accessToken
        window.localStorage.setItem('token', token)
      }

      ElMessage.success(res.msg || '登录成功')

      // 支持从 ?redirect=xxx 返回原访问页，否则回到首页
      const redirectPath =
        (router.currentRoute.value.query.redirect as string | undefined) || '/'
      router.push(redirectPath)
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        '登录失败，请检查用户名或密码'
      ElMessage.error(msg)
    } finally {
      loading.value = false
    }
  })
}

const goRegister = () => {
  router.push('/register')
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-wrapper">
      <el-card class="auth-card" shadow="hover">
        <div class="card-header">
          <h2 class="title">VulnScan Pro</h2>
          <p class="subtitle">安全漏洞扫描平台 · 登录</p>
        </div>

        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          label-position="top"
          class="auth-form"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="form.username"
              placeholder="请输入用户名"
              autocomplete="username"
            />
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input
              v-model="form.password"
              type="password"
              show-password
              placeholder="请输入密码"
              autocomplete="current-password"
            />
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              class="submit-btn"
              :loading="loading"
              @click="handleLogin"
            >
              登录
            </el-button>
          </el-form-item>

          <div class="footer-text">
            还没有账号？
            <el-button link type="primary" @click="goRegister">去注册</el-button>
          </div>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #141e30 0%, #243b55 100%);
}

.auth-wrapper {
  width: 100%;
  max-width: 420px;
  padding: 24px;
}

.auth-card {
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

.card-header {
  text-align: center;
  margin-bottom: 24px;
}

.title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 13px;
  color: #909399;
}

.auth-form {
  margin-top: 8px;
}

.submit-btn {
  width: 100%;
}

.footer-text {
  margin-top: 8px;
  font-size: 13px;
  color: #909399;
  text-align: center;
}
</style>

