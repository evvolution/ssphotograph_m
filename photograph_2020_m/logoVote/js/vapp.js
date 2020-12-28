function requestData(url, params, type, successBack, failBack) {
	var basePath = 'https://api.foshanplus.com/foshan/api/v2'
	$.ajax({
		url: basePath + url,
		async: true,
		data: params,
		type: type,
		success: (res) => {
			successBack(res)
		},
		error: () => {
			failBack()
		},
	})
}

var vapp = new Vue({
	el: '#app',
	data: {
		childCategoryList: [],
		selectCategoryId: 0,
		user: {
			nickname: '',
			headimgurl: '',
		},
	},
})
