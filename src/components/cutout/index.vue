<template>
  <div>
    <h1>抠出纯色背景图</h1>
  
    <el-upload class="upload-demo" drag action="#" :before-upload="processImage">
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        拖拽文件到这或者 <em>点击上传</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          jpg/png 文件， 大小限制500kb
        </div>
      </template>
    </el-upload>
    <div class="container">
      <img class="bg" src="../../assets/bg.png" style="width: 0;height: 0;" />
      <canvas id="myCanvas" style="display: none;"></canvas>
      <img src="" class="picture" />
    </div>
    <el-button @click="saveImage" class="m-t-94">下载图片</el-button>
  </div>
</template>



<script setup>
import { onMounted, ref } from 'vue'
let ctx = null
let canvas = null
const url = ref('')
onMounted(() => {
  canvas = document.getElementById('myCanvas')
  ctx = canvas.getContext('2d')

})

function processImage(file) {
  const reader = new FileReader()
  reader.onload = function (e) {
    const img = new Image()
    img.onload = function () {

      canvas.width = img.width
      canvas.height = img.height
      document.querySelector('.bg').setAttribute('style', `height:300px;width:300px`)
      ctx.drawImage(img, 0, 0)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      let colorCounts = {}

      for (let i = 0; i < data.length; i += 4) {
        let color = `${Math.floor(data[i] / 10) * 10},${Math.floor(data[i + 1] / 10) * 10},${Math.floor(data[i + 2] / 10) * 10}`
        colorCounts[color] = colorCounts[color] ? colorCounts[color] + 1 : 1
      }

      let maxCount = 0
      let maxColor = ''
      for (let color in colorCounts) {
        if (colorCounts[color] > maxCount) {
          maxCount = colorCounts[color]
          maxColor = color
        }
      }
      for (let i = 0; i < data.length; i += 4) {
        let currColor = `${Math.floor(data[i] / 10) * 10},${Math.floor(data[i + 1] / 10) * 10},${Math.floor(data[i + 2] / 10) * 10}`
        if (currColor === maxColor) {
          data[i + 3] = 0
        }
      }

      ctx.putImageData(imageData, 0, 0)
      canvas.toBlob(function (blob) {
        url.val = window.URL.createObjectURL(blob)
        const picture = document.querySelector('.picture')
        picture.setAttribute('src', url.val)
        picture.setAttribute('style', 'display:block;')

        ctx.clearRect(0, 0, canvas.width, canvas.height)
      })
    }
    img.src = e.target.result
  }
  reader.readAsDataURL(file)

  return false
}
function saveImage() {
  console.log(1)
  const a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url.val
  a.download = 'output.png'
  a.click()
  window.URL.revokeObjectURL(url.val)
  a.remove()
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 300px;
  text-align: center;
  height: 300px;
  margin: auto;

  img,
  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }

  .picture {
    width: 100%;
    display: none;
    height: auto;
  }
}
</style>