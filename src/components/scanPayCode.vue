<template>
  <div class="scan-pay-code" v-if="isShowCode">
    <div class="mask"></div>
    <div class="item-warp">
      <div class="item-img"></div>
      <div class="item-code">
        <div class="title">微信支付<em @click="closeCode"></em></div>
        <div class="qrcode"><img :src="imgCode" /></div>
        <div class="tip">
          <p>请使用微信扫一扫</p>
          <p>二维码完成支付</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "scan-pay-code",
  props:['isShowCode','imgCode'],
  data() {
    return {};
  },
  mounted() {},
  methods: {
    closeCode(){
      this.$emit('closeCode')
    }
  },
};
</script>

<style lang="scss">
.scan-pay-code {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  .mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #000000;
    opacity: 0.6;
  }
  .item-warp {
    position: fixed;
    width: 670px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    .item-img {
      display: inline-block;
      width: 296px;
      height: 485px;
      background: url(/imgs/pay/icon-scan.png) no-repeat center;
      background-size: contain;
    }
    .item-code {
      width: 370px;
      height: 440px;
      display: inline-block;
      background-color: #ffffff;
      .title {
        position: relative;
        height: 60px;
        line-height: 60px;
        color: #333333;
        font-size: 20px;
        padding: 0 18px;
        background: #f5f5f5;
        em {
          position: absolute;
          display: inline-block;
          width: 13px;
          height: 13px;
          top: 23.5px;
          right: 20px;
          background: url(/imgs/icon-close.png) no-repeat center;
          background-size: contain;
          cursor: pointer;
        }
      }
      .qrcode {
        text-align: center;
        padding: 44px 0 26px;
        img {
          width: 237px;
          height: 240px;
        }
      }
      .tip {
        text-align: center;
        font-size: 14px;
        color: #333333;
      }
    }
  }
}
</style>