<template>
  <div class="comm-exericise">
    <div class="header">
      <div class="title">
        <span> {{ props.title }} 演练场</span>

      </div>
      <div>
        布局方式
        <el-select v-model="setting.layout">
          <el-option label="垂直" value="horizontal"></el-option>
          <el-option label="横向" value="vertical"></el-option>

        </el-select>
      </div>
      <div>
        风格{{ setting.theme }}
        <el-select v-model="setting.theme">
          <el-option label="暗黑" value="dark"></el-option>
          <el-option label="默认" value="light"></el-option>
        </el-select>
      </div>
    </div>
    <div class="main"
      :style="setting.layout === 'horizontal' ? '' : 'flex-direction: column;height: auto;overflow-y: scroll;'">
      <div class="files" v-if="props.hasFile">
        <files v-model:filesArr="filesArr"></files>
      </div>

      <div class="left"
        :style="setting.layout === 'horizontal' ? 'width:calc(50% - ' + (props.hasFile ? '100px' : '0px') + ')' : 'width:calc(100% - ' + (props.hasFile ? '100px' : '0px') + ');height:50vh;'">
        <codemirror v-model="setting.code" @change="onChange" :codeType="props.codeType" :dark="setting.theme === 'dark'">
        </codemirror>
      </div>
      <div class="right"
        :style="setting.layout === 'horizontal' ? `width:calc(50% - ${props.hasFile ? '100px' : '0px'})` : `width:calc(100% - ${props.hasFile ? '100px' : '0px'});height:50vh;`">
        <div id="displayCode"></div>
      </div>

    </div>
  </div>
</template>
<script setup>
import files from './files'
import { reactive, defineProps, defineEmits, watch, ref, nextTick } from "vue";
import Codemirror from "./codemirror";
import { utoa, atou } from './handleUrl.js'
const props = defineProps({
  code: String,
  title: String,
  codeType: Object,
  files: Array,
  hasFile: Boolean,
  comPileFun: Function
})
const setting = reactive({
  layout: 'horizontal',
  theme: 'light',
  code: props.code || '',

})
const emits = defineEmits(['update:code', 'change'])

const filesArr = ref(props.files || [])
//拿到链接中的code
const hash = location.hash.split('?')?.[1]?.split('&')
let serializedState = ''
hash?.some(item => {
  let temp = item.split('=')
  if (temp[0] == 'code') {
    serializedState = temp[1]
    setting.code = atou(serializedState)
    nextTick(() => {
      if (props.comPileFun)
        props.comPileFun(setting.code)
    })

    console.log(props.comPileFun, 'props.comPileFun')
    emits('change', setting.code)
    emits('update:code', setting.code)
  }
})
watch(() => props.files, () => {
  filesArr.value = props.files
  filesArr.value.some(item => {
    if (item.active) {
      setting.code = item.code || ''
      if (props.comPileFun)
        props.comPileFun(setting.code)
      history.replaceState({}, '', `/#/exericise/${props.title}?code=${utoa(setting.code)}`)

      return true
    }
  })
  console.log(setting.code)
})
watch(() => filesArr.value, () => {
  filesArr.value.some(item => {
    if (item.active) {
      setting.code = item.code || ''
      if (props.comPileFun)
        props.comPileFun(setting.code)
      history.replaceState({}, '', `/#/exericise/${props.title}?code=${utoa(setting.code)}`)

      return true
    }
  })
})

function onChange(value, viewUpdate) {
  filesArr.value = filesArr.value.map(item => {
    if (item.active) {
      item.code = value
      if (props.comPileFun)
        props.comPileFun(value)
    }
    return item
  })
  if (!props.hasFile) {
    if (props.comPileFun)
      props.comPileFun(value)
  }
  history.replaceState({}, '', `/#/exericise/${props.title}?code=${utoa(value)}`)
  emits('change', value, viewUpdate)
  emits('update:code', value)

}
</script>
<style lang="scss" scoped>
.header {
  /* height: 36px; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 6px;
  border-bottom: solid 1px #e1e1e1;
  padding: 10px;
}

.title {
  font-size: 20px;

}

.main {
  display: flex;
  height: calc(100vh - 70px);
  padding: 10px;

  .files {
    width: 100px;

  }

  .left {
    ::v-deep div {
      height: 100%;
    }
  }
}

.main::-webkit-scrollbar {
  display: none;
}
</style>