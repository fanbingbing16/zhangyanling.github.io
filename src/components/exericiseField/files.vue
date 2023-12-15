<template>
  <div class="files">
    <div v-for="(item, index) in filesArr" :key="item.id" class="flex" :style="item.active ? 'background:#cceeff44;' : ''" style="cursor: pointer;"
      @click="changeActive(item)">
      <span v-if="!item.editor">{{ item.filename }}</span>
      <el-input v-model="item.filename" v-else @blur="blur(item)"></el-input>
      <el-icon @click="close(item)" v-if="index !== 0">
        <Close />

      </el-icon>

    </div>
    <el-icon @click="add">
      <Plus />
    </el-icon>
  </div>
</template>
<script setup>
import { ElMessage } from 'element-plus'
import { ref, watch, defineEmits, defineProps } from 'vue'
const props = defineProps({
  filesArr: Array
})

const filesArr = ref(props.filesArr || [])
watch(() => props.filesArr, () => {
  filesArr.value = props.filesArr

})
const emits = defineEmits(['update:filesArr', 'change'])

const message = ref(null)
function close(file) {

  filesArr.value = filesArr.value.filter(item => item.id !== file.id)
  if (file.active) {
    filesArr.value = filesArr.value.map((item, index, arr) => {
      if (index === arr.length - 1) {
        item.active = true
      }
      return item
    })
  }
  emits('change', filesArr.value)
  emits('update:filesArr', filesArr.value)
}
function add() {
  const hasEditor = filesArr.value.some(item => item.editor)
  if (hasEditor) {
    return
  }
  filesArr.value.push({
    id: (filesArr.value.slice(-1)[0].id || 0) + 1,
    filename: '',
    editor: true,
    active: false,
    code: ''
  })

  emits('change', filesArr.value)
  emits('update:filesArr', filesArr.value)
}
function blur(file) {
  message.value?.close()
  const hasErr = filesArr.value.some(item => item.filename === file.filename && item.id !== file.id)
  if (!file.filename) {
    message.value = ElMessage({
      showClose: true,
      message: `The file name must be specified`,
      type: 'error',
    })
  }
  if (!hasErr) {
    filesArr.value = filesArr.value.map(item => {
      if (item.id === file.id) {
        item.editor = false
        item.active = true
      } else {
        item.active = false
      }
      return item
    })
    emits('change', filesArr.value)
    emits('update:filesArr', filesArr.value)
    return
  }
  message.value = ElMessage({
    showClose: true,
    message: `File ${file.filename} already exists.`,
    type: 'error',
  })
}
function changeActive(file) {
  let hasId = false
  filesArr.value = filesArr.value.map(item => {
    if (item.id === file.id) {
      item.active = true
      hasId = true
    } else {
      item.active = false
    }
    return item
  })
  if(!hasId){
    filesArr.value = filesArr.value.map((item, index, arr) => {
      if (index === arr.length - 1) {
        item.active = true
      }
      return item
    })
  }
  emits('change', filesArr.value)
  emits('update:filesArr', filesArr.value)
}
</script>