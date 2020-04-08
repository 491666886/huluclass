import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const VueRouterPush = Router.prototype.push 
Router.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

export default new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: () => import('@/components/login')
        },
        {
            path: '/login',
            name: 'login-page',
            component: () => import('@/components/login-page')
        },
        {
            path: '/describe/:id',
            name: 'Describe',
            component: () => import('@/components/describe')
          },
          {
            path: '/search/:id',
            name: 'search',
            component: () => import('@/components/search')
          },
          {
            path: '/search',
            name: 'search',
            component: () => import('@/components/search')
          },
        {
            path: '/collect',
            name: 'collect',
            component: () => import('@/components/collect'),
            meta: {
                isLogin: true,

            },
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => import('@/components/admin'),
            children:[
      
                {
                  path: 'home',
                  name: 'home',
                  component: () => import('@/components/view/Home'),
                },
              
                  ],
            meta: {
                isLogin: true,

            },
        },
       
    ]
})
