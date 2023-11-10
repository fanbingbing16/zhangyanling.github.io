<template>
  <div class="echarts-config">
    <h1>echarts配置</h1>
    <div class="button-list">
      <el-select>
        <el-option label="折线图" value="line"></el-option>
      </el-select>
      <el-button v-for="(item, index) in buttonList"
        :class="{ 'm-l-10': index === 0, 'select-button': selectValue === index + 1 }" @click="buttonChange(index + 1)"
        :key="index">{{ item }}</el-button>


    </div>
    <div class="flex flex-space m-t-40">
      <div class="config-grid">
        <h2>{{ buttonList[selectValue - 1] }}</h2>
        <el-table :data="tableData" row-key="id"       style="width: 100%;height:100%;"
>
          <el-table-column prop="name" label="属性名" width="150"></el-table-column>
          <el-table-column prop="description" label="说明" width="200"></el-table-column>
          <el-table-column prop="value" label="当前值" width="100"></el-table-column>
          <el-table-column label="修改配置" width="100">

            <template #default="scope">
              <el-input v-if="scope.row.type === 'input' || (scope.row.type === '' && !scope.row.children)" type="textarea" autosize
                :disabled="scope.row.type === '' ? false : (scope.row.disabled || false)"
                v-model="dataValue[scope.row.id]" @change="inputChange(scope.row)"></el-input>
              <el-switch v-else-if="scope.row.type === 'switch'" v-model="dataValue[scope.row.id]"
                @change="inputChange(scope.row)" />
              <el-input v-else-if="scope.row.type === 'color'" type="color" v-model="dataValue[scope.row.id]"
                @change="inputChange(scope.row)" />
              <el-select v-else-if="scope.row.type === 'select'" v-model="dataValue[scope.row.id]"
                @change="inputChange(scope.row)">
                <el-option v-for="item in scope.row.data" :key="item.value" :value="item.value"
                  :label="item.label"></el-option>
              </el-select>
            </template>
          </el-table-column>

        </el-table>
      </div>
      <div>
        <div id="main" style="width: 600px;height:400px;"></div>
        <el-button>复制源代码</el-button>

      </div>

    </div>

  </div>
</template>

<script>
import * as echarts from 'echarts'
import { reactive, ref } from 'vue'
import defaultData from './base.ts'
import { deepClone } from './base.ts'
import xAxisData from './xAxis.ts'
export default {
  setup() {
    const buttonObj = reactive({
      2: 'xAxis',
      3: 'yAxis',
      4: 'legend',
      5: '',
      6: 'tooltip'
    })
    const buttonList = reactive(['基本配置', 'X轴配置', 'Y轴配置', '图列配置', '扩展配置', '提示窗配置', '方法&事件', '数据配置'])
    const option = reactive({
      title: {
        text: 'ECharts 入门示例',
        textStyle: {
          color: '#000'
        },
        subtextStyle: {

        }
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
        axisLine:{}
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    })
    const tableData = ref([
      { name: '', description: '', value: '' }
    ])
    const selectValue = ref(1)
    tableData.value = deepClone(defaultData)
    const dataValue = reactive({})
    initDataValue(tableData.value)
    function initDataValue(data) {
      data.map(item => {
        if (!item.children) {
          dataValue[item.id] = item.value
        } else {
          initDataValue(item.children)
        }
      })
    }
    function inputChange(data) {
      if (String(data.id).indexOf('-') > -1) {
        getTableDataIndex(data.id, data)
      } else {
        tableData.value[data.id - 1].value = dataValue[data.id]
        if (typeof data.value === 'boolean') {
          if (selectValue.value > 1) {
            option[buttonObj[selectValue.value]][data.name] = data.value

          } else
            option[data.name] = data.value
        } else {
          if (selectValue.value > 1) {
            option[buttonObj[selectValue.value]][data.name] = (String(data.value).indexOf('[') > -1 || String(data.value).indexOf('{') > -1) ? JSON.parse(String(data.value).replace(/[']/g,'"')) : (isNaN(+data.value) ? data.value : +data.value)

          } else
            option[data.name] = (String(data.value).indexOf('[') > -1 || String(data.value).indexOf('{') > -1) ? JSON.parse(String(data.value).replace(/[']/g,'"') ): (isNaN(+data.value) ? data.value : +data.value)
        }

        console.log(option, 'option')
        if (data.shouldInit) {
          echarts.init(document.getElementById('main')).dispose();
          myChart.value = echarts.init(document.getElementById('main'))

        }
        if (data.shouldUpdate) {
          option.series[0].data[0] += 10
          setTimeout(() => {
            option.series[0].data[0] -= 10
            myChart.value?.setOption(option)
          }, 100)
        } 
          myChart.value?.setOption(option)
      }

    }
    const myChart = ref(null)

    function getTableDataIndex(id, data) {
      let idArr = id.split('-')
      if (idArr.length === 1) {
        return id
      }
      let result = ''
      let optionResult = ''
      idArr.map((item, index) => {
        if (index === 0) {
          result = `tableData.value[${item - 1}]`
          if (selectValue.value > 1) {
            optionResult = `option['${buttonObj[selectValue.value]}']['${tableData.value[item - 1].name}']`
          } else
            optionResult = `option['${tableData.value[item - 1].name}']`
        } else {
          result += `.children[${item - 1}]`
          console.log(result,'result')
          optionResult += `['${eval(result + '.name')}']`
        }
      })
      if (typeof dataValue[id] === 'boolean') {
        result += `.value=${dataValue[id]}`
        optionResult += `=${dataValue[id]}`
      } else {
        result += `.value=${(String(dataValue[id]).indexOf('[') > -1 || String(dataValue[id]).indexOf('{') > -1) ? String(dataValue[id]).replace(/[']/g,'"') : (isNaN(+dataValue[id]) ? `'${dataValue[id]}'` : +dataValue[id])}`
        optionResult += `=${(String(dataValue[id]).indexOf('[') > -1 || String(dataValue[id]).indexOf('{') > -1) ? String(dataValue[id]).replace(/[']/g,'"') : (isNaN(+dataValue[id]) ? `'${dataValue[id]}'` : +dataValue[id])}`

      }
        console.log(optionResult,result,'result',dataValue[id],dataValue)
      eval(result)
      eval(optionResult)
      if (data.shouldInit) {
        echarts.init(document.getElementById('main')).dispose();
        myChart.value = echarts.init(document.getElementById('main'))

      }
      if (data.shouldUpdate) {
        option.series[0].data[0] += 10
        setTimeout(() => {
          option.series[0].data[0] -= 10
          myChart.value?.setOption(option)
        }, 100)
      }
      myChart.value?.setOption(option)
      console.log(tableData, defaultData, 'tableData de', option)
    }
    function buttonChange(index) {
      selectValue.value = index
      const obj = {
        1:defaultData,
        2:xAxisData,
        
      }
      tableData.value = deepClone(obj[selectValue.value])
      initDataValue(tableData.value)
    }
    return {
      option,
      tableData,
      inputChange,
      myChart,
      getTableDataIndex,
      dataValue,
      selectValue,
      buttonList,
      buttonChange
    }
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById('main'));
    this.myChart.setOption(this.option);
  },

}
</script>
<style lang="scss" scoped>
.echarts-config {
  height: 100%;
  overflow-y: scroll;

  .select-button {
    color: #409eff;
    border: 1px solid #c6e2ff;
    background: #ecf5ff;
  }
}
</style>