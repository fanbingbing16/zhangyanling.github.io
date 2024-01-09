<template>
  <div id="app2" @mousedown="createFlower" class="container" @click="createFirework">
    <router-view></router-view>
    <loves ref="background"></loves>
  </div>
</template>

<script>
import loves from './components/loves.vue'
export default {
  name: 'App',
  components: {
    loves
  },
  data() {
    return {
      show: true,
      isDragging: false,
      initialX: 0,
      initialY: 0,
      currentX: 0,
      currentY: 0,
    }
  },
  created() {

  },
  methods: {
    createFlower(event) {
      const flower = document.createElement('div');
      flower.className = 'flower';
      flower.style.left = `${event.clientX}px`;
      flower.style.top = `${event.clientY}px`;
      document.body.appendChild(flower);

      setTimeout(() => {
        flower.remove();
      }, 5000);
    },
    createFirework(event) {
      const firework = document.createElement('div');
      firework.className = 'firework';
      firework.style.left = `${event.clientX + 4}px`;
      firework.style.top = `${event.clientY + 4}px`;
      document.body.appendChild(firework);

      setTimeout(() => {
        firework.remove();
      }, 1000);
    }

  }
}
</script>

<style lang="scss">
.el-table th.el-table__cell {
    // background-color: var(--el-table-tr-bg-color);
    background-color: #79bbff !important;
    color: whitesmoke;
}
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



@keyframes floatUp {
  0% {
    transform: translateY(0) rotate(0);
    opacity: 1;
  }

  100% {
    transform: translateY(-500px) rotate(720deg);
    opacity: 0;
  }
}



@keyframes shootUp {
  0% {
    transform: scale(1);
    opacity: 0;
  }

  25% {
    transform: scale(2);
    opacity: 1;
  }

  100% {
    transform: scale(1);
    opacity: 0;
  }
}
</style>
<style>
.firework {
  width: 8px;
  height: 8px;
  background-color: #fc5185;
  position: absolute;
  border-radius: 50%;
  animation: shootUp 1s linear;
  animation-fill-mode: forwards;
}

.flower {
  width: 20px;
  height: 20px;
  background-color: #fcb7b7;
  position: absolute;
  border-radius: 50% 50% 10% 10%/100% 100% 50% 50%;
  pointer-events: none;
  animation: floatUp 5s infinite ease-in-out;
  transform-origin: center bottom;
  box-shadow: 0px 0px 8px #ddd;
}
</style>
