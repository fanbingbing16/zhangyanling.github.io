<template>
  <div class="Sudoku">
    <div class="button-list">
      <el-button
        @click="changeRandom(0.3)"
        :type="random === 0.3 ? 'primary' : ''"
        >简单</el-button
      >
      <el-button
        @click="changeRandom(0.5)"
        :type="random === 0.5 ? 'primary' : ''"
        >中等</el-button
      >
      <el-button
        @click="changeRandom(0.7)"
        :type="random === 0.7 ? 'primary' : ''"
        >困难</el-button
      >
    </div>
    <div class="game-main">
      <div class="game" v-for="(item, index) in boxs" :key="index">
        <div
          class="game-div"
          v-for="(box, index2) in item"
          :key="index2"
          :style="{
            'border-left': [0, 3, 6].includes(index2) ? '2px solid green' : '',
            'border-bottom': [2, 5, 8].includes(index) ? '2px solid green' : '',
            'border-right': index2 === 8 ? '2px solid green' : '',
            'border-top': index === 0 ? '2px solid green' : '',
            background: box.red ? 'red' : (box.canEdit&&box.value>0?'green':''),
          }"
        >
          <span v-if="!box.canEdit">{{ box.value > 0 ? box.value : "" }}</span>
          <input
            v-if="box.canEdit"
            v-model="box.value"
            @change="boxChange"
            type="number"
            :max="9"
            :min="1"
          />
        </div>
      </div>
    </div>

    <dialog-vue dialogTitle="提示" v-model:visible="visible">
      <template v-slot:body>
        {{ tip }}
      </template>
      <template v-slot:footer>
        <el-button @click="init">重新开始</el-button>
      </template>
    </dialog-vue>
  </div>
