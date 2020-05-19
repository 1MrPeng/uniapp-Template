export default {
	//权限路由
	mall: {
		name: "商城首页",
		path: "/pages/mall/mall",
		requiresAuth: false	//该页面是否需要登录权限
	},
	classify: {
		name: "商品分类",
		path: "/pages/classify/classify",
		requiresAuth: false
	},
	detail: {
		name: "商品详情",
		path: "/subpackage_one/mall/detail",
		requiresAuth: false	
	}
}
