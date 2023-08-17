<template>
  <div class="flex" style="justify-content: center">
    <button
      @click="add"
      class="m-t-30"
      style="margin-left: 10%; align-self: baseline"
    >
      新增
    </button>

    <div class="timer" :style="boxs.length > 4 ? 'height:100%;' : ''">
      <div
        class="box"
        v-for="(box, index) in boxs"
        :key="box.id"
        :class="
          (index % 2 === 1 ? 'm-l-10 ' : '') + (index > 1 ? 'm-t-10' : '')
        "
      >
        <div class="top">
          <span>{{ box.title }}</span>
          <span class="big" @click="deleteOne(box.id)">删除</span>
        </div>
        <div class="content">
          <circle-vue
            :startnum="box.startnum || 0"
            :id="'canvas' + box.id"
            :text="box.text"
          ></circle-vue>
        </div>
        <div class="bottom m-b-10">
          <span @click="boxs[index].stop = true" v-if="box.stop === false"
            >暂停</span
          >
          <span @click="start(box, index)" v-if="box.stop === true">开始</span>
          <span @click="reset(index)"> 重置</span>
        </div>
      </div>
      <add-timer :visible="visible" @submit="addTimer"></add-timer>
    </div>
  </div>
</template>
<script>
import circleVue from './timer/circle.vue'
import addTimer from './timer/add'
export default {
  components: { circleVue, addTimer },
  data() {
    return {
      startnum: 0,
      visible: false,
      boxs: [
        { timer: { minute: 5, second: 5, hour: 0 }, yuan: { minute: 5, second: 5, hour: 0 }, stop: false, title: '五分钟', id: 1 },
        // { timer: { minute: 5, second: 5, hour: 0 }, yuan: { minute: 15, second: 5, hour: 0 }, stop: false, title: '五分钟', id: 2 },
        // { timer: { minute: 5, second: 5, hour: 0 }, yuan: { minute: 25, second: 5, hour: 0 }, stop: false, title: '五分钟', id: 3 },
        // { timer: { minute: 5, second: 5, hour: 0 }, yuan: { minute: 5, second: 5, hour: 0 }, stop: false, title: '五分钟', id: 4 },
        // { timer: { minute: 5, second: 5, hour: 1 }, yuan: { minute: 5, second: 5, hour: 1 }, stop: false, title: '五分钟', id: 5 },
        // { timer: { minute: 0, second: 5, hour: 0 }, yuan: { minute: 5, second: 5, hour: 1 }, stop: false, title: '五分钟', id: 6 },
        // { timer: { minute: 0, second: 5, hour: 0 }, yuan: { minute: 0, second: 5, hour: 0 }, stop: false, title: '五分钟', id: 6 },
        // { timer: { minute: 0, second: 5, hour: 0 }, yuan: { minute: 0, second: 5, hour: 0 }, stop: false, title: '五分钟', id: 7 },
        // { timer: { minute: 0, second: 5, hour: 0 }, yuan: { minute: 0, second: 5, hour: 0 }, stop: false, title: '五分钟', id: 8 },
        // { timer: { minute: 0, second: 5, hour: 0 }, yuan: { minute: 0, second: 5, hour: 0 }, stop: false, title: '五分钟', id: 9 },
        // { timer: { minute: 0, second: 5, hour: 0 }, yuan: { minute: 0, second: 5, hour: 0 }, stop: false, title: '五分钟', id: 10 },

      ]
    }
  },
  created() {
    setInterval(() => {
      this.startnum++
      this.boxs = this.boxs.map(item => {
        if (!item.stop) {
          if (item.timer.second > 0) {
            item.timer.second--
          } else if (item.timer.minute > 0) {
            item.timer.minute--
            item.timer.second = 59
          } else if (item.timer.hour > 0) {
            item.timer.hour--
            item.timer.minute = 59
            item.timer.second = 59
          } else {
            item.stop = true
            item.clear = true
          }
          item.startnum = (item.timer.hour * 60 + item.timer.minute + item.timer.second / 60) / (item.yuan.hour * 60 + item.yuan.minute + item.yuan.second / 60) * 100
          item.text = `${item.timer.hour >= 10 ? item.timer.hour : ('0' + item.timer.hour)}:${item.timer.minute >= 10 ? item.timer.minute : ('0' + item.timer.minute)}:${item.timer.second >= 10 ? item.timer.second : ('0' + item.timer.second)}`
        }
        return item
      })
    }, 1000)
  },
  methods: {
    add() {
      this.visible = false
      setTimeout(() => { this.visible = true })
    },
    addTimer(data) {
      this.visible = false
      this.boxs.push({ timer: { minute: data.time[1], second: data.time[2], hour: data.time[0] }, yuan: { minute: data.time[1], second: data.time[2], hour: data.time[0] }, stop: false, title: data.name, id: this.boxs.slice(-1)[0].id + 1 || 1 },
      )
    },
    deleteOne(id) {
      this.boxs = this.boxs.filter(item => item.id !== id)
    },
    reset(index) {
      this.boxs[index].timer = { ...this.boxs[index].yuan }
      this.boxs[index].stop = true
      this.boxs[index].startnum = (this.boxs[index].timer.hour * 60 + this.boxs[index].timer.minute + this.boxs[index].timer.second / 60) / (this.boxs[index].yuan.hour * 60 + this.boxs[index].yuan.minute + this.boxs[index].yuan.second / 60) * 100
      this.boxs[index].text = `${this.boxs[index].timer.hour >= 10 ? this.boxs[index].timer.hour : ('0' + this.boxs[index].timer.hour)}:${this.boxs[index].timer.minute >= 10 ? this.boxs[index].timer.minute : ('0' + this.boxs[index].timer.minute)}:${this.boxs[index].timer.second >= 10 ? this.boxs[index].timer.second : ('0' + this.boxs[index].timer.second)}`
    },
    start(box, index) {
      this.boxs[index].stop = false
      box.clear ? this.boxs[index].timer = { ...this.boxs[index].yuan } : ''
      this.boxs[index].startnum = (this.boxs[index].timer.hour * 60 + this.boxs[index].timer.minute + this.boxs[index].timer.second / 60) / (this.boxs[index].yuan.hour * 60 + this.boxs[index].yuan.minute + this.boxs[index].yuan.second / 60) * 100
      this.boxs[index].text = `${this.boxs[index].timer.hour >= 10 ? this.boxs[index].timer.hour : ('0' + this.boxs[index].timer.hour)}:${this.boxs[index].timer.minute >= 10 ? this.boxs[index].timer.minute : ('0' + this.boxs[index].timer.minute)}:${this.boxs[index].timer.second >= 10 ? this.boxs[index].timer.second : ('0' + this.boxs[index].timer.second)}`
    }
  }
}
</script>
<style lang="scss" scoped>
button {
  height: 30px;
  border: 0;
  width: 70px;
  border-radius: 10px;
  cursor: pointer;
}
.timer {
  width: 50%;
  // margin: auto;
  display: flex;
  flex-wrap: wrap;
  overflow-x: hidden;
  // height: 100%;
  // overflow-y: scroll;
  padding: 20px;
  box-sizing: border-box;
  .box {
    width: calc(50% - 5px);
    height: 300px;
    border-radius: 10px;
    border: 1px solid #9d9d9d;
    box-sizing: border-box;
    padding: 10px;
    .top {
      display: flex;
      justify-content: space-between;
      .big {
        text-align: end;
        cursor: pointer;
      }
    }
    .content {
      width: 100%;
      height: 250px;
    }
    .bottom {
      cursor: pointer;
      margin-top: -10px;
    }
  }
}
</style>