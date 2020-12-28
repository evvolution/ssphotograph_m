var vapp = new Vue({
	el: '#app',
	data: {
		// commonLink: 'http://172.16.20.198:8080/foshan/api/v2',
		commonLink: 'https://api.foshanplus.com/foshan/api/v2',
		activityCode: 'fsdigitalcomment',
		page: 0,
		showRule: 0,
		inputId: 3,
		imgArray: [],
		imgFiles: [],
		imgPaths: [], // 保存图片地址
		user_id: 0,
		fs_token: '',
		content: '', //内容
		article_title: '', // 标题
		article_author: '', // 作者
		network_msg: '网络错误，请重试',
		input_Info: false, // 是否需要填写信息
		loading: false,
		uploadSuc: false, // 是否提交成功
		userInfo: {
			name: '',
			phone: '',
			head_pic: '',
		},
		prize_name: '', //中奖奖品
		wxUserId: 0,
		showLottery: false,
		isApp: false,
	},
	watch: {
		imgPaths(val) {
			if (val.length === this.imgFiles.length && val.length > 0) {
				// 完成
				this.submitInfo()
			}
		},
	},

	created() {
		sessionStorage.setItem('fs_token', this.fs_token)
		console.log($('textarea'))
	},

	methods: {
		initData() {
			this.content = ''
			this.article_title = ''
			this.article_author = ''
			this.imgArray = []
			this.imgFiles = []
			this.imgPaths = []
		},
		//开始
		begin() {
			this.initData()
			fs_getUserinfo(() => {
				if (!authInfo.fs_token || authInfo.fs_token.length == 0) {
					if (authInfo.isApp) {
						fs_login()
					} else {
						alert('请到微信或佛山+app参与')
						return
					}
				} else {
					this.fs_token = authInfo.fs_token
					if (authInfo.member.id) {
						this.user_id = authInfo.member.id
						this.page = 1
					} else {
						authInfo.getMemberByToken((res) => {
							this.user_id = authInfo.member.id
							this.page = 1
						})
					}
				}
			})
		},
		// 选择图片
		handleFileChange(event) {
			var files = event.target.files
			for (let index = 0; index < files.length; index++) {
				const file = files[index]
				let url = ''
				var reader = new FileReader()
				reader.readAsDataURL(file)
				let that = this
				this.imgFiles.push(file)
				reader.onload = function (e) {
					url = this.result.substring(this.result.indexOf(',') + 1)
					var imgUrl = 'data:image/png;base64,' + url
					that.imgArray.push(imgUrl)
				}
			}
			// let file = event.target.files[0]
		},
		// 点击提交
		submit() {
			// if (this.imgFiles.length === 0) {
			// 	alert('请上传至少一张图片')
			// 	return
			// }
			this.loading = true

			if (this.imgPaths.length === this.imgFiles.length && this.imgPaths > 0) {
				// 图片已经上传过
				this.submitInfo()
			} else if (this.imgFiles.length === 0) {
				this.submitInfo()
			} else {
				// 图片还未上传
				this.imgFiles.forEach((file) => {
					this.uploadImg(file)
				})
			}
		},
		// 提交资料
		submitInfo() {
			var images = '图片'
			if (this.imgPaths.length > 0) {
				images = this.imgPaths.join(',')
			}
			var data = {
				activityCode: this.activityCode,
				title: '”数字佛山大家谈“征文活动',
				images: images,
				token: this.fs_token,
				content: this.content,
				title: this.article_title,
				author: this.article_author,
			}
			$.ajax({
				url: this.commonLink + '/memberDraft',
				data: data,
				async: true,
				type: 'POST',
				success: (res) => {
					this.loading = false
					if (res.ret == 1) {
						this.page = 2
					} else {
						alert(this.network_msg)
					}
				},
				error: (res) => {
					this.loading = false
					alert(this.network_msg)
				},
			})
		},

		// 上次图片
		uploadImg(file) {
			var params = new FormData()

			params.append('file', file)
			params.append('token', this.fs_token)

			$.ajax({
				url: this.commonLink + '/file/upload',
				async: true,
				type: 'POST',
				data: params,
				dataType: 'json',
				processData: false, //tell jQuery not to process the data
				contentType: false,
				success: (res) => {
					if (res.ret) {
						this.imgPaths.push(res.filePath)
					} else {
						this.loading = false
						alert(this.network_msg)
					}
				},
				error: (res) => {
					this.loading = false
					alert(this.network_msg)
				},
			})
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
					if (res.data) {
						this.userInfo = res.data
						// 填写信息
						this.page = 3
						this.wxUserId = res.data.id
					}
				},
			})
		},
		pushNews() {
			window.location.href =
				'https://content.foshanplus.com/newsDetails.html?newsId=519860'
		},

		downApp() {
			window.location =
				'https://vip.foshanplus.com/app/download.html?type=7&newsId=0&newsUrl=https://content.foshanplus.com/h5/foshan_story_project/index.html&subscription=0&cid=1031'
		},
	},
})
