import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from "vue-router";
import routesHospital from './dependences/routerMy';

import axios from 'axios'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'

import { routes } from './dependences/router';
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