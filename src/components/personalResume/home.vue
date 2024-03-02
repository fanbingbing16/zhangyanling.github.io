
<template>
  <div class="home">
    <div class=""></div>
    <img src="../../assets/dream.png" class="m-t-100"/>
    <div class="flex text">
      <span>Front end development</span>
      <span class="white m-l-10 m-r-10"> ---- </span>
      <span class="white">行走在无尽的代码之路.</span>
    </div>
    <div class="bigText m-t-30">
      <span v-for="(item, index) in bigText" :key="index" class="m-r-10">
        <span>{{ item[0] }}</span>
        <span class="white" v-for="(item2, index2) in item.split('').slice(1)" :key="index2">{{ item2 }}
        </span>
      </span>
    </div>
    <div class="m-t-30">
      I love this industry
    </div>
  </div>
</template>

<script setup>

const bigText = ['Interfaces', 'Reflect', 'Reality']

</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  margin-top: -45px;

 color: #ff7200;
 
img{
  max-width:100%;
}
  .white {
    color: white;
  }
  .text{
    margin: auto;
    width: 372px;

  }
}
@media (max-width: 768px) {  
  /* 针对小屏幕设备的样式 */  
  .bigText{
    font-size:30px
  }
}  
  
@media (min-width: 769px) {  
  /* 针对大屏幕设备的样式 */ 
  .bigText{
    font-size:60px;
  }
}
</style>       