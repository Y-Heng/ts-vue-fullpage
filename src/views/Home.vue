<template>
  <div class="page-container">
    <div class="fullpage-wp" v-fullpage="opts">
      <div class="page page1">
        <h1 class="title">打造「高效智能化」内部协作</h1>
        <div class="buttons">
          <div class="button">
            <svg-icon iconClass="window" class="svg-icon"></svg-icon>mac 版
          </div>
          <div class="button">
            <svg-icon iconClass="apple" class="svg-icon"></svg-icon>windows 版
          </div>
        </div>
        <div class="version-des">2019-08-06更新 版本:2.0</div>
        <img src="../assets/home/page1.png" alt class="img" />
      </div>
      <div class="page page2 two-lines">
        <div class="left text-des">
          <div class="title">化妆师智能终端</div>
          <div class="line"></div>
          <div class="sub-title">订单便捷流转，高效协作</div>
          <p>
            <svg-icon iconClass="click" class="svg-icon" />一键接单
          </p>
          <p>
            <svg-icon iconClass="bell" class="svg-icon" />自动统计绩效
          </p>
          <p>
            <svg-icon iconClass="pie" class="svg-icon" />自动通知摄影师
          </p>
        </div>
        <img src="../assets/home/page2.png" alt class="img right" />
      </div>
      <div class="page page3 two-lines">
        <img src="../assets/home/page3.png" alt class="img left" />
        <div class="right text-des">
          <div class="title">摄影师端</div>
          <div class="line"></div>
          <div class="sub-title">让摄影专注于拍摄，底片整理0差错</div>
          <p>
            <svg-icon iconClass="click" class="svg-icon" />照片一键上传
          </p>
          <p>
            <svg-icon iconClass="pen" class="svg-icon" />系统记录修图意见
          </p>
          <p>
            <svg-icon iconClass="bell" class="svg-icon" />自动通知修图师
          </p>
        </div>
      </div>
      <div class="page page4 two-lines">
        <div class="left text-des">
          <div class="title">修图&审片</div>
          <div class="line"></div>
          <div class="sub-title">待修订单实时提醒，快速下载原片</div>
          <p>
            <svg-icon iconClass="click" class="svg-icon" />中央修图
          </p>
          <p>
            <svg-icon iconClass="could" class="svg-icon" />图片云存储
          </p>
          <p>
            <svg-icon iconClass="talk" class="svg-icon" />修图意见在线反馈
          </p>
          <p>
            <svg-icon iconClass="click" class="svg-icon" />一键发片
          </p>
        </div>
        <img src="../assets/home/page4.png" alt class="img right" />
        <div class="bottom">
          <div class="text">
            简约网，专注为生活服务类商家提供最专业的公众号预约系统，微信预约系统，照相馆预约系统，实现在线预约，O2O平台结合，让你的预约管理更便捷
            <br />欢迎来电咨询：400-838-5618
          </div>
          <div
            class="copyright"
          >Copyright © 2016-2019 EasyShare. All Rights Reserved. 粤ICP备17085863号</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VueFullpage from '@/directive/full-page/index.js'
// import TouchEmulator from "@/directive//full-page/touch.js";
// TouchEmulator();
Vue.use(VueFullpage)

export default class Home extends Vue {
  private opts: any = {
    start: 0,
    dir: 'v',
    loop: false,
    needIndicator: true,
    duration: 500
  };
}
</script>

<style lang="scss">
.page-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  color: #fff;
  .page {
    background: radial-gradient(
      circle,
      rgba(46, 93, 149, 1) 0%,
      rgba(10, 10, 63, 1) 100%
    );
  }
  .text-des {
    .title {
      font-size: 47px;
    }
    .line {
      margin: 19px 0;
      position: relative;
      height: 2px;
      background-color: #8c9aff;
      width: 100%;
      &::before {
        position: absolute;
        display: block;
        content: " ";
        width: 50px;
        left: 0;
        top: -2px;
        height: 6px;
        bottom: 2px;
        background-color: #8c9aff;
        border-radius: 2px;
      }
    }
    .sub-title {
      font-size: 26px;
      margin-bottom: 42px;
    }
    p {
      font-size: 22px;
      .svg-icon {
        color: #8c9aff;
        margin-right: 6px;
      }
    }
  }
  .page1 {
    flex-direction: column;
    .title {
      margin: 0;
      font-size: 52px;
      font-weight: 200;
    }
    .buttons {
      margin-top: 75px;
      display: flex;
      .button {
        min-width: 200px;
        border: 1px solid rgba(255, 255, 255, 1);
        border-radius: 2px;
        text-align: center;
        font-size: 24px;
        padding: 12px 15px;
        margin-left: 15px;
        margin-right: 15px;
        .svg-icon {
          margin-right: 5px;
        }
      }
    }
    .version-des {
      margin-top: 24px;
      font-size: 20px;
    }
    .img {
      margin-top: -100px;
      max-width: 65%;
    }
  }
  .two-lines {
    .left {
      margin-right: 100px;
    }
    .img {
      display: block;
      max-width: 40%;
    }
  }
  .page4 {
    padding-bottom: 140px;
    .bottom {
      position: absolute;
      background-color: #49579f;
      padding: 40px 0;
      text-align: center;
      font-size: 12px;
      bottom: 0;
      left: 0;
      right: 0;
      line-height: 20px;
      .text {
        margin: 0 auto;
      }
      .copyright {
        margin-top: 20px;
      }
    }
  }

  @media screen and (min-width: 810px) {
    .page4 {
      .text {
        max-width: 810px;
      }
    }
  }
  @media screen and (max-width: 750px) {
    .two-lines {
      flex-direction: column;
      .left {
        margin-right: 0;
        margin-bottom: 20px;
      }
      .img {
        max-width: 80%;
        margin: 0 auto;
        display: block;
      }
    }
  }
}
</style>
