import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    'navigationBarTitleText': '商城',
    'usingComponents': {
      'van-button': '/static/vant/button/index'
    }
  }
}
