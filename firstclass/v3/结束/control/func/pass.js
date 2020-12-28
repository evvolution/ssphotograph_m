function initBeginView(passIndex, answerResult) {
	if (passIndex > 2) {
		// 设置是查看分数还是生成海报
		finalScore = answerResult.score * 5
		initClockView()
		initLikeView()
		return
	}
	var titleImg = $('#passBegin .titleImg')
	var descImg = $('#passBegin .descImg')
	titleImg.attr('src', './img/beginTitle-' + (passIndex + 1) + '.png')
	descImg.attr('src', './img/beginDesc-' + (passIndex + 1) + '.png')
}

function initPassView(passIndex) {
	if (passIndex > 2) {
		return
	}
	var topTitles = ['一', '二', '三']
	var medalTitles = ['卫生', '校园', '心理']
	var topTitle = $('#passFinish .top-medalContainer .title')
	var topMedal = $('#passFinish .top-medalContainer .icon')
	var bottomItems = Array.from($('#passFinish .bottom-medalContainer .item'))
	topTitle.text(
		'恭喜您完成第' +
			topTitles[passIndex] +
			'关， \n成功获得一枚' +
			medalTitles[passIndex] +
			'防疫勋章'
	)
	topMedal.attr(
		'src',
		'http://img.foshanplus.com/2020/pic/04/topMedal-' +
			(passIndex + 1) +
			'.png'
	)
	// topMedal.attr('src', './img/topMedal-' + (passIndex + 1) + '.png')
	bottomItems.forEach((element, index) => {
		var bottomImg = element.children[0]
		var bottomTitle = element.children[1]
		bottomTitle.style.color = '#333'
		if (index === 0) {
			// 第一个
			// bottomImg.attr("src", './img/bottomMedal-1.png')
			bottomImg.src =
				'http://img.foshanplus.com/2020/pic/04/bottomMedal-1.png'
			// bottomImg.src = './img/bottomMedal-1.png'
		} else if (index === 1) {
			// 第二个
			if (passIndex < 1) {
				bottomImg.src =
					'http://img.foshanplus.com/2020/pic/04/disMedal-2.png'
				// bottomImg.src = './img/disMedal-2.png'
				bottomTitle.style.color = '#CCC'
			} else {
				bottomImg.src =
					'http://img.foshanplus.com/2020/pic/04/bottomMedal-2.png'
				// bottomImg.src = './img/bottomMedal-2.png'
			}
		} else if (index === 2) {
			// 第三个
			if (passIndex < 2) {
				bottomImg.src =
					'http://img.foshanplus.com/2020/pic/04/disMedal-3.png'
				// bottomImg.src = './img/disMedal-3.png'
				bottomTitle.style.color = '#CCC'
			} else {
				bottomImg.src =
					'http://img.foshanplus.com/2020/pic/04/bottomMedal-3.png'
				// bottomImg.src = './img/bottomMedal-3.png'
			}
		}
	})
}

// 设置分数页面
function initScoreView(answerResult) {
	var scoreDom = Array.from($('.pointSection .scoreTitle'))[0]
	scoreDom.innerHTML = answerResult.score * 5 + '分'
	var details = answerResult.detail

	var wrongContainer = $('.pointSection .wrongContainer')
	details.forEach((element, index) => {
		if (!element.is_correct || element.is_correct === '0') {
			var appendHtml =
				'<div class="wrongItem" onclick="checkQuestionItem(' +
				index +
				')" data-toggle="modal" data-target="#exampleModalCenter">' +
				element.id +
				'<img src="./img/wrongItem.png" alt=""></div>'
			wrongContainer.append(appendHtml)
		}
	})

	// 隐藏下载按钮
	// var fs_device = getQueryVariable('fs_device')

	// if (fs_device) {
		var downloadBtn = document.getElementsByClassName('downloadBtn')[0]
		downloadBtn.style.display = 'none'
	// }
}

// 设置打卡页面数据
function initClockView(name, school) {
	var content =
		'在本次网上“开学第一课”中，你表现突出，成绩优异，获得' +
		finalScore +
		'分，'
	if (finalScore === 100) {
		content = content + '特授予你“防疫小先锋”称号，以资鼓励。'
	} else {
		content = content + '再接再厉。'
	}
	inputName = name ? name : inputName
	selectSchool = school ? school : selectSchool
	var contentDoms = Array.from($('.clockSection .clock-container p'))
	contentDoms.forEach((element, index) => {
		if (index === 0) {
			// 标题
			element.innerHTML = inputName
		}
		if (index === 1) {
			element.innerHTML = content
		}
		if (index === 2) {
			element.innerHTML = selectSchool
		}
	})
}

// 获取参数
function getQueryVariable(variable) {
	var query = window.location.search.substring(1)
	var vars = query.split('&')
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=')
		if (pair[0] == variable) {
			return pair[1]
		}
	}
	return false
}

// 打开错题
function checkQuestionItem(index) {
	var item = {}
	if (index < 5) {
		item = totalPassExercises[0][index]
	} else if (index < 15 && index >= 5) {
		item = totalPassExercises[1][index - 5]
	} else {
		item = totalPassExercises[2][index - 15]
	}
	var showWrongItem = document.getElementsByClassName('showWrongItem')[0]
	showWrongItem.style.display = ''
	var wrongItemQuestion = $('.showWrongItem #wrongItemQuestion')
	var yourAnswer = $('.showWrongItem #yourAnswer')
	wrongItemQuestion.text(item.questions)

	yourAnswer.text(
		'正确答案是：' +
			item.answer +
			'  您的选择：' +
			totalAnswer[index].replace(/choices/g, '')
	)
	var wrongItemAnswers = ['A', 'B', 'C', 'D']
	wrongItemAnswers.forEach((element, index) => {
		var wrongItemAnswer = $('.showWrongItem #wrongItemAnswer-' + element)
		if (item.keys.length > index) {
			wrongItemAnswer.text(element + '.' + item.keys[index])
		} else {
			wrongItemAnswer.text()
		}
	})
}

function like() {
	if (!isLike) {
		isLike = true
		bindLike()
		var likebtn = $('.jiyuSection .likebtn img')
		likebtn.attr('src', './img/liked_new.png')

		var checkScoreBtn = document.getElementsByClassName('checkScoreBtn')[0]
		var createPosterBtn = document.getElementsByClassName(
			'createPosterBtn'
		)[0]
		if (finalScore === 100) {
			checkScoreBtn.style.display = 'none'
			createPosterBtn.style.display = ''
		} else {
			checkScoreBtn.style.display = ''
			createPosterBtn.style.display = 'none'
		}

		likeCount++
		setLikeCount()
	}
}

// 关闭错题
function closeQuestionItem() {
	var showWrongItem = document.getElementsByClassName('showWrongItem')[0]
	showWrongItem.style.display = 'none'
}

function initLikeView() {
	getLikeCount((data) => {
		likeCount = data.vote_count
		setLikeCount()
	})
}
function setLikeCount() {
	var likebtn = $('.jiyuSection #likeCount')
	likebtn.text('*已有' + likeCount + '名师生为院士们点赞')
}

initLikeView()
// 输入的名字
var inputName = ''
// 选择学校
var selectSchool = ''

var finalScore = 0

var isLike = 0

var likeCount = 0

$('#exampleModalCenter').on('show.bs.modal', function (event) {
	console.log('测试')
})
