var fs_player = null
var fs_player_list = []

function initPlayer() {
	fs_player = new DPlayer({
		container: document.getElementById('dplayer'),
		video: {
			url: 'http://fsnewsres.foshanplus.com/cishan/kcp.mp4',
			pic: 'http://fsnewsres.foshanplus.com/cishan/kcp_0.jpg',
		},
  })
	fs_player_list.push(fs_player)
}

// 初始化播放器
function initSectionPlayer() {
	initPlayer()

	var idList = ['player-people', 'player-project', 'player-org','report_player']
	for (let index = 1; index < video_list.length; index++) {
		const element = video_list[index];
		var player = new DPlayer({
			container: document.getElementById(idList[index - 1]),
			video: {
				url: element.video,
				pic: element.img,
			},
		})

		fs_player_list.push(player)
	}
}