<template>
  <div class="exericise-field flex">
    <div class="left">
      <codemirror @change="change" v-model="code" :dark="true" @blur="blur"></codemirror>

    </div>
    <div class="right">
      <repl :value="code" ref="run"></repl>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Codemirror from './codemirror.vue'
import repl from './repl1.1.vue';
const code = ref("");
const run = ref(null)
const change = (value) => {
  code.value = value
  console.log(value, code.value, 'value,code')
  
}
const blur = () => {
  console.log('blur')
  run.value.reset()
  run.value.buildDom()
}
onMounted(() => {
  // run.value.reset()
  // run.value.buildDom()
})
</script>
<style lang="scss" scoped>
.exericise-field {
  display: flex;

  .left {
    flex: 1;

    ::v-deep .cm-scroller {
      width: 50vw;
    }
  }

  .right {
    flex: 1;
  }
}
</style>
