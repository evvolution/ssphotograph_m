// var faceimage = 'https://content.foshanplus.com/foshanlogo.png'
var faceimage =
	'https://fsnewsres.foshanplus.com/picture/62e069d1858344e5983a29aa8ae80d95.jpg'
var newstitle = ''
var newsdesc = ''
var authInfo = {
	appid: 'wx39fac88debc390da',
  api: 'https://api.foshanplus.com/foshan/api/v2',
  // api: 'http://foshan-app-tomcat.default:80/api/v2',

	// api: 'http://172.16.8.244:8080/foshan-app/api/v2',
	activityId: 4, // 活动id
	activityCode: '',
	activity: {
		description: '佛山+红包抽奖',
		title: '佛山+红包抽奖',
		url: 'https://content.foshanplus.com/download.html',
		channelId: 0,
	},
	isApp: false,
	fs_token: '', // token
	fs_device: '', // 设备
	member: {
		nickname: '',
		photo: '',
	}, // 用户信息
	is_weixin: false,
	net_error: '网络错误',
	is_loading: false,
	// 获取用户信息
	getUserInfo: function (successBack, failBack) {
		// var app_token = sessionStorage.getItem('app_token')
		var fs_token = this.fs_token
		// 用户信息
		var member = sessionStorage.getItem('fs_member')
		if (member) {
			this.member = JSON.parse(member)
		}

		// 是否微信
		this.is_weixin = this.is_weixinFun()
		if (fs_token && fs_token.length > 0 && !this.is_weixin) {
			// app
			sessionStorage.setItem('fs_token', fs_token)
			if (successBack) {
				successBack(fs_token)
			}
		} else {
			// 从session取值
			this.fs_token = sessionStorage.getItem('fs_token')
			if (this.fs_token) {
				// session 查找
				if (successBack) {
					successBack(this.fs_token)
				}
			} else {
				if (this.is_weixin) {
					var code = this.getQueryString('code')
					if (code) {
						this.getWxUserInfo(code, successBack, failBack)
					} else {
						this.wechatAuthCode()
					}
				}
			}
		}
	},

	// 判断是否为微信 QQ
	is_weixinFun: function () {
		var ua = navigator.userAgent.toLowerCase()
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true
		}
		return false
	},

	// 获取微信信息
	getWxUserInfo: function (code, successBack, failBack) {
		// 获取成功
		$.ajax({
			url: this.api + '/getWxUserInfo',
			data: {
				code: code,
			},
			async: false,
			success: (res) => {
				if (res.ret == 1) {
					this.fs_token = res.member.token
					this.member = res.member
					if (successBack) {
						successBack(this.fs_token)
					}
					// 保存到session
					sessionStorage.setItem('fs_token', res.member.token)

					sessionStorage.setItem('fs_member', JSON.stringify(res.member))
				} else {
					// 重新刷新
					// this.wechatAuthCode()
					var url = this.delParam()
					window.location.replace(url)
				}
			},
			error: () => {
				if (failBack) {
					failBack('网络错误')
				}
			},
		})
	},
	// 微信授权
	wechatAuthCode: function () {
		// 请求微信接口 获取code
		var params = window.location.href.split('?')
		var redirect_uri = encodeURIComponent(window.location.href)
		var response_type = 'code'
		var scope = 'snsapi_userinfo'
		var state = params.length > 1 ? encodeURIComponent(params[1]) : 'state'
		var url =
			'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
			this.appid +
			'&redirect_uri=' +
			redirect_uri +
			'&response_type=' +
			response_type +
			'&scope=' +
			scope +
			'&state=' +
			state +
			'&connect_redirect=1' +
			'#wechat_redirect'
		window.location.href = url
	},

	getQueryString: function (name) {
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
		var r = window.location.search.substr(1).match(reg)
		if (r != null) return unescape(r[2])
		return null
	},
	// 获取用户信息
	getMemberByToken: function (successBack, failBack) {
		if (sessionStorage.getItem('fs_member')) {
			if (successBack) {
				successBack(sessionStorage.getItem('fs_member'))
			}
		} else {
			$.ajax({
				url: this.api + '/getMemberByToken',
				data: {
					token: this.fs_token,
				},
				type: 'POST',
				async: failBack,
				success: (res) => {
					if (res.ret == 1) {
						authInfo.member = res.member
						sessionStorage.setItem('fs_member', JSON.stringify(res.member))
						// 设置头像
						if (successBack) {
							successBack(res.member)
						} else {
							if (failBack) {
								failBack()
							}
						}
					}
				},
				error: () => {
					if (failBack) {
						failBack()
					}
				},
			})
		}
	},

	// 记录分数
	addActivityScore: function (score, successBack, failBack) {
		if (this.fs_token && this.fs_token.length > 0) {
			$.ajax({
				url: this.api + '/addActivityScore',
				data: {
					activityId: this.activityId,
					token: this.fs_token,
					value: score,
				},
				type: 'POST',
				async: true,
				success: (res) => {
					if (res.ret == 1) {
						if (successBack) {
							successBack()
						}
					} else {
						if (failBack) {
							failBack('记录失败')
						}
					}
				},
				error: () => {
					if (failBack) {
						failBack(this.net_error)
					}
				},
			})
		} else if (this.isApp) {
			// 提示登录
			failBack(false)
		}
	},

	// 活动抽奖

	activityLottery: function (successBack, failBack) {
		$.ajax({
			url: this.api + '/commconLottery',
			data: {
				code: this.activityCode,
				token: this.fs_token,
				imei: this.fs_device,
			},
			type: 'POST',
			async: false,
			success: (res) => {
				if (successBack) {
					successBack(res)
				}
			},
			error: () => {
				if (failBack) {
					failBack(this.net_error)
				}
			},
		})
	},
	// 领奖
	cashPrize: function (prizeCode, successBack, failBack) {
		if (this.fs_token && this.fs_token.length > 0 && !this.is_loading) {
			this.is_loading = true
			$.ajax({
				url: this.api + '/cashPrize',
				data: {
					prizeCode: prizeCode,
					token: this.fs_token,
				},
				type: 'POST',
				async: false,
				success: (res) => {
					if (res.ret == 1) {
						if (successBack) {
							successBack(res)
						}
					} else {
						if (failBack) {
							failBack(res.msg)
						}
					}

					this.is_loading = false
				},
				error: () => {
					if (failBack) {
						failBack(this.net_error)
					}
					this.is_loading = false
				},
			})
		}
	},

	// 获取我的奖品
	getPrizeWinListByToken: function (code, successBack) {
		$.ajax({
			url: this.api + '/getPrizeWinListByToken',
			data: {
				startId: -1,
				count: 10,
				activityCode: code,
				token: this.fs_token,
			},
			type: 'GET',
			async: false,
			success: (res) => {
				if (res.ret == 1) {
					successBack(res.data)
				}
			},
		})
	},
	// 提交信息
	submitInfo(prizeCode, name, phone, successBack) {
		$.ajax({
			url: this.api + '/registerWinner',
			data: {
				prizeCode: prizeCode,
				name: name,
				phone: phone,
				token: this.fs_token,
			},
			type: 'POST',
			async: false,
			success: (res) => {
				if (res.ret == 1) {
					successBack()
				} else {
					alert('您已抽过奖！')
				}
			},
			error: () => {
				alert(this.net_error)
			},
		})
	},

	// 根据code 获取活动信息
	getActivityByCode: function (code) {
		$.ajax({
			url: this.api + '/getActivityByCode',
			data: {
				code: code,
			},
			type: 'GET',
			async: true,
			success: (res) => {
				this.activity = res.activity
				document.title = this.activity.title
				getSign()
			},
		})
	},

	// 删除code state参数
	delParam() {
		var code = 'code'
		var state = 'state'
		var url = window.location.href //页面url
		var urlParam = window.location.search.substr(1) //页面参数
		var beforeUrl = url.substr(0, url.indexOf('?')) //页面主地址（参数之前地址）
		var nextUrl = ''

		var arr = new Array()
		if (urlParam != '') {
			var urlParamArr = urlParam.split('&') //将参数按照&符分成数组
			for (var i = 0; i < urlParamArr.length; i++) {
				var paramArr = urlParamArr[i].split('=') //将参数键，值拆开
				//如果键雨要删除的不一致，则加入到参数中
				if (paramArr[0] != state && paramArr[0] != code) {
					arr.push(urlParamArr[i])
				}
			}
		}
		if (arr.length > 0) {
			nextUrl = '?' + arr.join('&')
		}
		url = beforeUrl + nextUrl
		return url
	},
}

