<template>
  <div class="typewriting">
    <div class="main">
      <div class="top">速度打字机</div>
      <div class="scope-time">
        <p>
          剩余时间：<span class="red">{{ time }}s</span>
        </p>
        <p>
          得分：<span class="red">{{ score }}分</span>
        </p>
      </div>
      <div class="word">
        <p>键入如下单词:</p>
        <p>{{ currentWord }}</p>
      </div>
      <el-input
        placeholder="请输入示例单词"
        v-model="inputWord"
        @input="changeWord"
      ></el-input>
    </div>
    <dialog-vue dialogTitle="提示" v-model:visible="visible">
      <template v-slot:body>
        {{ tip }}
      </template>
      <template v-slot:footer>
        <el-button @click="init">重新开始</el-button>
      </template>
    </dialog-vue>
  </div>
</template>

<script setup>
import dialogVue from '../comm/dialog'
import { ref } from "vue";
import { word } from './word.ts'
const score = ref(0)
const time = ref(10)
const inputWord = ref('')
const currentWord = ref('style')
const tip = ref('')
const visible = ref(false)
let inter = null
function init() {
  score.value = 0
  visible.value = false
  time.value = 10
  inputWord.value = ''
  currentWord.value = word[Math.floor(Math.random() * word.length)]

  inter = setInterval(() => {
    time.value--
    if (time.value <= 0) {
      clearInterval(inter)
      tip.value = '您的得分' + score.value
      visible.value = true
    }
  }, 1000)
}
init()
function changeWord($event) {
  if ($event === currentWord.value) {
    score.value++
    time.value = 10
    inputWord.value = ''
    currentWord.value = word[Math.floor(Math.random() * word.length)]

  }
}
</script>
<style lang="scss" scoped>
:deep .top-title{
  i{
    display: none;
  }
}
.typewriting {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .red {
    color: red;
  }
  .main {
    min-width: 20%;
    background: #000;
    color: white;
    border-radius: 10px;
    text-align: left;
    padding: 20px;
    .top {
      text-align: center;
      font-size: 24px;
      font-weight: 700;
    }
    .scope-time {
      display: flex;
      justify-content: space-between;
    }
    .word {
      text-align: center;
    }
    .word p:first-child {
      margin-top: 0;
    }
    .word p:last-child {
      font-size: 20px;
      font-weight: 600;
      margin-top: 10px;
    }
  }
}
</style>