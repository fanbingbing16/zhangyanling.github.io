<template>
  <div>
    <!-- css -->
    <router-link :to="{ path: '/helloKitty' }">helloKitty</router-link>
    <router-link :to="{ path: '/duolam' }">哆啦a梦</router-link>
    <!-- <router-link :to="{ path: '/pikaqiu' }">皮卡丘</router-link>-->
    <!-- vue -->
    <router-link :to="{ path: '/calendar' }">日历</router-link>
    <router-link :to="{ path: '/timer' }">计时器</router-link>
    <router-link :to="{ path: '/editor' }">编辑器</router-link>
    <!-- <router-link :to="{ path: '/computer' }">计算器</router-link>  -->
    <router-link :to="{ path: '/tianqi' }">天气预报</router-link>
    <router-link :to="{ path: '/triangle' }">在线图形生成器</router-link>
    <!-- vue小游戏 -->
    <router-link :to="{ path: '/blockBreaker' }">打砖块</router-link>
    <router-link :to="{ path: '/tetris' }">俄罗斯方块</router-link>
    <router-link :to="{ path: '/2048' }">2048</router-link>
    <router-link :to="{ path: '/mineDlearance' }">扫雷</router-link>
    <router-link :to="{ path: '/gobang' }">五子棋</router-link>
    <router-link :to="{ path: '/play2' }">play</router-link>


  </div>
</template>
<style lang="scss" scoped>
a {
  margin-left: 10px;
}
</style>