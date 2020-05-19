//公共js，主要做表单验证，以及基本方法封装
const utils = {
	isNullOrEmpty: function(value) {
		//是否为空
		return (value === null || value === '' || value === undefined) ? true : false;
	},
	// 判定是否为空
	empty: function(v) {
		let tp = typeof v,
			rt = false;
		if (tp == 'number' && String(v) == '') {
			rt = true;
		} else if (tp == 'undefined') {
			rt = true;
		} else if (tp == 'object') {
			if (JSON.stringify(v) == '{}' || JSON.stringify(v) == '[]' || v == null) rt = true;
		} else if (tp == 'string') {
			if (v == '' || v == 'undefined' || v == 'null' || v == '{}' || v == '[]') rt = true;
		} else if (tp == 'function') {
			rt = false;
		}
		return rt;
	},
	trim: function(value) {
		//去空格
		return value.replace(/(^\s*)|(\s*$)/g, "");
	},
	isMobile: function(value) {
		//是否为手机号
		return /^(?:13\d|14\d|15\d|16\d|17\d|18\d|19\d)\d{5}(\d{3}|\*{3})$/.test(value);
	},
	isFloat: function(value) {
		//金额，只允许保留两位小数
		return /^([0-9]*[.]?[0-9])[0-9]{0,1}$/.test(value);
	},
	isNum: function(value) {
		//是否全为数字
		return /^[0-9]+$/.test(value);
	},
	checkPwd: function(value) {
		//密码为8~20位数字和字母组合
		return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(value);
	},
	formatNum: function(num) {
		//格式化手机号码
		if (utils.isMobile(num)) {
			num = num.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
		}
		return num;
	},
	rmoney: function(money) {
		//金额格式化
		return parseFloat(money).toFixed(2).toString().split('').reverse().join('').replace(/(\d{3})/g, '$1,').replace(
			/\,$/, '').split('').reverse().join('');
	},
	formatDate: function(formatStr, fdate) {
		//日期格式化
		if (fdate) {
			if (~fdate.indexOf('.')) {
				fdate = fdate.substring(0, fdate.indexOf('.'));
			}
			fdate = fdate.toString().replace('T', ' ').replace(/\-/g, '/');
			var fTime, fStr = 'ymdhis';
			if (!formatStr)
				formatStr = "y-m-d h:i:s";
			if (fdate)
				fTime = new Date(fdate);
			else
				fTime = new Date();
			var month = fTime.getMonth() + 1;
			var day = fTime.getDate();
			var hours = fTime.getHours();
			var minu = fTime.getMinutes();
			var second = fTime.getSeconds();
			month = month < 10 ? '0' + month : month;
			day = day < 10 ? '0' + day : day;
			hours = hours < 10 ? ('0' + hours) : hours;
			minu = minu < 10 ? '0' + minu : minu;
			second = second < 10 ? '0' + second : second;
			var formatArr = [
				fTime.getFullYear().toString(),
				month.toString(),
				day.toString(),
				hours.toString(),
				minu.toString(),
				second.toString()
			]
			for (var i = 0; i < formatArr.length; i++) {
				formatStr = formatStr.replace(fStr.charAt(i), formatArr[i]);
			}
			return formatStr;
		} else {
			return "";
		}
	},
	/* 将毫秒转换成时分秒 */
	formatDuring: function(mss) {
		var days = parseInt(mss / (1000 * 60 * 60 * 24));
		var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = (mss % (1000 * 60)) / 1000;
		return days + " 天 " + hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒 ";
	},
	dateString: function(date) {
		// var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		if (month < 10) {
			month = "0" + month;
		}
		if (day < 10) {
			day = "0" + day;
		}
		return day;
	},
	objParseUrlAndParam: function(path, query) {
		return '' + path + "?" + this.toQueryString(query);
	},

	toQueryPair: function(key, value) {
		if (typeof value == 'undefined') {
			return key;
		}
		// return key + '=' + encodeURIComponent(value === null ? '' : String(value));
		return key + '=' + (value === null ? '' : String(value));
	},

	toQueryString: function(obj) {
		var ret = [];
		for (var key in obj) {
			// key = encodeURIComponent(key);
			var values = obj[key];
			if (values && values.constructor == Array) { //数组
				var queryValues = [];
				for (var i = 0, len = values.length, value; i < len; i++) {
					value = values[i];
					queryValues.push(this.toQueryPair(key, value));
				}
				ret = ret.concat(queryValues);
			} else { //字符串
				ret.push(this.toQueryPair(key, values));
			}
		}
		return ret.join('&');
	}
}

module.exports = {
	isNullOrEmpty: utils.isNullOrEmpty,
	empty: utils.empty,
	trim: utils.trim,
	isMobile: utils.isMobile,
	isFloat: utils.isFloat,
	isNum: utils.isNum,
	checkPwd: utils.checkPwd,
	formatNum: utils.formatNum,
	rmoney: utils.rmoney,
	formatDate: utils.formatDate,
	formatDuring: utils.formatDuring,
	dateString: utils.dateString,
	toQueryPair: utils.toQueryPair,
	toQueryString: utils.toQueryString,
	objParseUrlAndParam: utils.objParseUrlAndParam
	
}
