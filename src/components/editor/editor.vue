<template>
  <div>
    <!-- <textarea v-model="text" @click="textr"></textarea> -->
    <div
      contenteditable="true"
      @click="textr"
      ref="editor"
      id="editor"
      v-on:blur="focus"
    >
      {{ content }}
    </div>
    <div class="flex" style="justify-content: center">
      <el-button @click="toggleBold">加粗</el-button>
      <el-button @click="toggleUnderline">下划线</el-button>
      <el-button @click="toggleItalic">斜体</el-button>
      <el-input
        type="color"
        v-model="color"
        @input="changeColor"
        style="width: 50px"
      />
      <el-select
        v-model="fontSize"
        @change="changeFontSize"
        id="fontSize"
        placeholder="字号选择"
      >
        <el-option
          v-for="data in fontSizeData"
          :key="data.label"
          :value="data.value"
          :label="data.label"
        >
          {{ data.label }}
        </el-option>
      </el-select>
      <el-select
        v-model="font"
        @change="changeFont"
        id="font"
        placeholder="字体选择"
      >
        <el-option value="Arial">Arial</el-option>
        <el-option value="Verdana">Verdana</el-option>
        <el-option value="Times New Roman">Times New Roman</el-option>
      </el-select>
      <!-- <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
        :auto-upload="false"
        :on-change="insertImage"
      >
        <el-button size="small" type="primary">插入图片</el-button>
      </el-upload> -->
      <!-- <el-button @click="insertImage" type="file">插入图片</el-button> -->
    </div>
    <div>{{ formattedText }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      htmlText: '',
      isBold: false,
      isUnderline: false,
      isItalic: false,
      color: '#000000',
      fontSizeData: [],
      fontSize: '',
      font: '',
      selectionStart: 0,
      selectionEnd: 0
    };
  },
  created() {
    this.fontSizeData = []
    for (let i = 7; i >= 1; i--) {
      this.fontSizeData.push({ label: 8 - i + '号', value: i })
    }
  },
  mounted() {


  },
  methods: {

    focus() {
      this.$refs.editor?.focus();
    },
    toggleBold() {
      document.execCommand("bold");
    },
    toggleUnderline() {
      document.execCommand("underline");
    },
    toggleItalic() {
      document.execCommand("italic");
    },
    changeColor() {
      // Handle color change logic
      document.execCommand("foreColor", false, this.color);
    },
    changeFontSize() {
      // Handle font size change logic
      document.execCommand("fontSize", false, this.fontSize)
    },
    changeFont() {
      // Handle font change logic
      document.execCommand("fontName", false, this.font);
    },
    insertImage() {
      // Handle image insertion logic
      
    },
    textr(e) {

      this.selectionStart = e.target.selectionStart
      this.selectionEnd = e.target.selectionEnd
      this.select = window.getSelection().toString()
    }
  },
  computed: {
    formattedText() {
      return ''
    }
  }
};
</script>
<style lang="scss" scoped>
div[contenteditable="true"] {
  border: 1px solid #cfcbcb;
  width: 80%;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 0px 0px 6px #efefef;
  outline: none;
  text-align: start;
  padding: 10px;
}
div[contenteditable="true"]:focus {
  border-color: #666666;
}
</style>