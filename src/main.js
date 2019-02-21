import Vue from 'vue'
import App from './App'
import store from './store/index'
import flyio from './utils/httpFlyio'
import wxFuns from './utils/wxFuns'

Vue.config.productionTip = false
Vue.prototype.http_flyio = flyio
Vue.prototype.wxFuns = wxFuns
Vue.prototype.$store = store
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  pages: [
    'pages/main.js'
  ],
  config: {
    'window': {
      'backgroundTextStyle': 'light',
      'navigationBarBackgroundColor': '#ea5149',
      'navigationBarTitleText': 'mpVue',
      'navigationBarTextStyle': 'light'
    }
  }
}