</template>
<script>
import { ref } from 'vue'
import dialogVue from '../comm/dialog.vue'
export default {
  components: {
    dialogVue
  },
  setup() {
    const boxs = ref([[{ num: 0, isRight: false, x: 0, y: 0, canEdit: false, red: false }]])
    const row = ref(9)
    const col = ref(9)
    const random = ref(0.3)
    const visible = ref(false)
    const tip = ref('')
    function changeRandom(random2) {
      random.value = random2
      init()
    }
    function init() {
      visible.value = false
      boxs.value = []
      const s = [[], [], [], [], [], [], [], [], []]
      const h = []
      let data = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      data.sort(() => Math.random() - 0.5)
      for (let i = 0; i < row.value; i++) {
        h.push([])
        boxs.value.push([])
        for (let j = 0; j < col.value; j++) {
          boxs.value[i].push({ num: 0, isRight: false, x: i, y: j, canEdit: true, value: 0, red: false })
          if ((j < 3 && (i === 0 || i === 3 || i === 6)) || (j >= 3 && j <= 5 && (i === 2 || i === 4 || i === 8)) || (j >= 6 && (i === 5 || i === 1 || i === 7))) {
            let temp = [...data.slice(0, 3)]
            temp = temp.filter(item => !s[j].includes(item))
            temp = temp.filter(item => !h[i].includes(item))

            temp.sort(() => {
              return Math.random() - 0.5
            })

            if (temp.length === 0) {
              const temp2 = [...data.slice(0, 3)].filter(item => !h[i].includes(item))
              temp[0] = boxs.value[i][j - 1].num
              boxs.value[i][j - 1].num = temp2[0]
              s[j - 1][i] = temp2[0]
              h[i][j - 1] = temp2[0]

            }

            boxs.value[i][j].num = temp[0]
            s[j][i] = temp[0]
            h[i][j] = temp[0]
          } else if ((j < 3 && (i === 1 || i === 5 || i === 7)) || (j >= 3 && j <= 5 && (i === 0 || i === 3 || i === 6)) || (j >= 6 && (i === 2 || i === 4 || i === 8))) {
            let temp = [...data.slice(3, 6)]
            temp = temp.filter(item => !s[j].includes(item))
            temp = temp.filter(item => !h[i].includes(item))

            temp.sort(() => {
              return Math.random() - 0.5
            })
            if (temp.length === 0) {
              const temp2 = [...data.slice(3,6)].filter(item => !h[i].includes(item))
              temp[0] = boxs.value[i][j - 1].num
              boxs.value[i][j - 1].num = temp2[0]
              s[j - 1][i] = temp2[0]
              h[i][j - 1] = temp2[0]
            }


            boxs.value[i][j].num = temp[0]
            s[j][i] = temp[0]
            h[i][j] = temp[0]
          } else {
            let temp = [...data.slice(6)]
            temp = temp.filter(item => !s[j].includes(item))
            temp = temp.filter(item => !h[i].includes(item))

            temp.sort(() => {
              return Math.random() - 0.5
            })

            if (temp.length === 0) {
              const temp2 = [...data.slice(6)].filter(item => !h[i].includes(item))
              temp[0] = boxs.value[i][j - 1].num
              boxs.value[i][j - 1].num = temp2[0]

              s[j - 1][i] = temp2[0]
              h[i][j - 1] = temp2[0]
            }


            boxs.value[i][j].num = temp[0]
            s[j][i] = temp[0]
            h[i][j] = temp[0]
          }
        }
      }
      for (let i = 0; i < row.value; i++) {
        for (let j = 0; j < col.value; j++) {
          if (Math.random() > random.value) {
            boxs.value[i][j].value = boxs.value[i][j].num
            boxs.value[i][j].canEdit = false
          }
        }
      }
    }
    function boxChange() {
      const h = []
      const s = [[], [], [], [], [], [], [], [], []]
      let times = 0
      for (let i = 0; i < row.value; i++) {
        h.push([])
        for (let j = 0; j < col.value; j++) {
          let hasRed = false
          if (boxs.value[i][j].value > 0) {
            const temph = h[i].findIndex(item => item === boxs.value[i][j].value)
            const temps = s[j].findIndex(item => item === boxs.value[i][j].value)
            if (temph > -1 || temps > -1) {
              boxs.value[i][j].red = true
              if (temph > -1) boxs.value[i][temph].red = true
              if (temps > -1) boxs.value[temps][j].red = true
              hasRed = true
              h
            }
            let tempi = i
            let tempj = j
            if (tempi === 1 || tempi === 4 || tempi === 7) tempi = tempi - 1
            else if (tempi === 2 || tempi === 5 || tempi === 8) tempi = tempi - 2
            if (tempj === 1 || tempj === 4 || tempj === 7) tempj = tempj - 1
            else if (tempj === 2 || tempj === 5 || tempj === 8) tempj = tempj - 2
            //九宫格内的数字
            for (let x = tempi; x < tempi + 3; x++) {
              for (let y = tempj; y < tempj + 3; y++) {
                if (i !== x && j !== y) {
                  if (boxs.value[i][j].value === boxs.value[x][y].value) {
                    boxs.value[i][j].red = true
                    boxs.value[x][y].red = true
                    hasRed = true
                  }
                }
              }
            }
          }

          h[i][j] = boxs.value[i][j].value
          s[j][i] = boxs.value[i][j].value
          if (!hasRed) {
            boxs.value[i][j].red = false
            if (boxs.value[i][j].value > 0)
              times++
          }
        }
      }
      if (times >= row.value * col.value) {
        tip.value = '您赢了'
        visible.value = true
      }
    }


    init()
    return {
      boxs,
      init,
      boxChange,
      tip,
      visible,
      changeRandom,
      random
    }
  }
}
</script>
<style lang="scss" scoped>
.Sudoku {
  .game-main {
    width: 560px;
    margin: auto;
    margin-top: 20px;
    .game {
      display: flex;
      .game-div {
        width: 60px;
        height: 60px;
        border: 1px solid greenyellow;
        line-height: 60px;
        font-size: 18px;
        input {
          width: 52px;
          height: 52px;
          border: 1px solid #f1f1f1;
        }
        span {
          font-weight: 600;
        }
      }
    }
  }
}
</style>