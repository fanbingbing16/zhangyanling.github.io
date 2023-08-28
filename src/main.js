import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from "vue-router";
import routesHospital from './dependences/routerMy';
import HelloWorld from './components/HelloWorld.vue'
import calendar from './components/calendar.vue'
import Timer from './components/Timer'
import pikaqiu from './components/pikaqiu.vue'
import computer from './components/computer/computer.vue'
import helloKitty from './components/helloKitty/helloKitty'
import duolam from './components/duolam/duolam.vue'
import blockBreaker from './components/blockBreaker/blockBreaker.vue'
import axios from 'axios'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import Editor from './components/editor/editor'
import tianqi from './components/tianqi/index'
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
  },
  {
    path: '/', redirect: '/blockBreaker', component: App,
    children: [{ path: '/blockBreaker', component: blockBreaker }]
  },
  {
    path: '/', redirect: '/editor', component: App,
    children: [{ path: '/editor', component: Editor }]
  },
  {
    path: '/', redirect: '/tianqi', component: App,
    children: [{ path: '/tianqi', component: tianqi }]
  }

]
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes.concat(routesHospital)
})
//路由守卫，防止用户没有登录就进入聊天室,（现在改成任何页面都不可以进去，除非登录）
// router.beforeEach((to, from, next) => {
//   //talk是聊天室
//   if (to.path === '/hospital/manage/login' || to.path === '/hospital/login' || to.path === '/hospital/forword' || to.path === '/hospital/register' || to.path === '/hospital/doctor/register') {
//     next()
//   } else {
//     if (!localStorage.getItem("userId")) {
//       next('/hospital/login')
//     }
//     else {
//       next()
//     }
//   }
// })
const app = createApp(App)
app.config.globalProperties.$axios = axios
app.use(router)
app.use(ElementPlus)
app.mount('#app')