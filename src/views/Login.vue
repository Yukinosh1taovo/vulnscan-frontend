<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { login, getCaptcha } from '@/api/auth'
import { ElMessage } from 'element-plus'

const router = useRouter()
const formRef = ref()
const loading = ref(false)
const captchaImg = ref('')
const loginForm = ref({
  username: '',
  password: '',
  captchaCode: '',
  captchaUuid: '',
})

const rules = {
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  captchaCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
}

const loadCaptcha = async () => {
  try {
    const res = await getCaptcha()
    captchaImg.value = res.data.image
    loginForm.value.captchaUuid = res.data.uuid
  } catch (e) {
    ElMessage.error('验证码加载失败')
  }
}

const handleLogin = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return
    loading.value = true
    try {
      const res = await login(loginForm.value)
      // 登录成功，保存 token 和用户信息
      localStorage.setItem('token', res.data.accessToken)
      localStorage.setItem('tokenType', res.data.tokenType)
      localStorage.setItem('userInfo', JSON.stringify(res.data.userInfo))
      router.push('/')
    } catch (e) {
      // 错误提示已在拦截器弹出，这里只需停止 loading
      loadCaptcha()
    } finally {
      loading.value = false
    }
  })
}

const goRegister = () => {
  router.push('/register')
}

onMounted(() => {
  loadCaptcha()
})
</script>

<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="login-title">登录</h2>
      <el-form :model="loginForm" :rules="rules" ref="formRef" label-width="80px">
        <el-form-item label="账号" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="验证码" prop="captchaCode">
          <div style="display: flex; align-items: center;">
            <el-input v-model="loginForm.captchaCode" placeholder="请输入验证码" style="flex:1; margin-right: 8px;" @keyup.enter="handleLogin" />
            <img :src="captchaImg" @click="loadCaptcha" style="height:32px;cursor:pointer;" title="点击刷新验证码" />
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" :disabled="loading" @click="handleLogin">登录</el-button>
          <el-button type="text" @click="goRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f5f5f5;
}
.login-card {
  width: 400px;
  padding: 32px 24px;
}
.login-title {
  text-align: center;
  margin-bottom: 24px;
}
</style>

