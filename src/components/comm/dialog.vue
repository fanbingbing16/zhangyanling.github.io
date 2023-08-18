<template>
  <div class="comm-dialog" v-if="visibleOne">
    <div class="back"></div>
    <div class="content">
      <div class="top-title">
        <div>{{ dialogTitle }}</div>
        <i @click="close">x</i>
      </div>
      <div class="comm-sialog-body">
              <slot name="body"></slot>

      </div>
      <div class="footer ">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  props: {
    visible: {
      default: false,
      type: Boolean
    },
    dialogTitle: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      visibleOne: this.visible,
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
    close(){
      this.visibleOne = false;
      this.$emit('update:visible', false); 
    }
  }
}
</script>
<style lang="scss" scoped>
.comm-dialog {
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
    z-index: 999;
  }
  .content {
    z-index: 1000;
    width: 300px;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0px 0px 8px #797979;
    left: calc(50% - 190px);
    position: fixed;
    top: 30%;
    background: white;

    text-align: center;
    .comm-sialog-body{
      margin-top: 20px;
    }
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
   
    .footer {
      width: 100%;
      margin-top: 20px;
    }
  }
}
</style>