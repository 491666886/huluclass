import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import axios from 'axios'// 引入axios
Vue.prototype.$axios = axios// 把axios挂载到vue上
axios.defaults.withCredentials = true

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
router.beforeEach((to, from, next) => {
  // 获取用户登录成功后储存的登录标志
  const getFlag = localStorage.getItem('Flag')

  // 如果登录标志存在且为isLogin，即用户已登录
  if (getFlag === 'isLogin') {
    // 设置vuex登录状态为已登录
    store.state.isLogin = true
    next()

    // 如果已登录，还想想进入登录注册界面，则定向回首页
    // if (!to.meta.isLogin) {
    //     //iViewUi友好提示
    //     //alert('请先退出登录')
    //     next({
    //         path: '/account'
    //     })
    // }

    // 如果登录标志不存在，即未登录
  } else {
    // 用户想进入需要登录的页面，则定向回登录界面
    if (to.meta.isLogin) {
      next({
        path: '/'
      })
      // iViewUi友好提示
      alert('请先登录')
      // 用户进入无需登录的界面，则跳转继续
    } else {
      next()
    }
  }
})

router.afterEach((route) => {
  window.scroll(0, 0)
})
