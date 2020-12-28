document.write(
	"<script src='https://res.wx.qq.com/open/js/jweixin-1.2.0.js'></script>"
)

function initSign(data) {
	var appid = data.appid
	var timestamp = data.timestamp
	var noncestr = data.nonceStr
	var signature = data.signature

	//分享链接的缩略图
	var imgUrl = faceimage
	//分享链接的链接地址

	//分享链接的描述信息
	var desc = newsdesc
	// var desc = ccgreenVoteDetailslogan
	//分享链接的标题
	var title = data.newstitle

  	var link = data.link
  
	//weixin begin
	wx.config({
		debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		appId: appid, // 必填，公众号的唯一标识
		timestamp: timestamp, // 必填，生成签名的时间戳
		nonceStr: noncestr, // 必填，生成签名的随机串
		signature: signature, // 必填，签名，见附录1
		jsApiList: [
			'onMenuShareTimeline',
			'onMenuShareAppMessage',
			'onMenuShareQQ',
			'onMenuShareWeibo',
			'onMenuShareQZone',
		],
		//jsApiList 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	})

	wx.ready(function () {
		//获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
		// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
		wx.onMenuShareTimeline({
			title: title, // 分享标题
			desc: desc, // 分享描述
			link: link, // 分享链接
			imgUrl: imgUrl, // 分享图标
			success: function () {
				// 用户确认分享后执行的回调函数
				updateShareInfo('Timeline')
			},
			cancel: function () {
				// 用户取消分享后执行的回调函数
			},
		})

		//获取“分享给朋友”按钮点击状态及自定义分享内容接口
		wx.onMenuShareAppMessage({
			title: title, // 分享标题
			desc: desc, // 分享描述
			link: link, // 分享链接
			imgUrl: imgUrl, // 分享图标
			type: 'link', // 分享类型,music、video或link，不填默认为link
			dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			success: function () {
				// 用户确认分享后执行的回调函数
				updateShareInfo('AppMessage')
			},
			cancel: function () {
				// 用户取消分享后执行的回调函数
			},
		})

		//获取“分享到QQ”按钮点击状态及自定义分享内容接口
		wx.onMenuShareQQ({
			title: title, // 分享标题
			desc: desc, // 分享描述
			link: link, // 分享链接
			imgUrl: imgUrl, // 分享图标
			success: function () {
				// 用户确认分享后执行的回调函数
				updateShareInfo('QQ')
			},
			cancel: function () {
				// 用户取消分享后执行的回调函数
			},
		})
		//获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
		wx.onMenuShareWeibo({
			title: title, // 分享标题
			desc: desc, // 分享描述
			link: link, // 分享链接
			imgUrl: imgUrl, // 分享图标
			success: function () {
				// 用户确认分享后执行的回调函数
				updateShareInfo('Weibo')
			},
			cancel: function () {
				// 用户取消分享后执行的回调函数
			},
		})
		//获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
		wx.onMenuShareQZone({
			title: title, // 分享标题
			desc: desc, // 分享描述
			link: link, // 分享链接
			imgUrl: imgUrl, // 分享图标
			success: function () {
				// 用户确认分享后执行的回调函数
				updateShareInfo('QZone')
			},
			cancel: function () {
				// 用户取消分享后执行的回调函数
			},
		})

		wx.error(function (res) {
			// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
		})
	})
}

function updateShareInfo(type) {
	var url = window.location.href
	var apiUrl = 'https://api.foshanplus.com/foshan/api/v2'
	var sign = 'b84e88a34bc2b5753b4cca46785750ce' // md5 Foshanplus
	$.ajax({
		url: apiUrl + '/updateShareCount',
		data: { url: url, type: type, sign: sign },
		type: 'post',
		success(res) {},
	})
}
