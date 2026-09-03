<script setup lang="ts">
import { useAuthNavigation } from '@/composables/useAuthNavigation'
import { useAuthStore } from '@/store/auth'

definePage({
  name: 'login',
  auth: false,
  style: {
    navigationBarTitleText: '登录',
  },
})

const authStore = useAuthStore()
const { redirectAfterLogin } = useAuthNavigation()
const loading = ref(false)

async function handleLogin() {
  loading.value = true
  try {
    // 示例登录：实际项目可在此替换为账号、短信或微信登录 API。
    authStore.setToken(`token_${Date.now()}`, Date.now() + 24 * 60 * 60 * 1000)
    await redirectAfterLogin()
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <view class="min-h-screen flex items-center justify-center px-6">
    <view class="w-full rounded-3 p-6 text-center wot-bg-filled-oppo">
      <text class="mb-3 block text-6 font-bold wot-text-text-main">
        登录
      </text>
      <text class="mb-6 block text-3.5 wot-text-text-secondary">
        登录后即可访问受保护页面
      </text>
      <wd-button type="primary" block :loading="loading" @click="handleLogin">
        {{ loading ? '登录中...' : '模拟登录' }}
      </wd-button>
    </view>
  </view>
</template>
