
<script setup>
import { reactive, watchEffect } from 'vue';
import { Repl, ReplStore} from '@vue/repl'
import CodeMirror from '@vue/repl/codemirror-editor'
import '@vue/repl/dist/style.css'

const hash = location.hash.split('?')?.[1]?.split('&')
let serializedState = ''
hash?.some(item=>{
  let temp = item.split('=')
  if(temp[0]=='code'){
    serializedState = temp[1].slice(1)
  }
})

const state = reactive({
  // repl 属性
  showCompileOutput: true,
  showImportMap: true,
  layout: 'horizon',
  // 版本切换
  previewOptions: { headHTML: '' },
})
// repl组件需要store管理状态
const store = new ReplStore({
  showOutput: true,
  outputMode: "preview",
  serializedState
});
watchEffect(()=>history.replaceState({},'','/#/exericise?code='+store.serialize()))


</script>

<template>
  <div>
    <div class="header">
    <div class="title">
       <span> Vue 演练场</span>
    </div>
   
  </div> 
    <Repl :store="store" :editor="CodeMirror" :show-compile-output="state.showCompileOutput"
      :show-import-map="state.showImportMap" :previewOptions="state.previewOptions" :clear-console="false"
      :layout="state.layout" ></Repl>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

.header {
  height: 36px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 6px;
  border-bottom: solid 1px #e1e1e1;
}

.vue-repl {
  height: calc(100vh - 36px - 16px) !important;
}

.header>div {
  vertical-align: middle;
}

.title {
  font-size: 20px;
}


.CodeMirror-lines {
  text-align: left;
}</style>