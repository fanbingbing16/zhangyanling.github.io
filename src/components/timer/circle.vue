<template>
  <canvas :id="id" :style="ccStyle">
    <p>加载失败</p>
  </canvas>
</template>
<script>
import { reactive, toRefs } from 'vue'
import { watch } from 'vue'
export default {
  data() {
    return {

    }
  },
  props: {
    ccStyle: {
      default: 'width:100%;height:100%;',
      type: String
    },
    startnum: {
      type: Number,
      default: 0
    },
    id:{
      default:'canvas',
      type:String
    },
    text:{
      default:'',
      type:String
    }

  },
  watch: {
    startnum() {

    }
  },

  setup(props) {
    const state = reactive({
      canvas: null,
      ctx: null,
      circleX: null,
      circleY: null,
      radius: 60,
      percent: 100,
      lineWidth: 1,
      fontSize: 28,
      startnum: 0,
      timer: null, // 加载帧
    })
    
    watch(() => props.startnum, (newVal) => {
      state.startnum= newVal
        state.canvas = document.getElementById(props.id)
        state.ctx = state.canvas.getContext('2d')
        state.circleX = state.canvas.width / 2
        state.circleY = state.canvas.height / 2
        loop()
      
    })
    /**
        * @description 画圆
      */
    function circle(cx, cy, r) {
      state.ctx.beginPath()
      state.ctx.lineWidth = state.lineWidth
      state.ctx.strokeStyle = '#666666'
      state.ctx.lineCap = 'round'
      state.ctx.shadowColor = '#000000'
      state.ctx.shadowBlur = 0
      state.ctx.shadowOffsetX = 0
      state.ctx.shadowOffsetY = 0
      state.ctx.arc(cx, cy, r + 10, 0, (Math.PI / 180) * 360)
      state.ctx.moveTo(cx + r, cy)
      state.ctx.arc(cx, cy, r, 0, (Math.PI / 180) * 360)
      state.ctx.stroke()
    }
    /**
     * @description 画弧线
    */
    function sector(cx, cy, r, startAngle, endAngle, anti) {
      state.ctx.beginPath()
      state.ctx.moveTo(cx, cy - r - 5) // 从圆形底部开始绘画
      state.ctx.lineWidth = 12
      state.ctx.strokeStyle = '#000000'
      /**
       * @description 圆弧两端样式
      */
      state.ctx.lineCap = 'round'
      state.ctx.shadowColor = '#000000'
      state.ctx.shadowOffsetX = 0
      state.ctx.shadowOffsetY = 0
      state.ctx.shadowBlur = 4
      /**
       * @description 画弧
      */
      state.ctx.arc(
        cx,
        cy,
        r + 5,
        startAngle * (Math.PI / 180.0) - Math.PI / 2,
        endAngle * (Math.PI / 180.0) - Math.PI / 2,
        anti
      )
      state.ctx.moveTo(cx, cy - r)
      state.ctx.moveTo(cx, cy - r)
      state.ctx.stroke()
    }
    /**
     * @description 画遮盖
    */
    function cover(cx, cy, r) {
      state.ctx.beginPath()
      state.ctx.moveTo(cx, cy - r)
      state.ctx.clearRect(cx - 8, cy - r - 18, 6, 30)
    }
    /**
     * @description 画黑色小号圆遮盖中间部分
    */
    function sectorCover(cx, cy, r, startAngle, endAngle, anti) {
      state.ctx.beginPath()
      state.ctx.moveTo(cx, cy - r - 5) // 从圆形底部开始绘画
      state.ctx.lineWidth = 10
      state.ctx.strokeStyle = '#000000'
      /**
       * @description 圆弧两端样式
      */
      state.ctx.lineCap = 'round'
      state.ctx.shadowColor = '#000000'
      state.ctx.shadowOffsetX = 0
      state.ctx.shadowOffsetY = 0
      state.ctx.shadowBlur = 0
      /**
       * @description 画弧
      */
      state.ctx.arc(
        cx,
        cy,
        r + 5,
        startAngle * (Math.PI / 180.0) - Math.PI / 2,
        endAngle * (Math.PI / 180.0) - Math.PI / 2,
        anti
      )
      state.ctx.moveTo(cx, cy - r)
      state.ctx.moveTo(cx, cy - r)
      state.ctx.stroke()
    }
    /**
     * @description 刷新
    */
    function loading(n) {
      state.ctx.clearRect(0, 0, state.circleX * 2, state.circleY * 2) // 清除canvas内容
      /**
       * @description 中间的字
      */
      state.ctx.shadowColor = '#1000f0'
      state.ctx.shadowBlur = 4
      state.ctx.font = state.fontSize + 'px April'
      state.ctx.textAlign = 'center'
      state.ctx.textBaseline = 'middle'
      state.ctx.fillStyle = '#ffccff'
      state.ctx.fillText(props.text?props.text:(parseInt(n).toFixed(0) + '%'), state.circleX, state.circleY)
      /**
       * @description 圆形
      */
      circle(state.circleX, state.circleY, state.radius)
      /**
       * @description 圆弧
      */
      sector(state.circleX, state.circleY, state.radius, 0, (n / 100) * 360)
      sectorCover(state.circleX, state.circleY, state.radius, 0, (n / 100) * 360) // 黑色小号实心圆充当背景遮挡
      cover(state.circleX, state.circleY, state.radius)
    }
    /**
     * @description 循环
    */
    async function loop() {
      // state.startnum = state.startnum + 1
      await loading(state.startnum)
      state.timer = requestAnimationFrame(loop)
      if (state.startnum === 100) {
        cancelAnimationFrame(state.timer)
      }
    }
    // onMounted(() => {
    //   state.canvas = document.getElementById('canvas')
    //   state.ctx = state.canvas.getContext('2d')
    //   state.circleX = state.canvas.width / 2
    //   state.circleY = state.canvas.height / 2
    //   // loop()
    // })
    return {
      ...toRefs(state)
    }
  },
  methods: {

  }
}
</script>
<style>
</style>