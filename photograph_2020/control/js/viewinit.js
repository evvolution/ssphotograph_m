
/*
    note：页面初始化
    anthor：zx
*/

function initMainview(){
    $('#fullpage').fullpage({
        navigation: true,
        navigationPosition: 'right',
        anchors: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'],
        menu: '#fsantidarkMenu'
    });
}

function initSize(){
    var winWidth = window.innerWidth;
    var winHeight = window.innerHeight;
    if(winWidth >= 1300){
        $("html").css({fontSize: winWidth / 1920 * 100 + "px"});
        $("body").css({height: winHeight});
    }
    else{
        // $("html").css({fontSize: 1300 / 1920 * 100 + "px"});
        // $("body").css({height: 639+"px"});
    }
}