<template>
  <div>
    <router-link :to="{ path: '/calendar' }">日历</router-link>
    <router-link :to="{ path: '/timer' }">计时器</router-link>
    <router-link :to="{ path: '/pikaqiu' }">皮卡丘</router-link>
  </div>
</template>
<style lang="scss" scoped>
a{
  margin-left: 10px;
}
</style>