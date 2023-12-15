<template>
  <div class="exericise-field">
    <h1>在线代码编辑器</h1>
    <div class="boxs">
      <div class="box" v-for="(item, index) in boxs" :key="index" @click="$router.push(item.url)">
        <div class="title">{{ item.title }}</div>
        <div class="samll-title">{{ item.detail }}</div>
        <img :src="require('../../assets/' + item.logo)" alt="" srcset="" :style="item.detail?'height:90px;':'height:110px;'">
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

const boxs = ref([
  { title: 'Vue playground', logo: 'logo.png', url: '/exericise/vue' },
  { title: 'HTML playground', logo: 'html.jpg', url: '/exericise/html', detail: '可书写JavaScript代码,也支持scss' }

])
</script>
<style lang="scss" scoped>
.exericise-field {
  .boxs {
    display: flex;
    flex-wrap: wrap;
    padding: 20px 0 20px 20px;
    align-items: center;
    justify-content: center;
    align-content: center;

    .box {
      padding: 20px;
      width: 20%;
      margin-right: 20px;
      border: 1px solid #fff;
      box-shadow: 0px 0px 10px #f0f0f0;
      border-radius: 10px;
      height: 184px;
      cursor: pointer;

      img {
        height: 110px;
      }

      .samll-title {
        font-size: 14px;
        color: #ccc;
      }
    }

    .box:hover {
      box-shadow: 0px 0px 10px #dddddd;
    }
  }
}
</style>