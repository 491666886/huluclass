import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

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
            path: '/admin',
            name: 'admin',
            component: () => import('@/components/admin'),
            meta: {
                isLogin: true,

            },
        },
    ]
})
