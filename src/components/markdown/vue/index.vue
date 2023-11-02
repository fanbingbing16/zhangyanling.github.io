<template>
  <div v-html="articalContent" class="markdown-body"></div>
</template>
<script>
import DemoMd from '../md/个人项目.md';
import company from '../md/公司项目.md'
export default {
  data() {
    return {
      articalContent: ""
    };
  },

  mounted() {
    const { marked } = require("marked");
    this.articalContent = marked(this.$route.query?.type === 'company' ? company : DemoMd);
  }
};
</script>
<style lang="scss" scoped>
.markdown-body {
  overflow-y: scroll;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;

  :deep h1 {
    text-align: left;
    color: red;
  }

  :deep h2 {
    text-align: left;

  }

  :deep h3 {
    text-align: left;
  }

  :deep h4 {
    text-align: left;
  }

  :deep h5 {
    text-align: left;
  }

  :deep h6 {
    text-align: left;
  }
  
}

</style>
