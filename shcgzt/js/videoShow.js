
/*
    note：视频播放页控制
    anthor：zx
*/

$(document).ready(function() {
    init();
});


function init() {
    var id = getParam("id");
    var title = "";
    var video = "";
    var poster = "";
    var company = "";

    $.ajax({
        type:"get",
        url: 'https://server.foshanplus.com/exam/get_vote/?exam_id=34',
        success:function(receiver){
            console.log(receiver.projects[0]);
            for(var i = 0; i < receiver.projects[0].length; i++) {
                if(receiver.projects[0][i].id == id) {
                    title = receiver.projects[0][i].title;
                    video = receiver.projects[0][i].url;
                    poster = receiver.projects[0][i].pic_url;
                    company = JSON.parse(receiver.projects[0][i].content)["group"];
                    // brief = JSON.parse(receiver.projects[0][i].content)["content"];
                }
            }
            $("#title").html(title);
            var tmp = '<video src="' + video + '" poster="' + poster + '" controls></video>';
            $("#player").html(tmp);
            $("#company").html('申报单位：' + company);
            // $("#brief").html('内容简介：' + brief);
        },
        error: function(receiver){
            console.log(receiver);
            alert("获取历史记录失败，请稍后重试");
            return;
        }
    });
}

/* 获取url参数 */
function getParam(paramName) {
    paramValue = "", isFound = !1;
    if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
        arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;
        while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
    }
    return paramValue == "" && (paramValue = null), paramValue
}