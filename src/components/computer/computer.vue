<template>
  <div class="computer">
    <div class="smallText">{{ smallText }}</div>
    <div class="big">{{ bigText }}</div>
    <div class="flex box">
      <div
        v-for="(ope, index) in operate"
        :key="index"
        :style="
          (index + 1) % 4 === 0 && index !== 0 ? '' : 'margin-right:10px;'
        "
        @click="handleCom(ope)"
      >
        {{ ope }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      smallText: '',
      bigText: '0',
      isResult: false,//此时是否是等于的结果
      operate: ['%', 'CE', 'C', 'x', '1/x', 'x²', '√x', '\u00F7', 7, 8, 9, 'x', 4, 5, 6, '-', 1, 2, 3, '+', '+/-', 0, '.', '=']
    }
  },
  methods: {
    handleCom(text) {
      if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].indexOf(text) > -1) {
        this.numbberClick(text)
      } else if (text === '=') {
        this.dengyuClick()
      } else if (['CE', 'C'].includes(text)) {
        this.clearClick()
      } else if (['+', '-', 'x', '\u00F7'].includes(text)) {
        this.yunsClick(text)
      } else if ('.' === text) {
        this.dianClick()
      }
    },
    dianClick() {
      if (this.bigText.indexOf('.') === -1) {
        this.bigText = this.bigText + '.'
      }
    },
    yunsClick(text) {
      if (this.smallText === '') {
        this.smallText = this.bigText + text
      }
    },
    clearClick() {
      this.smallText = ''
      this.bigText = '0'
    },
    dengyuClick() {
      if (this.smallText === '') {
        this.smallText = this.bigText + '='
      } else if (this.smallText.indexOf('=') === -1) {
        this.smallText = this.smallText + this.bigText + '='
        this.bigText = String(eval(this.smallText.slice(0, -1)))
      }
    },
    numbberClick(num) {
      if (String(this.bigText).length < 21) {
        if (this.bigText === '0') {
          if (num !== 0) {
            this.bigText = num
          }
        } else {
          this.bigText += String(num)
        }
      }

    }
  }
}
</script>
<style lang="scss" scoped>
.computer {
  width: 700px;
  margin: auto;
  height: 500px;
  background: #f3f3f3;
  margin-top: 10%;
  padding: 20px;
  border-radius: 10px;
  .smallText {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: end;
    font-size: 18px;
  }
  .big {
    width: 100%;
    height: 70px;
    line-height: 70px;
    font-size: 58px;
    text-align: end;
  }
  .box {
    flex-wrap: wrap;
    width: 100%;
    div {
      width: 165.5px;
      text-align: center;
      // padding: 30px;
      height: 50px;
      line-height: 50px;
      border: 1px solid #e9e9e9;
      border-radius: 4px;
      margin-top: 10px;
      background: #fff;
      font-size: 22px;
      cursor: pointer;
    }
  }
}
::selection {
  // background: transparent;
  outline: none;
  // color: #ffffff;
}
</style>