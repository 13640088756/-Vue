<template>
  <div class="order-pay">
    <order-header title="订单支付">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-wrap">
          <div class="item-order">
            <div class="icon-succ"></div>
            <div class="order-info">
              <h2>订单提交成功！去付款咯～</h2>
              <p>请在<span>30分</span>内完成支付, 超时后将取消订单</p>
              <p>收货信息：{{ addressInfo }}</p>
            </div>
            <div class="order-total">
              <p>
                应付总额：<span>{{ payment }}</span
                >元
              </p>
              <p>
                订单详情
                <em
                  class="icon-down"
                  :class="{ up: showDetail }"
                  @click="showDetail = !showDetail"
                ></em>
              </p>
            </div>
          </div>
          <div class="item-daital" v-if="showDetail">
            <div class="item">
              <div class="detail-title">订单号：</div>
              <div class="detail-info">{{ orderNo }}</div>
            </div>
            <div class="item">
              <div class="detail-title">收货信息</div>
              <div class="detail-info">
                {{ addressInfo }}
              </div>
            </div>
            <div class="item good">
              <div class="detail-title">商品名称：</div>
              <div class="detail-info">
                <ul>
                  <li v-for="(item, index) in orderList" :key="index">
                    <img :src="item.productImage" alt="" />{{
                      item.productName
                    }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="item">
              <div class="detail-title">发票信息：</div>
              <div class="detail-info">电子发票 个人</div>
            </div>
          </div>
        </div>
        <div class="item-pay">
          <h3>选择以下支付方式付款</h3>
          <div class="pay-way">
            <p>支付平台</p>
            <div
              class="pay pay-ali"
              :class="{ checked: payType == 1 }"
              @click="submitPay(1)"
            ></div>
            <div
              class="pay pay-wechat"
              :class="{ checked: payType == 2 }"
              @click="submitPay(2)"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 微信支付 Modal框 -->
    <scan-pay-code
      :isShowCode="isShowCode"
      :imgCode="payimg"
      @closeCode="close"
    ></scan-pay-code>

    <modal
      title="支付确认"
      :btnType="'3'"
      :activeColor="true"
      sureText="查看订单"
      cancelText="未支付"
      :showModal="showModalPay"
      @submit="getOrderList"
      @cancel="showModalPay = false"
    >
      <template v-slot:body>
        <p>是否完成支付？</p>
      </template>
    </modal>
  </div>
</template>

<script>
import OrderHeader from "../components/OrderHeader.vue";
import scanPayCode from "../components/scanPayCode.vue";
import QRCode from "qrcode";
import Modal from "../components/Modal.vue";
export default {
  name: "orderPay",
  data() {
    return {
      showDetail: false,
      orderNo: this.$route.query.orderNo,
      addressInfo: "", //收货人信息
      orderList: [], //订单商品信息列表
      payment: 0, //总金额
      payType: "", //支付类型 1:支付宝 2:微信
      isShowCode: false, //控制微信收款码显示隐藏
      payimg: "", // 支付二维码 base64
      showModalPay: false, //支付确认弹窗 是否显示
      timePay: "", //轮询支付状态的 请求定时器
    };
  },
  components: {
    OrderHeader,
    scanPayCode,
    Modal,
  },
  mounted() {
    this.getOrderInfo();
  },
  methods: {
    getOrderInfo() {
      this.axios.get(`/orders/${this.orderNo}`).then((res) => {
        let item = res.shippingVo;
        this.addressInfo = `${item.receiverName} ${item.receiverMobile} ${item.receiverProvince} ${item.receiverCity} ${item.receiverDistrict} ${item.receiverAddress} `;
        this.orderList = res.orderItemVoList.map((item) => {
          return {
            productName: item.productName,
            productImage: item.productImage,
          };
        });
        this.payment = res.payment;
      });
    },
    close() {
      this.isShowCode = false;
      this.showModalPay = true;
      clearInterval(this.timePay);
    },
    submitPay(payType) {
      this.payType = payType;
      if (payType == 1) {
        window.open("/#/order/alipay?orderId=" + this.orderNo, "_blank");
      } else {
        this.axios
          .post("/pay", {
            orderId: this.orderNo,
            orderName: "小米商城微信支付", //扫码支付时订单名称
            amount: 0.01, //单位元
            payType: 2, //1支付宝，2微信
          })
          .then((res) => {
            QRCode.toDataURL(res.content)
              .then((url) => {
                this.isShowCode = true;
                this.payimg = url;
                this.getPayStatus();
              })
              .catch(() => {
                this.$message.error("二维码生成失败");
              });
          });
      }
    },
    //查看跳转订单列表
    getOrderList() {
      this.$router.push("/order/list");
    },
    //轮询支付状态
    getPayStatus() {
      this.timePay = setInterval(() => {
        this.axios.get(`orders/${this.orderNo}`).then((res) => {
          if (res.status == 20) {
            //取消定时器
            clearInterval(this.timePay);
            // 支付成功跳转
            this.getOrderList();
          }
        });
      }, 1000);
    },
  },
};
</script>

<style lang="scss">
.order-pay {
  .wrapper {
    background-color: #f5f5f5;
    padding-top: 30px;
    padding-bottom: 61px;
    .order-wrap {
      padding: 62px 50px;
      background-color: #fff;
      font-size: 14px;
      margin-bottom: 30px;
      .item-order {
        display: flex;
        align-items: center;
        .icon-succ {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: url(/imgs/icon-gou.png) #80c58a no-repeat center;
          background-size: 60px;
          margin-right: 40px;
        }
        .order-info {
          margin-right: 248px;
          h2 {
            font-size: 24px;
            color: #333333;
            margin-bottom: 20px;
          }
          p {
            color: #666666;
            span {
              color: #ff6700;
            }
          }
        }
        .order-total {
          > p:first-child {
            margin-bottom: 30px;
            span {
              font-size: 28px;
              color: #ff6700;
            }
          }
          .icon-down {
            display: inline-block;
            width: 14px;
            height: 10px;
            background: url(/imgs/icon-down.png) no-repeat center;
            background-size: contain;
            margin-left: 9px;
            transition: all 0.5s;
            cursor: pointer;
            &.up {
              transform: rotate(180deg);
            }
          }
        }
      }
      .item-daital {
        border-top: 1px solid #d7d7d7;
        padding-top: 47px;
        padding-left: 130px;
        font-size: 14px;
        margin-top: 45px;
        .item {
          display: flex;
          margin-bottom: 19px;
          .detail-title {
            width: 100px;
          }
          .detail-info {
            img {
              width: 30px;
              vertical-align: middle;
            }
          }
        }
      }
    }
    .item-pay {
      padding: 26px 50px 72px;
      background-color: #ffffff;
      color: #333333;
      h3 {
        font-size: 20px;
        font-weight: 200;
        color: #333333;
        padding-bottom: 24px;
        border-bottom: 1px solid #d7d7d7;
        margin-bottom: 26px;
      }
      .pay-way {
        font-size: 18px;
        .pay {
          display: inline-block;
          width: 188px;
          height: 64px;
          border: 1px solid #d7d7d7;
          cursor: pointer;
          &:last-child {
            margin-left: 20px;
          }
          &.checked {
            border: 1px solid #ff6700;
          }
        }
        .pay-ali {
          background: url(/imgs/pay/icon-ali.png) no-repeat center;
          background-size: 103px 38px;
          margin-top: 19px;
        }
        .pay-wechat {
          background: url(/imgs/pay/icon-wechat.png) no-repeat center;
          background-size: 103px 38px;
        }
      }
    }
  }
}
</style>