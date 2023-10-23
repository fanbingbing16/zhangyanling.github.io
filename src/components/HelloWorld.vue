<template>
  <div class="main">
    <h1>欢迎您进入我的个人网站</h1>
    <div class="card-list m-t-40">
      <div class="card" @click="$router.push('/myProject')">
        <p>个人项目</p>
      </div>
      <div class="card m-t-30" @click="$router.push('/myProject')">
        <p>公司项目</p>
      </div>
    </div>

    <!-- css -->
    <!-- <router-link :to="{ path: '/helloKitty' }">helloKitty</router-link> -->
    <!-- <router-link :to="{ path: '/duolam' }">哆啦a梦</router-link> -->
    <!-- <router-link :to="{ path: '/pikaqiu' }">皮卡丘</router-link>-->
    <!-- vue -->
    <!-- <router-link :to="{ path: '/calendar' }">日历</router-link> -->
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
  background-image: url("../assets/bg.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 100%;
  width: 100%;
  color: white;
  h1 {
    margin: 0;
    padding-top: 15%;
  }
  .card-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: column;
    align-content: center;
    .card {
      cursor: pointer;
      width: 30%;
      height: 50px;
      background: #fff;
      color: #000;
      padding: 10px;
      border-radius: 10px;
      &:hover{
        background: #ccc;
      }
    }
  }
}
a {
  margin-left: 10px;
  color: white;
}
</style>