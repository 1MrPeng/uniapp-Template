import Vue from 'vue'
import App from './App'
import store from './store'
Vue.config.productionTip = false
App.mpType = 'app'

// #ifndef MP-TOUTIAO
//网络监听
setTimeout(() => {
	uni.onNetworkStatusChange(function(res) {
		//console.log(res.networkType);
		store.commit("networkChange", {
			isConnected: res.isConnected
		})
	});
}, 100)
// #endif
Vue.prototype.$store = store

import mRouterConfig from "@/router/router.config.js";
Vue.prototype.$mRouterConfig = mRouterConfig;

import mRouter from "@/router/index.js";
Vue.prototype.$mRouter = mRouter;

const util = require("@/utils/util.js");

mRouter.beforeEach((navType, to) => {
	if (to.route === undefined) throw "路由钩子函数没有找到to.route对象";
	
	let isLogin = store.state.isLogin;
	// if (to.route.path === mRouterConfig.login.path && isLogin) {
	// 	uni.redirectTo({
	// 		url: util.objParseUrlAndParam(mRouterConfig.main.path, to.query)
	// 	});
	// 	return;
	// }
	//过滤需要权限的页面
	if (to.route.requiresAuth) {
		if (isLogin) {
			uni[navType]({
				url: util.objParseUrlAndParam(to.route.path, to.query)
			});
		} else {
			// let query = {
			// 	redirectUrl: to.route.path,
			// 	...to.query
			// }
			uni.navigateTo({
				url: util.objParseUrlAndParam(mRouterConfig.login.path)
			});
		}
	} else {
		
		uni[navType]({
			url: util.objParseUrlAndParam(to.route.path, to.query)
		});
	}
});


const app = new Vue({
	store,
    ...App
})
app.$mount()
