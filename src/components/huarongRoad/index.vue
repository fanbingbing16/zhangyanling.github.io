<template>
  <div>
    <h1>华容道</h1>

    <div class="huarongRoad flex">
      <div class="game-main">
        <div class="game" v-for="(box, index) in boxs" :key="index">
          <div
            class="game-div"
            v-for="(item, index2) in box"
            :key="index2"
            @mousedown="mouseDown($event, item)"
          >
            <img
              v-if="item.hasImg"
              :src="require('../../assets/huarongRoad/' + level + '.jpg')"
              alt=""
              :style="{
                width: 70 * row + 'px',
                height: 70 * col + 'px',
                left: -70 * item.left + 'px',
                top: -item.right * 70 + 'px',
              }"
            />
          </div>
        </div>
      </div>
      <div class="control">
        <img
          :src="require('../../assets/huarongRoad/' + level + '.jpg')"
          :style="{
            width: 70 * row + 'px',
            height: 70 * col + 'px',
          }"
        />
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
            v-for="(item, index) in new Array(5)"
            @click="level = index+1;init();visible2=false"
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
    const row = ref(3)
    const col = ref(3)
    const level = ref(1)
    const boxs = ref([[{ i: 0, j: 0, hasImg: false, left: 0, right: 0 }]])
    const tip = ref('')
    const visible = ref(false)
    const visible2 = ref(false)
    function init() {
      row.value = level.value + 2
      col.value = level.value + 2
      boxs.value = []
      visible.value = false
      visible2.value = false
      let temp = new Array(row.value).join(',').split(',').map(() => new Array(row.value).join(',').split(',').map((item, index) => index))
      temp[temp.length - 1] = temp[temp.length - 1].slice(0, -1)
      for (let i = 0; i < row.value; i++) {
        boxs.value.push([])

        for (let j = 0; j < col.value; j++) {
          let left = 0
          let right = 0
          if (i !== row.value - 1 || j !== col.value - 1) {
            let temp1 = getNum(temp)
            left = temp1.left
            temp = temp1.arr
            right = temp1.right
          }

          boxs.value[i].push({ i, j, hasImg: i === row.value - 1 && j === col.value - 1 ? false : true, left, right })
          //测试所用
          // boxs.value[i].push({ i, j, hasImg: i === row.value - 1 && j === col.value - 1 ? false : true, left:j, right:i })

        }
      }

      document.onmousemove = null;

    }
    function getNum(arr) {
      let left = 0
      let right = 0
      let select = false
      arr.some((item, index) => {
        if (item.length > 0) {
          return item.some((element, index2) => {
            const random = Math.random()
            if (random > 0.5 && !select) {
              left = index
              right = element
              arr[index].splice(index2, 1)
              select = true
              return true
            }
          })
        }
      })
      if (!select) return getNum(arr)
      return { arr, left, right }
    }
    function mouseDown(e, box) {
      const xx1 = e.clientX || e.clientx || 0;
      const yy1 = e.clientY || e.clienty || 0;
      document.onmousemove = function (e2) {
        if (box.hasImg) {
          const xx = e2.clientX || e2.clientx || 0;
          const yy = e2.clientY || e2.clienty || 0;
          //首先获得鼠标位置坐标
          const a = xx - xx1
          const b = yy - yy1
          if (Math.abs(a) >= Math.abs(b)) {
            if (a > 0) {
              //右移
              if (boxs.value[box.i][box.j + 1] && !boxs.value[box.i][box.j + 1].hasImg) {
                boxs.value[box.i][box.j + 1].left = boxs.value[box.i][box.j].left
                boxs.value[box.i][box.j + 1].right = boxs.value[box.i][box.j].right
                boxs.value[box.i][box.j + 1].hasImg = true
                boxs.value[box.i][box.j].hasImg = false
              }
            } else {
              //左移
              if (boxs.value[box.i][box.j - 1] && !boxs.value[box.i][box.j - 1].hasImg) {
                boxs.value[box.i][box.j - 1].left = boxs.value[box.i][box.j].left
                boxs.value[box.i][box.j - 1].right = boxs.value[box.i][box.j].right
                boxs.value[box.i][box.j - 1].hasImg = true
                boxs.value[box.i][box.j].hasImg = false
              }
            }
          } else {
            if (b > 0) {
              //下移
              if (boxs.value[box.i + 1]?.[box.j] && !boxs.value[box.i + 1][box.j].hasImg) {
                boxs.value[box.i + 1][box.j].left = boxs.value[box.i][box.j].left
                boxs.value[box.i + 1][box.j].right = boxs.value[box.i][box.j].right
                boxs.value[box.i + 1][box.j].hasImg = true
                boxs.value[box.i][box.j].hasImg = false
              }
            } else {
              //上移
              if (boxs.value[box.i - 1]?.[box.j] && !boxs.value[box.i - 1][box.j].hasImg) {
                boxs.value[box.i - 1][box.j].left = boxs.value[box.i][box.j].left
                boxs.value[box.i - 1][box.j].right = boxs.value[box.i][box.j].right
                boxs.value[box.i - 1][box.j].hasImg = true
                boxs.value[box.i][box.j].hasImg = false
              }
            }
          }
          if (boxs.value.every(item => item.every(element => (element.left === element.j && element.right === element.i) || !element.hasImg))) {
            //赢了
            if (level.value < 4)
              tip.value = '您赢了，是否跳转下一关？'
            else {
              tip.value = '恭喜您,您已经取得所有关卡的胜利'
            }
            visible.value = true
          }
        }


      };
      document.onmouseup = function () {
        document.onmouseup = null;
        document.onmousemove = null;
      };


    }
    function next() {
      if (level.value <= 4) {
        level.value++
      }
      init()
    }

    init()
    return {
      level,
      boxs,
      init,
      row,
      col,
      mouseDown,
      visible,
      tip,
      next,
      visible2
    }
  }
}
</script>
<style lang="scss" scoped>
.game{
  display: flex;
  flex-wrap: wrap;
}
.huarongRoad {
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
    img {
      width: 200px;
    }
  }
}
.game-div {
  width: 70px;
  height: 70px;
  border: 1px solid #bfe136;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
  line-height: 70px;
  cursor: pointer;
  img {
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
    user-select: none;
  }
}
.button-list {
  justify-content: center;

}
</style>