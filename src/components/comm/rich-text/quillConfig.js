// import { upload } from '@/utils'
// import request from '@/utils/request'
// import index from './index.vue'
/* 富文本编辑图片上传配置*/
// const uploadConfig = {
//   action: process.env.VUE_APP_BASE_API + '/kuaixq/upload_save', // 必填参数 图片上传地址
//   methods: 'POST', // 必填参数 图片上传方式
//   // token: "Bearer " + getToken(), // 可选参数 如果需要token验证，假设你的token有存放在sessionStorage
//   name: 'files', // 必填参数 文件的参数名
//   // size: 2000, // 可选参数   图片大小，单位为Kb, 1M = 1024Kb
//   accept: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon' // 可选 可上传的图片格式
// }
// toolbar工具栏的工具选项
const toolOptions = [
  ['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
  [{ 'header': 1 }, { 'header': 2 }], // 几级标题
  [{ 'list': 'ordered' }, { 'list': 'bullet' }], // 有序列表，无序列表
  [{ 'script': 'sub' }, { 'script': 'super' }], // 下角标，上角标
  [{ 'indent': '-1' }, { 'indent': '+1' }], // 缩进
  [{ 'size': ['13px', '16px', '18px', '20px', '30px', '40px', '50px', '60px'] }], // 字体大小
  [{ 'color': [] }, { 'background': [] }], // 颜色选择
  [{ 'font': ['Microsoft-YaHei', 'SimSun', 'SimHei', 'KaiTi', 'FangSong'] }], // 字体
  [{ 'align': [] }], // 居中
  ['clean'], // 清除样式
  ['link', 'image'],
  ['video'] // 视频
]
// 处理图片上传事件,更改为base64为上传到服务器
const handlers = {
  // image: function image() {
  //   var self = this

  //   var fileInput = this.container.querySelector('input.ql-image[type=file]')
  //   if (fileInput === null) {
  //     fileInput = document.createElement('input')
  //     fileInput.setAttribute('type', 'file')
  //     // 设置图片参数名
  //     if (uploadConfig.name) {
  //       fileInput.setAttribute('name', uploadConfig.name)
  //     }
  //     // 可设置上传图片的格式
  //     fileInput.setAttribute('accept', uploadConfig.accept)
  //     fileInput.classList.add('ql-image')
  //     // 监听选择文件
  //     fileInput.addEventListener('change', function() {
  //       // 创建formData
  //       // var formData = new FormData()
  //       // formData.append('files', fileInput.files[0])
  //       // request({
  //       //   url: '/kuaixq/upload_save',
  //       //   method: 'post',
  //       //   data: formData,
  //       //   // params: { dir: 'image' },
  //       //   notHandle: true
  //       // }).then(res => {
  //       //   const length = self.quill.getSelection(true).index

  //       //   self.quill.insertEmbed(length, 'image', res.result[0])
  //       //   self.quill.setSelection(length + 1)
  //       //   fileInput.value = ''
  //       // }).catch(() => {
  //       // })
  //       upload(fileInput.files[0]).then(res => {
  //         if (res.url) {
  //           const length = self.quill.getSelection(true).index
  //           self.quill.insertEmbed(length, 'image', res.url)
  //           self.quill.setSelection(length + 1)
  //           fileInput.value = ''
  //         }
  //       })
  //     })
  //     this.container.appendChild(fileInput)
  //   }
  //   fileInput.click()
  // }

}

export default {
  placeholder: '请输入内容',
  modules: {
    toolbar: {
      container: toolOptions, // 工具栏选项
      handlers: handlers // 事件重写
    }

  }
}
