<template>
  <div class="main">
    <div class="box">
      <img src="..\assets\1.jpeg" alt="" class="box-img">
      <h1 class="name">Zhang YanLing</h1>
      <h2>Web Front-end Development </h2>
      <h3>Welcome to my personal website! </h3>
      <h3>These menus can all be clicked on below
      </h3>
      <a href="/#/myProject" class="one">Personal project&nbsp;&nbsp;
      </a>
      <a href="/#/myProject?type=company" class="one">Company Projects&nbsp;
      </a>
      <!-- <a href="/#/flower" class="one">Tutorial&nbsp;
      </a> -->
      <a href="/#/exericise" class="one">Online Code Editor&nbsp;</a>
      <!-- <a href="/#/logs" class="one">Personal Log&nbsp;</a>-->
      <a href="/#/resume" class="one">Personal Resume&nbsp;</a>

    </div>
    <!-- https://uigradients.com/#Blu -->
    <!-- css -->
    <!-- <router-link :to="{ path: '/helloKitty' }">helloKitty</router-link> -->
    <!-- <router-link :to="{ path: '/duolam' }">哆啦a梦</router-link> -->
    <!-- <router-link :to="{ path: '/pikaqiu' }">皮卡丘</router-link>-->
    <!-- vue -->
    <!--<router-link :to="{ path: '/calendar' }">日历</router-link> -->
    <!-- <router-link :to="{ path: '/timer' }">计时器</router-link> -->
    <!-- <router-link :to="{ path: '/editor' }">编辑器</router-link> -->
    <!-- <router-link :to="{ path: '/computer' }">计算器</router-link>  -->
    <!-- <router-link :to="{ path: '/tianqi' }">天气预报</router-link> -->
    <!-- <router-link :to="{ path: '/triangle' }">在线图形生成器</router-link> -->
    <!-- <router-link :to="{ path: '/play2' }">play</router-link> -->
    <!-- <router-link :to="{ path: '/randomPass' }">随机密码生成</router-link> -->

    <!-- vue小游戏 -->
    <!-- <router-link :to="{ path: '/blockBreaker' }">打砖块</router-link> -->
    <!-- <router-link :to="{ path: '/tetris' }">俄罗斯方块</router-link> -->
    <!-- <router-link :to="{ path: '/2048' }">2048</router-link> -->
    <!-- <router-link :to="{ path: '/mineDlearance' }">扫雷</router-link> -->
    <!-- <router-link :to="{ path: '/gobang' }">五子棋</router-link> -->
    <!-- <router-link :to="{ path: '/Sudoku' }">数独</router-link> -->
    <!-- <router-link :to="{ path: '/huarongRoad' }">华容道</router-link> -->
    <!-- <router-link :to="{ path: '/xiaoxiaole' }">消消乐(三种玩法)</router-link> -->
    <!-- <router-link :to="{ path: '/typewriting' }">打字游戏</router-link> -->
  </div>
</template>
<style lang="scss" scoped>
.main {
  background: url("../assets/bg.jpg") no-repeat;
  background-size: cover;
  background-attachment: fixed;
  height: 100%;
  width: 100%;
  color: white;
  margin: 0;
  padding: 0.1px;

  
  @media (max-width: 768px) {  
  /* 针对小屏幕设备的样式 */  
  .box{
    color: rgb(6, 173, 151);
    width:100%;
    background: rgba(0, 0, 0, 0.4);
    text-align: center;
    margin-top: 5%;
    font-family: 'Century Gothic', sans-serif;
   .box-img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }

   h1 {
    font-size: 30px;
        letter-spacing: 4px;
    font-weight: 400;
  }

   h2 {
    font-size: 20px;
    letter-spacing: 3px;
    font-weight: 300;

  }

 
} .one {
    text-decoration: none;
    font-size: 20px;
    font-weight: 600;
    color: grey;
  }
}  
  
@media (min-width: 769px) {  
  /* 针对大屏幕设备的样式 */ 
.box{
  color: rgb(6, 173, 151);
    width:40%;
    background: rgba(0, 0, 0, 0.4);
    padding: 40px;
    text-align: center;
    margin: auto;
    margin-top: 5%;
    font-family: 'Century Gothic', sans-serif;
   .box-img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }

   h1 {
    font-size: 50px;
    letter-spacing: 4px;
    font-weight: 400;
  }

   h2 {
    font-size: 30px;
    letter-spacing: 3px;
    font-weight: 300;

  }

 
} .one {
    text-decoration: none;
    font-size: 20px;
    font-weight: 600;
    color: grey;
  }
}
  

  .one:hover {
    color: rgb(6, 173, 151);
  }
}

a {
  margin-left: 10px;
  color: white;
}

</style>