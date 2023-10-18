<template>
  <div class="play">
    <div class="dialog" v-if="visible">
      <div class="text">{{ text }}</div>
      <img src="../../assets/dialogBox.png" class="dialogBox" />
    </div>
    <div class="main" :style="stylePeo">
      <img src="../../assets/me.png" alt="" class="people" />
      <div class="body" v-if="visibleBody">
        <div class="arm" :style="styleArm"></div>
        <div class="abdomen"></div>
        <div class="Legs" :style="styleLeg"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  setup() {
    const text = ref('大家好，我姓张，是一个可爱的女孩子，我决定给大家表演一个绝活')
    const visible = ref(true)
    const visibleBody = ref(false)
    const stylePeo = ref('')
    const styleArm = ref('')
    const styleLeg = ref('')
    setTimeout(() => {
      text.value = "一定要看好了，别眨眼哦！"
      setTimeout(() => {
        visible.value = false
        stylePeo.value = `
        animation: move 2s ease-in-out infinite;
        `
        setTimeout(() => {
          text.value = "还没有结束，我还可以转的更快!"

          visible.value = true
          setTimeout(() => {
            stylePeo.value = `
        animation: move 0.5s ease-in-out infinite;
        `
            setTimeout(() => {
              stylePeo.value = `
        animation: move 0.05s ease-in-out infinite;
        `
              text.value = "还是太慢了，看我飞速转动!"
              setTimeout(() => {
                text.value = "是不是觉得这样太无聊了，再看看更厉害的"
                stylePeo.value = 'animation: move 0.5s ease-in-out infinite;'
                setTimeout(() => {
                  let times = 200
                  const inter = setInterval(() => {
                    text.value = "猜一猜我停下的时候在哪里吧"
                    stylePeo.value += `top:${Math.random() * 90}%;left:${Math.random() * 90}%;`
                    times--
                    if (times <= 0) {
                      text.value = "呼！可终于结束了，猜对我现在的位置了嘛？"
                      clearInterval(inter)
                      setTimeout(() => {
                        text.value = '不知道大家会不会好奇我怎么只有一个头，没有身体呢？'
                        setTimeout(() => {
                          text.value = '看看，这不就出来了嘛？'
                          visibleBody.value = true
                          setTimeout(() => {
                            text.value = '身体都出来了，跳舞就不能少了，绝对让大家如痴如醉。'
                            stylePeo.value = ''
                            setTimeout(() => {
                              stylePeo.value = 'animation: dance1 0.5s ease-in-out infinite;'
                              setTimeout(() => {
                                visible.value = false
                                styleArm.value = 'animation: dance1 0.5s ease-in-out infinite;'
                                setTimeout(() => {
                                  stylePeo.value = ''
                                  setTimeout(() => {
                                    // 
                                    styleLeg.value = 'animation: dance1 0.5s ease-in-out infinite;'
                                    setTimeout(()=>{
                                      styleLeg.value = 'animation: dance2 0.5s ease-in-out infinite;'
                                      setTimeout(()=>{
                                        styleArm.value = ''
                                        styleLeg.value = ''
                                        text.value = '表演结束了，大家伙记得把赏钱给了哦！'
                                        visible.value = true
                                      },2000)
                                    },2000)
                                  }, 1000)
                                }, 2000)
                              })
                            }, 1000)
                          }, 2000)
                        }, 2000)
                      }, 1000)
                    }
                  }, 100)
                }, 1000)

              }, 3000)
            }, 3000)

          }, 1000)

        }, 1000)
      }, 2000)
    }, 3000)
    return {
      text,
      visible,
      stylePeo,
      visibleBody,
      styleArm,
      styleLeg
    }
  }
}
</script>
<style lang="scss" scoped>
.play {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: relative;

  .dialog {
    position: relative;
    margin-top: -200px;
    width: 200px;

    .text {
      position: absolute;
      font-size: 14px;
      top: 33px;
      width: 144px;
      left: 30px;
    }
    .dialogBox {
      width: 200px;
      height: auto;
    }
  }

  .main {
    position: absolute;
    .people {
      width: 50px;
      height: auto;
      border-radius: 100%;
      position: relative;
      z-index: 2;
    }
    .body {
      position: relative;
      .arm {
        position: relative;
      }
      .arm:before {
        width: 20px;
        content: " ";
        display: block;
        height: 40px;
        background: #000;
        border-radius: 10px;
        top: -13px;
        transform: rotate(45deg);
        position: absolute;
      }
      .arm:after {
        width: 20px;
        content: " ";
        display: block;
        height: 40px;
        background: #000;
        border-radius: 10px;
        position: absolute;
        right: 0;
        top: -13px;
        transform: rotate(325deg);
      }
      .abdomen {
        width: 30px;
        height: 30px;
        background: #000;
        border-radius: 100%;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        position: absolute;
        left: 10px;
      }
      .Legs:before {
        content: " ";
        display: block;
        width: 12px;
        height: 18px;
        position: absolute;
        top: 28px;
        background: #000;
        left: 11px;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      }
      .Legs:after {
        content: " ";
        display: block;
        width: 12px;
        height: 18px;
        position: absolute;
        top: 28px;
        background: #000;
        left: 27px;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }
  }
}
</style>
<style>
@keyframes move {
  from {
    transform: rotate(30deg);
    opacity: 1;
  }
  to {
    transform: rotate(180deg);
    opacity: 0.9;
  }
}
@keyframes dance1 {
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(90deg);
  }
  100% {
    transform: rotateY(180deg);
  }
}
@keyframes dance2 {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateY(40deg);
  }

}
</style>