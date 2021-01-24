import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
var VueCookie = require('vue-cookie');
// Tell Vue to use the plugin
Vue.use(VueCookie);

//mock开关
const mock = false;
if (mock) {
    require('./mock/api');
}
// axios
Vue.use(VueAxios, axios)
axios.defaults.baseURL = '/api';
axios.defaults.timeout = 3000;

//错误拦截处理
axios.interceptors.response.use(function(res) {
        // location.hash必须放在这里面才能获取到正确的值
        let path = location.hash
        if (res.data.status == 0) {
            return res.data.data;
        } else if (res.data.status == 10) {
            if (path != '#/index') {
                window.location.href = '/#/login';
            }
            return Promise.reject(res);
        } else {
            alert(res.data.msg);
            return Promise.reject(res);
        }
    })
    // lazyload懒加载
Vue.use(VueLazyLoad, {
    loading: 'imgs/loading-svg/loading-bubbles.svg'
})
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')