import { createApp } from 'vue'

import './styles/normalize.css'

import App from './App.vue'

// 路由
import router from './router'

const app = createApp(App)

app
    .use(router)
    .mount('#app')
