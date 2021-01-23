<template>
  <div class="nav-bar" :class="{ 'is-fixd': isNavFixd }" ref="navber">
    <div class="container">
      <div class="pro-title">{{ title }}</div>
      <div class="pro-param">
        <a href="">概述</a><span>|</span> <a href="">参数</a><span>|</span>
        <a href="">用户评价</a>
        <slot name="buy"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "nav-ber",
  props: {
    title: String,
  },
  data() {
    return {
      isNavFixd: false,
      navOffsettop: "",
    };
  },
  mounted() {
    this.navOffsettop = this.$refs.navber.offsetTop;
    window.addEventListener("scroll", this.scrollFixd);
  },
  methods: {
    scrollFixd() {
      /* let scrollTop =
          document.documentElement.scrollTop ||
          document.body.scrollTop ||
          window.pageYOffset;
        this.isNavFixd = scrollTop > 152 ? true : false;*/
      this.isNavFixd =
        (document.documentElement.scrollTop ||
          document.body.scrollTop ||
          window.pageYOffset) >= this.navOffsettop
          ? true
          : false;
    },
  },
};
</script>
<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
.nav-bar {
  position: relative;
  height: 70px;
  line-height: 70px;
  border-top: 1px solid $colorH;
  background: $colorG;
  &.is-fixd {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 11;
  }
  .container {
    @include flex();
    .pro-title {
      font-size: $fontH;
      color: $colorB;
      font-weight: bold;
    }
    .pro-param {
      font-size: $fontJ;
      span {
        margin: 0 10px;
      }
      a {
        color: $colorC;
      }
    }
  }
}
</style>