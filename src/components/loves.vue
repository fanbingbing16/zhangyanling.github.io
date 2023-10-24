<template>
  <div>
    <div id="lovesBgc"></div>
    <!-- 上升气泡   start-->
    <div class="bubbels">
      <div v-for="(item, index) in bubbles" v-bind:key="index" class="bubble" v-bind:style="item.color + item.width + item.height + item.left +
        item.delay + item.duration">
      </div>
    </div>
    <!-- 上升气泡   stop-->
  </div>
</template>

<script>
export default {
  data() {
    const bubbles = [];
    // count:1,top:'200px',left:'200px',translateY:'-40px',transform:0.5,opacity:0.5
    return {
      textIndex: 0,  //小心心数组下标
      count: 0,   //创建元素个数
      bubbles: bubbles
    }
  },
  methods: {
   
    createBubble() {
      // let left = [10, 20, 35, 50, 55, 65, 75, 80, 70, 85, 77];
      let wh = [40, 20, 50, 80, 35, 45, 25, 80, 15, 50, 77];
      let duration = [8, 5, 10, 7, 6, 8, 7, 6, 9, 5, 8];
      let delay = [0, 1, 1, 0, 0, 0, 2, 1, 0, 3, 2];
      let color = "rgb(" + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + ")";
      let bubble = {}
      for (var i = 0; i < 11; i++) {
        bubble = {
          left: 'left:' + Math.floor((Math.random() * 80) + 10) + '%;',
          width: 'width:' + wh[i] + 'px;',
          color: 'background-color:' + color + ';',
          height: 'height:' + wh[i] + 'px;',
          delay: 'animation-delay:' + delay[i] + 's;',
          duration: 'animation-duration:' + duration[i] + 's;',
        }
        this.bubbles.push(bubble);
        //使用随机生成位置，但是显然具有不可控性 
        // wh = Math.floor((Math.random()) * 65 + 15);
        // left = Math.floor((Math.random()) * 75 + 15) ;
        // duration = Math.floor(Math.random() * 11) % 6 + 5;
        // delay = Math.floor((Math.random() * 6) % 3 + 1) * Math.floor(Math.random() * 2) % 2;
        color = "rgb(" + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + ")";
        // this.sleep(1000);
      }
    },
    updateBubble() {
      //更新泡泡的位置
      let a = Math.floor(Math.random() * 80) + 10;
      this.bubbles[Math.floor(Math.random() * 11)].left = 'left:' + a + '%';
    }
  },
  beforeMount() {
    this.createBubble()
  }
}
</script>

<style>
#lovesBgc {
  position: absolute;
  /* background-color: bisque; */
  /* background-image: radial-gradient(red, yellow 10%, green 15%); */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  top: 0;
  left: 0;
  z-index: -1;
}



/* 下边都是泡泡 start */
.bubble {
  position: absolute;
  bottom: 0;
  border-radius: 50%;
  /*
		opacity 属性设置元素的不透明级别。 
		默认值: 1 继承性: no 版本: CSS3 
		JavaScript 语法: object.style.opacity=0.5
		*/
  opacity: 0.1;
  z-index: 999;
  animation: flying 10s infinite ease-in;
}

.bubble:nth-child(odd) {
  animation: flyingOdd 10s infinite ease-in;
}

.bubble:nth-child(even) {
  animation: flyingEven 10s infinite ease-in;
}

@keyframes flyingEven {
  0% {
    bottom: 0px;
    transform: translateX(0);
  }

  25% {
    transform: translateX(-200px);
  }

  50% {
    transform: translateX(0);
  }

  100% {
    bottom: 1080px;
    /* transform: rotateX(0); */
    transform: translateX(150px);
  }
}

@keyframes flyingOdd {
  0% {
    bottom: 0px;
    transform: translateX(0);
  }

  25% {
    transform: translateX(50px);
  }

  50% {
    transform: translateX(-50px);
  }

  75% {
    transform: translateX(-80px);
  }

  100% {
    bottom: 1080px;
    /* transform: rotateX(0); */
    transform: translateX(180px);
  }
}</style>

