<template>
  <div class="personal-logs-see">
    <h1>{{ title }}</h1>
    <div v-html="content"></div>
  </div>
</template>
<script setup>
import axios from "axios";
import { ElMessage } from "element-plus";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
console.log(router, 'router')
const content = ref('')
const title = ref('')
axios.get('http://103.152.132.87:3000/logs/detail', { params: { id: router.currentRoute.value.query.id } }).then(res => {
  if (res.data.status === 1) {
    content.value = res.data.data[0].content
    title.value = res.data.data[0].name
  } else {
    ElMessage({
      message: res.data.msg,
      type: 'error'
    })
  }
})
</script>