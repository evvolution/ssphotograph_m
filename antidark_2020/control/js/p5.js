/*
    note：第五页控制
    anthor：zx
*/

function getoldprjs() {
    $.ajax({
        type:"get",
        url: commonlink + 'exam/get_vote/?exam_id=34&by_random=0',
        success:function(receiver){
            // console.log(receiver.projects[0]);

            //填入轮播的dom总string
            var inner = "";

            //旧视频总数目
            var countall = receiver.projects[0].length;

            //取余，确顶最后一页的循环构建次数
            var lastpage = countall % 3;
            
            //构建的页面总数countall_boxNum，每页3个，若余数为0整除，若余数不为0总数目增量整除
            var countall_boxNum = 0;

            if(lastpage === 0) {
                countall_boxNum = countall / 3;
                for(var i = 0; i < countall_boxNum; i++) {
                    var title = '<div class="p5content-line">';
                    //填入每页的item构建
                    var inneritem = "";
                    for(var j = 3*i; j < 3*(i + 1); j++) {
                        let line1 = '<div class="p5content-item">';
                        let url = 'oldvideoitem.html?id=' + receiver.projects[0][j].id;
                        let line2 = '<a href="' + url + '" target="_blank">';
                        let line3 = '<img src="' + receiver.projects[0][j].pic_url + '?imageView2/1/w/367/h/203/interlace/1/q/70"/></a>';
                        let line4 = '<p>' + receiver.projects[0][j].title + '</p></div>';
                        inneritem += (line1 + line2 +line3 +line4);
                    }
                    var tail = '</div>';
                    inner += (title + inneritem + tail);
                }
            } else {
                countall_boxNum = Math.ceil(countall / 3);
                for(var i = 0; i < countall_boxNum; i++) {
                    var title = '<div class="p5content-line">';
                    //填入每页的item构建
                    var inneritem = "";
                    if(i != (countall_boxNum - 1)) {
                        for(var j = 3*i; j < 3*(i + 1); j++) {
                            let line1 = '<div class="p5content-item">';
                            let url = 'oldvideoitem.html?id=' + receiver.projects[0][j].id;
                            let line2 = '<a href="' + url + '" target="_blank">';
                            let line3 = '<img src="' + receiver.projects[0][j].pic_url + '?imageView2/1/w/367/h/203/interlace/1/q/70"/></a>';
                            let line4 = '<p>' + receiver.projects[0][j].title + '</p></div>';
                            inneritem += (line1 + line2 +line3 +line4);
                        }
                    } else {
                        for(var k = 3*i; k < countall; k++) { //这里循环结束以整个实际长度为准
                            let line1 = '<div class="p5content-item">';
                            let url = 'oldvideoitem.html?id=' + receiver.projects[0][k].id;
                            let line2 = '<a href="' + url + '" target="_blank">';
                            let line3 = '<img src="' + receiver.projects[0][k].pic_url + '?imageView2/1/w/367/h/203/interlace/1/q/70"/></a>';
                            let line4 = '<p>' + receiver.projects[0][k].title + '</p></div>';
                            inneritem += (line1 + line2 +line3 +line4);
                        }
                    }
                    var tail = '</div>';
                    inner += (title + inneritem + tail);
                }
            }

            $("#oldprjs").html(inner);
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
