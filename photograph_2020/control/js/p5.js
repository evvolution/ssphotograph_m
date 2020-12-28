/*
    note：第五页控制
    anthor：zx
*/

function getoldprjs() {
    $.ajax({
        type:"get",
        url: commonlink + 'exam/get_vote/?exam_id=37',
        success:function(receiver){
            // console.log(receiver.projects[0]);

            //填入轮播的dom总string
            var inner = "";

            //旧视频总数目
            var countall = receiver.projects[0].length;

            //取余，确顶最后一页的循环构建次数
            var lastpage = countall % 6;
            
            //构建的页面总数countall_boxNum，每页6个，若余数为0整除，若余数不为0总数目增量整除
            var countall_boxNum = 0;

            if(lastpage === 0) {
                countall_boxNum = countall / 6;
                for(var i = 0; i < countall_boxNum; i++) {
                    var title = '<div class="box"><div class="row p5rowlevel2">';
                    //填入每页的item构建
                    var inneritem = "";
                    for(var j = 6*i; j < 6*(i + 1); j++) {
                        let line1 = '<div class="col-md-4 oldprjitem"><div class="oldprjcover">';
                        // let line2 = '<a href="' + receiver.projects[0][j].url + '" target="_blank">';
                        let line3 = '<img src="' + receiver.projects[0][j].pic_url + '"/>';
                        let line4 = '<div class="p6picauthor">' + receiver.projects[0][j].title + '</div><div class="p6pictitle">' + receiver.projects[0][j].item_id + '</div></div></div>'
                        inneritem += (line1 + line3 + line4);
                    }
                    var tail = '</div></div>';
                    inner += (title + inneritem + tail);
                }
            } else {
                countall_boxNum = Math.ceil(countall / 6);
                for(var i = 0; i < countall_boxNum; i++) {
                    var title = '<div class="box"><div class="row p5rowlevel2">';
                    //填入每页的item构建
                    var inneritem = "";
                    if(i != (countall_boxNum - 1)) {
                        for(var j = 6*i; j < 6*(i + 1); j++) {
                            let line1 = '<div class="col-md-4 oldprjitem"><div class="oldprjcover">';
                            // let line2 = '<a href="' + receiver.projects[0][j].url + '" target="_blank">';
                            let line3 = '<img src="' + receiver.projects[0][j].pic_url + '"/>';
                            let line4 = '<div class="p6picauthor">' + receiver.projects[0][j].title + '</div><div class="p6pictitle">' + receiver.projects[0][j].item_id + '</div></div></div>'
                            inneritem += (line1 + line3 + line4);
                        }
                    } else {
                        for(var k = 6*i; k < countall; k++) { //这里循环结束以整个实际长度为准
                            let line1 = '<div class="col-md-4 oldprjitem"><div class="oldprjcover">';
                            // let line2 = '<a href="' + receiver.projects[0][k].url + '" target="_blank">';
                            let line3 = '<img src="' + receiver.projects[0][k].pic_url + '"/>';
                            let line4 = '<div class="p6picauthor">' + receiver.projects[0][k].title + '</div><div class="p6pictitle">' + receiver.projects[0][k].item_id + '</div></div></div>'
                            inneritem += (line1 + line3 + line4);
                        }
                    }
                    var tail = '</div></div>';
                    inner += (title + inneritem + tail);
                }
            }

            $("#oldprjs").html(inner);
            liteswitchp5 = new liteswitchp5({
                loop: true,
                startIndex: 0,//起始滑块的索引（从零开始）
                draggable: false,//使用拖动和触摸滑动
            });

        },
        error: function(receiver){
            console.log(receiver);
            swal({
                title: "获取历史记录失败，请稍后重试",
                icon: "error",
            });
            return;
        }
    });
}


function initnews() {
    var newsnum = newsinfo.total;
    var newsstr = "";
    for (var i = 0; i < newsnum; i++) {
        let line = '';
        line = '<li class="list-group-item d-flex justify-content-between align-items-center"><a target="_blank" href="' + newsinfo.info[0].link[i] + '">' + newsinfo.info[0].title[i] + '</a></li>'
        newsstr += line;
    }
    var news = document.getElementById("news_mobile")
    news.innerHTML = newsstr;
}
