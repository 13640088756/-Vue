<template>
  <div class="detail">
    <product-param :title="product.name"></product-param>
    <div class="wrapper clearfix">
      <div class="container">
        <div class="swiper fl">
          <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide
              ><img src="/imgs/detail/phone-1.jpg" alt=""
            /></swiper-slide>
            <swiper-slide
              ><img src="/imgs/detail/phone-2.jpg" alt=""
            /></swiper-slide>
            <swiper-slide
              ><img src="/imgs/detail/phone-3.jpg" alt=""
            /></swiper-slide>
            <swiper-slide
              ><img src="/imgs/detail/phone-4.jpg" alt=""
            /></swiper-slide>
            <div class="swiper-scrollbar" slot="scrollbar"></div>
          </swiper>
        </div>
        <div class="content fr">
          <h2 class="item-title">{{ product.name }}</h2>
          <p class="item-info">
            相机全新升级 / 960帧超慢动作 / 手持超级夜景 / 全球首款双频GPS /
            骁龙845处理器 / 红<br />外人脸解锁 / AI变焦双摄 / 三星 AMOLED 屏
          </p>
          <p class="item-delivery">小米自营</p>
          <div class="item-price">
            {{ product.price }}<del class="del">2999元</del>
          </div>
          <div class="line"></div>
          <!-- 地址 -->
          <div class="item-addr">
            <i></i>
            <div class="addr">北京 北京市 朝阳区 安定门街道</div>
            <div class="stock">有现货</div>
          </div>
          <!-- 版本 -->
          <div class="item-version clearfix">
            <h2>选择版本</h2>
            <div
              class="phone fl"
              @click="option = 1"
              :class="{ checked: option == 1 }"
            >
              6GB+64GB 全网通
            </div>
            <div
              class="phone fr"
              @click="option = 2"
              :class="{ checked: option == 2 }"
            >
              4GB+64GB 移动4G
            </div>
          </div>
          <!-- 颜色 -->
          <div class="item-color clearfix">
            <h2>选择颜色</h2>
            <div class="phone fl checked">
              <span class="color"></span> 深空灰
            </div>
          </div>
          <div class="item-total">
            <div class="phone-info clearfix">
              <div class="fl">
                小米9
                {{ option == 1 ? "6GB+64GB 全网通" : "4GB+64GB 移动4G" }} 深灰色
              </div>
              <div class="fr">2599元</div>
            </div>
            <div class="phone-total">
              总计：<span>{{ product.price }}元</span>
            </div>
          </div>

          <!-- 加入购物车按钮 -->
          <div class="btn-grop">
            <a href="javascript:;" class="btn btn-huge" @click="addCart"
              >加入购物车</a
            >
          </div>
        </div>
      </div>
    </div>
    <service-bar> </service-bar>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import ProductParam from "../components/ProductParam.vue";
import ServiceBar from "../components/ServiceBar.vue";
export default {
  name: "detail",
  data() {
    return {
      swiperOptions: {
        // 滚动条
        scrollbar: {
          el: ".swiper-scrollbar",
        },
      },
      id: this.$route.params.id,
      product: {},
      option: 1,
    };
  },
  components: {
    ProductParam,
    ServiceBar,
    swiper,
    swiperSlide,
  },
  mounted() {
    this.getProductInfo();
  },
  methods: {
    getProductInfo() {
      this.axios.get(`/products/${this.id}`).then((res) => {
        this.product = res;
      });
    },
    addCart() {
      this.axios.post("/carts", {
        productId: this.id,
        selected: true,
      }).then((res={cartTotalQuantity:0})=>{
        this.$store.dispatch('saveCartCount',res.cartTotalQuantity)
        this.$router.push('/cart')
      })
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/config.scss";
.detail {
  .wrapper {
    .swiper {
      width: 642px;
      height: 617px;
      margin-top: 5px;
      img {
        width: 100%;
      }
    }
    .content {
      float: right;
      width: 584px;
      height: 870px;
      .item-title {
        font-size: 28px;
        padding-top: 30px;
        padding-bottom: 16px;
        height: 26px;
      }
      .item-info {
        font-size: 14px;
        height: 36px;
      }
      .item-delivery {
        font-size: 16px;
        color: #ff6700;
        margin-top: 26px;
        margin-bottom: 14px;
        height: 15px;
      }
      .item-price {
        font-size: 20px;
        color: #ff6700;
        height: 19px;
        .del {
          font-size: 16px;
          color: #999999;
          margin-left: 10px;
          text-decoration: line-through;
        }
      }
      .line {
        height: 0;
        margin-top: 25px;
        margin-bottom: 28px;
        border-top: 1px solid #e5e5e5;
      }
      .item-addr {
        height: 108px;
        background-color: #fafafa;
        border: 1px solid #e5e5e5;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding-top: 31px;
        padding-left: 64px;
        font-size: 14px;
        line-height: 14px;
        position: relative;
        i {
          position: absolute;
          display: inline-block;
          top: 27px;
          left: 34px;
          width: 20px;
          height: 20px;
          background: url(/imgs/detail/icon-loc.png) no-repeat center;
          background-size: contain;
        }
        .addr {
          color: $colorC;
        }
        .stock {
          margin-top: 15px;
          color: $colorA;
        }
      }
      .item-version,
      .item-color {
        margin-top: 30px;
        h2 {
          font-size: 18px;
          margin-bottom: 20px;
        }
        .phone {
          width: 287px;
          height: 50px;
          line-height: 50px;
          font-size: 16px;
          color: #333333;
          border: 1px solid #e5e5e5;
          text-align: center;
          cursor: pointer;
          &.checked {
            border: 1px solid #ff6600;
            color: #ff6600;
          }
          span {
            &.color {
              display: inline-block;
              width: 14px;
              height: 14px;
              background-color: #666666;
            }
          }
        }
      }
      .item-total {
        height: 108px;
        background: #fafafa;
        padding: 24px 33px 29px 30px;
        font-size: 14px;
        margin-top: 50px;
        margin-bottom: 30px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        .phone-total {
          font-size: 24px;
          color: #ff6600;
          margin-top: 18px;
        }
      }
    }
  }
}
</style>