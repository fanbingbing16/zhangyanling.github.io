<template>
  <div class="triangle">
    <header class="tri-header">
      <h2 class="tri-title">在线图形生成器</h2>
    </header>
    <main>
      <div class="operator">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
          <el-form-item prop="graphical" label="图形">
            <el-radio-group v-model="ruleForm.graphical">
              <el-radio label="三角形">三角形</el-radio>
              <el-radio label="五角星">五角星</el-radio>
              <el-radio label="平行四边形">平行四边形</el-radio>
              <el-radio label="梯形">梯形</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            prop="direction"
            label="方向"
            v-if="ruleForm.graphical === '三角形'"
          >
            <el-radio-group v-model="ruleForm.direction">
              <el-radio label="上">上</el-radio>
              <el-radio label="下">下</el-radio>
              <el-radio label="左">左</el-radio>
              <el-radio label="右">右</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            prop="width"
            label="宽度:"
            v-if="hasWHD.includes(ruleForm.graphical)"
          >
            <el-slider v-model="ruleForm.width" :max="200"></el-slider>
          </el-form-item>
          <el-form-item
            prop="height"
            label="高度:"
            v-if="hasWHD.includes(ruleForm.graphical)"
          >
            <el-slider v-model="ruleForm.height" :max="200"></el-slider>
          </el-form-item>
          <el-form-item prop="rotate" label="选择角度:">
            <el-slider v-model="ruleForm.rotate" :max="360"></el-slider>
          </el-form-item>
          <el-form-item prop="color" label="背景色:">
            <el-input type="color" v-model="ruleForm.color"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="display-true">
        <div
          class="samll-triangle"
          v-if="ruleForm.graphical === '三角形'"
          :style="{
            borderColor: getBorderColor,
            borderWidth: getBorderWidth,
            transform: 'rotate(' + ruleForm.rotate + 'deg)',
          }"
        ></div>
        <div
          id="star-five"
          v-if="ruleForm.graphical === '五角星'"
          :style="getStarCss['#star-five']"
        >
          <div class="star-before" :style="getStarCss['.star-before']"></div>
          <div class="star-after" :style="getStarCss['.star-after']"></div>
        </div>
        <div
          id="parallelogram"
          v-if="ruleForm.graphical === '平行四边形'"
          :style="` width: ${ruleForm.width}px; height: ${ruleForm.height}px; transform: skew(20deg) rotate(${ruleForm.rotate}deg); background: ${ruleForm.color};`"
        ></div>
        <div
          id="trapezoid"
          v-if="ruleForm.graphical === '梯形'"
          :style="csstrapezoid"
        ></div>
      </div>
      <div class="copy-css operator m-t-10">
        <header class="tri-header flex">
          <h3 class="tri-title">css代码</h3>
          <el-button @click="copy">复制代码</el-button>
        </header>
        <el-input
          v-if="ruleForm.graphical === '三角形'"
          type="textarea"
          disabled
          v-model="getCss"
          :rows="7"
          resize="none"
        ></el-input>
        <el-input
          v-if="ruleForm.graphical === '五角星'"
          type="textarea"
          disabled
          v-model="getStarCssAll"
          :rows="14"
          resize="none"
        ></el-input>
        <el-input
          v-if="ruleForm.graphical === '平行四边形'"
          v-model="cssparallelogram"
          disabled
          :rows="14"
          resize="none"
        ></el-input>

        <el-input
          v-if="ruleForm.graphical === '梯形'"
          v-model="csstrapezoid"
          disabled
          :rows="6"
          resize="none"
          type="textarea"

        ></el-input>
      </div>
      <div class="copy-html m-t-10" v-if="ruleForm.graphical === '五角星'">
        <header class="tri-header flex">
          <h3 class="tri-title">html代码</h3>
          <el-button @click="copyHtml">复制代码</el-button>
        </header>

        <el-input
          type="textarea"
          disabled
          :value="getStarHtml"
          :rows="1"
          resize="none"
        ></el-input>
      </div>
    </main>
  </div>
