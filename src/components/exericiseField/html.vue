<template>
  <comm :codeType="html()" v-model="code" title="html" :hasFile="false" :comPileFun="compileHTML">
  </comm>
</template>
<script setup>
/* eslint-disable */

import comm from './comm'
import { html } from '@codemirror/lang-html'
import { ref, } from 'vue'
import { deleteChild } from './deleteChild.js'
import { ElMessage } from 'element-plus'
const code = ref('')
const message = ref(null)
function compileHTML(code) {
  message.value?.close()
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(code, 'text/html');
    const fragment = document.createDocumentFragment();
    fragment.appendChild(doc.documentElement.cloneNode(true));
    deleteChild('displayCode')
    document.getElementById('displayCode')?.appendChild(fragment);
    const scriptTags = doc.getElementsByTagName('script');
    for (let i = 0; i < scriptTags.length; i++) {
      const script = scriptTags[i].innerText;
      const func = new Function(script);
      func();
    }
    const styleTags = doc.getElementsByTagName('style');
    for (let i = 0; i < styleTags.length; i++) {
      const style = document.createElement('style');
      style.textContent = styleTags[i].innerText;
      document.getElementById('displayCode')?.appendChild(style);
    }
    return doc.documentElement.outerHTML;
  } catch (err) {
    message.value?.close()
    message.value = ElMessage({
      message: err,
      type: 'error',
      duration: 0,
      showClose: true
    })
  }


  // return doc.documentElement.outerHTML;
}
</script>