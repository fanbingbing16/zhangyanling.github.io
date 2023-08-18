import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from "vue-router";
import HelloWorld from './components/HelloWorld.vue'
import calendar from './components/calendar.vue'
import Timer from './components/Timer'
import pikaqiu from './components/pikaqiu.vue'
import computer from './components/computer/computer.vue'
import helloKitty from './components/helloKitty/helloKitty'
import duolam from './components/duolam/duolam.vue'
const routes = [
  {
    path: '/', redirect: '/HelloWorld', component: App,
    children: [{ path: '/HelloWorld', component: HelloWorld, }]
  },
  {
    path: '/', redirect: '/calendar', component: App,
    children: [{ path: '/calendar', component: calendar },]
  },
  {
    path: '/', redirect: '/timer', component: App,
    children: [{ path: '/timer', component: Timer }]
  },
  {
    path: '/', redirect: '/pikaqiu', component: App,
    children: [{ path: '/pikaqiu', component: pikaqiu }]
  },
  {
    path: '/', redirect: '/computer', component: App,
    children: [{ path: '/computer', component: computer }]
  },
  {
    path: '/', redirect: '/helloKitty', component: App,
    children: [{ path: '/helloKitty', component: helloKitty }]
  },
  {
    path: '/', redirect: '/duolam', component: App,
    children: [{ path: '/duolam', component: duolam }]
  }

]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const app = createApp(App)

app.use(router)

app.mount('#app')