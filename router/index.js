class Router {
	constructor(arg) {
		this.callback = () => {}
	}
	beforeEach(callback) {
		if (callback instanceof Function) this.callback = callback;
	}
	push(to) {	//保留当前页面，跳转到应用内的某个页面，使用uni.navigateBack可以返回到原页面。
		this.callback("navigateTo", to);
	}
	redirectTo(to) {	//关闭当前页面，跳转到应用内的某个页面。
		this.callback("redirectTo", to);
	}
	reLaunch(to) {	//关闭所有页面，打开到应用内的某个页面。
		this.callback("reLaunch", to);
	}
	switchTab(to) { //跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面，不能携带参数。
		this.callback("switchTab", to);
	}
	back(delta) {
		uni.navigateBack({
			delta	//delta  返回的页面数，如果 delta 大于现有页面数，则返回到首页
		})
	}
}

export default new Router();