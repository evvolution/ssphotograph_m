
//保存图片
function saveSharePic(id) {
	// 想要保存的图片节点
	const dom = document.getElementById(id)
	// 创建一个新的canvas
	const canvas = document.createElement('canvas')
	const width = dom.offsetWidth // 可见屏幕的宽
	const height = dom.offsetHeight // 可见屏幕的高
	console.log('可见屏幕宽高：' + width + '、' + height)
	const scale = window.devicePixelRatio // 设备的devicePixelRatio
	// 将Canvas画布放大scale倍，然后放在小的屏幕里，解决模糊问题
	canvas.width = width * scale
	canvas.height = height * scale
	console.log('canvas宽高：' + canvas.width + '、' + canvas.height) 
	canvas.getContext('2d').scale(scale, scale)
	// dom节点绘制成canvas
	html2canvas(dom, { useCORS: true, allowTaint: false,backgroundColor: null}).then(function (
		canvas
	) {
		const img = canvas2Image(canvas, canvas.width, canvas.height)
		img.style.cssText =
			'width:100%;position:absolute;top:0;left:0;opacity:1;z-index:11;'

		console.log('图片宽高：' + img.width + '、' + img.height)
		dom.appendChild(img)
	})
}

//利用canvas获取图片的base64编码创建图片对象
function canvas2Image(canvas, width, height) {
	const retCanvas = document.createElement('canvas')
	const retCtx = retCanvas.getContext('2d')
	retCanvas.width = width
	retCanvas.height = height
	retCtx.drawImage(canvas, 0, 0, width, height, 0, 0, width, height)
	const img = document.createElement('img')
	img.src = retCanvas.toDataURL('image/jpg', 1) // 可以根据需要更改格式
	return img
}
