
function init(cids) {
    $.ajax({
        type:"get",
        url: 'https://api.foshanplus.com/foshan/api/v2/getNewsList?cids=' + cids + '&sno=-1&count=75',
        beforeSend: function() {
            $(".loading").css("display","block");
            $(".pages").css("display","none");
        },
        success:function(receiver){
            console.log(receiver.news);
            $(".loading").css("display","none");
            $(".pages").css("display","block");
            var page = "";
            var pagetag = "";
            for (var k = 0; k < 5; k++) {
                var page1 = '';
                if (k == 0) {
                    page1 = '<div class="tab-pane fade show active" id="content' + k + '" role="tabpanel" aria-labelledby="contenttag' + k + '"><ul class="list-group list-group-flush">';
                }else {
                    page1 = '<div class="tab-pane fade" id="content' + k + '" role="tabpanel" aria-labelledby="contenttag' + k + '"><ul class="list-group list-group-flush">';
                }
                var page2 = '</ul></div>';
                var str = "";
                for (var i = 15*k; i < 15*(k+1); i++) {
                    var line = '<li class="list-group-item"><a href="' + receiver.news[i].newsPubExt.url + '" target="_blank"><svg width="8px" height="8px" viewBox="0 0 16 16" class="bi bi-circle-fill" fill="#c81700" xmlns="http://www.w3.org/2000/svg"> <circle cx="8" cy="8" r="8"/></svg>&nbsp;&nbsp;' + receiver.news[i].title + '</a><span class="publishtime">' + receiver.news[i].publishtime.split(" ")[0]  + '</span></li>'
                    str += line;
                }
                page += (page1 + str + page2);

                var pagetag1 = '';
                if (k == 0) {
                    pagetag1 = '<li class="nav-item" role="presentation"><a class="nav-link active" id="contenttag' + k + '" data-toggle="pill" href="#content' + k + '" role="tab" aria-controls="content' + k + '" aria-selected="true">' + (k+1) +  '</a></li>';
                }else {
                    pagetag1 = '<li class="nav-item" role="presentation"><a class="nav-link" id="contenttag' + k + '" data-toggle="pill" href="#content' + k + '" role="tab" aria-controls="content' + k + '" aria-selected="true">' + (k+1) +  '</a></li>';
                }
                pagetag += pagetag1;
            }
            $("#pages").html(page);
            $("#pages-tab").html(pagetag);
        },
        error: function(receiver){
            console.log(receiver);
            alert("获取历史记录失败，请稍后重试");
            return;
        }
    });
}