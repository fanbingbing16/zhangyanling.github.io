<template>
  <div class="mineDlearance">
    <div class="game">
      <div class="top">五子棋</div>
      <div class="game-main">
        <div v-for="(box, index) in boxs" :key="index" class="flex">
          <div
            v-for="(item, index2) in box"
            :key="index2"
            class="item-one"
            @click="clickBox(item)"
          >
            <div
              v-if="item.place"
              class="circle"
              :style="'background:' + (item.place === 1 ? 'white' : '#000')"
            ></div>
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
    const score = ref(0)
    const row = ref(20)
    const col = ref(20)
    const visible = ref(false)
    const tip = ref('')
    const boxs = ref([[{ place: 0, x: 0, y: 0 }]])
    const curUser = ref(1)//只可以是1或者2  1表示白 2表示黑
    function init() {
      visible.value = false
      boxs.value = []
      for (let i = 0; i < row.value; i++) {
        boxs.value.push([])
        for (let j = 0; j < col.value; j++) {
          boxs.value[i].push({ place: 0, x: i, y: j })
        }
      }
    }
    function clickBox(box) {
      if (box.place === 0) {
        boxs.value[box.x][box.y].place = curUser.value
        curUser.value = curUser.value === 1 ? 2 : 1
      }
      validateWin()

    }
    //验证是否赢了
    function validateWin() {
      for (let i = 0; i < row.value; i++) {

        for (let j = 0; j < col.value; j++) {
          const place = boxs.value[i][j].place
          if (place) {
            if (boxs.value[i][j + 1]?.place === place) {
              if (boxs.value[i][j + 2]?.place === place) {
                if (boxs.value[i][j + 3]?.place === place) {
                  if (boxs.value[i][j + 4]?.place === place) {
                    // 横着五个，赢了
                    tip.value = (place === 1 ? '白' : '黑') + '棋子赢了'
                    visible.value = true
                    i = row.value
                    j = col.value
                    break
                  }
                }
              }
            }
            if (boxs.value[i + 1]?.[j].place === place) {
              if (boxs.value[i + 2]?.[j].place === place) {
                if (boxs.value[i + 3]?.[j].place === place) {
                  if (boxs.value[i + 4]?.[j].place === place) {
                    // 竖着五个赢了
                    tip.value = (place === 1 ? '白' : '黑') + '棋子赢了'
                    visible.value = true
                    i = row.value
                    j = col.value
                    break
                  }
                }
              }
            }
            if(boxs.value[i+1]?.[j-1]?.place===place){
              if(boxs.value[i+2]?.[j-2]?.place===place){
                if(boxs.value[i+3]?.[j-3]?.place===place){
                  if(boxs.value[i+4]?.[j-4]?.place===place){
                    // 左斜着的五个赢了
                    tip.value = (place === 1 ? '白' : '黑') + '棋子赢了'
                    visible.value = true
                    i = row.value
                    j = col.value
                    break
                  }
                }
              }
            }
            if(boxs.value[i+1]?.[j+1]?.place===place){
              if(boxs.value[i+2]?.[j+2]?.place===place){
                if(boxs.value[i+3]?.[j+3]?.place===place){
                  if(boxs.value[i+4]?.[j+4]?.place===place){
                    // 右斜着的五个赢了
                    tip.value = (place === 1 ? '白' : '黑') + '棋子赢了'
                    visible.value = true
                    i = row.value
                    j = col.value
                    break
                  }
                }
              }
            }
          }
        }
      }
    }
    init()
    return {
      score,
      boxs,
      init,
      clickBox,
      visible,
      tip,
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
    // background: #ccc;
    padding: 10px;
    height: 850px;
    .top {
      display: flex;
      justify-content: space-between;
    }
    .game-main {
      margin-top: 10px;
      .item-one {
        width: 40px;
        height: 40px;
        border: 1px solid #000;
        box-sizing: border-box;
        background: goldenrod;
        cursor: pointer;
        .circle {
          width: 100%;
          height: 100%;
          border-radius: 100%;
        }
      }
    }
  }
}
</style>