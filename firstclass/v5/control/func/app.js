var vapp = new Vue({
	el: '#app',
	data: {
		isWeixin: true,
		isShowTips: false,
		userIdentity: -1, // 0学生 1老师 2游客
		userIds: [
			{ name: '-请选择身份-', value: -1 },
			{ name: '学生', value: 0 },
			{ name: '老师', value: 1 },
			{ name: '游客', value: 2 },
		],
		score: 0,
		choiceItemImgs: [
			'img/A.png',
			'img/B.png',
			'img/C.png',
			'img/D.png',
			'img/E.png',
			'img/F.png',
			'img/G.png',
		],
		choiceItems: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
		page: 0, // 第几页
		passIndex: 0, // 第几关
		examIndex: 0, // 第几道题
		choiceSelections: [], // 当前选项
		currentExercises: [], // 当前关总共的题目
		totalPassExercises: [], // 总共题目数
		totalAnswer: [], // 总共答案
		liked: false, // 是否点赞
		likedCount: 0,
		answerItems: [],
		showWrongItem: {},
		videoUrl: '',
		videoPoster: '',
		user: { userschool: '', username: '' },
		isVisit: true,
		isShowCourse: false,
	},
	watch: {
		videoPoster(val) {
			var videoDiv = document.getElementById('videoContainer')
			var questiondetail = document.getElementById('questiondetail')
			if (val && val.length > 0) {
				videoDiv.src = this.videoUrl
				videoDiv.poster = val
				videoDiv.style.display = ''
				questiondetail.style.marginTop = '18px'
			} else {
				videoDiv.pause()
				videoDiv.style.display = 'none'
				questiondetail.style.marginTop = '8vh'
			}
		},
		userIdentity(val) {
			userIdentity = val
		},
	},
	methods: {
		initData() {
			this.examIndex = 0
			this.passIndex = 0
			this.liked = false
			this.answerItems = []
			this.totalAnswer = []
			this.choiceSelections = []
			this.totalPassExercises = fsquestions.questionandkey
			this.currentExercises = this.totalPassExercises[this.passIndex]
		},
		beginChallenge() {},
		selectChoice(index) {
			var question = this.currentExercises[this.examIndex]
			if (question.type == 1) {
				// 多选
				var indexStr = this.choiceItems[index]
				var index = this.choiceSelections.indexOf(indexStr)
				if (index >= 0) {
					this.choiceSelections.splice(index, 1)
				} else {
					this.choiceSelections.push(indexStr)
				}
			} else {
				// 单选
				this.choiceSelections = []
				var indexStr = this.choiceItems[index]
				this.choiceSelections.push(indexStr)
			}
		},
		next() {
			if (this.choiceSelections.length > 0) {
				this.choiceSelections = this.choiceSelections.sort()
				this.totalAnswer.push(this.choiceSelections.join(','))
			}
			this.choiceSelections = []
			if (this.passIndex < this.totalPassExercises.length) {
				// 答题结束
				if (this.examIndex === this.currentExercises.length - 1) {
					// 下一关
					this.passIndex++
					if (this.passIndex < this.totalPassExercises.length) {
						this.examIndex = 0
						this.currentExercises = this.totalPassExercises[
							this.passIndex
						]
						this.page++
					} else {
						document.getElementById('loader').style.visibility = ''
						bindsubmit(
							this.totalAnswer,
							(res) => {
								document.getElementById(
									'loader'
								).style.visibility = 'hidden'
								this.videoUrl = ''
								this.videoPoster = ''
								this.page++
								this.score = res.score
								this.answerItems = res.detail
								this.updateInfo(res.score)
								this.initLike()
							},
							() => {
								document.getElementById(
									'loader'
								).style.visibility = 'hidden'
								alert('网络错误，请重新提交')
							}
						)
					}
				} else {
					// 下一题
					this.examIndex++
				}
			}
		},
		nextPass() {
			if (this.passIndex === this.totalPassExercises.length) {
				this.page++
			} else {
				this.page = 1
			}
		},
		like() {
			this.liked = true
			bindLike()
			this.likedCount++
		},
		// 获取点赞数
		initLike() {
			getLikeCount((data) => {
				this.likedCount = data.vote_count
			})
		},

		checkQuestionItem(index) {
			var wrongItem = {}
			if (index < 5) {
				wrongItem = this.totalPassExercises[0][index]
			} else if (index < 15 && index >= 5) {
				wrongItem = this.totalPassExercises[1][index - 5]
			} else {
				wrongItem = this.totalPassExercises[2][index - 15]
			}
			this.showWrongItem = wrongItem
			wrongItem.yourAnswer = this.totalAnswer[index]
		},

		// 上传信息
		updateInfo(score) {
      updateInfo(score)
    },
	},
	computed: {
		// 当前当前题目
		getCurrentQuestionInfo() {
			return () => {
				var item = this.currentExercises[this.examIndex]
				this.videoUrl = item.video
				this.videoPoster = item.poster
				return item
			}
		},
		getChoiceImg() {
			return (index) => {
				return this.choiceItemImgs[index]
			}
		},
		isSelectChoice() {
			return (index) => {
				var indexStr = this.choiceItems[index]
				if (this.choiceSelections.indexOf(indexStr) >= 0) {
					return 'choice-selected'
				} else {
					return ''
				}
			}
		},
		getTopMedal() {
			return () => {
				var medals = [
					'./img/topMedal-1.png',
					'./img/topMedal-2.png',
					'./img/topMedal-3.png',
				]
				if (this.passIndex < 4) {
					return medals[this.passIndex - 1]
				}
			}
		},
		getTopMedalDesc() {
			return () => {
				var medals = [
					'恭喜您完成第一关，\n 成功获得一枚卫生防疫勋章',
					'恭喜您完成第二关，\n成功获得一枚校园防疫勋章',
					'恭喜您完成第三关，\n 成功获得一枚心理防疫勋章',
				]
				if (this.passIndex < 4) {
					return medals[this.passIndex - 1]
				}
			}
		},
		getImg() {
			return (name) => {
				// return 'http://img.foshanplus.com/2020/pic/reclass/v3/' + name
				return 'http://fsnewsres.foshanplus.com/firstclass/v4/' + name
				// return './img/' + name
				// return 'http://img.foshanplus.com/2020/pic/reclass4/v1/' + name
			}
		},
		readyImg() {
			return () => {
				var index = this.passIndex + 1
				index = index > 3 ? 3 : index
				return 'img/no' + index + 'ready.png'
			}
		},
	},
	created() {
		this.initData()
		this.isWeixin = is_weixin()
	},
})

function stopVideo() {
	// var videoObj = videojs('jiyuvideoContainer')
	var videoDiv = document.getElementById('jiyuvideoContainer')
	videoDiv.pause()
}

function is_weixin() {
	var ua = navigator.userAgent.toLowerCase()
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true
	}
	return false
}
