<template>
  <div>
    <Codemirror v-model="codeValue" :extensions="extensions" @ready="handleReady" @change="onChange" @focus="onFocus"
      @blur="onBlur" v-bind="$attrs" :options="options" />
  </div>
</template>
<script setup >
import { ref, defineEmits, defineProps, reactive,watchEffect } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { vue } from '@codemirror/lang-vue'
import { oneDark } from '@codemirror/theme-one-dark'
import '@vue/repl/dist/style.css'

const props = defineProps({
  dark: Boolean,
  code: String,
  height: [String, Number],
  codeType: Object
})
const options = reactive({
  mode: 'application/javascript',
  theme: 'default',
  matchBrackets: true, //括号匹配
  autoCloseBrackets: true, // 自动补齐
  styleActiveLine: true, //line选择是是否高亮
  lineNumbers: true, //是否显示行数
  lineWrapping: true, //是否自动换行
  readOnly: false,
  matchTags: { bothTags: true }, // 将突出显示光标周围的标签
  lint: true,
  foldGutter: true, // 可将对象折叠，与下面的gutters一起使用
  gutters: ['CodeMirror-foldgutter'],
  hintOptions: {
    completeSingle: false,
  }, // 提示配置
})
const extensions = ref(props.dark ? [props.codeType || vue(), oneDark] : [props.codeType || vue()])
const codeValue = ref(props.code)

watchEffect (()=>{
    extensions.value = props.dark ? [props.codeType || vue(), oneDark] : [props.codeType || vue()]
    codeValue.value = props.code
})

const emits = defineEmits(['update:code', 'ready', 'change', 'focus', 'blur'])
function handleReady(payload) {
  // console.log('ready')
  emits('ready', payload)
}
function onChange(value, viewUpdate) {
  emits('change', value, viewUpdate)
  emits('update:code', value)
}
function onFocus(viewUpdate) {
  emits('focus', viewUpdate)
}
function onBlur(viewUpdate) {
  emits('blur', viewUpdate)
}
</script>

<style lang="scss" scoped>
:deep(.cm-editor) {
  border-radius: 8px;
  outline: none;
  border: 1px solid transparent;

  .cm-scroller {
    border-radius: 8px;
  }
}

:deep(.cm-focused) {
  border: 1px solid #ccc;
}

:deep .cm-line {
  text-align: left;
  height: auto !important;
}

:deep .cm-scroller {
  height: calc(100% - 40px);
  max-height: 100vh;
}
</style>
