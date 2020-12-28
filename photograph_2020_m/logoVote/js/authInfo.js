var appid = 'wx39fac88debc390da'
var api = 'https://api.foshanplus.com/foshan/api/v2'
var isAndroid = false
function getWeixinAuthCode(successBack, failBack) {
	var code = this.getQueryString('code')
	var is_weixin = this.is_weixinFun()
	if (code) {
		// 获取成功
		$.ajax({
			url: api + '/getWxUserInfo',
			data: {
				code: code,
			},
			async: true,
			success: (res) => {
				if (res.ret == 1 && res.data) {
					successBack(res)
				} else {
					if (failBack) {
						failBack()
					}
				}
			},
			error: () => {
				if (failBack) {
					failBack()
				}
			},
		})
	} else {
		if (is_weixin) {
			// 请求微信接口 获取code
			var params = window.location.href.split('?')
			var redirect_uri = encodeURIComponent(params[0])
			var response_type = 'code'
			var scope = 'snsapi_userinfo'
			var state =
				params.length > 1 ? encodeURIComponent(params[1]) : 'state'
			var url =
				'https://open.weixin.qq.com/connect/oauth2/authorize?redirect_uri=' +
				redirect_uri +
				'&response_type=' +
				response_type +
				'&scope=' +
				scope +
				'&state=' +
				state +
				'&appid=' +
				appid
			window.location.href = url
		} else {
			// 既没有code也不是在微信
			if (failBack) {
				failBack()
			}
		}
	}
}

// 判断是否为微信 QQ
function is_weixinFun() {
	var ua = navigator.userAgent.toLowerCase()
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true
	}
	return false
}

function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
	var r = window.location.search.substr(1).match(reg)
	if (r != null) return unescape(r[2])
	return null
}

// 判断是什么设备
function judgeDevice() {
	var uM = navigator.userAgent
	isAndroid = uM.indexOf('Android') > -1 || uM.indexOf('Linux') > -1
	// isIos = !!uM.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}
