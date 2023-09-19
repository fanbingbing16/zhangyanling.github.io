<!-- <template >
  <div class="random-password">
    <div class="main">
      <h1>密码组合</h1>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="0"
      >
        <el-form-item prop="type">
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox label="大写字母(A-Z)"></el-checkbox>
            <el-checkbox label="小写字母(a-z)"></el-checkbox>
            <el-checkbox label="数字(0-9)"></el-checkbox>
            <el-checkbox label="其他符号(~!@#$%^&*()-+_=,.)"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item prop="length">
          <el-input v-model="ruleForm.length" type="number">
            <template v-slot:prepend>密码长度</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="num">
          <el-input v-model="ruleForm.num" type="number" maxlength="10">
            <template v-slot:prepend>密码个数</template>
          </el-input>
        </el-form-item>
      </el-form>
      <el-button>生成密码</el-button>
    </div>
  </div>
</template>
<script setup >
import { reactive } from 'vue'
const ruleForm = reactive({
  type: ['大写字母(A-Z)'],
  length: 12,
  num: 1
})
const rules = reactive({
  type: { required: true, messsage: '必须选择密码包含的内容',type:Array },
  length: { required: true, messsage: '必须填写密码长度', type: Number },
  num: { required: true, messsage: '必须填写密码个数', type: Number }

})
</script>
<style lang="scss" scoped>
.random-password {
  width: 100%;
  height: 100%;
  display: flex;
  .main {
    width: 80%;
    height: 80%;
    margin: auto;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 20px;
  }
}
</style> -->
<template>
  <div class="random-password">
    <div class="main">
      <h1>随机密码生成</h1>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="0"
      >
        <el-form-item prop="type">
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox label="大写字母(A-Z)"></el-checkbox>
            <el-checkbox label="小写字母(a-z)"></el-checkbox>
            <el-checkbox label="数字(0-9)"></el-checkbox>
            <el-checkbox label="其他符号(~!@#$%^&*()-+_=,.)"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item prop="length">
          <el-input v-model.number="ruleForm.length" type="number">
            <template v-slot:prepend>密码长度</template>
          </el-input>
        </el-form-item>

        <el-form-item prop="num">
          <el-input v-model="ruleForm.num" type="number" maxlength="10">
            <template v-slot:prepend>密码个数</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)"
            >生成密码</el-button
          >
        </el-form-item>
      </el-form>
      <p>生成结果</p>
      <el-table :data="result" style="width: 100%">
        <el-table-column prop="pass" label="密码" />
        <el-table-column label="Operations" width="90">
          <template #header>
            <el-button link type="primary" size="small" @click.prevent="copy()">
              复制密码
            </el-button>
          </template>
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              @click.prevent="copy(scope.row.pass)"
            >
              复制密码
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script  setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

const ruleFormRef = ref('')
const ruleForm = reactive({
  type: ['大写字母(A-Z)', '小写字母(a-z)'],
  length: 12,
  num: 1,
})

const rules = reactive({
  type: [{ required: true, message: '必须选择密码包含的内容', trigger: 'blur' }],
  length: [{ required: true, message: '必须填写密码长度', trigger: 'blur' }],
  num: [{ required: true, message: '必须填写密码个数', trigger: 'blur' }],
})

const result = ref([])
const copy = (password)=>{
  password = password||result.value.map(item=>item.pass).join('\n')
  console.log(password,'pass')
  if (navigator.clipboard && Window.isSecureContext) {
        navigator.clipboard.writeText(password).then(() => {
          ElMessage({
            showClose:true,
            message:'复制成功',
            type:'success'
          })
        })
      } else {
        const textArea = document.createElement('textarea')
        textArea.value = password
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        textArea.style.top = '-999999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        return new Promise((res, rej) => {
          ElMessage({
            showClose:true,
            message:'复制成功',
            type:'success'
          })          
          document.execCommand('copy') ? res() : rej()
          textArea.remove()
        })
      }
}
const submitForm = (formEl) => {
  result.value = []
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      let a = ''
      if (ruleForm.type.includes('大写字母(A-Z)')) {
        a += 'ABCDEFJHIJKLMNOPQRSTUVMXYZ'
      }
      if (ruleForm.type.includes('小写字母(a-z)')) {
        a += 'abcdefjhijklmnopqrstuvwxyz'
      }
      if (ruleForm.type.includes('数字(0-9)')) {
        a += '0123456789'
      }
      if (ruleForm.type.includes('其他符号(~!@#$%^&*()-+_=,.)')) {
        a += '~!@#$%^&*()-+_=,.'
      }
      for (let i = 0; i < ruleForm.num; i++) {
        result.value.push({ pass: '' })
        for (let j = 0; j < ruleForm.length; j++) {
          result.value[i].pass += a[Math.floor(Math.random() * a.length)]
        }
      }
    } else {
      return false
    }
  })
}


</script>
<style lang="scss" scoped>
.random-password {
  width: 100%;
  height: calc(100% - 40px);
  display: flex;
  padding: 20px 0;
  .main {
    width: 80%;
    margin: auto;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 20px;
    overflow-y: scroll;
    max-height: calc(100% - 40px);
  }
}
</style>