<template>
  <div class="cart">
    <order-header title="我的购物车">
      <template v-slot:tip>
        <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="cart-box">
          <ul class="cart-box-head">
            <li class="col-1">
              <span
                class="checkbox"
                :class="{ checked: this.selectedAll }"
                @click="toggleAll"
              ></span
              >全选
            </li>
            <li class="col-3">商品名称</li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>
          <li class="cart-box-list" v-for="(item, index) in list" :key="index">
            <div class="item-check">
              <span
                class="checkbox"
                :class="{ checked: item.productSelected }"
                @click="updateCart(item)"
              ></span>
            </div>
            <div class="item-name">
              <img v-lazy="item.productMainImage" alt="" />
              <span>{{ item.productName }}</span>
            </div>
            <div class="item-price">{{ item.productPrice }}</div>
            <div class="item-num">
              <div class="num-box">
                <a href="javascript:;" @click="updateCart(item, '-')">-</a>
                <span>{{ item.quantity }}</span>
                <a href="javascript:;" @click="updateCart(item, '+')">+</a>
              </div>
            </div>
            <div class="item-total">{{ item.productTotalPrice }}</div>
            <div class="item-del" @click="isDeleteCart(item)"></div>
          </li>
        </div>
        <div class="close-wrap clearfix">
          <div class="cart-tip fl">
            <a href="/">继续购物</a>
            共<span>{{ list.length }}</span
            >件商品，已选择<span>{{ checkNum }}</span
            >件
          </div>
          <div class="total fr">
            合计：<span>{{ cartTotalPrice }}</span
            >元
            <a href="javascript:;" class="btn" @click="order">去结算</a>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
    <modal :showModal=showModal title='商品列表' btnType='3' @cancel="showModal=false" @submit="deleteCartItem()">
      <template v-slot:body>
        <p>是否删除商品</p>
      </template>
    </modal>
  </div>
</template>

<script>
import OrderHeader from "./../components/OrderHeader";
import NavFooter from "./../components/NavFooter";
import ServiceBar from "../components/ServiceBar.vue";
import Modal from '../components/Modal.vue';
export default {
  name: "cart",
  data() {
    return {
      list: [],
      // 总金额
      cartTotalPrice: 0,
      // 总数量
      cartTotalQuantity: 0,
      selectedAll: true,
      // 选择数量
      checkNum: 0,
      showModal:false,
      currentItem:{},
    };
  },
  components: {
    NavFooter,
    OrderHeader,
    ServiceBar,
    Modal,
  },
  mounted() {
    this.getCartsList();
  },
  methods: {
    // get购物车列表
    getCartsList() {
      this.axios.get("/carts").then((res) => {
        this.renderDate(res);
      });
    },
    // 全选中/全不选中
    toggleAll() {
      // 根据是否已经选中状态，请求对应
      let url = this.selectedAll ? "/carts/unSelectAll" : "/carts/selectAll";
      this.axios.put(url).then((res) => {
        this.renderDate(res);
      });
    },
    renderDate(res) {
      this.list = res.cartProductVoList || [];
      this.cartTotalPrice = res.cartTotalPrice;
      this.cartTotalQuantity = res.cartTotalQuantity;
      this.selectedAll = res.selectedAll;
      this.checkNum = this.list.filter((item) => item.productSelected).length;
    },
    // 更新购物车某个产品数量和单选功能
    updateCart(item, type) {
      // 数量
      let quantity = item.quantity;
      // 状态
      let selected = item.productSelected;
      if (type == "-") {
        if (quantity == 1) {
          this.$message.warning("至少保留一件商品");
          return;
        }
        --quantity;
      } else if (type == "+") {
        if (quantity > item.productStock) {
         this.$message.warning("购买数量不能超过库存数量");
        }
        ++quantity;
      } else {
        selected = !selected;
      }
      this.axios
        .put(`/carts/${item.productId}`, {
          quantity,
          selected,
        })
        .then((res) => {
          this.renderDate(res);
        });
    },
    isDeleteCart(item){
      this.showModal=true
      this.currentItem =item
    },
    // 移除购物车某个商品
    deleteCartItem(){
      this.showModal=false
      let productId =this.currentItem.productId
      this.axios.delete(`/carts/${productId}`).then((res)=>{
        this.renderDate(res)
      })
    },
    // 购物车下单
    order(){
      let ischeck = this.list.every((item)=>{
        return !item.productSelected
      })
      if(ischeck){
        this.$message.warning('至少选择一件商品')
      }else{
        this.$router.push('/order/confirm');
      }
    },
  },
};
</script>
<style lang="scss">
@import "./../assets/scss/config.scss";
.cart {
  .wrapper {
    background-color: $colorJ;
    padding-top: 30px;
    padding-bottom: 114px;
    .cart-box {
      background-color: #fff;
      font-size: 14px;
      color: #999999;
      text-align: center;
      .checkbox {
        display: inline-block;
        width: 22px;
        height: 22px;
        border: 1px solid #e5e5e5;
        vertical-align: middle;
        margin-right: 17px;
        cursor: pointer;
        &.checked {
          background: url("/imgs/icon-gou.png") #ff6600 no-repeat center;
          background-size: 16px 12px;
          border: none;
        }
      }
      .cart-box-head {
        display: flex;
        height: 79px;
        line-height: 79px;

        .col-1 {
          flex: 1;
        }
        .col-2 {
          flex: 2;
        }
        .col-3 {
          flex: 3;
        }
      }
      .cart-box-list {
        display: flex;
        align-items: center;
        height: 125px;
        border-top: 1px solid #e5e5e5;
        text-align: center;
        font-size: 16px;
        .item-check {
          flex: 1;
        }
        .item-name {
          flex: 3;
          font-size: 18px;
          color: #333333;
          img {
            width: 80px;
            height: 80px;
            vertical-align: middle;
          }
          span {
            margin-left: 30px;
          }
        }
        .item-price {
          flex: 1;
          color: #333333;
        }
        .item-num {
          flex: 2;

          .num-box {
            display: inline-block;
            width: 150px;
            height: 40px;
            line-height: 40px;
            border: 1px solid #e5e5e5;
            font-size: 14px;
            a,
            span {
              display: inline-block;
              width: 50px;
              color: #333333;
            }
          }
        }
        .item-total {
          flex: 1;
          color: $colorA;
        }
        .item-del {
          flex: 1;
          height: 12px;
          background: url(/imgs/icon-close.png) no-repeat center;
          background-size: contain;
          cursor: pointer;
        }
      }
    }

    .close-wrap {
      font-size: 14px;
      color: #666666;
      margin-top: 20px;
      height: 50px;
      line-height: 50px;
      .cart-tip {
        margin-left: 29px;
        a {
          color: #666666;
          margin-right: 37px;
        }
        span {
          color: #ff6600;
          margin: 0 5px;
        }
      }
      .total {
        font-size: 14px;
        color: #ff6600;
        span {
          font-size: 24px;
        }
        a {
          width: 202px;
          height: 50px;
          line-height: 50px;
          font-size: 18px;
          margin-left: 37px;
        }
      }
    }
  }
}
</style>
