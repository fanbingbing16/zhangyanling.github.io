<template>
  <div id="app2">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data(){
    return{
      show:true
    }
  },
  created(){
    // let time = 0
    // const inter = setInterval(()=>{
    //   const app2 = document.getElementById('app2')
    //   console.log(app2,'app2',app2.children,app2.children.length)
    //   time++
    //   if(app2.children.length>=2){
    //     clearInterval(inter)
    //     this.show = false
    //   }
    //   if(time>=15000){
    //     clearInterval(inter)
    //   this.show = false
    //   }
    // },200)
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
  overflow-x: hidden; //隐藏水平滚动条
  overflow-y: hidden; //隐藏垂直滚动条
}
</style>
