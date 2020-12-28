/*
 * note: 复学第一课控制
 */

var link = 'http://server.foshanplus.com/';
var link2 = 'https://server.foshanplus.com/';
var dis = []
var sch = []
var pIndex = -1
var disEle = document.getElementById('userdistrict')
var schEle = document.getElementById('userschool')

var userschool = ''
var username = ''

var userid = ''

$(document).ready(function () {
	initfullpage()
	test()
	bindgetschools()
	// bindsubmit()
})

function initfullpage() {
	$('#fullpage').fullpage({
		afterLoad: function () {
			$.fn.fullpage.setAllowScrolling(false, 'up')
			$.fn.fullpage.setAllowScrolling(false, 'down')
		},
	})
}

function test() {
	$('.xxx').click(function () {
		$.fn.fullpage.moveSectionDown()
	})
}

function bindsubmit(answers, successBack, failBack) {
	var answerDic = {}
	answers.forEach((element, index) => {
		var newElement = element.replace(/choices/g, '')
		answerDic[index + 1] = newElement
	})
	var jsonAnswer = JSON.stringify(answerDic)
	if (answers.length === 20) {
		//  全部答完
		userid = getParam('openid')
		$.ajax({
			type: 'post',
			async: true,
			url: link2 + 'fcheck',
			data: {
				exam_id: '28',
				openid: userid,
				answers: jsonAnswer,
			},
			// data: {'exam_id':'28','openid':'12313213232131231','answers':'{"1":"A,B,C","2":"B","3":"B","4":"A","5":"A,B,C","6":"A,B,C","7":"A,B,C","8":"A,B,C","9":"A,B,C","10":"A,B,C","11":"A,B,C","12":"B,C","13":"A,B","14":"A,B,C","15":"A,C","16":"B","17":"A,B,C,D","18":"A","19":"A","20":"A"}'},

			success: function (data) {
				successBack(data.data)
			},
			error: function () {
				failBack()
			},
		})
	} else if (answers.length === 5) {
		// if (jsonAnswer === '{"1":"A,B,C","2":"B","3":"B","4":"A","5":"A,B,C"}') {
		// 第一关
		successBack()
		// } else {
		//   failBack()
		// }
	} else {
		// if (jsonAnswer === '{"1":"A,B,C","2":"B","3":"B","4":"A","5":"A,B,C","6":"A,B,C","7":"A,B,C","8":"A,B,C","9":"A,B,C","10":"A,B,C","11":"A,B,C","12":"B,C","13":"A,B","14":"A,B,C","15":"A,C"}') {
		// 第二关
		successBack()
		// } else {
		//   failBack()
		// }
	}
}

function bindLike() {
  userid = 'openid'
	$.ajax({
		type: 'get',
		async: true,
		url: link2 + 'exam/add_vote_star/?',
		data: {
			exam_id: '28',
			openid: userid,
			vote_list: 178,
			type: 1,
		},
	})
}

function getLikeCount(successBack) {
	$.ajax({
		type: 'get',
		async: true,
		url: link2 + 'exam/get_vote/?',
		data: {
			exam_id: '28',
		},
		success: (data) => {
      if (data.projects&&data.projects.length > 0) {
        successBack(data.projects[0][0])
      }
		},
	})
}

function bindgetschools() {
	dis = fsschools.schools[0].district
	sch = fsschools.schools[0].managed

	for (var i = 0; i < dis.length; i++) {
		//声明option.<option value="pres[i]">Pres[i]</option>
		var op = new Option(dis[i], i)
		//添加
		disEle.options.add(op)
	}
}

function chg(obj) {
	if (obj.value == -1) {
		var defaultx = '<option value="-1">-请选择学校-</option>'
		schEle.options.length = 0
		$('#userschool').html(defaultx)
		return
	}
	//获取值
	var val = obj.value
	pIndex = obj.value
	var cs = sch[val]
	schEle.options.length = 0
	for (var i = 0; i < cs.length; i++) {
		var op = new Option(cs[i], i)
		schEle.options.add(op)
	}
}

function start() {
	userschool = $('#userschool option:selected').text()
	username = $('#username').val()
	if (userschool === '-请选择学校-' || username === '') {
		alert('请填写个人信息')
		return
	} else {
		initClockView(username, userschool)

		$.fn.fullpage.moveSectionDown()
	}
}

function getParam(paramName) {
	;(paramValue = ''), (isFound = !1)
	if (
		this.location.search.indexOf('?') == 0 &&
		this.location.search.indexOf('=') > 1
	) {
		;(arrSource = unescape(this.location.search)
			.substring(1, this.location.search.length)
			.split('&')),
			(i = 0)
		while (i < arrSource.length && !isFound)
			arrSource[i].indexOf('=') > 0 &&
				arrSource[i].split('=')[0].toLowerCase() ==
					paramName.toLowerCase() &&
				((paramValue = arrSource[i].split('=')[1]), (isFound = !0)),
				i++
	}
	return paramValue == '' && (paramValue = null), paramValue
}

function visitorsmode() {
	userschool = ''
	username = '游客'
	initClockView(username, userschool)
	$.fn.fullpage.moveSectionDown()
}
