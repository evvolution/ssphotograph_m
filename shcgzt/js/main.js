$(document).ready(function(){
    init("416","currentNewsContent", "new");
    init("418","pointWorkContent", "nonew");
    init("417","resultShowContent", "nonew");
});


function init(cids, item, tag) {
    $.ajax({
        type:"get",
        url: 'https://api.foshanplus.com/foshan/api/v2/getNewsList?cids=' + cids + '&sno=-1&count=30',
        beforeSend: function() {
            $(".loading").css("display","block");
            $('#' + item).css("display","none");
        },
        success:function(receiver){
            // console.log(receiver.news);
            $(".loading").css("display","none");
            $('#' + item).css("display","block");
            var str = "";
            var lineplus = "";
            for (var i = 0; i < 5; i++) {
                if (tag == "new") {
                    lineplus = '';
                }else {
                    lineplus = receiver.news[i].publishtime.split(" ")[0];
                }
                var line = '<li class="list-group-item"><a href="' + receiver.news[i].newsPubExt.url + '" target="_blank"><svg width="8px" height="8px" viewBox="0 0 16 16" class="bi bi-circle-fill" fill="#c81700" xmlns="http://www.w3.org/2000/svg"> <circle cx="8" cy="8" r="8"/></svg>&nbsp;&nbsp;' + receiver.news[i].title + '</a><span class="publishtime">' + lineplus  + '</span></li>'
                str += line;
            }
            $('#' + item).html(str);
        },
        error: function(receiver){
            console.log(receiver);
            alert("获取历史记录失败，请稍后重试");
            return;
        }
    });
}