import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入element-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
// 引入阿里字体图标
import "./assets/iconfont/iconfont.css";
//引入axios
import axios from "axios";
Vue.prototype.$axios = axios;
axios.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("Authorization")) {
      config.headers.token = localStorage.getItem("Authorization");
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
axios.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (err) => {
    return Promise.reject(err);
  }
);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
