<template>
  <div class="helloKitty">
    <div id="head">
      <div id="face">
        <div class="lefteye"></div>
        <div class="righteye"></div>
        <div class="nose"></div>
      </div>

      <div class="leftwhiskers one">
        <span></span>
      </div>
      <div class="leftwhiskers two">
        <span></span>
      </div>
      <div class="leftwhiskers three">
        <span></span>
      </div>
      <div class="rightwhiskers four">
        <span></span>
      </div>
      <div class="rightwhiskers five">
        <span></span>
      </div>
      <div class="rightwhiskers six">
        <span></span>
      </div>
    </div>
    <div id="leftear">
      <span></span>
    </div>
    <div id="rightear"></div>
    <div id="bow">
      <div class="left"><span></span></div>
      <div class="center"></div>
      <div class="right"><span></span></div>
    </div>
    <div id="body">
      <div id="leftarm"><span></span></div>
      <div id="rightarm"><span></span></div>
      <div id="torso">
      
        <div class="crotch"></div>
      </div>
      <div id="chest"></div>
      <div id="leftleg"></div>
      <div id="rightleg"></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.helloKitty {
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 10%;
  div#head {
    height: 100px;
    width: 150px;
    border-radius: 190px;
    border: 6px solid #000;
    transform: rotate(3deg);
    position: relative;
    border-top-color: transparent;
    background-color: #fff;
    z-index: 2;
    #face {
      width: 100%;
      height: 100%;
      position: relative;
      .lefteye {
        width: 10px;
        background: #000;
        height: 17px;
        top: 44px;
        left: 28px;
        position: absolute;
        border-radius: 10px;
      }
      .righteye {
        width: 10px;
        background: #000;
        height: 17px;
        top: 44px;
        right: 28px;
        position: absolute;
        border-radius: 10px;
      }
      .nose {
        width: 19px;
        height: 13px;
        top: 64px;
        right: 69px;
        position: absolute;
        border-radius: 6px;
        box-sizing: border-box;
        background: #ffb814;
        border: 3px solid #000;
      }
    }
    .leftwhiskers,
    .rightwhiskers {
      background: #000;
    }
    .leftwhiskers.one {
      position: absolute;
      width: 20px;
      height: 6px;
      background: #000;
      border-radius: 4px 4px 2px 10px;
      transform: rotate(346deg);
      top: 57px;
      left: -21px;
      span {
        position: absolute;
        width: 20px;
        height: 6px;
        background: #000;
        border-radius: 4px 10px 2px 10px;
        transform: rotate(14deg);
        top: 2px;
        left: 19px;
      }
    }
    .leftwhiskers.two {
      width: 30px;
      position: absolute;
      height: 6px;
      background: #000;
      transform: rotate(332deg);
      top: 73px;
      left: -11px;
      border-radius: 10px 6px 6px 6px;
    }
    .leftwhiskers.three {
      width: 24px;
      height: 6px;
      background: #000;
      transform: rotate(322deg);
      top: 91px;
      left: -7px;
      border-radius: 10px 4px;
      position: absolute;
      span {
        position: absolute;
        width: 16px;
        height: 6px;
        background: #000;
        top: 3px;
        left: 22px;
        transform: rotate(22deg);
        border-radius: 0 10px 10px;
      }
    }
    .rightwhiskers.four {
      position: absolute;
      width: 20px;
      height: 6px;
      background: #000;
      border-radius: 4px 4px 2px 10px;
      transform: rotate(346deg);
      top: 38px;
      right: -5px;
      span {
        position: absolute;
        width: 20px;
        height: 6px;
        background: #000;
        border-radius: 4px 10px 2px 10px;
        transform: rotate(14deg);
        top: 2px;
        left: 19px;
      }
    }
    .rightwhiskers.five {
      width: 30px;
      position: absolute;
      height: 6px;
      background: #000;
      transform: rotate(10deg);
      top: 57px;
      right: -23px;
      border-radius: 10px 6px 6px 6px;
    }
    .rightwhiskers.six {
      width: 24px;
      height: 6px;
      background: #000;
      transform: rotate(32deg);
      top: 74px;
      right: -19px;
      border-radius: 10px 4px;
      position: absolute;
      span {
        position: absolute;
        width: 10px;
        height: 6px;
        background: #000;
        border-radius: 4px 10px 2px 10px;
        transform: rotate(331deg);
        top: 3px;
        left: -8px;
      }
    }
  }
  div#leftear {
    border: 6px solid #000;
    width: 31px;
    height: 32px;
    margin-left: -146px;
    border-bottom-color: transparent;
    border-right-color: transparent;
    border-radius: 10px 20px;
    transform: rotate(23deg);
    margin-top: -11px;
    z-index: 3;
    span {
      height: 6px;
      display: block;
      width: 58px;
      margin-left: 26px;
      border-radius: 10px;
      margin-top: -7px;
      background: #000;
      transform: rotate(347deg);
    }
  }
  div#rightear {
    border: 6px solid #000;
    width: 31px;
    height: 32px;
    margin-left: 48px;
    border-bottom-color: transparent;
    border-right-color: transparent;
    border-radius: 10px 20px;
    transform: rotate(64deg);
    margin-top: -2px;
    z-index: 3;
  }
  #bow {
    position: relative;
    transform: rotate(22deg);
    margin-top: 3px;
    margin-left: -25px;
    z-index: 3;

    .left {
      height: 32px;
      width: 25px;
      border-radius: 20px;
      border: 4px solid #000;
      background: red;
      left: -58px;
      top: -3px;
      position: absolute;
      span {
        height: 10px;
        width: 10px;
        border-radius: 20px;
        border: 4px solid #000;
        background: red;
        left: 12px;
        top: 8px;
        position: absolute;
      }
    }

    .right {
      height: 32px;
      width: 25px;
      border-radius: 20px;
      border: 4px solid #000;
      background: red;
      right: -17px;
      top: 1px;
      position: absolute;
      span {
        height: 10px;
        width: 10px;
        border-radius: 20px;
        border: 4px solid #000;
        background: red;
        right: 12px;
        top: 8px;
        position: absolute;
      }
    }
    .center {
      width: 23px;
      height: 23px;
      background: red;
      border: 4px solid #000;
      border-radius: 50%;
      box-sizing: border-box;
      left: -32px;
      top: 10px;
      z-index: 1;
      position: absolute;
    }
  }
  #body {
    position: relative;
    margin-top: 55px;
    margin-left: -72px;
    z-index: 1;
    div#chest {
      position: absolute;
      width: 50px;
      height: 30px;
      border-radius: 0 0 30px 30px;
      background: #ffc0ca;
      top: 37px;
      left: -9px;
      border: 6px solid #000;
      z-index: 3;
    }

    div#torso {
      width: 100px;
      position: absolute;
      height: 89px;
      background: red;
      border: 6px solid #000;
      border-radius: 100% 100% 30px 30px;
      top: 31px;
      left: -32px;
      z-index: 2;

      .crotch {
        height: 10px;
        width: 6px;
        background: #000;
        border-radius: 30px;
        top: 81px;
        position: absolute;
        left: 47px;
      }
    }
    div#leftleg {
      border: 6px solid #000;
      position: absolute;
      top: 121px;
      width: 46px;
      height: 30px;
      left: -31px;
      border-radius: 0px 10px 10px 20px;
    }
    div#rightleg {
      border: 6px solid #000;
      position: absolute;
      top: 121px;
      width: 46px;
      height: 30px;
      left: 21px;
      border-radius: 0px 0px 20px 10px;
    }
    div#leftarm {
      border: 6px solid #000;
      width: 30px;
      background: #ffc0ca;
      height: 40px;
      position: absolute;
      top: 49px;
      left: -47px;
      border-radius: 100% 100% 0 0;
      transform: rotate(45deg);

      span {
        border: 6px solid #000;
        width: 30px;
        position: absolute;
        height: 20px;
        border-radius: 0 0 100% 100%;
        top: 40px;
        left: -6px;
      }
    }
    div#rightarm {
      border: 6px solid #000;
      width: 30px;
      background: #ffc0ca;
      height: 40px;
      position: absolute;
      top: 51px;
      right: -96px;
      border-radius: 100% 100% 0 0;
      transform: rotate(312deg);

      span {
        border: 6px solid #000;
        width: 30px;
        position: absolute;
        height: 20px;
        border-radius: 0 0 100% 100%;
        top: 40px;
        left: -6px;
      }
    }
  }
}
</style>