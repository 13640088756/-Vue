<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "app",
  data() {
    return {
      res: {},
    };
  },
  mounted() {
    // 本地加载静态json文件形式
    // this.axios.get('/mock/user/login.json').then((res)=>{
    //   this.res=res;
    // })

    // 本地集成mockjs数据 实现数据mock
    // this.axios.get('/user/login').then((res)=>{
    //   this.res=res
    // })
    this.getUser();
    this.getCartCount();
  },
  methods: {
    // mapActions 辅助函数
    ...mapActions(["saveUsername", "saveCartCount"]),
    getUser() {
      this.axios
        .get("/user")
        .then((res = {}) => {
          // to-do 通过cookie 获取用户信息 保存到 vuex
          // this.$store.dispatch('saveUsername',res.username)
          this.saveUsername(res.username);
        })
        .catch((res) => {
          
        });
    },
    getCartCount() {
      this.axios
        .get("/carts/products/sum")
        .then((res = 0) => {
          // this.$store.dispatch('saveCartCount',res)
          this.saveCartCount(res);
        })
        .catch((res) => {
         
        });
    },
  },
};
</script>
<style lang="scss">
@import "./assets/scss/button.scss";
@import "./assets/scss/base.scss";
@import "./assets/scss/reset.scss";
</style>


