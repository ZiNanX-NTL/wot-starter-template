import { createSSRApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'uno.css'
import '@/styles/css/global.css'

export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  app.use(router)
  return {
    app,
  }
}
