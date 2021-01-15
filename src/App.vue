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
    this.axios.get('/mock/user/login.json').then((res)=>{
      this.res=res;
    })
  }  
}
</script>
<style lang="scss">
@import './assets/scss/config.scss';
@import './assets/scss/reset.scss';
</style>


