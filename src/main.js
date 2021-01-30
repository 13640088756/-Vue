import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

var VueCookie = require('vue-cookie');
// Tell Vue to use the plugin
Vue.use(VueCookie);
//mock开关
const mock = false;
if (mock) {
    require('./mock/api');
}


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
            Message.warning(res.data.msg)
            return Promise.reject(res);
        } else {
            // alert(res.data.msg);
            Message.warning(res.data.msg)
                // this.$message.warning(res.data.mag)
            return Promise.reject(res);
        }
    }, (error) => {
        let res = error.response
        Message.error(res.data.message)
        return Promise.reject(error)
    })
    // lazyload懒加载
Vue.use(VueLazyLoad, {
        loading: 'imgs/loading-svg/loading-bubbles.svg'
    })
    // axios
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.prototype.$message = Message;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')