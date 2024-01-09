<template>
  <div class="personal-logs-see">
    <h1>{{ title }}</h1>
    <div v-html="content" v-if="!isMarkdown"></div>
    <markdown :text="content" v-else ></markdown>
  </div>
</template>
<script setup>
import axios from "axios";
import { ElMessage } from "element-plus";
import { ref } from "vue";
import { useRouter } from "vue-router";
import markdown from '../markdown/vue'
const router = useRouter();
console.log(router, 'router')
const content = ref('')
const title = ref('')
const isMarkdown = ref(false)
axios.get('http://103.152.132.87:3000/logs/detail', { params: { id: router.currentRoute.value.query.id } }).then(res => {
  if (res.data.status === 1) {
    content.value = res.data.data[0].content
    title.value = res.data.data[0].name
    isMarkdown.value = res.data.data[0].isMarkdown === '1'
  } else {
    ElMessage({
      message: res.data.msg,
      type: 'error'
    })
  }
})
</script>
<style lang="scss" scoped>
.personal-logs-see{
  height: calc(100% - 70px);
}
</style>