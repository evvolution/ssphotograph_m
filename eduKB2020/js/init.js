/**
 * note:动态生成点赞窗口&获取排名
 * author：zx
 * date：2020-11-17
 * modify：
 */


var snolist = ''
var actCODE = 'edu_word_of_mouth_2020'
var link = 'https://api.foshanplus.com/foshan/'
var edutoken = ""
var ccpfid = ""
var iconcc = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-hand-thumbs-up" fill="#E11828" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16v-1c.563 0 .901-.272 1.066-.56a.865.865 0 0 0 .121-.416c0-.12-.035-.165-.04-.17l-.354-.354.353-.354c.202-.201.407-.511.505-.804.104-.312.043-.441-.005-.488l-.353-.354.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315L12.793 9l.353-.354c.353-.352.373-.713.267-1.02-.122-.35-.396-.593-.571-.652-.653-.217-1.447-.224-2.11-.164a8.907 8.907 0 0 0-1.094.171l-.014.003-.003.001a.5.5 0 0 1-.595-.643 8.34 8.34 0 0 0 .145-4.726c-.03-.111-.128-.215-.288-.255l-.262-.065c-.306-.077-.642.156-.667.518-.075 1.082-.239 2.15-.482 2.85-.174.502-.603 1.268-1.238 1.977-.637.712-1.519 1.41-2.614 1.708-.394.108-.62.396-.62.65v4.002c0 .26.22.515.553.55 1.293.137 1.936.53 2.491.868l.04.025c.27.164.495.296.776.393.277.095.63.163 1.14.163h3.5v1H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/></svg>'

getlist('10')

//页面加载功能
$(document).ready(function(){
    
})

/* 初次获取十条数据 */
function getlist(num){
    $("#searchreturn").css('display','none')
    $("#loadmore").css('display','none')
    $.ajax({
        type:"get",
        url: link + 'api/v2/getActivityItemList?activityCode=' + actCODE + '&count=' + num,
        dataType:"json",
        beforeSend: function() {
            //请求开始至成功显示加载条
            $(".gridContentloading").css('display','block')
        },
        success:function(receiver) {
            //隐藏加载条
            $(".gridContentloading").css('display','none')
            // console.log(receiver.data)
            var list = '';
            for(var i = 0; i < receiver.data.length; i++) {
                var list0 = '<div class="list-group-item"><div class="listNo">' + (i+1) + '</div><div class="listInfo">' + receiver.data[i].title + '<br/><div>' + iconcc + '&nbsp;<span id="fs2020edukbItems' + receiver.data[i].id + '">' + receiver.data[i].voteCount + '</span></div></div>'
                var list1 = '<div class="listBtn" onclick=vote("' + receiver.data[i].title + '","' + receiver.data[i].id + '")>点赞</div><div class="listborder"></div></div>'
                list += (list0 + list1) 
                // $('#edulist').append(list);
            }
            $('#edulist').html(list);
            snolist = receiver.data[receiver.data.length-1].sno;
            $("#loadmore").css('display','block')
            $(".loadmorepic").css('display','none')
        },
        error: function(){
            console.log(type + '--Error');
            return;
        }
    })
}

function getmore(sno){
    // console.log(sno)
    $.ajax({
        type:"get",
        url: link + 'api/v2/getActivityItemList?activityCode=' + actCODE + '&count=10&sno=' + sno,
        dataType:"json",
        beforeSend: function() {
            //请求开始至成功显示加载条
            $(".loadmorepic").css('display','inline')
        },
        success:function(receiver) {
            //隐藏加载条
            $(".loadmorepic").css('display','none')
            // console.log(receiver.data)
            var list = '';
            for(var i = 0; i < receiver.data.length; i++) {
                var list0 = '<div class="list-group-item"><div class="listNo">' + (sno+i+1) + '</div><div class="listInfo">' + receiver.data[i].title + '<br/><div>' + iconcc + '&nbsp;<span id="fs2020edukbItems' + receiver.data[i].id + '">' + receiver.data[i].voteCount + '</span></div></div>'
                var list1 = '<div class="listBtn" onclick=vote("' + receiver.data[i].title + '","' + receiver.data[i].id + '")>点赞</div><div class="listborder"></div></div>'
                list = (list0 + list1)
                $('#edulist').append(list);
            }
            if(receiver.data.length < 10) {
                $(".loadmore").css('display','none')
            }else {
                snolist = receiver.data[receiver.data.length-1].sno;
            }
            // console.log(snolist)
        },
        error: function(){
            console.log(getmore + '--Error');
            return;
        }
    })
}

function vote(name,item){
    // console.log(initflag)
    if(initflag == 0){
        $(".educover").css("display","none")
        // return;
    }else {
        $(".educover").css("display","none")
        if(initflag == 2){
            fs_login();
        }
    }
    edutoken = JSON.parse(sessionStorage['fs_member']).token;
    var res = confirm("您选择的是:" + name)
    if (res == true) {
        // ccpfid = JSON.parse(sessionStorage['fs_member']).id;
        $.ajax({
            type:"post",
            url: link + 'api/v2/addActivityItemVote',
            data:{
                // "UID": ccpfid,
                "activityCode": actCODE,
                "activityItemId":item,
                // "verifyCode":verifyCode,
                "token": edutoken,
                "msgStatus": 2,
            },
            dataType:"json",
            success:function(data){
                // console.log("votepush:" + data)
                alert(data.msg);
                updateCurrentCount(item);
            },
            error: function(){
                console.log('votepush*****xxx');
                alert("当前点赞人数过多，请稍后重试");
            }
        })
    } else {
        // alert('请重新选择');
        return;
    }
}

