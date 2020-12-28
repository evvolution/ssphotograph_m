
document.ready(function(){
    initnews()
});

function initnews() {
    var newsnum = newsinfo.total;
    var newsstr = "";
    for (var i = 0; i < newsnum; i++) {
        let line = '';
        line = '<div class="p3item"><a href="' + newsinfo.info[0].link[i] + '">' + newsinfo.info[0].title[i] + '</a></div>'
        newsstr += line;
    }
    var news = document.getElementById("news_m")
    news.innerHTML = newsstr;
}