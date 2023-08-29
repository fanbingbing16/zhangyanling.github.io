<template>
  <div id="app2">
    <router-view></router-view>
 
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style lang="scss">
html {
  height: 100%;
  width: 100%;
}
body {
  margin: 0;
  height: 100%;
  width: 100%;
  padding: 0;
  /* margin-top: -60px; */
}
#app2 {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
   text-align: center; 
  color: #2c3e50;
  /* margin-top: 60px; */
  padding-top: 0;
  height: 100%;
  width: 100%;
  // border: 1px solid transparent;
  box-sizing: border-box;
  padding: 1px;
}
div#app {
    height: 100%;
}
html {
  overflow-x:hidden; //隐藏水平滚动条
  overflow-y:hidden;//隐藏垂直滚动条
}
</style>
