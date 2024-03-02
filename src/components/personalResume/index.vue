<template>
  <div class="personalResume">
    <el-radio-group v-model="active">
      <el-radio-button label="Home">
        <div>首页</div>
        <div>Home</div>
      </el-radio-button>
      <el-radio-button label="About">
        <div>关于</div>
        <div>About</div>
      </el-radio-button>
      <el-radio-button label="Works">
        <div>作品</div>
        <div>Works</div>
      </el-radio-button>
      <el-radio-button label="Concact">
        <div>联系</div>
        <div>Concact</div>
      </el-radio-button>
    </el-radio-group>
    <home></home>
    <about></about>
    <a class=" more" @click="$router.push('/')">查看更多</a>

  </div>
</template>
<script setup>
import { ref } from 'vue'
import home from './home'
import about from './about'
const active = ref('Home')
</script>
<style lang="scss" scoped>
.personalResume {
  background: black;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  background-image: url(../../assets/black.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  /* Firefox */
  scrollbar-width: none;
  /* Firefox 69.0+ */
  /* Chrome, Safari, Edge */
  -ms-overflow-style: none;
  /* Windows 10 and Edge */
  /* IE 10+ */
  scrollbar-track-horizontal: none;
  scrollbar-track-vertical: none;
  scrollbar-face-horizontal: none;
  scrollbar-face-vertical: none;
  -ms-overflow-style: none;

  :deep {
    .el-radio-group {
      position: fixed;
      top: 1px;
      left: calc(50% - 144.865px);
    }

    .el-radio-button__original-radio:checked+.el-radio-button__inner {
      background-color: #855a2f;
      color: white;
      border-color: #855a2f;
      box-shadow: -1px 0 0 0 #8e643b;
    }

    .el-radio-button__inner {
      background-color: black;
      color: white;
      border-color: black;
    }

  }

  .white {
    color: white;
  }

  .more {
    left: 10px;
    color: white;
    margin: 0;
    position: fixed;
    bottom: 10px;
    cursor: pointer;
  }
}

.personalResume::-webkit-scrollbar {
  display: none;
}
</style>