<template>
  <div>
    <h1>消消乐</h1>

    <div class="xiaoxiaole flex">
      <div class="game-main">
        <div class="game" v-for="(box, index) in boxs" :key="index">
          <div
            class="game-div"
            v-for="(item, index2) in box"
            :key="index2"
            @click="clickItem(item)"
            :style="{ background: item.click || item.bei ? 'grey' : item.bg }"
          >
            <span v-if="item.bei">背面</span>
          </div>
        </div>
      </div>
      <div class="control">
        <div class="m-t-10">关卡:{{ level }}</div>
        <div class="flex button-list m-t-10">
          <el-button @click="init()">重置</el-button>
          <el-button @click="visible2 = true" class="m-l-10">选关</el-button>
        </div>
      </div>
    </div>
    <dialog-vue dialogTitle="提示" v-model:visible="visible">
      <template v-slot:body>
        {{ tip }}
      </template>
      <template v-slot:footer>
        <div class="flex button-list">
          <el-button @click="init">重新开始</el-button>
          <el-button @click="next" v-if="level <= 4">下一关</el-button>
        </div>
      </template>
    </dialog-vue>
    <dialog-vue dialogTitle="选关" v-model:visible="visible2">
      <template v-slot:body>
        <div class="game">
          <div
            class="game-div"
            v-for="(item, index) in new Array(3)"
            @click="
              level = index + 1;
              init();
              visible2 = false;
            "
            :key="index"
          >
            {{ index + 1 }}
          </div>
        </div>
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
    const row = ref(10)
    const col = ref(10)
    const level = ref(2)
    const boxs = ref([[{ i: 0, j: 0, bg: '', click: false, bei: false }]])
    const clicks = ref([{ i: 0, j: 0, bg: '', click: false, bei: false }])
    const tip = ref('')
    const visible = ref(false)
    const visible2 = ref(false)
    function init() {
      clicks.value = []
      boxs.value = []
      visible.value = false
      visible2.value = false
      // let temp = new Array(row.value).join(',').split(',').map(() => new Array(row.value).join(',').split(',').map((item, index) => index))
      let color = ['red', 'blue', 'yellow', 'pink', '#53239d', '#eb9d23', '#23d7eb', '#59733d', '#7aff00', 'brown']
      const obj = {}
      for (let i = 0; i < row.value; i++) {
        boxs.value.push([])

        for (let j = 0; j < col.value; j++) {
          let temp = color[Math.floor(Math.random() * color.length)]
          obj[temp] = obj[temp] || 0
          obj[temp]++
          if (obj[temp] >= 10) {
            color = color.filter(item => item !== temp)
          }
          boxs.value[i].push({ i, j, bg: temp, click: false, bei: level.value === 2 })
        }
      }


    }


    function next() {
      if (level < 3) {
        level.value++
      }
      init()
    }
    function clickItem(box) {
      if (level.value === 2) {
        if (box.bei) {
          boxs.value[box.i][box.j].bei = false
          if(clicks.value.length===1){
            if(clicks.value[0].bg ===box.bg){
              clicks.value.push(boxs.value[box.i][box.j])
              return xiao()
            }else{
              boxs.value[clicks.value[0].i][clicks.value[0].j].bei = true
              clicks.value = [boxs.value[box.i][box.j]]
              return
            }
          }else if(clicks.value.length===0){
            clicks.value = [boxs.value[box.i][box.j]]
            return
          }else{
            clicks.value.map(item=>{
              boxs.value[item.i][item.j].bei = true
            })
            clicks.value = [boxs.value[box.i][box.j]]
            return
          }
        }
        return
      }
      if (box.bg) {

        if (clicks.value.length <= 0) {
          boxs.value[box.i][box.j].click = true
          clicks.value.push(boxs.value[box.i][box.j])

        } else {
          if (box.i === clicks.value[0].i && box.j === clicks.value[0].j) {
            clicks.value = []
            boxs.value[box.i][box.j].click = false
            return
          }
          if (clicks.value[0].bg === box.bg) {
            boxs.value[box.i][box.j].click = true
            clicks.value.push(box)
            return validate()
          }
          clicks.value.map(item => {
            boxs.value[item.i][item.j].click = false
          })
          boxs.value[box.i][box.j].click = true
          clicks.value = [boxs.value[box.i][box.j]]

        }
      }
    }
    function validate() {
      if (clicks.value[0].bg === clicks.value[1].bg) {
        //横竖挨着
        if ((clicks.value[0].i === clicks.value[1].i + 1 || clicks.value[0].i === clicks.value[1].i - 1) && clicks.value[0].j === clicks.value[1].j) {
          return xiao()
        } else if (clicks.value[0].i === clicks.value[1].i && (clicks.value[0].j === clicks.value[1].j + 1 || clicks.value[0].j === clicks.value[1].j - 1)) {
          return xiao()
        }
        //判断最多拐两个弯可以到，就可以消除 
        let i1 = clicks.value[0].i
        let i2 = clicks.value[1].i
        let j1 = clicks.value[0].j
        let j2 = clicks.value[1].j
        if (i1 < i2) {
          while (i1 !== i2) {
            if (boxs.value[i1 + 1][j1].bg === '' || (i1 + 1 === i2 && j1 === j2)) {
              i1++
            } else {
              i1 = clicks.value[0].i
              break
            }
          }
          if (i1 === i2) {
            if (j1 > j2) {
              while (j1 !== j2) {
                if (boxs.value[i1][j1 - 1].bg === '' || (i1 === i2 && j1 - 1 === j2)) {
                  j1--
                } else {
                  j1 = clicks.value[0].j
                  i1 = clicks.value[0].i
                  break
                }
              }
            } else if (j1 < j2) {
              while (j1 !== j2) {
                if (boxs.value[i1][j1 + 1].bg === '' || (i1 === i2 && j1 + 1 === j2)) {
                  j1++
                } else {
                  j1 = clicks.value[0].j
                  i1 = clicks.value[0].i

                  break
                }
              }
            }
          }
        }
        if (i1 > i2) {
          while (i1 !== i2) {
            if (boxs.value[i1 - 1][j1].bg === '' || (i1 - 1 === i2 && j1 === j2)) {
              i1--
            } else {
              i1 = clicks.value[0].i

              break
            }
          }
          if (i1 === i2) {
            if (j1 > j2) {
              while (j1 !== j2) {
                if (boxs.value[i1][j1 - 1].bg === '' || (i1 === i2 && j1 - 1 === j2)) {
                  j1--
                } else {
                  j1 = clicks.value[0].j
                  i1 = clicks.value[0].i

                  break
                }
              }
            } else if (j1 < j2) {
              while (j1 !== j2) {
                if (boxs.value[i1][j1 + 1].bg === '' || (i1 === i2 && j1 + 1 === j2)) {
                  j1++
                } else {
                  j1 = clicks.value[0].j
                  i1 = clicks.value[0].i

                  break
                }
              }
            }
          }
        }
        if (j1 > j2) {
          while (j1 !== j2) {
            if (boxs.value[i1][j1 - 1].bg === '' || (i1 === i2 && j1 - 1 === j2)) {
              j1--
            } else {
              j1 = clicks.value[0].j
              break
            }
          }
          if (j1 === j2) {
            if (i1 > i2) {
              while (i1 !== i2) {
                if (boxs.value[i1 - 1][j1].bg === '' || (i1 - 1 === i2 && j1 === j2)) {
                  i1--
                } else {
                  i1 = clicks.value[0].i
                  j1 = clicks.value[0].j

                  break
                }
              }
            } else if (i1 < i2) {
              while (i1 !== i2) {
                if (boxs.value[i1 + 1][j1].bg === '' || (i1 + 1 === i2 && j1 === j2)) {
                  i1++
                } else {
                  i1 = clicks.value[0].i
                  j1 = clicks.value[0].j
                  break
                }
              }
            }
          }
        }
        if (j1 < j2) {
          while (j1 !== j2) {
            if (boxs.value[i1][j1 + 1].bg === '' || (i1 === i2 && j1 + 1 === j2)) {
              j1++
            } else {
              j1 = clicks.value[0].j
              break
            }
          }
          if (j1 === j2) {
            if (i1 > i2) {
              while (i1 !== i2) {
                if (boxs.value[i1 - 1][j1].bg === '' || (i1 - 1 === i2 && j1 === j2)) {
                  i1--
                } else {
                  i1 = clicks.value[0].i
                  j1 = clicks.value[0].j
                  break
                }
              }
            } else if (i1 < i2) {
              while (i1 !== i2) {
                if (!boxs.value[i1 + 1][j1].bg || (i1 + 1 === i2 && j1 === j2)) {
                  i1++
                } else {
                  i1 = clicks.value[0].i
                  j1 = clicks.value[0].j
                  break
                }
              }
            }
          }
        }
        if (i1 === i2 && j1 === j2) {
          return xiao()
        } else if ((i1 === i2 && (j1 === j2 - 1 || j1 === j2 + 1)) || (j1 === j2 && (i1 === i2 - 1 || i1 === i2 + 1))) {
          return xiao()
        }
      }
      clicks.value.map(item => {
        boxs.value[item.i][item.j].click = false
      })
      clicks.value = []
    }
    function xiao() {
      clicks.value.map(item => {
        boxs.value[item.i][item.j].click = false
        boxs.value[item.i][item.j].bg = ''
      })
      clicks.value = []
      let times = 0
      boxs.value.map(item => {
        item.map(element => {
          if (element.bg === '') {
            times++
          }
        })
      })
      if (times >= row.value * col.value) {
        //赢了
        tip.value = '恭喜您赢得了比赛'
        visible.value = true
      }
    }
    init()
    return {
      clickItem,
      boxs,
      init,
      row,
      col,
      visible,
      tip,
      next,
      visible2,
      level
    }
  }
}
</script>
<style lang="scss" scoped>
.game {
  display: flex;
  flex-wrap: wrap;
}
.xiaoxiaole {
  // pointer-events: none;
  user-select: none;
  justify-content: center;
  .game-main {
    .game {
      display: flex;
    }
  }
  .control {
    margin-left: 10px;
  }
}
.game-div {
  width: 50px;
  height: 50px;
  border: 1px solid #bfe136;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
  line-height: 50px;
  cursor: pointer;
}
.button-list {
  justify-content: center;
}
</style>