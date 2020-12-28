
function setTime() {
    $("#startlink").css('display','none');
    var time = new Date;
    var month = time.getMonth() + 1;
    var today = time.getDate();
    var hours = time.getHours();
    var min =  time.getMinutes() + 2;//现场两分钟投票
    var sec = time.getSeconds();
    initQrCode(month, today, hours, min, sec)
    initClock();
}

function initQrCode(mo,d,h,m,s) {

    var linkbase = 'https://content.foshanplus.com/h5/lawVote2020present/vote.html';
    var linkset = '?lawmo=' + mo + '&lawd=' + d + '&lawh=' + h + '&lawm=' + m + '&laws=' + s;
    var link = linkbase + linkset;
    var length = window.screen.availHeight * 0.6;
    $('body').css('background','transparent')
    var qrcode = new QRCode("votecode", {
        text: link,
        width: length*0.6,
        height: length,
        colorDark: "green",
        colorLight: "#fff",
    });
}

function initClock() {
    var time = new Date;
    var b = -time.getTimezoneOffset() / 60;
    var month = time.getMonth() + 1;
    var today = time.getDate();
    var hours = time.getHours();
    var min =  time.getMinutes() + 2;//现场两分钟投票
    // var min =  time.getMinutes();//现场两分钟投票
    var sec = time.getSeconds();

    var i = '2020__regexoperators___/' + month + '/' + today + ' ' + hours + ':' + min + ':' + sec;
    // var i = '2020__regexoperators___/11/09 17:00:0';
    var timecountWidth = window.screen.availWidth * 0.3;
    var config = {
        timeText: i, //倒计时时间
        timeZone: b, //时区
        style: "slide", //显示的样式
        color: "white", //显示的颜色
        width: timecountWidth, //倒计时宽度
        textGroupSpace: 20, //天、时、分、秒之间间距
        textSpace: 5, //数字之间间距
        reflection: 0, //是否显示倒影
        reflectionOpacity: 0, //倒影透明度
        reflectionBlur: 0, //倒影模糊程度
        dayTextNumber: 2, //倒计时天数数字个数
        displayDay: 0, //是否显示天数
        displayHour: 0, //是否显示小时数
        displayMinute: !0, //是否显示分钟数
        displaySecond: !0, //是否显示秒数
        displayLabel: !0, //是否显示倒计时底部label
        onFinish: function() {
            // document.write('现场投票已经结束')
            $('body').css('background','url("https://fsnewsres.foshanplus.com/h5/lawVote2020present/bak2.jpg") no-repeat');
            $('body').css('padding',0);
            $('body').css('margin',0);
            $('body').css('background-size','100% 100%');
            $("#showdata").css('display','block');

            $("#votecode").css('display','none');
            $(".countdown").css('display','none');
        }
    };
    $(".countdown").jCountdown(config);
}
