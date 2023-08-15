import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from "vue-router";
import HelloWorld from './components/HelloWorld.vue'
import calendar from './components/calendar.vue'
import Timer from './components/Timer'
const routes = [
  {
    path: '/', redirect: '/HelloWorld', component: App,
    children: [
      { path: '/HelloWorld', component: HelloWorld, }

    ]
  },
  {
    path: '/', redirect: '/calendar', component: App,
    children: [{ path: '/calendar', component: calendar },]
  },
  {
    path: '/', redirect: '/timer', component: App,
    children: [{ path: '/timer', component: Timer }]
  }

]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const app = createApp(App)

app.use(router)

app.mount('#app')