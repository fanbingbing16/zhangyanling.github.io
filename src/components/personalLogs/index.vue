<template>
  <div class="personalLogs">
    <el-form class="m-t-10 form">
      <el-row>
        <el-col :span="4">
          <el-form-item prop="date">
            <el-date-picker v-model="dataForm.date" type="daterange" clearable range-separator="到"
              start-placeholder="开始日期" end-placeholder="结束日期" />
          </el-form-item>
        </el-col>
        <el-col :span="1"></el-col>
        <el-col :span="3">
          <el-form-item prop="name">

            <el-input placeholder="标题" v-model="dataForm.name" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="1"></el-col>

        <el-col :span="3">
          <el-form-item prop="content">

            <el-input placeholder="内容" v-model="dataForm.content" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="1"></el-col>
        <el-col :span="3">
          <el-form-item prop="type1">

            <el-select placeholder="类型1" v-model="dataForm.type1" clearable>
              <el-option v-for="item in type1" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item prop="name">

            <el-select placeholder="类型2" v-model="dataForm.type2" clearable>
              <el-option v-for="item in type2" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="getData()">搜索</el-button>
          <el-button @click="reset">重置</el-button>
          <el-button type="success" @click="handleDialog('', 'addEdit')">新增文章</el-button>
        </el-col>

      </el-row>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="160" />
      <el-table-column prop="name" label="标题" />
      <el-table-column prop="content" label="内容">
        <template #default="scope">
          <div v-html="scope.row.content" class="elipisis"></div>
        </template>
      </el-table-column>
      <el-table-column prop="type1" label="类型1" max-width="160">
        <template #default="scope">
          {{ type1.filter(item => item.value === scope.row.type1)[0]
            && type1.filter(item => item.value === scope.row.type1)[0].label }}
        </template>
      </el-table-column>
      <el-table-column prop="type2" label="类型2" max-width="160">
        <template #default="scope">
          {{ type2.filter(item => item.value === scope.row.type2)[0]
            && type2.filter(item => item.value === scope.row.type2)[0].label }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="$router.push('/logs/see?id=' + scope.row.id)">查看</el-button>
          <el-button link type="primary" size="small"
            @click="handleDialog(scope.row.id, 'addEdit', scope.row)">编辑</el-button>
          <el-button link type="danger" size="small" @click="selectId = scope.row.id; dialogVisible = true">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" title="删除" width="30%">
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="70px"  status-icon>
        <el-form-item label="操作码" prop="password">
          <el-input v-model="ruleForm.password" type="password" placeholder="必须输对操作码才能进行删除操作" />
        </el-form-item>
        <el-form-item style="margin-bottom: 0">
          <el-button v-preventReClick class="submit" type="primary" @click="deleteOne">
            提交
          </el-button>

          <el-button class="submit" type="primary" plain @click="dialogVisible = false">
            关闭
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <add-edit ref="addEditVue" @reset="getData"></add-edit>
  </div>
</template>
<script setup>
import { type1, type2 } from './options'
import { parseTime } from '../comm/index.js'
import addEdit from "./addEdit.vue";
import { reactive, ref } from "vue"
import axios from 'axios'
import { ElMessage } from 'element-plus';
const dialogVisible = ref(false)
const ruleForm = reactive({
  password: ''
})
const rules = reactive({
  password: [
    { required: true, message: '操作码必填', trigger: 'blur' },
  ],
})
const selectId = ref('')
const addEditVue = ref(null)
const dataForm = reactive({
  date: '',
  name: '',
  content: '',
  type1: '',
  type2: ''
})
const tableData = ref([
 
])
function handleDialog(id, ref, item) {
  addEditVue.value.dataForm.id = id
  addEditVue.value.item = item
  addEditVue.value.init()
}
function deleteOne() {
  axios.post('http://103.152.132.87:3000/logs/delete', {
    id: selectId.value, password: ruleForm.password
  }).then(res => {
    if (res.data.status === 1) {
      ElMessage({
        message: '删除成功',
        type: 'success'
      })
      dialogVisible.value = false
      ruleForm.password = ''
      getData()
    } else {
      ElMessage({
        message: res.data.msg,
        type: 'error'
      })
    }
  })
}
function getData() {
  axios.get('http://103.152.132.87:3000/logs', {
    params:
    {
      ...dataForm,
      startTime: dataForm.date ? parseTime(dataForm.date[0]) : '',
      endTime: dataForm.date ? parseTime(new Date(new Date(new Date(dataForm.date[1].setHours(24)).setMinutes(59)).setSeconds(59))) : ''
    }
  }).then(res => {
    if (res.data.status === 1) {
      tableData.value = res.data.data
      tableData.value = tableData.value.map(item => {
        item.date = parseTime(new Date(item.update_time))
        return item
      })
    }
  })
}
function reset() {
  for (let key in dataForm) {
    dataForm[key] = ''
  }
}
getData()
</script>
<style lang="scss" scoped>
.personalLogs {
  padding: 20px;

  @media screen and (max-width:1450px) {
    .form {
      display: none;
    }
  }

  .elipisis {
    max-height: 50px;
  }
}
</style>
