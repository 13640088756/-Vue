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
        <div class="load-more">
          <el-button type="primary" :loading="isLoading" @click="getLoadMore"
            >更多订单</el-button
          >
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
      </div>
    </div>
  </div>
</template>

<script>
import NoData from "../components/NoData.vue";
import OrderHeader from "../components/OrderHeader.vue";
import { Button } from "element-ui";
import Loading from "./Loading.vue";
export default {
  name: "loginList",
  data() {
    return {
      list: [],
      isLoading: false, //控制loading过渡组件显示隐藏
      // total: 0, //一共多少条数据
      pageSize: 5, // 每次返多少条数据 默认10
      currentPage: 1,
    };
  },
  components: {
    OrderHeader,
    Loading,
    NoData,
    [Button.name]: Button,
  },
  mounted() {
    this.getOrderList();
  },
  methods: {
    getOrderList() {
      this.isLoading = true;
      this.axios
        .get("/orders", {
          params: {
            pageSize: this.pageSize,
            pageNum: this.currentPage,
          },
        })
        .then((res) => {
          this.isLoading = false;
          if (this.currentPage > 1 && res.list.length == 0) {
            this.$message.warning("暂无更多订单");
          } else {
            this.list = this.list.concat(res.list);
            // this.total = res.total;
            this.pageSize = res.pageSize;
          }
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    // 分页功能
    getCurrentPage(current) {
      this.currentPage = current;
      this.getOrderList();
    },
    // 加载更多订单功能
    getLoadMore() {
      this.currentPage++;
      this.getOrderList();
    },
    goToPay(orderNo) {
      this.$router.push({
        path: "/order/pay",
        query: {
          orderNo: orderNo,
        },
      });
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
      text-align: right;
    }
    .el-pagination.is-background .el-pager li:not(.disabled).active {
      background-color: $colorA;
      color: #fff;
    }
    .load-more {
      margin-top: 20px;
      text-align: center;
    }
  }
}
</style>