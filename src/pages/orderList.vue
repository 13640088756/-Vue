<template>
  <div class="order-list">
    <order-header title="订单列表">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <div class="order-item" v-for="(order,index) in list" :key="index"> 
            <div class="order-title">
              <div class="title-info">
                {{order.createTime}}
                <span>|</span>
                {{order.receiverName}}
                <span>|</span>
                订单号：{{order.createTime}}
                <span>|</span>
                {{order.paymentTypeDesc}}
              </div>
              <div class="title-money">
                <span>应付金额：</span>
                <span class="money">{{order.payment}}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content" v-for="(item,j) in order.orderItemVoList" :key="j">
              <div class="good-list">
                <div class="good-img">
                  <img
                    :src="item.productImage"
                    alt=""
                  />
                </div>
                <div class="good-name">
                  <div class="name">{{item.productName}}</div>
                  <div class="money">{{item.totalPrice +'×'+item.quantity}}元</div>
                </div>
              </div>
              <div class="good-state" v-if="order.status==20"><a href="javascript:;">{{order.statusDesc}}</a></div>
              <div class="good-state" v-else><a href="javascript:;" @click="goToPay(order.orderNo)">{{order.statusDesc}}</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderHeader from "../components/OrderHeader.vue";
export default {
  name: "loginList",
  data(){
    return{
      list:[],
    }
  },
  components: {
    OrderHeader,
  },
  mounted(){
    this.getOrderList()
  },
  methods:{
    getOrderList(){
      this.axios('/orders').then((res)=>{
        this.list=res.list
      })
    },
    goToPay(orderNo){
      this.$router.push({
        path:'/order/pay',
        query:{
          orderNo:orderNo
        }
      })
    },
  },
};
</script>

<style lang="scss">
.order-list {
  .wrapper {
    background-color: #f5f5f5;
    padding-top: 33px;
    padding-bottom: 110px;
    .order-box {
      .order-item {
        border: 1px solid #d7d7d7;
        background-color: #ffffff;
        margin-top: 20px;
        &:first-child{
          margin-top:0 ;
        }
        .order-title {
          display: flex;
          justify-content: space-between;
          height: 74px;
          line-height: 74px;
          background-color: #fffaf7;
          padding: 0 43px;
          font-size: 16px;
          color: #666666;
          .title-info {
            span {
              margin: 0 9px;
            }
          }
          .title-money {
            .money {
              font-size: 26px;
              color: #333333;
            }
          }
        }
        .order-content {
          display: flex;
          justify-content: space-between;
          padding: 0 43px;
          .good-list {
            width: 88%;
            display: flex;
            height: 145px;
            align-items: center;
            .good-img {
              width: 112px;
              img {
                width: 100%;
              }
            }
            .good-name {
              font-size: 20px;
              color: #333333;
            }
          }
          .good-state {
            height: 145px;
            line-height: 145px;
            font-size: 20px;
            a{
              color: #ff6600;
            }
          }
        }
      }
    }
  }
}
</style>