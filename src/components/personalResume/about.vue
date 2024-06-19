<template>
  <div class="about">
    <div class="card">
      <div>ABOUT ME</div>
      <div class="m-t-10">关于我</div>


    </div> <el-divider></el-divider>
    <div class="detail">
      <div>姓名：张烟铃</div>
      <div>专业：计算机科学与技术</div>
      <div>出生年月：1999-11-18</div>
      <div>学历：本科</div>
      <div>学校：福州理工学院</div>
      <div>链接：<a
          href="https://mp.weixin.qq.com/s/TM00Hf7vjwgdn3szljb19A">https://mp.weixin.qq.com/s/TM00Hf7vjwgdn3szljb19A</a>
      </div>
      <div class="step">
        <span>2021年进入格物科技有限公司实习<div class="first m-t-4"></div>
          <div class="last"></div>
        </span>
        <span>
          <div class="first m-b-4"></div>2022年福州理工学院毕业<div class="first m-t-4"></div>
          <div class="last"></div>
        </span>
        <span>
          <div class="first m-b-4"></div>2022年进入厦门奇侠兔网络科技有限公司<div class="first m-t-4"></div>
          <div class="last"></div>
        </span>
        <span>
          <div class="first m-b-4"></div>2023年4月因公司经营不善项目组解散<div class="first m-t-4"></div>
          <div class="last"></div>
        </span>
        <span>
          <div class="first m-b-4"></div>2023年4月进入厦门华资源科技有限公司<div class="first m-t-4"></div>
          <div class="last"></div>
        </span>
        <span>
          <div class="first m-b-4"></div>2024年4月开源大赛获三等奖<div class="first m-t-4"></div>
          <div class="last"></div>
        </span>
        <span>
          <div class="first m-b-4"></div>2024年4月被选为开源之夏导师<div class="first m-t-4"></div>
          <div class="last"></div>
        </span>
        <span>
          <div class="first m-b-4"></div>2024年6月因公司发不起工资导致大裁员
        </span>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.about {
  position: relative;

  .card {
    border: 1px solid #ff7200;
    width: 100px;
    padding: 10px;
    margin: auto;
    color: white;
    // position: relative;
  }

  .step {
    margin-top: 12px;
    border: 1px solid #fff;
    padding: 20px;
    border-radius: 10px;
  }

  .step span .first {
    content: " ";
    height: 10px;
    text-align: center;
    display: block;
    margin: auto;
    width: 1px;
    background: #ff7200;
  }

  .step span .last {
    height: 10px;
    display: block;
    width: 10px;
    background: transparent;
    border: 1px solid #ff7200;
    border-radius: 100%;
    margin: auto;
  }

  .detail {
    color: white;
    margin: auto;
    text-align: left;
    padding: 20px;
  }

  :deep {
    .el-divider--horizontal {
      position: absolute;
      top: 11px;
      border-top: 0;
      height: 1px;
      width: 100%;
      background-image: linear-gradient(to right, transparent, #fff, transparent);
    }
  }

  .m-t-4 {
    margin-top: 4px !important;
  }

  .m-b-4 {
    margin-bottom: 4px !important;
  }

  @media (min-width: 769px) {
    .detail {
      text-align: center;

    }

    .step {
      text-align: center;
      display: flex;
      border: 0;
      padding: 0;

      span {
        display: flex;

        .first {
          width: 10px;
          height: 1px;
          margin: auto !important;
        }
      }
    }
  }

}</style>