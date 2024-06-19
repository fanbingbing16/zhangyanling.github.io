<template>
  <div class="works">
    <div class="card">
      <div>My works</div>
      <div class="m-t-10">作品</div>
    </div>
    <el-divider></el-divider>
    <div class="imgs m-t-20">
      <div @click="change(img)" v-for="(img,index) in pngHashMap" :key="img.icon" class="img-one" :style="{'margin-top':index>0?'10px':0}">
        <img :src="img.icon">
        <div>{{ img.name }}</div>
      </div>
    </div>


  </div>
</template>
<script>
import pngHashMap from './importImg';

export default {
  data() {
    return {
      pngHashMap
    }
  },
  methods:{
    change(data){
      console.log(data)
      if(data.url?.indexOf('http')>-1){
        window.open(data.url)
      }else{
        this.$router.push(data.url)
      }
    }
  }

}
</script>
<style lang="scss" scoped>
.works {
  position: relative;

  .card {
    border: 1px solid #ff7200;
    width: 100px;
    padding: 10px;
    margin: auto;
    color: white;
    // position: relative;
  }

.imgs {
   color: white;
   font-size: 20px;
   font-weight: 600;
  img{
    width: 50%;
   
  }
  .img-one:hover{
border: 1px solid #fff;
border-radius: 10px;
cursor: pointer;
  }
}
  :deep {
    .el-divider--horizontal {
      position: absolute;
      top: 11px;
      border-top: 0;
      height: 1px;
      width: 100%;
      background-image: linear-gradient(to right, transparent, #fff, transparent);
    }
  }

  @media (min-width: 769px) {
    .imgs {
      font-size: 30px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-items: flex-end;
  .img-one{
width: 10%;
margin-top: 0 !important;
  }
  img{
    width: 100%;
   
  }
}
  }
}
</style>