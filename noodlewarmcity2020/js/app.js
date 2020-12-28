var vapp = new Vue({
	el: '#app',
	data: {
		// commonLink: 'http://172.16.20.17:8000',
		commonLink: 'https://api.foshanplus.com/foshan/api/v2',
		// commonLink: 'http://foshan-app-tomcat.default:80',
		url:
			'https%3a%2f%2fcontent.foshanplus.com%2fh5%2fnoodlewarmcity2020%2findex.html',
		page: -1,
		user_id: 0,
		activityCode: 'noodlewarmcity_2020',
		fs_token: '',
		network_msg: '网络错误',
		loading: false,
		uploadSuc: false, // 是否提交成功
		showInviteList: false, // 是否展示邀请列表
		shareTips: false, //是否展示分享提示
		inviteTips: false, //是否展示邀请列表
		showQRCode: false, // 是否展示二维码
		showCoupon: false, // 是否展示获取咖啡券
		isCutView: false, // 是否缩减view
		showRule: 0, //
		showDesc: 0,
		userInfo: {
			name: '',
			phone: '',
			head_pic: '',
		},
		icon_list: [
			{ user: '' },
			{ user: '' },
			{ user: '' },
			{ user: '' },
			{ user: '' },
		],
		invite_list: [],
		prize_list_0: [],
		prize_list_1: [],

		isApp: false,
		showPrize: null,
		shareUrl: '',
		downBtnImg: 0,
	},
	watch: {
		imgPaths(val) {
			if (val.length === this.imgFiles.length && val.length > 0) {
				// 完成
				this.submitInfo()
			}
		},
	},
	computed: {
		getTime() {
			return (data) => {
				var datalist = data.split(' ')
				if (datalist.length > 1) {
					var yearLsit = datalist[0].split('-')
					var timeLsit = datalist[1].split(':')
					if (yearLsit.length > 2 && timeLsit.length > 2) {
						return (
							yearLsit[1] +
							'-' +
							yearLsit[2] +
							' ' +
							timeLsit[0] +
							':' +
							timeLsit[1]
						)
					}
				}
				return data
			}
		},
		consumeEndTime() {
			return (date) => {
				var newDate = date.split(' ')[0]
				if (newDate) {
					return newDate
				} else {
					return date
				}
			}
		},
		// 状态
		sendStatusRemark() {
			return (item) => {
				if (item.sendStatus === 1) {
					return '已消费'
				} else {
					var isOver = this.checkTime(item.consumeEndTime)
					if (isOver) {
						return '已过期'
					} else {
						return '待消费'
					}
				}
			}
		},
	},

	created() {
		this.changeView()
		this.inviteMemberId = this.getUrlParam('inviteMemberId')
		fs_getUserinfo(() => {
			this.isApp = authInfo.isApp
			if (authInfo.fs_token && authInfo.fs_token.length > 0) {
				this.fs_token = authInfo.fs_token
				if (authInfo.member.id) {
					this.user_id = authInfo.member.id
					if (this.inviteMemberId == this.user_id) {
						this.page = 1
					} else {
						this.page = 0
					}
					this.changeLocation(this.user_id)
				} else {
					authInfo.getMemberByToken((res) => {
						this.user_id = authInfo.member.id
						if (this.inviteMemberId == this.user_id) {
							this.page = 1
						} else {
							this.page = 0
						}
						this.changeLocation(this.user_id)
					})
				}
				if (this.isApp) {
					this.page = 1
				}
			} else {
				if (this.isApp) {
					fs_login()
					this.page = 1
				} else {
					this.page = 0
				}
			}
			this.getInviteList()
		})

		this.btnAction()
	},

	methods: {
		btnAction() {
			setTimeout(() => {
				if (this.downBtnImg) {
					this.downBtnImg = 0
				} else {
					this.downBtnImg = 1
				}
				this.btnAction()
			}, 400)
			// window.setInterval(() => {
			// 	if (this.downBtnImg) {
			// 		this.downBtnImg = 0
			// 	} else {
			// 		this.downBtnImg = 1
			// 	}
			// }, 400)
		},

		// 校对时间
		checkTime(consumeEndTime) {
			//通过replace方法将字符串转换成Date格式
			var sdate = new Date()
			var edate = new Date(Date.parse(consumeEndTime.replace(/-/g, '/')))
			//获取两个日期的年月日
			var smonth = sdate.getMonth() + 1
			var syear = sdate.getFullYear()
			var sday = sdate.getDate()

			var emonth = edate.getMonth() + 1
			var eyear = edate.getFullYear()
			var eday = edate.getDate()
			//从年，月，日，分别进行比较
			if (syear > eyear) {
				return true
			} else {
				if (smonth > emonth) {
					return true
				} else {
					if (sday > eday) {
						return true
					} else {
						return false
					}
				}
			}
		},
		changeView() {
			var windowWidth = $(window).width()
			var windowHeight = $(window).height()
			var scale = windowWidth / windowHeight
			if (scale > 0.6) {
				// 缩小距离
				this.isCutView = true
			}
		},

		// 改变url地址
		changeLocation(inviteMemberId) {
			var url = document.URL //获取当前页面的网址信息
			// var originUrl = url.split('?')[0]
			var originUrl =
				'http://api.foshanplus.com/foshan/api/v2/wxAuthorize?redirectUri=https%3a%2f%2fcontent.foshanplus.com%2fh5%2fnoodlewarmcity2020%2findex.html'
			var link = originUrl + '%3finviteMemberId%3d' + inviteMemberId
			var title = authInfo.member.nickname + '邀请你吃一碗面'
			var desc = '点击链接，免费领取健康面'
			getSign(title, desc, link)
			this.checkPrizeStatus()
		},
		// 检查用户信息
		checkUserInfo() {
			$.ajax({
				url: this.commonLink + '/user_info_by_token',
				data: {
					fs_token: this.fs_token,
				},
				async: true,
				type: 'get',
				success: (res) => {
					// if (
					// 	res.data &&
					// 	(res.data.name.length === 0 ||
					// 		res.data.phone.length === 0 ||
					// 		res.data.head_pic.length === 0)
					// ) {
					if (res.data) {
						this.userInfo = res.data
						// 填写信息
						this.page = 3
						this.wxUserId = res.data.id
					}

					// }
				},
			})
		},

		// 打开二维码
		openPrizeItem(item) {
			// if (this.isApp) {
			this.showPrize = item
			this.showQRCode = true
			$('#qrcode').empty()
			jQuery('#qrcode').qrcode({
				text: item.consumeUrl,
			})
			// }
		},

		// 检查中奖状态
		checkPrizeStatus() {
			$.ajax({
				url: this.commonLink + '/canGetNoodlewarmcityprize',
				data: {
					token: this.fs_token,
				},
				async: true,
				type: 'get',
				success: (res) => {
					if (res.ret == 1 && (res.firstStatus == 1 || res.secondStatus == 1)) {
						if (res.firstStatus == 1) {
							// 第一包
							this.getNatureonesendcoffee(true)
						}
						if (res.secondStatus == 1) {
							// 第二包
							this.getNatureonesendcoffee(false)
						}
					}
				},
			})
		},

		// 领取咖啡券
		getNatureonesendcoffee(isFirst) {
			var params = {
				token: this.fs_token,
			}
			if (isFirst) {
				params['status'] = 'first'
			} else {
				params['status'] = 'second'
			}
			$.ajax({
				url: this.commonLink + '/getNoodlewarmcityprize',
				data: params,
				async: true,
				type: 'post',
				success: (res) => {
					if (res.ret == 1 && res.data && !this.showCoupon) {
						// 弹出框
						this.showCoupon = 1
					}
				},
			})
		},

		// 收下优惠券
		takeCoupon() {
			this.showCoupon = 0
		},

		// 获取我的邀请列表
		getInviteList() {
			$.ajax({
				url: this.commonLink + '/getMemberInviteList',
				data: {
					token: this.fs_token,
					activityCode: this.activityCode,
				},
				async: true,
				type: 'get',
				success: (res) => {
					if (res.ret === 1 && res.data) {
						this.invite_list = res.data
					} else {
						this.invite_list = []
					}
					this.setupInviteList()
				},
			})
		},
		// 获取我的奖品
		getMyPrizes() {
			var activityCode_0 = 'noodlewarmcity_2020'
			var activityCode_1 = 'noodlewarmcity_2020_2'
			this.inviteTips = true
			$.ajax({
				url: this.commonLink + '/getMyPrizes',
				data: {
					token: this.fs_token,
					activityCode: activityCode_0,
					count: 50,
				},
				async: true,
				type: 'get',
				success: (res) => {
					if (res.ret === 1 && res.data) {
						this.prize_list_0 = res.data
					}
				},
			})
			$.ajax({
				url: this.commonLink + '/getMyPrizes',
				data: {
					token: this.fs_token,
					activityCode: activityCode_1,
					count: 50,
				},
				async: true,
				type: 'get',
				success: (res) => {
					if (res.ret === 1 && res.data) {
						this.prize_list_1 = res.data
					}
				},
			})
		},
		// 邀请用户
		memberAcceptInvite(inviteMemberId, callBack) {
			$.ajax({
				url: this.commonLink + '/memberAcceptInvite',
				data: {
					token: this.fs_token,
					activityCode: this.activityCode,
					inviteMemberId: inviteMemberId,
				},
				async: true,
				type: 'post',
				success: (res) => {
					if (res.ret === 1) {
						callBack()
					} else {
						callBack()
					}
				},
			})
		},

		// 设置邀请列表
		setupInviteList() {
			let successIndex = 0
			for (let index = 0; index < this.invite_list.length; index++) {
				const element = this.invite_list[index]
				if (element.loginStatus === 1) {
					var item = this.icon_list[successIndex]
					item.user = element.photo
					successIndex++
				}
			}
		},
		// 我也要咖啡券
		takeCoupe() {
			fs_login()
			this.page = 1
		},
		// 下载app
		downApp() {
			if (this.inviteMemberId) {
				this.memberAcceptInvite(this.inviteMemberId, () => {
					// 跳转下载页
					window.location =
						'https://vip.foshanplus.com/app/download.html?type=7&newsId=0&newsUrl=' +
						this.url +
						'&subscription=0&cid=1062'
				})
			} else {
				// 跳转下载页
				window.location =
					'https://vip.foshanplus.com/app/download.html?type=7&newsId=0&newsUrl=' +
					this.url +
					'&subscription=0&cid=1062'
			}
		},
		// 打开app
		openApp() {
			window.location =
				'https://vip.foshanplus.com/app/download.html?type=7&newsId=0&newsUrl=' +
				this.url +
				'&subscription=0&cid=1062'
		},

		// 获取url上的参数
		getUrlParam(name) {
			var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
			var r = window.location.search.substr(1).match(reg)
			if (r != null) return decodeURI(r[2]) // decodeURI(r[2]); 解决参数是中文时的乱码问题
			return null
		},
	},
})
