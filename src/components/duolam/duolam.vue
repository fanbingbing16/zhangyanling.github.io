<template>
  <div class="duolam">
    <div class="head">
      <div class="leftAge">
        <span></span>
      </div>
      <div class="rightAge">
        <span></span>
      </div>
      <div class="nose"></div>
      <div class="whiskersOne"></div>
      <div class="whiskersTwo"></div>
      <div class="whiskersThree"></div>
      <div class="whiskersFour"></div>
      <div class="whiskersFive"></div>
      <div class="whiskersSix"></div>
      <div class="mouth">
        <div class="tongue"></div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.duolam {
  background: #f5cb5f;
  width: 300px;
  height: 159px;  margin: auto;
  position: relative;
  margin-top: 10%;
  overflow: hidden;
  .head {
    position: relative;
    width: 280px;
    height: 280px;
    margin: auto;
    background: #24a4cd;
    top: 10px;
    border-radius: 100%;
    border: 1px solid #2e677c;
    .leftAge {
      border: 1px solid #2e677c;
      width: 51px;
      height: 67px;
      border-radius: 30px;
      transform: rotate(3deg);
      background: #fff;
      position: absolute;
      top: 34px;
      left: 93px;
      z-index: 2;
      span {
        background: #000;
        width: 26px;
        position: absolute;
        height: 30px;
        border-radius: 30px;
        top: 28px;
        left: 19px;
      }
      span::after {
        content: " ";
        width: 16px;
        position: absolute;
        height: 10px;
        background: white;
        border-radius: 10px 10px 8px 20px;
        transform: rotate(330deg);
        top: 6px;
        left: 4px;
      }
      span::before {
        content: " ";
        width: 10px;
        position: absolute;
        height: 10px;
        background: white;
        border-radius: 10px 10px 8px 20px;
        transform: rotate(330deg);
        top: 15px;
        left: 14px;
      }
    }
    .leftAge::after {
      content: " ";
      width: 4px;
      position: absolute;
      height: 6px;
      background: white;
      border-radius: 10px 10px 8px 20px;
      transform: rotate(330deg);
      top: 47px;
      left: 24px;
    }
    .rightAge {
      border: 1px solid #2e677c;
      width: 51px;
      height: 67px;
      border-radius: 30px;
      transform: rotate(2deg);
      background: #fff;
      position: absolute;
      top: 34px;
      right: 81px;
      z-index: 2;
      span {
        background: #000;
        width: 26px;
        position: absolute;
        height: 30px;
        border-radius: 30px;
        top: 28px;
        right: 19px;
      }
      span::after {
        content: " ";
        width: 13px;
        position: absolute;
        height: 10px;
        background: white;
        border-radius: 10px 10px 8px 20px;
        transform: rotate(330deg);
        top: 6px;
        right: 4px;
      }
      span::before {
        content: " ";
        width: 10px;
        position: absolute;
        height: 10px;
        background: white;
        border-radius: 10px 10px 8px 20px;
        transform: rotate(330deg);
        top: 15px;
        right: 14px;
      }
    }
    .rightAge::after {
      content: " ";
      width: 4px;
      position: absolute;
      height: 6px;
      background: white;
      border-radius: 10px 10px 8px 20px;
      transform: rotate(330deg);
      top: 47px;
      right: 24px;
    }
    .nose {
      width: 30px;
      height: 30px;
      background: #af0941;
      border: 1px solid #3c121e;
      border-radius: 100%;
      position: absolute;
      top: 93px;
      left: 128px;
      z-index: 2;
    }
    .nose::after {
      background: #fff;
      position: absolute;
      content: " ";
      width: 10px;
      height: 10px;
      border-radius: 100%;
      top: 6px;
      left: 16px;
    }
  }
  .head::after {
    width: 261px;
    height: 200px;
    display: block;
    border-radius: 100%;
    top: 64px;
    left: 10px;
    content: " ";
    position: absolute;
    background: #fff;
    border: 1px solid #2e677c;
  }
  .whiskersOne {
    width: 100px;
    height: 5px;
    position: absolute;
    top: 96px;
    left: 20px;
    border-radius: 50%;
    z-index: 2;
    border: 2px solid #6a6d87;
    border-bottom-color: transparent;
    border-left-color: transparent;
    transform: rotate(17deg);
    border-right-color: transparent;
  }
  .whiskersTwo {
    width: 77px;
    height: 5px;
    position: absolute;
    top: 117px;
    left: 31px;
    border-radius: 50%;
    z-index: 2;
    border: 2px solid #6a6d87;
    border-bottom-color: transparent;
    border-left-color: transparent;
    transform: rotate(7deg);
    border-right-color: transparent;
  }
  .whiskersFour {
    width: 100px;
    height: 13px;
    position: absolute;
    top: 136px;
    right: 13px;
    border-radius: 50%;
    z-index: 2;
    border: 2px solid #6a6d87;
    border-bottom-color: transparent;
    border-left-color: transparent;
    transform: rotate(1deg);
    border-right-color: transparent;
  }
  .whiskersFive {
    width: 100px;
    height: 5px;
    position: absolute;
    top: 96px;
    right: 12px;
    border-radius: 50%;
    z-index: 2;
    border: 2px solid #6a6d87;
    border-bottom-color: transparent;
    border-left-color: transparent;
    transform: rotate(346deg);
    border-right-color: transparent;
  }
  .whiskersSix {
    width: 77px;
    height: 14px;
    position: absolute;
    top: 117px;
    right: 31px;
    border-radius: 50%;
    z-index: 2;
    border: 2px solid #6a6d87;
    border-bottom-color: transparent;
    border-left-color: transparent;
    transform: rotate(356deg);
    border-right-color: transparent;
  }
  .whiskersThree {
    width: 100px;
    height: 5px;
    position: absolute;
    top: 136px;
    left: 13px;
    border-radius: 50%;
    z-index: 2;
    border: 2px solid #6a6d87;
    border-bottom-color: transparent;
    border-left-color: transparent;
    transform: rotate(1deg);
    border-right-color: transparent;
  }
}
</style>