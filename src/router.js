import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
	return VueRouterPush.call(this, to).catch(err => err)
}

export default new Router({
	routes: [{
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
			children: [

				{
					path: 'video',
					name: 'video',
					component: () => import('@/components/view/video'),
				},
				{
					path: 'device',
					name: 'device',
					component: () => import('@/components/view/device'),
				}, {
					path: 'rest',
					name: 'rest',
					component: () => import('@/components/view/rest'),
				}, {
					path: 'scal',
					name: 'scal',
					component: () => import('@/components/view/scal'),
				}, {
					path: 'stati',
					name: 'stati',
					component: () => import('@/components/view/stati'),
				}, {
					path: 'teach',
					name: 'teach',
					component: () => import('@/components/view/teach'),
				}, {
					path: 'user',
					name: 'user',
					component: () => import('@/components/view/user'),
				},
			],
			meta: {
				isLogin: true,

			},
		},

	]
})
