
/*
    note：总控
    anthor：zx
*/


var step = $("#step");
var video_name_toupload = "";
var video_size_toupload = "";
var video_type_toupload = "";

var pic_name_toupload = "";
var pic_size_toupload = "";
var pic_type_toupload = "";
var commonlink = 'https://server.foshanplus.com/';

$(document).ready(function() {
    isIE();
    isIEdeal();
});

window.onload = function() {

}

function isIE() {
    if (IEVersion() != "-1") {
        return "ie";
    }else {
        return 0;
    }
}

function IEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if(isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if(fIEVersion == 7) {
            return 7;
        } else if(fIEVersion == 8) {
            console.log(8)
            return 8;
        } else if(fIEVersion == 9) {
            console.log(9)
            return 9;
        } else if(fIEVersion == 10) {
            console.log(10)
            return 10;
        } else {
            return 6;//IE版本<=7
        }   
    } else if(isEdge) {
        return 'edge';//edge
    } else if(isIE11) {
        return 11; //IE11  
    }else{
        // console.log(-1)
        return -1;//不是ie浏览器
    }
}

function isIEdeal() {
    fixposition();

    if (isIE() == "ie") {
        $('#fullpage').fullpage({
            navigation: true,
            navigationPosition: 'right',
            anchors: ['p1'],
            menu: '#fsantidarkMenu'
        });
        var fsnav = document.getElementById("fsantidarkMenu"); 
        var pageTwo = document.getElementsByClassName("pageTwo")[0];
        var pageThree = document.getElementsByClassName("pageThree")[0];
        var pageFour = document.getElementsByClassName("pageFour")[0];
        var pageFive = document.getElementsByClassName("pageFive")[0];

        fsnav.remove();
        pageTwo.remove();
        pageThree.remove();
        pageFour.remove();
        pageFive.remove();

        alert("请使用谷歌或者360浏览器");

        fsnav.css("display","none")
        pageTwo.css("display","none")
        pageThree.css("display","none")
        pageFour.css("display","none")
        pageFive.css("display","none")

    }else {

        initMainview()
        initLiteswitch();
        initLitestep();

        uploadx_btn();
        uploads_btn();

        initNews();
        getoldprjs();
    }
}


function fixposition() {
    window.location.href='https://content.foshanplus.com/antidark_2020/index.html#p1';
}

function initMainview(){
    $('#fullpage').fullpage({
        navigation: true,
        navigationPosition: 'right',
        anchors: ['p1', 'p2', 'p3', 'p4', 'p5'],
        menu: '#fsantidarkMenu',
        keyboardScrolling: false,
        normalScrollElements: '#oldprjs,#p4news,.modalfade,.swal-overlay'
    });
}

function modalclose(modal) {
    $("#" + modal).css("display", "none")
}

function modalshow(modal) {
    $("#" + modal).css("display", "block")
}