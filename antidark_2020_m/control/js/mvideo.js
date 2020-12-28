
document.ready(function(){
    init();
});

function init() {
    var id = getParam("id");
    var title = "";
    var video = "";
    var poster = "";
    var company = "";
    var brief = "";


    var xhr=new XMLHttpRequest();
    xhr.open('GET','https://server.foshanplus.com/exam/get_vote/?exam_id=34&by_random=0',false);
    xhr.onreadystatechange=function(){
        // readyState == 4
        if(xhr.readyState==4){
            if(xhr.status==200 || xhr.status==304){
                // console.log(xhr.responseText);
                var piclistx = JSON.parse(xhr.responseText)['projects'][0];
                // console.log(piclistx[0].length);
                console.log(piclistx);
                var picnum = piclistx.length;
                var picstr = "";
                for (var i = 0; i < picnum; i++) {
                    if(piclistx[i].id == id) {
                        title = piclistx[i].title;
                        video = piclistx[i].url;
                        poster = piclistx[i].pic_url;
                        company = JSON.parse(piclistx[i].content)["group"];
                        brief = JSON.parse(piclistx[i].content)["content"];
                    }
                }
                var title_dom = document.getElementById("title");
                title_dom.innerHTML = title;
                
                var tmp = '<video src="' + video + '" poster="' + poster + '" controls></video>';
                var video_dom = document.getElementById("player");
                video_dom.innerHTML = tmp;

                var company_dom = document.getElementById("company");
                company_dom.innerHTML = '<strong>申报单位：</strong>' + company;

                var brief_dom = document.getElementById("brief");
                brief_dom.innerHTML = '<strong>内容简介：</strong>' + brief;
                
            }else {
                alert('system error+' + xhr.readyState);
                return;
            }
        }
    }
    xhr.send();
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