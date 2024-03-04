<template>
  <div class="works">
    <div class="card">
      <div>My work</div>
      <div class="m-t-10">作品</div>
    </div>
    <el-divider></el-divider>
  </div>
</template>
<style lang="scss" scoped>
.works {
  .card {
    border: 1px solid #ff7200;
    width: 100px;
    padding: 10px;
    margin: auto;
    color: white;
  }

  :deep {
    .el-divider--horizontal {
      margin-top: -36px;
      border-top: 0;
      height: 1px;
      width: 100%;
      background-image: linear-gradient(to right, transparent, #fff, transparent);
    }
  }
}
</style>