// app传入token
function fs_main(token, device) {
	authInfo.fs_token = token
	authInfo.fs_device = device.replace(/\s+/g, '')
	authInfo.isApp = true
	sessionStorage.setItem('fs_token', token)
	sessionStorage.setItem('fs_device', authInfo.fs_device)
	authInfo.getMemberByToken()
}

function fs_login(successBack, failBack) {
	if (authInfo.is_weixin) {
		// 微信
		authInfo.getUserInfo(successBack, failBack)
	} else {
		var uM = navigator.userAgent
		var isiOS = !!uM.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
		var isAndroid = uM.indexOf('Android') > -1 || uM.indexOf('Linux') > -1
		if (isAndroid && window.ZMBridge) {
			window.ZMBridge.login()
		} else if (
			isiOS &&
			window.webkit &&
			window.webkit.messageHandlers &&
			window.webkit.messageHandlers.login
		) {
			window.webkit.messageHandlers.login.postMessage(0)
		}
	}
}

function fs_getUserinfo(resultBack) {
	if (!authInfo.is_weixin) {
		var uM = navigator.userAgent
		var isiOS = !!uM.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
		var isAndroid = uM.indexOf('Android') > -1 || uM.indexOf('Linux') > -1
		if (isAndroid && window.ZMBridge) {
			window.ZMBridge.getUserinfo()
		} else if (
			isiOS &&
			window.webkit &&
			window.webkit.messageHandlers &&
			window.webkit.messageHandlers.getUserinfo
		) {
			window.webkit.messageHandlers.getUserinfo.postMessage(0)
		}
		setTimeout(() => {
			setTimeout(() => {
				resultBack()
			}, 100)
		}, 100)
	} else {
		resultBack()
	}
}

// 微信分享内容
function getSign(title, desc, link) {
	newstitle = title
	newsdesc = desc
	$.ajax({
		url:
			authInfo.api +
			'/getSign?url=' +
			encodeURIComponent(location.href.split('#')[0]),
		type: 'GET',
		async: true,
		success: (res) => {
			if (res.ret == 1) {
				// res.link = authInfo.activity.url
				res.link = link
				initSign(res)
			}
		},
	})
}

// 去下载app
function toDownApp(newsUrl) {
	var toHref = ''
	var type = 7,
		newsId = 0,
		newsUrl = newsUrl,
		subscription = 0
	var downloadUrl = 'https://vip.foshanplus.com/app/download.html'
	if (newsUrl) {
		newsUrl = encodeURIComponent(newsUrl)
		toHref =
			downloadUrl +
			'?type=' +
			type +
			'&newsId=' +
			newsId +
			'&newsUrl=' +
			newsUrl +
			'&subscription=' +
			subscription // 多余的 ios app 有bug 所以暂时需要添加这句
	} else {
		toHref = downloadUrl
	}
	window.location = toHref
}
