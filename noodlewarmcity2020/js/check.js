const commonLink = 'https://api.foshanplus.com/foshan/api/v2'

function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
	var r = window.location.search.substr(1).match(reg)
	if (r != null) return unescape(r[2])
	return null
}

var vapp = new Vue({
	el: '#app',
	data: {
		commonLink: 'https://api.foshanplus.com/foshan/api/v2',
		// commonLink: 'http://foshan-app-tomcat.default:80/api/v2',

		activityCode_0: 'noodlewarmcity_2020',
		activityCode_1: 'noodlewarmcity_2020_2',

		prize: null,
		fs_token: '',
		prizeCode: '',
		isAdmin: 0,
		isBox: 0,
		isConsume: 1, // 是否为核销
		isOver: 0, // 是否过期
		prizeListData: {
			prizeSurplusCount: 0,
			winCount: 0,
			consumeCount: 0,
		},
		prizeList: [], // 列表信息
		canMore: false, // 能否获取更多
	},
	computed: {
		prizeStatus() {
			return () => {
				if (this.prize.sendStatus === 1) {
					return '（已使用）'
				} else {
					var isOver = this.checkTime(this.prize.consumeEndTime)
					if (isOver) {
						this.isOver = isOver
						return '已过期'
					} else {
						return ''
					}
				}
			}
		},
		getTime() {
			return (data) => {
				var datalist = data.split(' ')
				if (datalist.length > 1) {
					yearLsit = datalist[0].split('-')
					timeLsit = datalist[1].split(':')
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

		getTimeTitle() {
			return () => {
				if (this.isConsume) {
					return '核销时间'
				} else {
					return '领取时间'
				}
			}
		},
	},
	methods: {
		// 核销
		consumeCoupon() {
			$.ajax({
				url: this.commonLink + '/consumeCoupon',
				data: {
					token: this.fs_token,
					prizeCode: this.prizeCode,
				},
				async: true,
				type: 'post',
				success: (res) => {
					if (res.ret === 1) {
						alert('核销成功')
						this.getDetailPrize()
						this.getRecordList(true)
					} else if (res.ret === -1) {
						alert('已核销')
					} else {
						alert('核销失败')
					}
				},
			})
		},

		// 获取奖品明细
		getDetailPrize() {
			$.ajax({
				url: this.commonLink + '/getPrize',
				data: {
					aToken: this.fs_token,
					prizeCode: this.prizeCode,
				},
				async: true,
				type: 'get',
				success: (res) => {
					if (res.ret === 1 && res.data) {
						this.prize = res.data
						this.isAdmin = res.isAdmin
					}
				},
			})
		},

		// 获取列表
		getRecordList(isHeader, succssBack, failBack) {
			var activityCode = this.isBox ? this.activityCode_1 : this.activityCode_0
			var count = 50 // 条数
			var params = {
				token: this.fs_token,
				activityCode: activityCode,
				count: 50,
				status: this.isConsume,
			}
			if (!isHeader && this.prizeList.length > 0) {
				var item = this.prizeList[this.prizeList.length - 1]
				if (this.isConsume) {
					// 核销
					params['consumeTimeSno'] = item.consumeTime
				} else {
					params['receiveTimeSno'] = item.receiveTime
				}
			}
			$.ajax({
				url: this.commonLink + '/prizeWinRecordListForConsume',
				data: params,
				async: true,
				type: 'get',
				success: (res) => {
					if (res.ret === 1) {
						this.prizeListData = res
						if (res.data.length < count) {
							this.canMore = false
						} else {
							this.canMore = true
						}
						if (isHeader) {
							this.prizeList = res.data
						} else {
							res.data.forEach((element) => {
								this.prizeList.push(element)
							})
						}

						if (succssBack) {
							succssBack()
						}
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
		},

		// 修改列表
		changeList(isConsume) {
			if (this.isConsume === isConsume) {
				return
			}
			this.isConsume = isConsume
			this.getRecordList(true)
		},
		// 修改类型
		changeType(isBox) {
			this.isBox = isBox
			this.getRecordList(true)
		},
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
			} else if (syear == eyear) {
				if (smonth > emonth) {
					return true
				} else if (smonth == emonth) {
					if (sday > eday) {
						return true
					} else {
						return false
					}
				} else {
					return false
				}
			} else {
				return false
			}
		},
	},
})
