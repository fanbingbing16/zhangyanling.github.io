<template>
  <div class="mineDlearance">
    <div class="game">
      <div class="top">
        <div class="num">{{ mine }}</div>
        <div class="xiao">😀</div>
        <div class="num">{{ score }}</div>
      </div>
      <div class="game-main">
        <div v-for="(box, index) in boxs" :key="index" class="flex">
          <div v-for="(item, index2) in box" :key="index2" :style="{
            background: item.isMine && item.isClick ? 'red' : '#ccc',
            'border-top-color':
              !item.isClick && !item.isFlag ? 'white' : '#ccc',
            'border-left-color':
              !item.isClick && !item.isFlag ? 'white' : '#ccc',
            'border-right-color':
              !item.isClick && !item.isFlag ? '#999' : '#ccc',
            'border-bottom-color':
              !item.isClick && !item.isFlag ? '#999' : '#ccc',
          }" class="item-one" @click="clickBox(item)"
            @contextmenu.prevent="flagBox(item)">
            <span v-if="item.isFlag">🚩</span>
            <img v-if="item.isClick && item.isMine" src="../../assets/mine.png" />
            <span v-if="item.isClick && !item.isMine && item.num > 0">{{
              item.num
            }}</span>
          </div>
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
<script >
import { ref } from 'vue'
import dialogVue from '../comm/dialog.vue'
export default {
  components: {
    dialogVue
  },
  setup() {
    // const timer = ref(null) // 用于存储计时器的变量  
    // const longPress = ref(false) // 长按的标志位  
    // const shortPress = ref(false) // 短按的标志位
    // const selectBox = ref({})
    const score = ref(0)
    const mine = ref(20)
    const row = ref(18)
    const col = ref(18)
    const visible = ref(false)
    const tip = ref('')
    const boxs = ref([[{ num: 0, isFlag: false, isClick: false, isMine: false, x: 0, y: 0 }]])
    // function startPress(item) {
    //   selectBox.value = item
    //   // 当鼠标按下时，启动计时器  
    //   timer.value = setTimeout(() => {
    //     longPress.value = true; // 设置长按标志位为true  
    //   }, 1000); // 设置长按的延迟时间为1000毫秒  
    // }
    // function stopPress() {
    //   // 当鼠标抬起或离开按钮时，停止计时器  
    //   clearTimeout(timer.value);
    //   if (longPress.value) {
    //     // 如果长按标志位为true，则执行长按的逻辑  
    //     console.log('长按操作');
    //     flagBox(selectBox.value)
    //     longPress.value = false; // 重置长按标志位为false 
    //   } else {
    //     // 如果长按标志位为false，则执行短按的逻辑  
    //     shortPress.value = true; // 设置短按标志位为true 
    //     clickBox(selectBox.value)
    //     setTimeout(() => {
    //       shortPress.value = false; // 在一段时间后重置短按标志位为false  
    //     }, 100);
    //   }
    // }
    function init() {
      visible.value = false
      score.value = 0
      mine.value = row.value * (col.value / 2 - 6)
      boxs.value = []
      let num = 0
      for (let i = 0; i < row.value; i++) {
        boxs.value.push([])
        for (let j = 0; j < col.value; j++) {
          const temp = Math.random()
          //随机放row个雷
          if (num < mine.value && temp > 0.85) {
            boxs.value[i].push({ num: 0, isFlag: false, isClick: false, isMine: true, x: i, y: j })
            num++
          } else {
            boxs.value[i].push({ num: 0, isFlag: false, isClick: false, isMine: false, x: i, y: j })
          }

        }
      }

      for (let i = 0; i < row.value; i++) {
        for (let j = 0; j < col.value; j++) {
          if (num < mine.value && boxs.value[i][j].isMine === false) {
            boxs.value[i][j].isMine = true
            num++
          }
          if (boxs.value[i][j].isMine) {
            // 九宫格不是雷的数字都加1
            if (boxs.value[i - 1] && !boxs.value[i - 1][j].isMine)
              boxs.value[i - 1][j].num++
            if (boxs.value[i + 1] && !boxs.value[i + 1][j].isMine)
              boxs.value[i + 1][j].num++
            if (boxs.value[i][j - 1] && !boxs.value[i][j - 1].isMine)
              boxs.value[i][j - 1].num++
            if (boxs.value[i][j + 1] && !boxs.value[i][j + 1].isMine)
              boxs.value[i][j + 1].num++
            if (boxs.value[i - 1] && boxs.value[i - 1][j - 1] && !boxs.value[i - 1][j - 1].isMine)
              boxs.value[i - 1][j - 1].num++
            if (boxs.value[i - 1] && boxs.value[i - 1][j + 1] && !boxs.value[i - 1][j + 1].isMine)
              boxs.value[i - 1][j + 1].num++
            if (boxs.value[i + 1] && boxs.value[i + 1][j - 1] && !boxs.value[i + 1][j - 1].isMine)
              boxs.value[i + 1][j - 1].num++
            if (boxs.value[i + 1] && boxs.value[i + 1][j + 1] && !boxs.value[i + 1][j + 1].isMine)
              boxs.value[i + 1][j + 1].num++
          }
        }
      }


    }
    function clickBox(box) {
      if(JSON.stringify(box)==='{}') return
      if (box.isFlag) {
        boxs.value[box.x][box.y].isFlag = false
        validateWin()
        return
      }
      if (!box.isClick) {
        console
        if (!boxs.value[box.x][box.y].isMine && !boxs.value[box.x][box.y].isClick)
          score.value++

        boxs.value[box.x][box.y].isClick = true

        if (boxs.value[box.x][box.y].isMine) {
          //踩到雷了 输了
          tip.value = '您输了'
          visible.value = true
        } else if (boxs.value[box.x][box.y].num === 0) {
          //旁边是0的也全部点开，0的旁边只要不是炸弹也点开,（旁边没有0，但是不是雷的点开）
          changeClick([box.x, box.y])
        }
      }
      validateWin()
    }
    //验证是否赢了
    function validateWin() {
      let isFlagNum = 0//加这个变量的意义是防止用户插旗插到不是雷的，例如全屏插旗却赢了的情况
      let mineTemp = 0//插旗插中雷的个数
      for (let i = 0; i < row.value; i++) {
        for (let j = 0; j < col.value; j++) {
          if (boxs.value[i][j].isFlag) {
            isFlagNum++
          }
          //插旗了并且这个的确是雷
          if (boxs.value[i][j].isFlag && boxs.value[i][j].isMine) {
            mineTemp++
          }

        }
      }

      if (mineTemp >= mine.value && isFlagNum === mineTemp) {
        tip.value = '您赢了'
        visible.value = true
      }
    }
    function flagBox(box) {
      if (box.isFlag) {
        boxs.value[box.x][box.y].isFlag = false
        return
      }
      if (box.isClick) {
        return
      }
      boxs.value[box.x][box.y].isFlag = true
    }
    const set = new Set()
    function changeClick(arr) {
      const i = arr[0]
      const j = arr[1]
      if (set.has(i * row.value + j)) {
        return
      }
      set.add(i * row.value + j)

      if (boxs.value[i - 1] && !boxs.value[i - 1][j].isMine) {
        if (!boxs.value[i - 1][j].isClick) score.value++
        boxs.value[i - 1][j].isClick = true

        if (boxs.value[i - 1][j].num === 0) {

          changeClick([i - 1, j])

        }
      }
      if (boxs.value[i + 1] && !boxs.value[i + 1][j].isMine) {
        if (!boxs.value[i + 1][j].isClick) score.value++

        boxs.value[i + 1][j].isClick = true
        if (boxs.value[i + 1][j].num === 0) {
          changeClick([i + 1, j])
        }
      }
      if (boxs.value[i][j - 1] && !boxs.value[i][j - 1].isMine) {
        if (!boxs.value[i][j - 1].isClick) score.value++

        boxs.value[i][j - 1].isClick = true
        if (boxs.value[i][j - 1].num === 0) {
          changeClick([i, j - 1])
        }
      }
      if (boxs.value[i][j + 1] && !boxs.value[i][j + 1].isMine) {
        if (!boxs.value[i][j + 1].isClick) score.value++

        boxs.value[i][j + 1].isClick = true
        if (boxs.value[i][j + 1].num === 0) {
          changeClick([i, j + 1])
        }
      }
      if (boxs.value[i - 1] && boxs.value[i - 1][j - 1] && !boxs.value[i - 1][j - 1].isMine) {
        if (!boxs.value[i - 1][j - 1].isClick) score.value++

        boxs.value[i - 1][j - 1].isClick = true
        if (boxs.value[i - 1][j - 1].num === 0) {
          changeClick([i - 1, j - 1])
        }
      }
      if (boxs.value[i - 1] && boxs.value[i - 1][j + 1] && !boxs.value[i - 1][j + 1].isMine) {
        if (!boxs.value[i - 1][j + 1].isClick) score.value++

        boxs.value[i - 1][j + 1].isClick = true
        if (boxs.value[i][j + 1].num === 0) {
          changeClick([i - 1, j + 1])
        }
      }
      if (boxs.value[i + 1] && boxs.value[i + 1][j - 1] && !boxs.value[i + 1][j - 1].isMine) {
        if (!boxs.value[i + 1][j - 1].isClick) score.value++

        boxs.value[i + 1][j - 1].isClick = true
        if (boxs.value[i + 1][j - 1].num === 0) {
          changeClick([i + 1, j - 1])
        }
      }
      if (boxs.value[i + 1] && boxs.value[i + 1][j + 1] && !boxs.value[i + 1][j + 1].isMine) {
        if (!boxs.value[i + 1][j + 1].isClick) score.value++

        boxs.value[i + 1][j + 1].isClick = true
        if (boxs.value[i + 1][j + 1].num === 0) {
          changeClick([i + 1, j + 1])
        }
      }
    }
    init()
    return {
      score,
      mine,
      boxs,
      init,
      clickBox,
      visible,
      tip,
      flagBox,
      // startPress,
      // stopPress
    }
  }
}
</script>
<style lang="scss" scoped>
.mineDlearance {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  align-items: center;

  .game {
    background: #ccc;
    padding: 10px;
    height: 450px;

    .top {
      display: flex;
      justify-content: space-between;

      .xiao {
        background: #ccc;
        padding: 0px 6px;
        line-height: 30px;
        border: 1px solid #000;
        border-top-color: white;
        border-left-color: white;
        border-right-color: #999;
        border-bottom-color: #999;
      }

      .num {
        color: #f40004;
        background: #4a0707;
        padding: 6px 20px;
      }
    }

    .game-main {
      margin-top: 10px;

      .item-one {
        width: 20px;
        height: 20px;
        border: 1px solid #000;
        box-sizing: border-box;

        cursor: pointer;

        img {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}
</style>