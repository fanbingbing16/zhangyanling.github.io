<template>
  <div class="game">
    <div class="game-div">
      <div class="game-min">
        <div class="row" v-for="(row, i) in boxs" :key="i">
          <p
            class="element"
            v-for="(col, j) in row"
            :key="j"
            :style="{ background: col.bg }"
          ></p>
        </div>
      </div>
      <!-- 小屏幕 -->
      <div class="right-div">
        <div class="ass">
          <div class="row" v-for="(row, i) in ass" :key="i">
            <p
              class="element"
              v-for="(col, j) in row"
              :key="j"
              :style="{ background: col.bg }"
            ></p>
          </div>
        </div>
        <!-- 分数计算 -->
        <div class="score-div">
          <div>
            <p>
              <span>得分:</span>&emsp;<span style="color: red">{{
                score
              }}</span>
            </p>
          </div>

          <el-button class="ztks" @click="stopGame">暂停/开始</el-button>
        </div>
      </div>
    </div>
    <!-- 控制台 -->
    <div class="control">
      <el-button @click="changeBox">变换</el-button>
      <div class="control-center">
        <el-button @click="moveLeft">向左</el-button>
        <el-button @click="moveRight">向右</el-button>
      </div>
      <el-button @click="moveDown">向下</el-button>
      <p>说明：上下左右键控制游戏，左右健控制方块移动，下键加快下移的速度，上键变换</p>
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
import { blockMod, transition } from "./ykdata.js";
import dialogVue from "../comm/dialog.vue";
export default {
  components: {
    dialogVue
  },
  data() {
    return {
      visible: false,
      tip: '',
      row: 20, //行
      col: 10, //列
      boxs: [[{ i: 0, j: 0, bg: '#eee' }]],//方块，记录方块的坐标和颜色
      ass: [],//小屏幕的坐标和颜色
      curType: 0,//现在的类型
      boxSite: {},//现在方块的坐标和颜色
      changeType: 1,
      nextType: 0,//下一个类型,
      score: 0,
      level: 0,
      times: 0,
      inter: null,//定时器

    };
  },
  mounted() {
    this.init()
this.keyDown()
  },
  onUnmounted(){
    clearInterval(this.inter)
    this.inter = null
  },
  methods: {
    keyDown() {
      document.onkeydown = (e) => {
        //事件对象兼容
        let e1 = e || event || window.event || arguments.callee.caller.arguments[0]
        //键盘按键判断:左箭头-37;上箭头-38；右箭头-39;下箭头-40//左
        if (e1 && e1.keyCode == 37) {// 按下左箭头
          this.moveLeft()
        } else if (e1 && e1.keyCode == 39) {// 按下右箭头
          this.moveRight()
        } else if (e1 && e1.keyCode === 38) {
          this.changeBox()
        } else if(e1&&e1.keyCode===40){
          this.moveDown()
        }
      }
    },
    validCol() {
      this.boxs = this.boxs.map((item, index) => {
        let time = 0
        item.map(element => {
          if (element.bg === '#000') time++
        })
        //需要消除
        if (time === item.length) {
          item = item.map(element => {
            element.bg = '#eee'
            return element
          })
          this.score += item.length
          // 消除后，这一行前面所有的黑色方块往下移
          for (let i = index - 1; i >= 0; i--) {
            for (let j = 0; j < this.col; j++) {
              if (this.boxs[i][j].bg === '#000') {
                this.boxs[i][j].bg = '#eee'
                this.boxs[i + 1][j].bg = '#000'
              }
            }
          }
        }
        return item
      })

    },
    begin() {
      if (this.inter) {
        clearInterval(this.inter)
      }
      this.inter = setInterval(() => {
        this.moveDown()
      }, 600)
    },
    stopGame() {
      if (this.inter) {
        clearInterval(this.inter)
        this.inter = null
      } else {
        this.begin()
      }
    },
    moveDown() {
      const hasErro = this.boxSite.site.some((box) => {
        // 向下超出了边界，变成固定的方块
        const temp = this.boxs[box[0] + 1]?.[box[1]]
        if (!temp) {
          return true
        }

        if (temp.bg !== '#eee' && temp.bg !== this.boxSite.color) {
          //向下移的时候与已经固定的方块重合，也变成固定的方块
          return true

        }
      })
      if (hasErro) {
        this.boxSite.site = this.boxSite.site.map((item) => {
          this.boxs[item[0]][item[1]].bg = '#000'
          return item
        })
        //判断是否满一行都是黑色的
        this.validCol()
        this.changeType = 1
        this.curType = this.nextType
        this.boxSite = blockMod()[this.curType]
        clearInterval(this.inter)
        //判断是否结束
        const isEnd = this.boxSite.site.some(item => {
          if (this.boxs[item[0]][item[1]].bg !== '#eee') {
            return true
          }
        })

        if (isEnd) {
          this.tip = `游戏失败，得分${this.score}`
          this.visible = true
          return
        }

        this.randomNext()
        this.begin()
        return
      }
      this.boxSite.site = this.boxSite.site.map((item) => {
        this.boxs[item[0]][item[1]].bg = '#eee'
        item[0] = item[0] + 1
        // item[1] = item[1] - 1
        return item
      })
      this.boxSite.site = this.boxSite.site.map((item) => {
        this.boxs[item[0]][item[1]].bg = this.boxSite.color
        return item
      })
    },
    changeAss() {
      this.ass = []
      for (let i = 0; i < 5; i++) {
        this.ass.push([])
        for (let j = 0; j < 5; j++) {
          if (blockMod()[this.nextType].site.some(item => {
            if (item[0] + 1 === i && item[1] - 3 === j) {
              //方块
              this.ass[i].push({ x: i, y: j, bg: blockMod()[this.nextType].color })

              return true
            }
          })) continue;
          this.ass[i].push({ x: i, y: j, bg: '#eee' })
        }
      }
    },
    init() {
      this.score = 0
      this.visible = false
      this.times = 0
      this.level = 0
      this.changeType = 1
      if (this.inter) {
        clearInterval()
      }
      this.randomNext()
      this.curType = this.nextType
      this.randomNext()
      this.boxs = []
      this.boxSite = blockMod()[this.curType]
      for (let i = 0; i < this.row; i++) {
        this.boxs.push([])
        for (let j = 0; j < this.col; j++) {
          if (this.boxSite.site.some(item => {
            if (item[0] === i && item[1] === j) {
              //方块
              this.boxs[i].push({ x: i, y: j, bg: this.boxSite.color })

              return true
            }
          })) continue;
          this.boxs[i].push({ x: i, y: j, bg: '#eee' })
        }
      }
      this.begin()

    },
    randomNext() {
      this.nextType = Math.floor(Math.random() * 7)
      this.changeAss()
    },
    moveLeft() {
      const hasErro = this.boxSite.site.some((box) => {
        // 左移超出了边界，结束
        const temp = this.boxs[box[0]]?.[box[1] - 1]
        if (!temp) {
          return true
        }

        if (temp.bg !== '#eee' && temp.bg !== this.boxSite.color) {
          //左移的时候与已经固定的方块重合，也就需要结束了
          return true

        }
      })
      if (hasErro) return
      this.boxSite.site = this.boxSite.site.map((item) => {
        this.boxs[item[0]][item[1]].bg = '#eee'
        // item[0] = item[0]
        item[1] = item[1] - 1
        return item
      })
      this.boxSite.site = this.boxSite.site.map((item) => {
        this.boxs[item[0]][item[1]].bg = this.boxSite.color
        return item
      })
    },
    moveRight() {
      const hasErro = this.boxSite.site.some((box) => {
        // 移超出了边界，结束
        const temp = this.boxs[box[0]]?.[box[1] + 1]
        if (!temp) {
          return true
        }

        if (temp.bg !== '#eee' && temp.bg !== this.boxSite.color) {
          //移的时候与已经固定的方块重合，也就需要结束了
          return true

        }
      })
      if (hasErro) return
      this.boxSite.site = this.boxSite.site.map((item) => {
        this.boxs[item[0]][item[1]].bg = '#eee'
        // item[0] = item[0]
        item[1] = item[1] + 1
        return item
      })
      this.boxSite.site = this.boxSite.site.map((item) => {
        this.boxs[item[0]][item[1]].bg = this.boxSite.color
        return item
      })
    },
    changeBox() {
      const hasErro = this.boxSite.site.some((box, index) => {
        // 变换超出了边界，结束变换
        const temp = this.boxs[box[0] + transition[this.curType][index].x * this.changeType]?.[box[1] + transition[this.curType][index].y * this.changeType]
        if (!temp) {
          return true
        }

        if (temp.bg !== '#eee' && temp.bg !== this.boxSite.color) {
          //变换的时候与已经固定的方块重合，也就需要结束变换了         

          return true

        }
      })
      if (hasErro) return
      this.boxSite.site = this.boxSite.site.map((item, index) => {

        this.boxs[item[0]][item[1]].bg = '#eee'
        item[0] = item[0] + transition[this.curType][index].x * this.changeType
        item[1] = item[1] + transition[this.curType][index].y * this.changeType
        return item
      })
      this.boxSite.site = this.boxSite.site.map((item) => {
        this.boxs[item[0]][item[1]].bg = this.boxSite.color
        return item
      })
      this.changeType = -this.changeType

    }
  },
};
</script>
 
<style lang='scss' scoped>
.game {
  .game-div {
    display: flex;
    .game-min {
      .row {
        display: flex;
        padding-top: 2px;
        .element {
          width: 20px;
          height: 20px;
          padding: 0;
          margin: 0 2px 0 0;
        }
      }
    }
    .right-div {
      padding-left: 20px;
      .ass {
        .row {
          display: flex;
          padding-top: 2px;
          .element {
            width: 20px;
            height: 20px;
            padding: 0;
            margin: 0 2px 0 0;
          }
        }
      }
      .score-div {
        div {
          height: 20px;
          line-height: 20px;
        }
        .ztks {
          width: 100px;
          height: 40px;
          margin-bottom: 10px;
          background-color: #1689e7;
          text-align: center;
          line-height: 40px;
          color: #fff;
        }
      }
    }
  }
  .control {
    width: 220px;
    :deep .el-button {
      width: 220px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background-color: #1689e7;
      margin-bottom: 20px;
      color: #fff;
    }
    .control-center {
      align-items: center;
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      :deep .el-button {
        width: 90px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        background-color: #1689e7;
        color: #fff;
      }
    }
  }
}
</style>