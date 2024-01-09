<template>
  <div>      
    <!--  -->

    <QuillEditor ref="myQuillEditor"
      v-model:content="content"
      theme="snow"
      contentType="html"
      :options="data.editorOption"
      @update:content="setValue()"
    />
   
  </div>
</template>

<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import '@vueup/vue-quill/dist/vue-quill.core.css'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'
import { reactive, onMounted, ref, toRaw, watch, defineProps,defineEmits} from 'vue'

const props = defineProps(['value'])
const emits = defineEmits(['update:value','change'])
const content = ref('')
const myQuillEditor = ref()
// 通过watch监听回显，笔者这边使用v-model:content 不能正常回显
watch(() => props.value, (val) => {
  console.log(val,'val')
  toRaw(myQuillEditor.value).setHTML(val)
  console.log(toRaw(myQuillEditor.value).getQuill())
}, { deep: true })
const fileBtn = ref()
const data = reactive({
  content: '',
  editorOption: {
    modules: {
      toolbar: [['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
        [{ 'header': 1 }, { 'header': 2 }], // 几级标题
        [{ 'list': 'ordered' }, { 'list': 'bullet' }], // 有序列表，无序列表
        [{ 'script': 'sub' }, { 'script': 'super' }], // 下角标，上角标
        [{ 'indent': '-1' }, { 'indent': '+1' }], // 缩进
        [{ 'size': ['13px', '16px', '18px', '20px', '30px', '40px', '50px', '60px'] }], // 字体大小
        [{ 'color': [] }, { 'background': [] }], // 颜色选择
        [{ 'font': ['Microsoft-YaHei', 'SimSun', 'SimHei', 'KaiTi', 'FangSong'] }], // 字体
        [{ 'align': [] }], // 居中
    ]
    },
    placeholder: '请输入内容...'
  }
})
const imgHandler = (state) => {
  if (state) {
    fileBtn.value.click()
  }
}
// 抛出更改内容，此处避免出错直接使用文档提供的getHTML方法
const setValue = () => {
  const text = toRaw(myQuillEditor.value).getHTML()
  console.log('text,',text)
  emits('change', text)
  emits('update:value', text)
}

// 初始化编辑器
onMounted(() => {
  const quill = toRaw(myQuillEditor.value).getQuill()
  if (myQuillEditor.value) {
    quill.getModule('toolbar').addHandler('image', imgHandler)
  }
})
</script>
<style scoped lang="scss">
// 调整样式
:deep(.ql-editor) {
  min-height: 180px;
}
:deep(.ql-formats) {
  height: 21px;
  line-height: 21px;
}
</style>