</template>
<script>
export default {
  components: {

  },
  data() {
    return {
      ruleForm: {

        direction: '上',
        width: 60,
        height: 60,
        rotate: 0,
        color: 'rgb(0, 0, 0)',
        graphical: '三角形'
      },

      hasWHD: ['三角形', '平行四边形', '梯形'],
      rules: {},
    }
  },
  computed: {
    csstrapezoid() {
      return `border-bottom: ${this.ruleForm.height}px solid ${this.ruleForm.color};
      border-left: ${this.ruleForm.width / 4}px solid transparent;
      border-right: ${this.ruleForm.width / 4}px solid transparent;
      height: 0;
      width: ${this.ruleForm.width / 2}px;
      transform:rotate(${this.ruleForm.rotate}deg);`
    },
    cssparallelogram() {
      return `width: ${this.ruleForm.width}px; height: ${this.ruleForm.height}px; transform: skew(20deg) rotate(${this.ruleForm.rotate}deg); background: ${this.ruleForm.color};`
    },
    getStarHtml() {
      return `<div id="star-five"><div class="star-before" ></div><div class="star-after" ></div></div>`
    },
    getBorderColor() {
      const temp = {
        '上': 'transparent transparent ' + this.ruleForm.color,
        '下': this.ruleForm.color + ' transparent transparent ',
        '左': 'transparent ' + this.ruleForm.color + ' transparent transparent ',
        '右': 'transparent  transparent transparent ' + this.ruleForm.color,

      }
      return temp[this.ruleForm.direction]
    },
    getBorderWidth() {
      const temp = {
        '上': `0px ${this.ruleForm.width / 2}px ${this.ruleForm.height}px`,
        '下': `${this.ruleForm.height}px ${this.ruleForm.width / 2}px 0px`,
        '左': `${this.ruleForm.height / 2}px ${this.ruleForm.width}px  ${this.ruleForm.height / 2}px 0px`,
        '右': `${this.ruleForm.height / 2}px 0px ${this.ruleForm.height / 2}px ${this.ruleForm.width}px `,
      }
      return temp[this.ruleForm.direction]
    },
    getCss() {
      return ` border-color: ${this.getBorderColor};
 border-width: ${this.getBorderWidth};
 transform: rotate(${this.ruleForm.rotate}deg);
 display: inline-block;
 border-style: solid;
 width: 0;
 height: 0;`

    },
    getStarCss() {
      return {
        '#star-five': `margin: 100px 0;
position: relative;
display: block;
color:  ${this.ruleForm.color};
width: 0px;
height: 0px;
border-right: 100px solid transparent;
border-bottom: 70px solid ${this.ruleForm.color};
border-left: 100px solid transparent;
transform: rotate(${this.ruleForm.rotate + 35}deg);`,
        '.star-before': `border-bottom: 80px solid  ${this.ruleForm.color};
border-left: 30px solid transparent;
border-right: 30px solid transparent;
position: absolute;
height: 0;
width: 0;
top: -45px;
left: -65px;
transform: rotate(-35deg);`,
        '.star-after': `position: absolute;
color:   ${this.ruleForm.color};
top: 3px;
left: -105px;
width: 0px;
height: 0px;
border-right: 100px solid transparent;
border-bottom: 70px solid   ${this.ruleForm.color};
border-left: 100px solid transparent;
transform: rotate(-70deg);`

      }
    },
    getStarCssAll() {
      return `#star-five{
        ${this.getStarCss['#star-five']}
      }
      .star-before{
        ${this.getStarCss['.star-before']}
      }
      .star-after{
        ${this.getStarCss['.star-after']}
      }
      `
    }
  },
  methods: {
    copy() {
      const temp = { '三角形': this.getCss, '五角星': this.getStarCssAll, '平行四边形': this.cssparallelogram ,'梯形':this.csstrapezoid}
      navigator.clipboard.writeText(temp[this.ruleForm.graphical])
      this.$message.success('复制成功')
    },
    copyHtml() {
      navigator.clipboard.writeText(this.getStarHtml)
      this.$message.success('复制成功')
    }
  }
}
</script>
<style lang="scss" scoped>
.triangle {
  background: #dbdbdb;
  height: 100%;
  width: 100%;
  margin-top: -20px;
  padding: 20px;
  box-sizing: border-box;
  main {
    display: flex;
    flex-wrap: wrap;
    .operator {
      width: calc(50% - 5px);
      // height: 500px;
      background: rgb(255, 255, 255);
      margin-right: 10px;
      padding: 10px;
      box-sizing: border-box;
    }
    .copy-html {
      width: calc(50% - 5px);
      // height: 500px;
      background: rgb(255, 255, 255);
      padding: 10px;
      box-sizing: border-box;
      .tri-header {
        justify-content: space-between;
      }
    }
    .display-true {
      width: calc(50% - 5px);
      height: 300px;
      background: rgba(255, 255, 255, 0.6);
      line-height: 300px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      .samll-triangle {
        display: inline-block;
        border-style: solid;
        width: 0;
        height: 0;
      }
    }
    .copy-css {
      .tri-header {
        justify-content: space-between;
      }
    }
  }
}
</style>