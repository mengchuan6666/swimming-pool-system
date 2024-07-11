/**
 * 路由配置
 */
import type { _RouteLocationBase } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import { WHITE_LIST } from '@/config/setting';
import { useUserStore } from '@/store/modules/user';
import { menuToRoutes } from 'ele-admin-pro';
import EleLayout from '@/layout/index.vue';
import RedirectLayout from '@/components/RedirectLayout';
import RouterLayout from '@/components/RouterLayout/index.vue';
import { getToken } from '@/utils/token-util';
import NProgress from 'nprogress';
const modules = import.meta.glob('/src/views/**/index.vue');

NProgress.configure({
	speed: 200,
	minimum: 0.02,
	//trickleRate: 0.1,
	trickleSpeed: 200,
	showSpinner: false
});

// 静态路由
const routes = [
	{
		path: '/login',
		component: () => import('@/views/login/index.vue'),
		meta: { title: '登录' }
	},
	{
		path: '/regiter',
		component: () => import('@/views/regiter/index.vue'),
		meta: { title: '用户注册' }
	},
	{
		path: '/index',
		component: () => import('@/views/home/index.vue'),
		meta: { title: '首页' }
	},
	{
		path: '/',
		component: () => import('@/views/home/index.vue'),
		meta: { title: '首页' }
	},
	{
		path: '/site',
		component: () => import('@/views/home/site.vue'),
		meta: { title: '场地列表' }
	},
	{
		path: '/site/:id',
		component: () => import('@/views/home/site/siteIndex.vue'),
		meta: { title: '场地查看' }
	},
	{
		path: '/product',
		component: () => import('@/views/home/product.vue'),
		meta: { title: '商品列表' }
	},
	{
		path: '/product/:id',
		component: () => import('@/views/home/product/productIndex.vue'),
		meta: { title: '商品查看' }
	},
	{
		path: '/course',
		component: () => import('@/views/home/course.vue'),
		meta: { title: '课程列表' }
	},
	{
		path: '/course/:id',
		component: () => import('@/views/home/course/courseIndex.vue'),
		meta: { title: '课程查看' }
	},
	{
		path: '/rechargeRecords',
		component: () => import('@/views/home/rechargeRecords.vue'),
		meta: { title: '充值记录' }
	},
	{
		path: '/appointmentRecords',
		component: () => import('@/views/home/appointmentRecords.vue'),
		meta: { title: '预约记录' }
	},
	{
		path: '/regRecords',
		component: () => import('@/views/home/regRecords.vue'),
		meta: { title: '报名记录' }
	},
	{
		path: '/message',
		component: () => import('@/views/home/message.vue'),
		meta: { title: '留言' }
	},
	{
		path: '/notice',
		component: () => import('@/views/home/notice.vue'),
		meta: { title: '公告信息' }
	},
	{
		path: '/userinfo',
		component: () => import('@/views/home/userinfo.vue'),
		meta: { title: '个人中心' }
	},
	{
		path: '/redirect',
		component: EleLayout,
		children: [
			{
				path: '/redirect/:path(.*)',
				component: RedirectLayout
			}
		]
	},
	{
		path: '/:pathMatch(.*)*',
		component: () => import('@/views/exception/404/index.vue')
	}
];

const router = createRouter({
	routes,
	history: createWebHistory()
});

// 路由守卫
router.beforeEach(async (to) => {
	const pathNew = to.path.split("/");
	NProgress.start();
	updateTitle(to);
	// 判断是否已登录
	if (!getToken()) {
		// debugger
		if (!WHITE_LIST.includes("/" + pathNew[1])) {
			return {
				path: '/login',
				query: to.path === '/' ? {} : { from: to.path }
			};
		}
		return;
	}
	// 判断是否已注册动态路由
	const userStore = useUserStore();
	if (!userStore.menus) {
		const { menus, homePath } = await userStore.fetchUserInfo();
		router.addRoute({
			path: '/',
			component: EleLayout,
			redirect: homePath,
			children: menuToRoutes(menus, getComponent)
		});
		return { ...to, replace: true };
	}
});

router.afterEach(() => {
	setTimeout(() => {
		NProgress.done(true);
	}, 300);
});

// 更新浏览器标题
const updateTitle = function (route : _RouteLocationBase) {
	if (!route?.path?.startsWith('/redirect/')) {
		const names : string[] = [];
		if (route?.meta?.title) {
			names.push(route.meta.title as string);
		}
		const appName = import.meta.env.VITE_APP_NAME as string;
		if (appName) {
			names.push(appName);
		}
		document.title = names.join(' - ');
	}
};

// 获取路由组件
const getComponent = function (component ?: string) {
	if (!component) {
		return RouterLayout;
	}
	const module = modules[`/src/views/${component}.vue`];
	if (!module) {
		return modules[`/src/views/${component}/index.vue`];
	}
	return module;
};

export default router;