$(function () {
	// 监听滚动事件
	$('#page1').scroll(function () {
		// 获得div的bai高度du
		if (!vapp.detail_item || vapp.detail_item == null) {
			// 主页
			var h = $('#section_title').offset().top
			var scrollTop =
				document.documentElement.scrollTop || document.body.scrollTop
			if (h <= -10) {
				vapp.topSelection = 1
			} else {
				vapp.topSelection = 0
			}
			var sectionTopList = []
			// for (let index = 0; index < 5; index++) {
			// 	var top = $('#img-section-' + index).offset().top
			// 	console.log(top)
			// 	sectionTopList.push()
			// }
		}
	})
})

var winHeight = $(window).height() //获取当前页面高度
$(window).resize(function () {
	var thisHeight = $(this).height()
	if (winHeight - thisHeight > 50) {
		//当软键盘弹出，在这里面操作
	} else {
		//当软键盘收起，在此处操作
	}
})

/**
 * 解决ios键盘弹出遮挡input
 */
function iosInput() {
	var u = navigator.userAgent
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
	if (isiOS) {
		$('.input_comment_container').css('position', 'absolute') //解决第三方软键盘唤起时底部input输入框被遮挡问题
		var bfscrolltop = document.body.scrollTop //获取软键盘唤起前浏览器滚动部分的高度
		$('.input-view')
			.focus(function () {
				//在这里‘input.inputframe’是我的底部输入栏的输入框，当它获取焦点时触发事件
				interval = setInterval(function () {
					//设置一个计时器，时间设置与软键盘弹出所需时间相近
					document.body.scrollTop = document.body.scrollHeight //获取焦点后将浏览器内所有内容高度赋给浏览器滚动部分高度
				}, 100)
			})
			.blur(function () {
				//设定输入框失去焦点时的事件
				clearInterval(interval) //清除计时器
				document.body.scrollTop = bfscrolltop //将软键盘唤起前的浏览器滚动部分高度重新赋给改变后的高度
			})
	}
}
// iosInput();

// 初始化图片点击放大插件viewer
function initViewer() {
	var imgDomList = $('.report-img')
	for (var i = 0; i < imgDomList.length; i++) {
		imgDomList.eq(i).bind('click', function () {
			var pswpElement = document.querySelectorAll('.pswp')[0]
			// build items array
			var items = []
			for (
				var imgDomListI = 0;
				imgDomListI < imgDomList.length;
				imgDomListI++
			) {
				items.push({
					src: imgDomList.eq(imgDomListI).attr('src'),
					w: '' + imgDomList[imgDomListI].naturalWidth,
					h: '' + imgDomList[imgDomListI].naturalHeight,
				})
				imgDomList.eq(imgDomListI).attr('img-index', imgDomListI)
			}
			var index = $(this).attr('img-index')
			var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, {
				index: Number(index),
			})
			gallery.init()
		})
	}
}
