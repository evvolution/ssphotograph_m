/**
 * note:普法现场投票
 * author：zx
 * date：2020-10-29
 * modify：/
 */

var ccpftoken = ""
var ccpfid = ""


//页面加载功能
$(document).ready(function(){
    // getData()
})

function getData(){
    var vote = '';
    $.ajax({
        type:"get",
        url: "https://api.foshanplus.com/foshan/api/v2/getActivityItemList?activityCode=popularizeLaw_20202",
        dataType:"json",
        success:function(receiver){
            console.log(receiver)
            for (var i = 0; i < receiver.data.length; i++) {
                let vote1 = '<div class="voteline"><div class="voteid"><b>' + (i+1) + '</b></div><div class="voteitem">';
                let vote2 = receiver.data[i].title + '</div><div class="votebtn" onclick=vote(' + receiver.data[i].id + ',"' + receiver.data[i].title + '")>投票</div></div>'
                vote += (vote1 + vote2)
            }
            $('.votelist').html(vote)
        },
        error: function(){
            console.log('getData*****xxx');
            // alert("当前投票人数过多，请稍后重试");
            return;
        }
    })
}

function vote(id,item){
    var res = confirm("您选择的是：" + item)
    if (res == true) {
        votepush(id)
    } else {
        alert('请重新选择');
        return;
    }
}

function votepush(item) {
    ccpftoken = JSON.parse(sessionStorage['fs_member']).token;
    ccpfid = JSON.parse(sessionStorage['fs_member']).id;
    $.ajax({
        type:"post",
        url: 'https://api.foshanplus.com/foshan/api/v2/voteByActivityDayOnlyOne',
        data:{
            "UID": ccpfid,
            "token": ccpftoken,
            "activityCode": 'popularizeLaw_20202',
            "activityItemId": item,
            "verifyCode": 0,
            "msgStatus": 1,
        },
        dataType:"json",
        success:function(data){
            console.log("votepush:" + data)
            if(data.msg == '今天已投票，请明天再投票！'){
                alert('已投票')
            }else {
                alert(data.msg);
            }
            // window.location.reload();
        },
        error: function(){
            console.log('vote*****xxx');
            alert("当前投票人数过多，请稍后重试");
        }
    })
}

function initClock() {
    var b = new Date;
    var b = -b.getTimezoneOffset() / 60;

    var mo = getParam('lawmo');
    var d = getParam('lawd');
    var h = getParam('lawh');
    var m = getParam('lawm');
    var s = getParam('laws');

    if((mo == "") || (d == "") || (h == "") || (m == "") || (s == "")){
        $('body').html('<div style="position:fixed;text-align:center;left:0;right:0;top:20%">错误链接</div>')
        return;
    }

    var i = '2020__regexoperators___/' + mo + '/' + d + ' ' + h + ':' + m + ':' + s;
    // console.log(i);
    // var i = '2020__regexoperators___/11/04 10:04:0';
    var timecountWidth = window.screen.availWidth * 0.4;
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
            $('body').html('<div style="position:fixed;text-align:center;left:0;right:0;top:20%">现场投票已经结束</div>')
        }
    };
    $(".countdown").jCountdown(config);
}

function getParam(paramName) {
    paramValue = "", isFound = !1;
    if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
        arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;
        while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
    }
    return paramValue == "" && (paramValue = null), paramValue
}
