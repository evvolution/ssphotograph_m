
document.ready(function(){
    initplaces()
});

function initplaces() {
    var placenum = placeinfo.total;
    var placestr = "";
    for (var i = 0; i < placenum; i++) {
        let line = '';
        line = '<div class="item"><div class="item_pic"><img src="' + placeinfo.info[0].placepics[i] + '"></div><div class="item_intro">' + placeinfo.info[0].intro[i] + '</div></div>'
        placestr += line;
    }
    var places = document.getElementById("places")
    places.innerHTML = placestr;
}