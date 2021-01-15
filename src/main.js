import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

//mock开关
const mock = false;
if (mock) {
    require('./mock/api');
}
Vue.use(VueAxios, axios)
axios.defaults.baseURL = '/api';
axios.defaults.timeout = 3000;
//错误拦截处理
axios.interceptors.response.use(function(res) {
    if (res.data.status == 0) {
        return res.data.data;
    } else if (res.data.status == 10) {
        window.location.href = '/#/login';
    } else {
        alert(res.data.msg);
    }
})
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')