// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './axios/axios'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import animate from 'animate.css'
import 'vue2-animate/dist/vue2-animate.min.css';
import './assets/icon/iconfont.css'
import VideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
 import 'videojs-contrib-hls';
Vue.use(ElementUI);
Vue.use(VideoPlayer);
Vue.config.productionTip = false

// require('videojs-contrib-hls/dist/videojs-contrib-hls');
/* axios.interceptors.request.use(function (config) {  //配置发送请求的信息
  stores.dispatch('showLoading')
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) { //配置请求回来的信息
  stores.dispatch('hideLoading')
  return response;
}, function (error) {

  return Promise.reject(error);
}); */



Vue.prototype.$http=axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

