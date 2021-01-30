<template>
  <div class="alipay">
    <loading></loading>
    <div v-html="content"></div>
  </div>
</template>

<script>
import Loading from "./Loading.vue";
export default {
  name: "alipay",
  data() {
    return {
      orderid: this.$route.query.orderId,
      content: "", //html源码
    };
  },
  components: { Loading },
  mounted() {
    this.aliPaySubmmit();
  },
  methods: {
    aliPaySubmmit() {
      this.axios
        .post("/pay", {
          orderId: this.orderid,
          orderName: "小米商城支付宝支付", //扫码支付时订单名称
          amount: 0.01, //单位元
          payType: 1, //1支付宝，2微信
        })
        .then((res) => {
          this.content = res.content;
          setTimeout(() => {
            document.getElementById('bestPayForm').submit()
          }, 100);
        });
    },
  },
};
</script>