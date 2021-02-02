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
          <loading v-if="isLoading"></loading>
          <no-data v-if="isLoading == false && list.length == 0"></no-data>
          <div class="order-item" v-for="(order, index) in list" :key="index">
            <div class="order-title">
              <div class="title-info">
                {{ order.createTime }}
                <span>|</span>
                {{ order.receiverName }}
                <span>|</span>
                订单号：{{ order.createTime }}
                <span>|</span>
                {{ order.paymentTypeDesc }}
              </div>
              <div class="title-money">
                <span>应付金额：</span>
                <span class="money">{{ order.payment }}</span>
                <span>元</span>
              </div>
            </div>
            <div
              class="order-content"
              v-for="(item, j) in order.orderItemVoList"
              :key="j"
            >
              <div class="good-list">
                <div class="good-img">
                  <img :src="item.productImage" alt="" />
                </div>
                <div class="good-name">
                  <div class="name">{{ item.productName }}</div>
                  <div class="money">
                    {{ item.totalPrice + "×" + item.quantity }}元
                  </div>
                </div>
              </div>
              <div class="good-state" v-if="order.status == 20">
                <a href="javascript:;">{{ order.statusDesc }}</a>
              </div>
              <div class="good-state" v-else>
                <a href="javascript:;" @click="goToPay(order.orderNo)">{{
                  order.statusDesc
                }}</a>
              </div>
            </div>
          </div>
        </div>
        <!-- <el-pagination
          class="pagination"
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="pageSize"
          @current-change="getCurrentPage"
        >
        </el-pagination> -->
        <div
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="busy"
          infinite-scroll-distance="500"
          class="pagination"
        >
          <img src="/imgs/loading-svg/loading-spinning-bubbles.svg" alt=""  v-show="isRollimg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoData from "../components/NoData.vue";
import OrderHeader from "../components/OrderHeader.vue";
// 无限滚动插件
import infiniteScroll from "vue-infinite-scroll";
// import { Pagination } from "element-ui";
import Loading from "./Loading.vue";
export default {
  name: "loginList",
  directives: { infiniteScroll },
  data() {
    return {
      list: [],
      isLoading: true, //控制loading过渡组件显示隐藏
      total: 0, //一共多少条数据
      pageSize: 10, // 每次返多少条数据 默认10
      currentPage: 1,
      busy: true,
      isRollimg:false,
    };
  },
  components: {
    OrderHeader,
    Loading,
    NoData,
    // [Pagination.name]: Pagination,
  },
  mounted() {
    this.getOrderList();
  },
  methods: {
    getOrderList() {
      this.axios
        .get("/orders", {
          params: {
            pageSize: this.pageSize,
            pageNum: this.currentPage,
          },
        })
        .then((res) => {
          this.isLoading = false;
          this.list = res.list;
          this.total = res.total;
          this.pageSize = res.pageSize;
          this.busy=false
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    //跳转支付
    goToPay(orderNo) {
      this.$router.push({
        path: "/order/pay",
        query: {
          orderNo: orderNo,
        },
      });
    },
    //滚动加载更多列表数据专用
    getList() {
      this.isRollimg=true
      this.axios
        .get("/orders", {
          params: {
            pageSize: this.pageSize,
            pageNum: this.currentPage,
          },
        })
        .then((res) => {
          this.isLoading = false;
          this.list = res.list;
          this.pageSize = res.pageSize;
          if(res.hasNextPage==true){
            this.busy=false
          }else{
            this.busy=true
            this.isRollimg=false
          }
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    loadMore() {
      this.busy = true;
      this.currentPage++;
      setTimeout(()=>{
        this.getList()
      },500)
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/config.scss";
.order-list {
  .wrapper {
    background-color: #ffffff;
    padding-top: 33px;
    padding-bottom: 110px;
    .order-box {
      .order-item {
        border: 1px solid #d7d7d7;
        background-color: #ffffff;
        margin-top: 20px;
        &:first-child {
          margin-top: 0;
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
            a {
              color: #ff6600;
            }
          }
        }
      }
    }
    .pagination {
      margin-top: 20px;
      text-align: center;
    }
    .el-pagination.is-background .el-pager li:not(.disabled).active {
      background-color: $colorA;
      color: #fff;
    }
  }
}
</style>