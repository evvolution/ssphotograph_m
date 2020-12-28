var vapp = new Vue({
	el: '#app',
	data: {
		commonLink: 'https://api.foshanplus.com/foshan/api/v2',
		activityCode: 'fscharity',
		network_msg: '网络错误',
		fs_token: '',
		typeList: [
			'优秀人物',
			'优秀项目',
			'优秀组织',
			'公益伙伴',
			'特别致敬',
			'发展报告',
		], // 种类列表
		partnerList: [], // 合作伙伴
		userInfo: {
			nickname: '张三',
			photo:
				'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1917894782,2402878377&fm=179&app=42&f=PNG?w=200&h=200&s=7419A6745D9354DC0817876F0300E079',
		},
		partnerIndex: 0,
		detail_item: null, // 详细内容
		list_index: 0, // 列表index
		detail_list: [],
		home_list: [],
		video_list: [],
		playing_video: {},
		showAll: 0,
		topSelection: 0, // 是否置顶
		detail_title_img: '', // 详情页题目图片
		report_list: [], // 报告幻灯片数组
		shareState: 0, // 卡片分享状态
		shareIcon: '',
		isInputComment: 0, // 是否输入评论
		inputContent: '', // 评论内容
		imgFile: 0, // 图片文件
		shareCount: 0, // 分享数量
		comment_list: [],
		canMore: false, // 可否获取更多
		loading_label: '', // 加载中
		imageurl: '', // 图片地址
		shareModel: null, // 分享model
		showLogo: 0, // 是否展示logo
	},
	created() {
		this.initData()
		this.initReportList()
	},
	computed: {
		// 列表名称
		listItemClass() {
			return (index) => {
				if (index == 0) {
					return 'list_container_people'
				} else if (index == 1) {
					return 'list_container_project'
				} else if (index == 2) {
					return 'list_container_org'
				}
				return ''
			}
		},
		// 播放器id名称
		videoPlayerId() {
			return (index) => {
				if (index == 0) {
					return 'player-people'
				} else if (index == 1) {
					return 'player-project'
				} else if (index == 2) {
					return 'player-org'
				}
				return ''
			}
		},

		detailImg() {
			return (item) => {
				if (item.imgHorizontalSrc) {
					return item.imgHorizontalSrc
				} else {
					return item.imgSrc
				}
			}
		},
		shareViewName() {
			return (item) => {
				if (item.shortName) {
					return item.shortName
				} else {
					item.name
				}
			}
		},
	},
	methods: {
		// 初始化
		initData() {
			this.video_list = video_list
			this.partnerList = partnerList
			this.home_list = [
				[peopleList, nominationPeopleList],
				[projectList, nominationProjectList],
				[organizationList, nominationOrganizationList],
			]

			this.playing_video = this.video_list[0]

			// this.detail_list = this.home_list[0][0]
			// setTimeout(() => {
			// 	initDetailSwiperView((activityIndex) => {
			// 		this.detail_item = this.detail_list[activityIndex]
			// 	})
			// }, 500)
		},

		showLogoAction() {},

		// 跳转详情
		pushDetail(item, par_index, sub_index, index) {
			if (sub_index == 0) {
				this.detail_title_img = './img/detail_' + par_index + '.png'
			} else {
				this.detail_title_img = './img/dis_detail_' + par_index + '.png'
			}

			var perCount = 5
			if (par_index == 0) {
				this.shareIcon = './img/icon_people.png'
			} else if (par_index == 1) {
				this.shareIcon = './img/icon_pro.png'
				perCount = 1
			} else if (par_index == 2) {
				this.shareIcon = './img/icon_org.png'
				perCount = 1
			}

			this.detail_list = JSON.parse(
				JSON.stringify(this.home_list[par_index][sub_index])
			)
			this.toFirst(this.detail_list, index)
			this.detail_item = item

			setTimeout(() => {
				initDetailSwiperView(perCount, (activityIndex) => {
					this.detail_item = this.detail_list[activityIndex]
					this.getCommentList(true)
				})
			}, 500)
			// if (fs_player) {
			// 	fs_player.pause()
			// }

			if (fs_player_list) {
				fs_player_list.forEach((element) => {
					element.pause()
				})
			}

			this.getCommentList()
		},

		choiceItem(index) {
			mySwiper.slideTo(index, 500, false)

			// this.detail_item = item
			this.showAll = 0
		},

		// 切换列表
		changeList(index) {
			var domId = 'img-section-' + index
			// if (index == 0) {
			// 	domId = 'player-people'
			// } else if (index == 1) {
			// 	domId = 'player-project'
			// } else if (index == 2) {
			// 	domId = 'player-org'
			// }
			// var scroll_offset = $('#' + domId).offset().top
			// console.log(scroll_offset)
			// console.log('domId', $('#' + domId))
			// var height = $('#' + domId)
			// $('#page1').animate({ scrollTo: scroll_offset }, 300)
			// var Y = this.domY_list[index]
			// document.getElementById('page1').scrollTo(0, Y)
			this.list_index = index

			document.getElementById(domId).scrollIntoView({
				block: 'start',
				behavior: 'smooth',
			})
		},
		// 返回首页
		goHome() {
			this.detail_list = null
			this.detail_item = null
		},

		// 播放视频
		playerItem(item) {
			if (fs_player) {
				this.playing_video = item
				fs_player.switchVideo({
					url: item.video,
					pic: item.img,
					thumbnails: item.icon,
				})
				fs_player.play()
			}
		},

		// 伙伴分享
		partnerShareAction(item) {
			item.shortName = item.name
			this.shareIcon = './img/icon_partner.png'
			this.shareAction(item)
		},
		//特别奖分享
		sharePeopleAction() {
			var item = outstandingAward_list
			this.shareIcon = './img/icon_sp.png'

			this.shareAction(item)
		},

		// 分享操作
		shareAction(item) {
			this.shareModel = item
			this.loading_label = '生成中'
			this.loadingImg(() => {
				var timestamp = Date.parse(new Date())
				var activityItemId = 0
				var UID = Math.ceil(Math.random() * 1000000) + timestamp
				var params = {
					activityCode: this.activityCode,
					activityItemId: activityItemId,
					token: this.fs_token,
					UID: UID,
					count: 1,
					timeStamp: timestamp,
					fsSign: hex_md5(
						activityItemId + this.fs_token + 'Foshanplus' + UID + timestamp
					),
				}

				$.ajax({
					url: this.commonLink + '/addActivityItemVote',
					data: params,
					async: true,
					type: 'POST',
					success: (res) => {
						this.shareState = 1
						if (res.activityVoteCount) {
							this.shareCount = res.activityVoteCount
						}
						vapp.loading_label = ''
						createPoster()
					},
					error: () => {
						this.this.loading_label = ''
						weui.alert('生成失败')
					},
				})
			})
		},
		// 加载图片
		loadingImg(successBack) {
			var img = new Image()
			img.src = this.shareModel.imgSrc

			// 图片存在缓存中
			if (img.complete) {
				successBack()
				// return
			}
			// 图片加载到浏览器的缓存中回调函数
			img.onload = function () {
				successBack()
			}
		},

		// 获取评论列表
		getCommentList(isHeader) {
			var startId = -1
			var count = 20
			if (!isHeader && this.comment_list.length > 0) {
				var item = this.comment_list[this.comment_list.length - 1]
				startId = item.id
			}
			if (isHeader) {
				this.canMore = false
			}
			var params = {
				activityCode: this.activityCode,
				activityItemId: this.detail_item.id,
				startId: startId,
				count: count,
			}
			$.ajax({
				url: this.commonLink + '/activityItemComment',
				data: params,
				async: true,
				type: 'get',
				success: (res) => {
					if (res.ret == 1) {
						var list = res.data
						if (list.length >= count) {
							this.canMore = true
						} else {
							this.canMore = false
						}
						if (isHeader) {
							this.comment_list = list
						} else {
							list.forEach((element) => {
								this.comment_list.push(element)
							})
						}
					}
				},
			})
		},

		openMore() {
			this.getCommentList(false)
		},

		// 选择合作伙伴标签
		choiceLabel(index) {
			partnerSwiper.slideTo(index, 300, false)
		},

		initReportList() {
			var list = []
			for (let index = 1; index <= 16; index++) {
				var item =
					'https://fsnewsres.foshanplus.com/cishan/hdp/xxhdp' + index + '.jpg'
				list.push(item)
			}
			this.report_list = list
		},

		// 弹出键盘
		showInputComment() {
			this.imgFile = 0
			this.isInputComment = 1
			setTimeout(() => {
				document.getElementById('comment-input').focus()
			}, 400)
		},

		// 打开评论区
		openCommentList() {
			document.getElementById('comment_list').scrollIntoView({
				block: 'start',
				behavior: 'smooth',
			})
		},

		// 评论
		addActivityItemComment() {
			if (this.inputContent.length > 0 || this.imgFile) {
				this.loading_label = '提交中'
				this.uploadImg((imgPath) => {
					var content = ''
					if (this.inputContent.length > 0) {
						content = this.inputContent
					} else {
						content = '分享图片'
					}
					var params = {
						token: this.fs_token,
						activityCode: this.activityCode,
						activityItemId: this.detail_item.id,
						content: content,
						imgPath: imgPath,
					}
					$.ajax({
						url: this.commonLink + '/activityItemComment',
						data: params,
						async: true,
						type: 'POST',
						success: (res) => {
							if (res.ret === 1) {
								this.inputContent = ''
								this.isInputComment = 0
								this.loading_label = ''
								this.Toast('评论成功，待审核', 3000)
							} else {
								weui.alert(res.msg)
							}
						},
						error: () => {
							this.loading_label = ''
							weui.alert(this.network_msg)
						},
					})
				})
			}
		},

		// 上传图片
		handleFileChange(event) {
			var files = event.target.files
			for (let index = 0; index < files.length; index++) {
				const file = files[index]
				let url = ''
				var reader = new FileReader()
				reader.readAsDataURL(file)
				this.imgFile = file
				// let that = this
				// reader.onload = function (e) {
				// 	url = this.result.substring(this.result.indexOf(',') + 1)
				// 	var imgUrl = 'data:image/png;base64,' + url
				// 	that.imgFile = imgUrl
				// }
			}
		},
		// 上次图片
		uploadImg(successBack) {
			if (!this.imgFile) {
				successBack('')
				return
			}
			var params = new FormData()
			params.append('file', this.imgFile)
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
						// 成功
						successBack(res.filePath)
					} else {
						// 失败
						this.loading_label = ''
						weui.alert(res.msg)
					}
				},
				error: (res) => {
					this.loading_label = ''
					weui.alert(this.network_msg)
				},
			})
		},

		// 数组放到首位
		toFirst(fieldData, index) {
			if (index != 0) {
				// fieldData[index] = fieldData.splice(0, 1, fieldData[index])[0]; 这种方法是与另一个元素交换了位子，
				fieldData.unshift(fieldData.splice(index, 1)[0])
			}
		},

		Toast(msg, duration) {
			duration = isNaN(duration) ? 3000 : duration
			var m = document.createElement('div')
			m.innerHTML = msg
			m.style.cssText =
				'max-width:60%;min-width: 150px;padding:0 14px;height: 40px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;'
			document.body.appendChild(m)
			setTimeout(function () {
				var d = 0.5
				m.style.webkitTransition =
					'-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in'
				m.style.opacity = '0'
				setTimeout(function () {
					document.body.removeChild(m)
				}, d * 1000)
			}, duration)
		},
	},
})
