<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'app',
  data(){
    return{
      res:{}
    }
  },
  mounted(){
    // 本地加载静态json文件形式
    // this.axios.get('/mock/user/login.json').then((res)=>{
    //   this.res=res;
    // })

    // 本地集成mockjs数据 实现数据mock
    // this.axios.get('/user/login').then((res)=>{
    //   this.res=res
    // })
  }  
}
</script>
<style lang="scss">
@import './assets/scss/config.scss';
@import './assets/scss/reset.scss';
</style>


