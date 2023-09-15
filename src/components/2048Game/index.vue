<template>
  <div class="game">
    <div class="game-main">
      <div class="game-div">
        <div v-for="(box, index) in boxs" :key="index" class="flex">
          <div v-for="(item, index2) in box" :key="index2" class="box" :style="item.num!==0?'color:white;background:green;':''">
            {{ item.num }}
          </div>
        </div>
      </div>
    </div>
    <p>
      游戏规则:游戏界面由
      6*6的方格组成，每次可以选择上下左右其中一个方向去滑动，每滑动一次，所有的数字方块都会往滑动的方向靠拢外，系统也会在空白的地方乱数出现一个数字方块（2或者
      4）， 相同数字的方块在靠拢、相撞时会相加。不断的叠加最终拼凑出
      2048这个数字就算成功，如果格子满了不能再滑动了则失败。
    </p>
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
<script >

import { ref } from 'vue'
import dialogVue from "../comm/dialog.vue";
export default {
  components: { dialogVue },
  setup() {
    const row = ref(6)//行
    const col = ref(6)//列
    const boxs = ref([[{ x: 0, y: 0, num: 0 }]])
    const copyBoxs = ref([])
    const visible = ref(false)
    const tip = ref('')
    function init() {
      visible.value=false
      boxs.value = []
      for (let i = 0; i < row.value; i++) {

        boxs.value.push([])
        for (let j = 0; j < col.value; j++) {
          copyBoxs.value.push(i * row.value + j)
          boxs.value[i].push({ x: i, y: i, num: 0 })
        }
      }
      boxs.value[Math.floor(Math.random() * col.value)][Math.floor(Math.random() * row.value)].num = 2
    }
    init()
    keyDown()
    function keyDown() {
      document.onkeydown = (e) => {
        //事件对象兼容
        let e1 = e || arguments.callee.caller.arguments[0]
        //键盘按键判断:左箭头-LEFT_ARROW ;上箭头-UP_ARROW ；右箭头-RIGHT_ARROW ;下箭头-DOWN_ARROW//左
        if (e1 && e1.key == 'ArrowLeft') {// 按下左箭头
          moveLeft()
        } else if (e1 && e1.key == 'ArrowRight') {// 按下右箭头
          moveRight()
        } else if (e1 && e1.key === 'ArrowUp') {
          moveUp()
        } else if (e1 && e1.key === 'ArrowDown') {
          moveDown()
        }
      }
    }
    function moveLeft() {
      let hasRandomNum = false
      let num = 0
      for (let i = 0; i < row.value; i++) {
        for (let j = 1; j < col.value; j++) {

          if (boxs.value[i][j].num > 0) {
            if (boxs.value[i][j - 1].num === 0) {
              boxs.value[i][j - 1].num = boxs.value[i][j].num
              boxs.value[i][j].num = 0

            } else if (boxs.value[i][j - 1].num === boxs.value[i][j].num) {

              boxs.value[i][j - 1].num = boxs.value[i][j].num * 2
              boxs.value[i][j].num = 0
              if (boxs.value[i][j - 1].num >= 2048) {
                i = row.value
                j = col.value
                tip.value = '您赢了'
                visible.value = true
                break
              }
            }
          } else {
            if (Math.random() > 0.5 && !hasRandomNum) {
              boxs.value[i][j].num = [2, 4][Math.floor(Math.random() * 2)]
              hasRandomNum = true
            }
          }
        }
      }
      
      if (!hasRandomNum) {
        for (let i = 0; i < row.value; i++) {
          for (let j = 0; j < col.value; j++) {
            if (boxs.value[i][j].num === 0) {
              boxs.value[i][j].num = [2, 4][Math.floor(Math.random() * 2)]
              i = row.value
              j = col.value
              break
            }else{
              num++
            }
          }
        }
      }
       if (num >= row.value * col.value) {
        tip.value = '您输了'
        visible.value = true
        return
      }
    }
    function moveRight() {
      let hasRandomNum = false
      let num = 0

      for (let i = 0; i < row.value; i++) {
        for (let j = col.value - 2; j >= 0; j--) {
          if (boxs.value[i][j].num > 0) {
            if (boxs.value[i][j + 1].num === 0) {
              boxs.value[i][j + 1].num = boxs.value[i][j].num
              boxs.value[i][j].num = 0
            } else if (boxs.value[i][j + 1].num === boxs.value[i][j].num) {
              boxs.value[i][j + 1].num = boxs.value[i][j].num * 2
              boxs.value[i][j].num = 0
              if (boxs.value[i][j + 1].num >= 2048) {
                i = row.value
                j = col.value
                tip.value = '您赢了'
                visible.value = true
                break
              }
            }
          } else {
            if (Math.random() > 0.5 && !hasRandomNum) {
              boxs.value[i][j].num = [2, 4][Math.floor(Math.random() * 2)]
              hasRandomNum = true
            }
          }
        }
      }  
      if (!hasRandomNum) {
        for (let i = 0; i < row.value; i++) {
          for (let j = 1; j < col.value; j++) {
            if (boxs.value[i][j].num === 0) {
              boxs.value[i][j].num = [2, 4][Math.floor(Math.random() * 2)]
              i = row.value
              j = col.value
              break
            }else{
              num++
            }
          }
        }
      }
       if (num >= row.value * col.value) {
        tip.value = '您输了'
        visible.value = true
        return
      }
    }
    function moveUp() {
      let hasRandomNum = false
      let num = 0

      for (let i = 1; i < row.value; i++) {
        for (let j = 0; j < col.value; j++) {
          if (boxs.value[i][j].num > 0) {
            if (boxs.value[i - 1][j].num === 0) {
              boxs.value[i - 1][j].num = boxs.value[i][j].num
              boxs.value[i][j].num = 0
            } else if (boxs.value[i - 1][j].num === boxs.value[i][j].num) {
              boxs.value[i - 1][j].num = boxs.value[i][j].num * 2
              boxs.value[i][j].num = 0
              if (boxs.value[i - 1][j].num >= 2048) {
                i = row.value
                j = col.value
                tip.value = '您赢了'
                visible.value = true
                break
              }
            }
          } else {
            if (Math.random() > 0.5 && !hasRandomNum) {
              boxs.value[i][j].num = [2, 4][Math.floor(Math.random() * 2)]
              hasRandomNum = true
            }
          }
        }
      } 
     
      if (!hasRandomNum) {
        for (let i = 0; i < row.value; i++) {
          for (let j = 0; j < col.value; j++) {
            if (boxs.value[i][j].num === 0) {
              boxs.value[i][j].num = [2, 4][Math.floor(Math.random() * 2)]
              i = row.value
              j = col.value
              break
            }else{
              num++
            }
          }
        }
      }
       if (num >= row.value * col.value) {
        tip.value = '您输了'
        visible.value = true
        return
      }
    }
    function moveDown() {
      let hasRandomNum = false
      let num = 0

      for (let i = row.value - 2; i >= 0; i--) {
        for (let j = 0; j < col.value; j++) {
          if (boxs.value[i][j].num > 0) {
            if (boxs.value[i + 1][j].num === 0) {
              boxs.value[i + 1][j].num = boxs.value[i][j].num
              boxs.value[i][j].num = 0
            } else if (boxs.value[i + 1][j].num === boxs.value[i][j].num) {
              boxs.value[i + 1][j].num = boxs.value[i][j].num * 2
              boxs.value[i][j].num = 0
              if (boxs.value[i + 1][j].num >= 2048) {
                i = row.value
                j = col.value
                tip.value = '您赢了'
                visible.value = true
                break
              }
            }
          } else {
            if (Math.random() > 0.5 && !hasRandomNum) {
              boxs.value[i][j].num = [2, 4][Math.floor(Math.random() * 2)]
              hasRandomNum = true
            }
          }
        }
      }  
      if (!hasRandomNum) {
        for (let i = 0; i < row.value; i++) {
          for (let j = 0; j < col.value; j++) {
            if (boxs.value[i][j].num === 0) {
              boxs.value[i][j].num = [2, 4][Math.floor(Math.random() * 2)]
              i = row.value
              j = col.value
              break
            }else{
              num++
            }
          }
        }
      }
       if (num >= row.value * col.value) {
        tip.value = '您输了'
        visible.value = true
        return
      }
    }
    return {
      boxs,
      init,
      visible,
      tip
    }
  }
}

</script>
<style lang="scss" scoped>
.game {
  padding: 20px;
  .game-main {
    .game-div {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 30px;
      .box {
        width: 30px;
        height: 30px;
        border: 1px solid #a7ec26;
        text-align: center;
        line-height: 30px;
        box-sizing: border-box;
        outline: none;
      }
    }
  }
}
::selection {
  // background: transparent;
  outline: none;
  // color: #ffffff;
}
</style>