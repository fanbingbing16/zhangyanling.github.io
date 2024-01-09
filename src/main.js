import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from "vue-router";

import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import 'github-markdown-css';
import { routes } from './dependences/router';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'



const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router)
app.use(ElementPlus)
app.mount('#app')
const debounce = (fn, delay) => {
	let timer = null;

	return function () {
		let context = this;

		let args = arguments;

		clearTimeout(timer);

		timer = setTimeout(function () {
			fn.apply(context, args);
		}, delay);
	};
};

const _ResizeObserver = window.ResizeObserver;

window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
	constructor(callback) {
		callback = debounce(callback, 16);
		super(callback);
	}
};