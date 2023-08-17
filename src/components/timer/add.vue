<template>
  <div class="timer-add" v-if="visibleOne">
    <div class="back"></div>
    <div class="content">
      <div class="top-title">
        <div>新增计时器</div>
        <i @click="visibleOne = false">x</i>
      </div>
      <div class="time">
        <div class="time-one" v-for="(item, index) in time" :key="index">
          <span class="v-shape-top" @click="add(index)"></span>
          <div
            class="m-b-10 m-t-10"
            :style="clickTime === index ? 'background: #f6f6f6;' : ''"
            @click="clickTime = index"
          >
            <span>{{ index > 0 ? ":" : "" }}</span>
            <span class="m-l-10">{{ item >= 10 ? item : "0" + item }}</span>
          </div>
          <span class="v-shape-bottom" @click="jian(index)"></span>
        </div>
      </div>
      <div class="flex m-t-40"><span>名称：</span><input v-model="name" /></div>
      <div class="footer m-t-30">
        <button @click="submit">保存</button>
        <button class="m-l-10" @click="visibleOne = false">取消</button>
      </div>
    </div>
    <dialog-vue dialog-title="提示" :visible="visibleTip">
      <template v-slot:body>
        {{ tip }}
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
  props: {
    visible: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      visibleOne: this.visible,
      visibleTip: false,
      time: [0, 0, 0],
      clickTime: 0,
      tip: ''
    }
  },
  created() {

  },
  watch: {
    visible(newVal) {
      this.visibleOne = newVal
    }
  },
  methods: {
    //增加计时器
    submit() {
      this.visibleTip = false
      if (!this.name) {
        this.tip = '名称必填'
        setTimeout(() => {
          this.visibleTip = true

        })
        return
      }
      if (this.time[0] === 0 && this.time[1] === 0 && this.time[2] === 0) {
        this.tip = '时间需要大于0'
        setTimeout(() => {
          this.visibleTip = true

        })
        return
      }
      this.$emit('submit', { name: this.name, time: this.time })
      this.visibleOne = false
    },
    //时间增加
    add(index) {
      this.time[index]++
      this.clickTime = index
      if (index === 0) {
        if (this.time[index] > 100) {
          this.time[index] = 0
        }
      } else {
        if (this.time[index] > 60) {
          this.time[index] = 0
        }
      }
    },
    //时间减少
    jian(index) {
      this.clickTime = index
      this.time[index]--
      if (index === 0) {
        if (this.time[index] < 0) {
          this.time[index] = 100
        }
      } else {
        if (this.time[index] < 0) {
          this.time[index] = 60
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.timer-add {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  .back {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    top: 0;
    left: 0;
  }
  .content {
    width: 200px;
    padding: 30px;
    border-radius: 10%;
    box-shadow: 0px 0px 8px #797979;
    left: calc(50% - 140px);
    position: fixed;
    top: 20%;
    background: white;
    text-align: center;
    .top-title {
      display: flex;
      justify-content: space-between;
      i {
        font-size: 18px;
        cursor: pointer;
      }
    }
    .flex {
      width: 100%;
    }
    input {
      border: 1px solid #d3d3d3;
      border-radius: 10px;
      height: 30px;
      padding-left: 10px;
      padding-right: 10px;
      outline: none;
      flex: 1;
      width: 100%;
    }
    input:focus {
      border: 1px solid #7c7c7c;
    }
    .footer {
      width: 100%;
      display: flex;
      justify-content: center;
      button {
        width: 47%;
        border: 0;
        border-radius: 10px;
        height: 30px;
        cursor: pointer;
      }
      button:first-child {
        background: #000;
        color: #fff;
      }
    }
    .time {
      display: flex;
      justify-content: center;
      margin-top: 30px;
      .time-one {
        display: flex;
        width: 30%;
        text-align: center;
        flex-direction: column;
        font-size: 24px;
        cursor: pointer;
        div {
          padding: 4px;
        }
        .v-shape-top {
          @include triangle($direction: top);
          cursor: pointer;
          margin: auto;
          margin-left: 30px;
        }

        .v-shape-top:before {
          @include triangleB($direction: top, $border-color: #fff);
        }
        .v-shape-bottom {
          @include triangle($direction: bottom);
          cursor: pointer;
          margin: auto;
          margin-left: 30px;
        }

        .v-shape-bottom:before {
          @include triangleB($direction: bottom, $border-color: #fff);
        }
      }
    }
  }
}
</style>