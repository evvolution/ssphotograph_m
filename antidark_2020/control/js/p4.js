
function initNews() {
    var placenum = newsinfo.total;
    var placestr = "";

    for (var i = 0; i < placenum; i++) {
        var line = '';
        line = '<div><a href="' + newsinfo.info[0].link[i] + '" target="_blank">' + newsinfo.info[0].title[i] + '</a></div>'
        placestr += line;
    }
    $("#p4news").html(placestr);
}