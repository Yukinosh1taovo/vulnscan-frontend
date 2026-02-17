<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { register, getCaptcha } from '@/api/auth'
import { ElMessage } from 'element-plus'

const router = useRouter()
const formRef = ref()
const loading = ref(false)
const captchaImg = ref('')
const form = ref({
  username: '',
  password: '',
  confirmPassword: '',
  email: '',
  captchaCode: '',
  captchaUuid: '',
})

const rules = {
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于6位', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== form.value.password) {
          callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
  ],
  captchaCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
}

const loadCaptcha = async () => {
  try {
    const res = await getCaptcha()
    captchaImg.value = res.data.image
    form.value.captchaUuid = res.data.uuid
  } catch (e) {
    ElMessage.error('验证码加载失败')
  }
}

const handleRegister = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return
    loading.value = true
    try {
      await register({
        username: form.value.username,
        password: form.value.password,
        email: form.value.email,
        captchaCode: form.value.captchaCode,
        captchaUuid: form.value.captchaUuid,
      })
      ElMessage.success('注册成功，请登录')
      router.push('/login')
    } catch (e) {
      loadCaptcha()
    } finally {
      loading.value = false
    }
  })
}

const goLogin = () => {
  router.push('/login')
}

onMounted(() => {
  loadCaptcha()
})
</script>

<template>
  <div class="register-container">
    <el-card class="register-card">
      <h2 class="register-title">注册</h2>
      <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
        <el-form-item label="账号" prop="username">
          <el-input v-model="form.username" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" type="password" placeholder="请再次输入密码" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="验证码" prop="captchaCode">
          <div style="display: flex; align-items: center;">
            <el-input v-model="form.captchaCode" placeholder="请输入验证码" style="flex:1; margin-right: 8px;" />
            <img :src="captchaImg" @click="loadCaptcha" style="height:32px;cursor:pointer;" title="点击刷新验证码" />
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="handleRegister">注册</el-button>
          <el-button type="text" @click="goLogin">返回登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f5f5f5;
}
.register-card {
  width: 400px;
  padding: 32px 24px;
}
.register-title {
  text-align: center;
  margin-bottom: 24px;
}
</style>

