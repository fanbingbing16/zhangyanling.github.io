import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from "vue-router";
import HelloWorld from './components/HelloWorld.vue'
const routes = [
  { path: '/', redirect: '/user', component: App },
  { path: '/user', component: HelloWorld }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const app = createApp(App)

app.use(router)

app.mount('#app')