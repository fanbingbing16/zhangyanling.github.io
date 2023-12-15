<template>
  <div class="hello">
    <h3 class="title">运行结果</h3>
    <div class="code-box" id="display"></div>
  </div>
</template>

<script>
// 废弃版本，无法使用import
import { ElMessage } from 'element-plus';
import * as Vue from "vue/dist/vue.esm-bundler.js";
export default {
  name: 'running',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      code: this.value,
      html: '',
      js: '',
      css: '',
      program: null,
      importStr: '',
      message: null
    }
  },
  watch: {
    value(val) {
      this.code = val
    }
  },
  methods: {
    getSource(source, type) {
      const regex = new RegExp(`<${type}[^>]*>`)
      let openingTag = source.match(regex)
      if (!openingTag) return ''
      else openingTag = openingTag[0]

      return source.slice(
        source.indexOf(openingTag) + openingTag.length,
        source.lastIndexOf(`</${type}>`)
      )
    },
    splitCode() {
      let script = this.getSource(this.code, 'script')
      const exec = /^((.|\n)*)(export default(.|\n)*)$/.exec(script)
      script = exec?.[3].replace(
        /export default/,
        'return '
      )
      this.importStr = exec?.[1]
      console.log(this.importStr, 'importStr')
      const style = this.getSource(this.code, 'style')
      const template =
        '<div id="code-running">' +
        this.getSource(this.code, 'template') +
        '</div>'
      this.js = script
      this.css = style
      this.html = template
    },
    buildDom() {
      this.message?.close()

      this.splitCode()
      if (this.html === '' || this.js === '') {
        this.message?.close()
        this.message = ElMessage({
          showClose: true,
          message: `请输入有效的Vue代码${Math.floor(Math.random() * 1000)}`,
          type: 'error',
          duration: 0
        })
        // eslint-disable-next-line semi
        return;
      }

      // eslint-disable-next-line no-new-func
      try {
        // const scriptHtml = document.createElement('script')
        // scriptHtml.innerText = this.importStr
        // document.body.appendChild(scriptHtml)
        let Vue2 = Vue
        this.importStr?.split('\n').map(item => {
          console.log(item, 'item')

          const arr = /import((.|\s)*)from 'vue'/.exec(item)?.[1].replace('{', '').replace('}', '').trim().split(',')

          console.log(arr, 'arr')
          if (arr?.length > 0) {
            arr.map(element => {
              // this.js =  this.js.replace(new RegExp(`([^a-zA-Z0-9_-])${element}([^a-zA-Z0-9_-])`, 'g'), `Vue['${element}]''`)
              this.js = `${element} = Vue2['${element}'];` + this.js

            })
          }
        })
        console.log(this.js, 'js',Vue2)
        const common = new Function(this.js)() || {}
        common.template = this.html
        this.program = Vue.createApp(common)
        this.program.mount('#display')
        if (this.css !== '') {
          const styles = document.createElement('style')
          styles.type = 'text/css'
          styles.innerHTML = this.css
          document.getElementsByTagName('head')[0].appendChild(styles)
        }
      } catch (err) {
        console.log(err, 'err')
        this.message?.close()
        this.message = ElMessage({
          showClose: true,
          message: err,
          type: 'error',
          duration: 0
        })
      }

    },
    reset() {
      document.getElementById('display').innerHTML = ''
      if (this.program) {
        this.program.unmount()
      }
      this.program = null
    }
  }
}
</script>
