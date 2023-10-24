<template>
  <div class="blockBreaker">
    <p class="title">打砖块</p>
    <div class="box">
      <div class="score">得分:{{ score }}</div>
      <div class="boxs">
        <div class="box-item" v-for="item in data" :key="item.id" :style="{
          'margin-left': item.id % 9 === 0 ? '0' : '10px',
          background: item.click ? 'rgba(0,0,0,0)' : 'rgb(20, 146, 219)',
        }"></div>
      </div>
      <div class="ball"></div>
      <div class="ban" style="bottom: 20px; left: 304px"></div>
    </div>
    <div class="game">
      游戏规则：键盘左右方向键控制平台左右移动，球打到地面则失败，打到砖块则得一分
    </div>
    <dialog-vue dialogTitle="提示" v-model:visible="visible">
      <template v-slot:body>
        {{ tip }}
      </template>
      <template v-slot:footer>
        <button @click="
          score = 0;
        visible = false;
        changeBall();
        ">
          重新开始
        </button>
      </template>
    </dialog-vue>
  </div>
</template>
<script>
import dialogVue from '../comm/dialog.vue'
export default {
  components: {
    dialogVue
  },
  data() {
    return {
      visible: false,
      score: 0,
      data: [
        { click: false, id: 1 }
      ],
      yuanData: [],
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      inter: null,
      tip: '',
      boxs: [],
    }
  },
  created() {
    this.data = []
    for (let i = 0; i < 54; i++) {
      this.data.push({ click: false, id: i })
      this.yuanData.push({ click: false, id: i })
    }


  },
  mounted() {

    this.changeClient()
    const boxs = document.getElementsByClassName('box-item')

    for (let i = 0; i < boxs.length; i++) {
      this.boxs[i] = boxs[i].getBoundingClientRect()
    }
    window.addEventListener('resize', () => {
      for (let i = 0; i < boxs.length; i++) {
        this.boxs[i] = boxs[i].getBoundingClientRect()
      }
      this.changeClient()
      // if (!this.visible) {
      //   clearInterval(this.inter)
      //   this.inter = null
      //   this.changeBall()
      // }

    })

    this.changeBall()
    this.keyDown()
  },
  methods: {
    // 监听键盘
    keyDown() {
      document.onkeydown = (e) => {
        const width = document.getElementsByClassName('box')[0]?.getBoundingClientRect() || 0 - 70 - 1
        const style = document.getElementsByClassName('ban')[0]?.style?.left
        //事件对象兼容
        let e1 = e || event || window.event || arguments.callee.caller.arguments[0]
        //键盘按键判断:左箭头-37;上箭头-38；右箭头-39;下箭头-40//左
        if (e1 && e1.keyCode == 37) {// 按下左箭头
          if (style?.slice(0, -2) > 0) {
            document.getElementsByClassName('ban')[0].style.left = style.slice(0, -2) - 12 + 'px'
          }
        } else if (e1 && e1.keyCode == 39) {// 按下右箭头
          if (style?.slice(0, -2) < width) {
            document.getElementsByClassName('ban')[0].style.left = +(style.slice(0, -2)) + 12 + 'px'
          }
        }
      }
    },

    changeClient() {
      const client = document.getElementsByClassName('box')[0]?.getBoundingClientRect()
      this.left = client?.left + 20
      this.right = client?.right - 20
      this.top = client?.top + 20 + 26
      this.bottom = client?.bottom - 20
    },
    changeBall() {
      this.x = Math.random() * 12 + 7
      this.y = (Math.random() * 12 + 7)
      this.leftBall = 0
      this.topBall = 0

      this.inter = setInterval(() => {
        this.leftBall += this.x
        this.topBall += this.y
        if (document.getElementsByClassName('ball')[0]) {
          document.getElementsByClassName('ball')[0].style.marginLeft = this.leftBall + 'px'
          document.getElementsByClassName('ball')[0].style.marginTop = this.topBall + 'px'
        } else {
          clearInterval(this.inter)
          this.inter = null
        }

        const clientBall = document.getElementsByClassName('ball')[0]?.getBoundingClientRect()
        const clickBall = this.boxs.some((item, index) => {
          if (clientBall?.top >= item?.top && clientBall?.top <= item?.top + item?.height) {
            if (clientBall?.left >= item?.left && clientBall?.left <= item?.left + item?.width && this.data[index].click === false) {
              this.data[index].click = true
              this.score++
              return true
            }
          }

        })
        if (this.score >= this.data.length) {
          clearInterval(this.inter)
          this.top = '恭喜您，您赢得了比赛，是否再来一局？'
          this.visible = true
          this.score = 0
          this.data = [...this.yuanData]
        }
        if (clickBall) {
          this.x = -(Math.random() * 12 + 7)
          this.y = (Math.random() * 12 + 7)
          return
        }

        if (clientBall?.bottom >= this.bottom) {
          const clientBan = document.getElementsByClassName('ban')[0]?.getBoundingClientRect()
          if (clientBan?.left + 70 >= clientBall?.left && clientBan?.left - 70 <= clientBall?.left) {
            if (this.left + this.leftBall < this.right / 2) {
              this.x = Math.random() * 12 + 7
              this.y = -(Math.random() * 12 + 7)
            } else {
              this.x = -(Math.random() * 12 + 7)
              this.y = -(Math.random() * 12 + 7)
            }

          } else {
            this.tip = '游戏失败，得分' + this.score
            this.score = 0
            this.visible = true
            this.data = [...this.yuanData]

            clearInterval(this.inter)
          }
        }
        else if (clientBall?.left <= this.left + 10) {
          this.x = Math.random() * 12 + 7
          this.y = (Math.random() * 12 + 7)
        } else if (clientBall?.right >= this.right - 10) {
          this.x = -(Math.random() * 12 + 7)
          this.y = -(Math.random() * 12 + 7)
        } else if (clientBall?.top <= this.top) {
          this.x = -(Math.random() * 12 + 7)
          this.y = (Math.random() * 12 + 7)
        }
      }, 100)
    }
  },
  onUnmounted() {

    clearInterval(this.inter)
    this.inter = null
  },
}
</script>
<style lang="scss" scoped>
.blockBreaker {
  width: 100%;
  height: 100%;
  background: rgb(20, 146, 219);
  margin: auto;
  box-sizing: border-box;

  .title {
    color: white;
    font-size: 28px;
    padding: 20px;
    margin: auto;
    text-align: center;
    font-weight: 600;
  }

  .box {
    width: 70%;
    height: 70%;
    background: white;
    border-radius: 10px;
    margin: auto;
    color: rgb(20, 146, 219);
    padding: 20px;
    box-sizing: border-box;
    font-size: 20px;
    position: relative;

    .score {
      text-align: end;
    }

    .boxs {
      width: 100%;
      display: flex;
      justify-content: center;
      align-content: center;
      flex-wrap: wrap;

      .box-item {
        width: calc(calc(100% - 80px) / 9);
        height: 30px;
        background: rgb(20, 146, 219);
        margin-top: 10px;
      }
    }

    .ball {
      border-radius: 100%;
      height: 30px;
      width: 30px;
      background: rgb(20, 146, 219);
      margin: 10px;
    }

    .ban {
      height: 20px;
      width: 70px;
      background: rgb(20, 146, 219);
      position: absolute;
      // bottom: 20px;
      // left: 304px;
      // left: 20px;
    }
  }

  .game {
    color: white;
    text-align: center;
    margin-top: 30px;
  }

  button {
    border: 0;
    background: rgb(20, 146, 219);
    border-radius: 4px;
    height: 30px;
    width: 80px;
    color: white;
  }
}
</style>