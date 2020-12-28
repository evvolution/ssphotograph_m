
$(document).ready(function() {
    init();
});

function init() {
    $.ajax({
        type:"get",
        url: 'https://server.foshanplus.com/exam/get_vote/?exam_id=34',
        beforeSend: function() {
            $(".loading").css("display","block");
            $(".morevideos").css("display","none");
        },
        success:function(receiver){
            // console.log(receiver.projects[0]);
            $(".loading").css("display","none");
            $(".morevideos").css("display","block");
            var line = ""
            for(var i = 0; i < receiver.projects[0].length; i++) {
                var line1 = '<div class="videocol col-md-4"><div class="videoscard card"><a href="video.html?id=' + receiver.projects[0][i].id + '" target="_blank">';
                var line2 = '<img src="' + receiver.projects[0][i].pic_url + '?imageView2/1/w/367/h/203/interlace/1/q/70" class="card-img-top" alt="' + receiver.projects[0][i].id + '"></a>';
                var line3 = '<div class="card-body"><h5 class="card-title"><strong>' + receiver.projects[0][i].title + '</strong></h5>';
                var line4 = '<p class="card-text"><br/>' + JSON.parse(receiver.projects[0][i].content)["group"] + '</p></div></div></div>';
                line += (line1 + line2 + line3 + line4);
            }
            $("#morevideos").html(line);
        },
        error: function(receiver){
            console.log(receiver);
            alert("获取历史记录失败，请稍后重试");
            return;
        }
    });
}
