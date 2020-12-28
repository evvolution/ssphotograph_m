
/*
    note：第四页控制
    anthor：zx
*/

function initModals() {
    var placenum = modalinfo.total;
    var placestr = "";
    var placemodals = "";

    for (var i = 0; i < placenum; i++) {
        var line = '';
        if ((i == 0) || (i == 5)){
            line = '<div class="col-lg-2 offset-lg-1"><img src="' + modalinfo.info[0].placepics[i] + '" class="towhere" data-toggle="modal" data-target="#p4modal' + i + '" /></div>'
        }else {
            line = '<div class="col-lg-2"><img src="' + modalinfo.info[0].placepics[i] + '" class="towhere" data-toggle="modal" data-target="#p4modal' + i + '" /></div>'
        }
        placestr += line;

        var modalline1 = '<div class="modal fade " tabindex="-1" role="dialog" aria-hidden="true" id="p4modal' + i + '" data-backdrop="static">';
        var modalline2 = '<div class="modal-dialog" role="document"><div class="p4modalcontent modal-content"><div class="p4modalbody modal-body">';
        var modalline3 = '<div class="modalplace">' + modalinfo.info[0].place[i] + '</div><img class="modalpic" src="http://img.foshanplus.com/2020/pic/chan/p4/modalbak.png">';
        var modalline4 = '<div class="modaltext">' + modalinfo.info[0].intro[i] + '</div>';
        var modalline5 = '</div><div class="closemodal" class="btn btn-secondary" data-dismiss="modal">X</div></div></div></div>';
        placemodals += (modalline1 + modalline2 + modalline3 + modalline4 + modalline5)
    }
    // console.log(placestr)
    // var head = '<div class="col-lg-10 offset-lg-1 commontitlecontent"><img class="commonpicfortitle" src="http://img.foshanplus.com/2020/pic/chan/p4/p4title.png"></div>';


    var head = '<div class="col-lg-10 offset-lg-1 commontitlecontent"><img class="commonpicfortitle" src="img/p4/p4title-1.png"></div>';
    $("#places").html(head + placestr);
    $("#p4modals").html(placemodals)
}