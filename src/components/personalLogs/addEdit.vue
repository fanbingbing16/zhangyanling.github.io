<template>
  <div id="dialog-con">
    <el-dialog width="745px" v-model="visible" :title="dialogTitle" :destroy-on-close="true" :close-on-click-modal="false"
      :close-on-press-escape="false" :before-close="beforeClose">
      <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="70px"
        class="user-center-form black14_3 bold500">

        <el-row>
          <el-col :span="24">
            <el-form-item label="操作码" prop="password">
              <el-input v-model="dataForm.password" type="password" placeholder="只有输对操作码才可以创建编辑"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="标题" prop="name">
              <el-input v-model="dataForm.name" maxlength="25" placeholder="请填写，限25字内"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="内容" prop="content">

              <el-radio-group v-model="dataForm.contentType">
                <el-radio :label="1">富文本</el-radio>
                <el-radio :label="2">markdown</el-radio>

              </el-radio-group>
              <quill-editor v-if="dataForm.contentType === 1" v-model:value="dataForm.content"></quill-editor>
              <codemirror class="codemirror" v-else v-model="dataForm.content" mode="markdown"></codemirror>
            </el-form-item>
          </el-col>
        </el-row>
        <el-col :span="24">
          <el-form-item label="类型1" prop="type1">
            <el-select placeholder="请选择类型1" v-model="dataForm.type1">
              <el-option v-for="item in type1" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="类型2" prop="type2">
            <el-select placeholder="请选择类型2" v-model="dataForm.type2">
              <el-option v-for="item in type2" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-form-item style="margin-bottom: 0">
          <el-button v-preventReClick class="submit" type="primary" :loading="submitLoading"
            @click="submitForm('dataForm')">
            提交
          </el-button>

          <el-button class="submit" type="primary" :loading="submitLoading" plain @click="beforeClose">
            关闭
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { type1, type2 } from './options'
import codemirror from '../exericiseField/codemirror.vue'
import axios from 'axios'
import QuillEditor from '../comm/rich-text'
export default {
  name: '',
  components: {
    codemirror,
    QuillEditor
  },
  props: {
    type: {
      default: 1,
      type: Number
    }
  },
  data() {
    return {
      type1,
      type2,
      submitLoading: false,
      visible: false,
      dialogTitle: '创建',
      dataForm: {
        content: '',
        name: '',
        type1: '',
        id: '',
        type2: '',
        password: '',
        contentType: 1
      },
      rules: {
        password: [
          { required: true, message: '请填写', trigger: 'blur' }

        ],
        name: [
          { required: true, message: '请填写', trigger: 'blur' },
          { max: 25, message: '限25字以内', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请填写', trigger: 'blur' }

        ],
        type1: { required: true, message: '请填写', trigger: 'blur' },
        type2: [
          { required: true, message: '请填写', trigger: 'blur' }

        ]
      },
      item: null
    }
  },
  created() {

  },
  methods: {

    beforeClose() {
      this.$confirm('关闭不会保存富文本的内容，确认关闭吗？?', '操作警示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.visible = false
      }).catch(() => {

      })
    },
    init() {
      this.visible = true
      this.$nextTick(() => {
        this.resetContent()
        if (this.item) {
          this.dialogTitle = '编辑'
          this.dataForm = { ...this.item }
        } else {
          this.dialogTitle = '创建'
          this.dataForm = {
            content: '',
            name: '',
            type1: '',
            id: '',
            type2: '',
            password: '',
            contentType: 1
          }
        }
      })
    },
    // 重置数组
    resetContent() {
      // this.dataForm = {}
      this.$refs['dataForm'].resetFields()
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitLoading = true
          axios.post('http://103.152.132.87:3000/logs/addEdit',
            { ... this.dataForm,isMarkdown:this.dataForm.contentType===2?1:0 }
          ).then(res => {
            if (res.data.status === 1) {
              this.$message.success(res.data.msg)
              this.$emit('reset')
              this.visible = false
            } else {
              this.$message.error(res.data.msg)
            }
          })

          setTimeout(() => {
            this.submitLoading = false
          }, 2000)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-select {
  width: 100%;
}

.user-center-form {
  ::v-deep .el-form-item {
    margin-bottom: 20px;
  }
}

::v-deep .el-dialog {
  margin-top: 8vh !important;
}

#dialog-con {
  ::v-deep .el-dialog__body {
    overflow: hidden;
  }
}
.codemirror{
  width: 100%;
}
</style>