function initClock() {
    var b = new Date;
    var b = -b.getTimezoneOffset() / 60;
    var i = '2020__regexoperators___/11/19 17:00:00';
    var timecountWidth = window.screen.availWidth * 0.7;
    var config = {
        timeText: i, //倒计时时间
        timeZone: b, //时区
        // style: "slide", //显示的样式
        // color: "white", //显示的颜色
        width: timecountWidth, //倒计时宽度
        textGroupSpace: 20, //天、时、分、秒之间间距
        textSpace: 5, //数字之间间距
        reflection: 0, //是否显示倒影
        reflectionOpacity: 10, //倒影透明度
        reflectionBlur: 0, //倒影模糊程度
        dayTextNumber: 2, //倒计时天数数字个数
        displayDay: !0, //是否显示天数
        displayHour: !0, //是否显示小时数
        displayMinute: !0, //是否显示分钟数
        displaySecond: !0, //是否显示秒数
        displayLabel: !0, //是否显示倒计时底部label
        onFinish: function() {}
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

function getrank() {
    $.ajax({
        type:"get",
        url: link + 'api/v2/getActivityItemsRanking?activityCode=' + actCODE,
        dataType:"json",
        beforeSend: function() {
            $(".gridContentloading").css('display','block')
        },
        success:function(receiver){
            $(".gridContentloading").css('display','none')
            // console.log(receiver.data)
            if(receiver.data.length == 0){
                $('#edurank').html('<div style="text-align:center">暂无排名信息</div>');
            }else {
                var rank = ''
                for(var i = 0; i < receiver.data.length; i++) {
                    var rank0 = '';
                    var rank1 = '';
                    if(i == 0) {
                        rank0 = '<div class="list-group-item"><div class="rankNo"><img src="img/1.png"></div>'
                    }else if(i == 1) {
                        rank0 = '<div class="list-group-item"><div class="rankNo"><img src="img/2.png"></div>'
                    }else if (i == 2) {
                        rank0 = '<div class="list-group-item"><div class="rankNo"><img src="img/3.png"></div>'
                    }else {
                        rank0 = '<div class="list-group-item"><div class="rankNo">' + (i + 1) + '</div>'
                    }
                    rank1 = '<div class="rankInfo">' + receiver.data[i].title + '</div><div class="rankNum">' + receiver.data[i].count + '</div><div class="listborder"></div></div>';
                    rank += (rank0 + rank1)
                }
            }
            $('#edurank').html(rank);
        },
        error: function(){
            console.log('getrank--Error');
            return;
        }
    })
}


function updateCurrentCount(id) {
    $.ajax({
        type:"get",
        url: link + 'api/v2/getActivityItemById?id=' + id,
        dataType:"json",
        success:function(receiver){
            // console.log(receiver.ret)
            // console.log(receiver.activityItem)
            if (receiver.ret == 1) {
                $("#fs2020edukbItems" + id).html(receiver.activityItem.voteCount)
            }else {
                window.location.href = '404.html';
            }
        },
        error: function(){
            console.log('updateCurrentCount--Error');
            window.location.href = '404.html';
            return;
        }
    })
}


function search(){
    $('#searchreturn').css('display','none');
    var keywords = $("#keywords").val();
    if(keywords == "") {
        alert('搜索关键词不得为空');
        return;
    }
    $.ajax({
        type:"get",
        url: link + 'api/v2/getActivityItemList?activityCode=' + actCODE + '&count=1&keywords=' + keywords,
        dataType:"json",
        beforeSend: function() {
            // $('#edulist').html('');
            $(".gridContentloading").css('display','block')
        },
        success:function(receiver){
            // console.log(receiver.data)
            $(".gridContentloading").css('display','none')
            if(receiver.data.length == 0){
                alert('无结果')
                $("#keywords").val("");
                return
            }else {
                $("#keywords").val("");
                $('#edulist').html('');
                var list0 = '<div class="list-group-item"><div class="listNo">' + receiver.data[0].sno + '</div><div class="listInfo">' + receiver.data[0].title + '<br/><div>' + iconcc + '&nbsp;<span id="fs2020edukbItems' + receiver.data[0].id + '">' + receiver.data[0].voteCount + '</span></div></div>'
                var list1 = '<div class="listBtn" onclick=vote("' + receiver.data[0].title + '","' + receiver.data[0].id + '")>点赞</div><div class="listborder"></div></div>'
                list = (list0 + list1) 
                $('#edulist').html(list);
                $('#loadmore').css("display","none")
                $('#searchreturn').css('display','block');
            }
        },
        error: function(){
            console.log('searchpic--Error');
            return;
        }
    })
}