/**
 * note:动态生成点赞窗口&获取排名
 * author：zx
 * date：2020-11-11
 * modify：/
 */

var snopic = '';
var snocartoon = '';
var actCODE = 'shcwswds_2020'
var sizev = '?x-oss-process=image/resize,p_15'
var sizex = '?x-oss-process=image/resize,p_23'
var link = 'https://api.foshanplus.com/foshan/'

var ccpftoken = ""
var ccpfid = ""
var tagend = 0;

// var iconcc = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-hand-thumbs-up" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16v-1c.563 0 .901-.272 1.066-.56a.865.865 0 0 0 .121-.416c0-.12-.035-.165-.04-.17l-.354-.354.353-.354c.202-.201.407-.511.505-.804.104-.312.043-.441-.005-.488l-.353-.354.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315L12.793 9l.353-.354c.353-.352.373-.713.267-1.02-.122-.35-.396-.593-.571-.652-.653-.217-1.447-.224-2.11-.164a8.907 8.907 0 0 0-1.094.171l-.014.003-.003.001a.5.5 0 0 1-.595-.643 8.34 8.34 0 0 0 .145-4.726c-.03-.111-.128-.215-.288-.255l-.262-.065c-.306-.077-.642.156-.667.518-.075 1.082-.239 2.15-.482 2.85-.174.502-.603 1.268-1.238 1.977-.637.712-1.519 1.41-2.614 1.708-.394.108-.62.396-.62.65v4.002c0 .26.22.515.553.55 1.293.137 1.936.53 2.491.868l.04.025c.27.164.495.296.776.393.277.095.63.163 1.14.163h3.5v1H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/></svg>'
var iconcc = '点赞'


//页面加载功能
$(document).ready(function(){
    initClock();
})

window.onload = function(){
    getlist('13','6',tagend)//13微视频40个
    getlist('14','14',tagend)//14微电影14个
    getlist('15','6',tagend)//15微动漫32个
}

/* 初次获取十条数据 */
function getlist(type,num,tag){
    // console.log(tag)
    var list = ''
    var listbtn = '';
    var listinput = '';
    var morebtn = ''
    if(type == 13){
        list = 'piclist';
        listbtn = 'searchpicbtnreturn';
        listinput = 'searchkeywordspic';
        morebtn = 'morepicbtnforinit';
    }else if (type == 14) {
        list = 'videolist';
        listbtn = 'searchvideobtnreturn';
        listinput = 'searchkeywordsvideo';
        morebtn = 'morevideobtnforinit';
    }else if (type == 15) {
        list = 'cartoonlist';
        listbtn = 'searchcartoonbtnreturn';
        listinput = 'searchkeywordscartoon';
        morebtn = 'morecartoonbtnforinit';
    }            
    //隐藏搜索返回按钮
    $('#' + listbtn).css('display','none');
    //清空搜索框内容
    $('#' + listinput).val('');
    $.ajax({
        type:"get",
        url: link + 'api/v2/getActivityItemList?activityCode=' + actCODE + '&activityTagId=' + type + '&count=' + num,
        dataType:"json",
        beforeSend: function() {
            //请求开始至成功显示加载条
            $(".gridContentloading").css('display','block')
        },
        success:function(receiver) {
            //清空列表显示区域
            $('#' + list).html('');
            //隐藏加载条
            $(".gridContentloading").css('display','none')
            // console.log(type + ":" +  receiver.data.length)
            for(var i = 0; i < receiver.data.length; i++) {
                var pic0 = '<div class="col-6"><div class="toporic"></div><div class="picscard-img"><a href="detail.html?id=' + receiver.data[i].id + '"><img alt="加载中" src="' + receiver.data[i].imgPath + sizev + '"></a></div><div class="picscard-info">'
                // var pic0 = '<div class="col-6"><div class="toporic"></div><div class="picscard-img"><a href="https://content.foshanplus.com/h5/crimeCrackdown2020Vote/detail.html?id=' + receiver.data[i].id + '"><img alt="加载中" src="' + receiver.data[i].imgPath + sizev + '"></a></div><div class="picscard-info">'
                
                var pic1 = '<div class="infono">' + receiver.data[i].id + '</div><div class="infotitle">' + receiver.data[i].title + '</div><div class="infoname">' + receiver.data[i].author + '</div><div class="infovote">'
                var pic2 = '<div class="infovotecount" id="fs2020pfItems' + receiver.data[i].id + '">' + receiver.data[i].voteCount + '&nbsp;</div><div class="infovotecountbtn" onclick=vote("' + receiver.data[i].id + '","' + receiver.data[i].id + '")>' + iconcc + '</div>'
                var pic3 = '</div></div></div>'
                $('#' + list).append(pic0 + pic1 + pic2 + pic3);
            }

            //将首次获取的最后一个sno放入全局变量snopic用于获取更多
            if(type == 13){
                snopic = receiver.data[num-1].sno;
            }else if (type == 14) {
                
            }else if (type == 15) {
                snocartoon = receiver.data[num-1].sno;
            } 
            //显示加载更多按钮
            $('#' + morebtn).css("display","block")

            if(tag == 0){

            }else {
                $('.infovotecountbtn').css('display','none')
            }
        },
        error: function(){
            console.log(type + '--Error');
            return;
        }
    })
}

function getMore(sno,type,tag) {
    var list = ''
    var moreload = '';
    var morebtn = '';
    if(type == 13){
        list = 'piclist';
        moreload = 'moreloadpic';
        morebtn = 'morepicbtnforinit';
    }else if (type == 14) {
        list = 'videolist';
        moreload = 'moreloadvideo';
    }else if (type == 15) {
        list = 'cartoonlist';
        moreload = 'moreloadcartoon';
        morebtn = 'morecartoonbtnforinit';
    }  

    $.ajax({
        type:"get",
        url: link + 'api/v2/getActivityItemList?activityCode=' + actCODE + '&activityTagId=' + type + '&sno=' + sno,
        dataType:"json",
        beforeSend: function() {
            $("#" + moreload).css('display','inline')
        },
        success:function(receiver){
            $("#" + moreload).css('display','none')
            // console.log(receiver.data)
            for(var i = 0; i < receiver.data.length; i++) {
                var pic0 = ''
                if(receiver.data[i].id == 1213){
                    pic0 = '<div class="col-6"><div class="toporic"></div><div class="picscard-img"><a href="detail.html?id=' + receiver.data[i].id + '"><img alt="加载中" src="' + receiver.data[i].imgPath.toString().split(',')[0] + sizev + '"></a></div><div class="picscard-info">';
                } else if (receiver.data[i].id == 1214) {
                    pic0 = '<div class="col-6"><div class="toporic"></div><div class="picscard-img"><a href="detail.html?id=' + receiver.data[i].id + '"><img alt="加载中" src="' + receiver.data[i].imgPath + sizex + '"></a></div><div class="picscard-info">'
                } else {
                    pic0 = '<div class="col-6"><div class="toporic"></div><div class="picscard-img"><a href="detail.html?id=' + receiver.data[i].id + '"><img alt="加载中" src="' + receiver.data[i].imgPath + sizev + '"></a></div><div class="picscard-info">'
                }
                var pic1 = '<div class="infono">' + receiver.data[i].id + '</div><div class="infotitle">' + receiver.data[i].title + '</div><div class="infoname">' + receiver.data[i].author + '</div><div class="infovote">'
                var pic2 = '<div class="infovotecount" id="fs2020pfItems' + receiver.data[i].id + '">' + receiver.data[i].voteCount + '</div><div class="infovotecountbtn" onclick=vote("' + receiver.data[i].id + '","' + receiver.data[i].id + '")>' + iconcc + '</div>'
                var pic3 = '</div></div></div>'
                $('#' + list).append(pic0 + pic1 + pic2 + pic3);
            }
            // console.log(receiver.data.length)
            if(receiver.data.length < 10) {
                $("#" + morebtn).css('display','none')
            }else {
                if(type == 13){
                    snopic = receiver.data[9].sno;
                }else if (type == 14) {
    
                }else if (type == 15) {
                    snocartoon = receiver.data[9].sno;
                } 
            }

            if(tag == 0){

            }else {
                $('.infovotecountbtn').css('display','none')
            }
        },
        error: function(){
            console.log('getMore--Error');
            return;
        }
    })
}

function vote(name,item){
    ccpftoken = JSON.parse(sessionStorage['fs_member']).token;
    var res = confirm("您选择的是:" + name + "号作品")
    if (res == true) {
        ccpfid = JSON.parse(sessionStorage['fs_member']).id;
        $.ajax({
            type:"post",
            url: link + 'api/v2/addActivityItemVote',
            data:{
                "UID": ccpfid,
                "activityCode":'shcwswds_2020',
                "activityItemId":item,
                // "verifyCode":verifyCode,
                "token": ccpftoken,
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
// $('.infovotecountbtn').css('display','none')
function initClock() {
    var b = new Date;
    var b = -b.getTimezoneOffset() / 60;
    var i = '2020__regexoperators___/11/19 17:00:00';
    var timecountWidth = window.screen.availWidth * 0.7;
    var config = {
        timeText: i, //倒计时时间
        timeZone: b, //时区
        style: "slide", //显示的样式
        color: "white", //显示的颜色
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
        onFinish: function() {
            alert("活动已结束")
            tagend = 1;
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

function getpicrank() {
    $.ajax({
        type:"get",
        url: link + 'api/v2/getActivityItemsRanking?activityCode=shcwswds_2020&activityTagId=13',
        dataType:"json",
        beforeSend: function() {
            $(".gridContentloading").css('display','block')
        },
        success:function(receiver){
            $(".gridContentloading").css('display','none')
            // console.log(receiver.data)
            if(receiver.data.length == 0){
                $('#picsrankContent').html('暂无排名信息');
            }else {
                var pics = ''
                for(var i = 0; i < receiver.data.length; i++) {
                    var pic0 = ''
                    if(i == 0) {
                        pic0 = '<div class="list-group-item"><div class="listNum"><img src="img/1.png"></div><div class="listDetail">'
                    }else if(i == 1) {
                        pic0 = '<div class="list-group-item"><div class="listNum"><img src="img/2.png"></div><div class="listDetail">'
                    }else if (i == 2) {
                        pic0 = '<div class="list-group-item"><div class="listNum"><img src="img/3.png"></div><div class="listDetail">'
                    }else {
                        pic0 = '<div class="list-group-item"><div class="listNum">' + (i + 1) + '</div><div class="listDetail">'
                    }
                    var pic1 = '<div class="pieceAuthor">' + receiver.data[i].author + '</div><div class="pieceName">编号:' + receiver.data[i].activityItemId + '&nbsp;《' + receiver.data[i].title + '》</div></div>'
                    var pic2 = '<div class="listCount">' + receiver.data[i].count + '</div><div class="listborder"></div></div>'
                    pics += (pic0 + pic1 + pic2);
                }
            }
            $('#picsrankContent').html(pics);
        },
        error: function(){
            console.log('getDatavideolist--Error');
            return;
        }
    })
}

function getvideorank() {
    $.ajax({
        type:"get",
        url: link + 'api/v2/getActivityItemsRanking?activityCode=shcwswds_2020&activityTagId=14',
        dataType:"json",
        beforeSend: function() {
            $(".gridContentloading").css('display','block')
        },
        success:function(receiver){
            $(".gridContentloading").css('display','none')
            if(receiver.data.length == 0){
                $('#videosrankContent').html('暂无排名信息');
            }else {
                var vs = ''
                for(var i = 0; i < receiver.data.length; i++) {
                    var v0 = ''
                    if(i == 0) {
                        v0 = '<div class="list-group-item"><div class="listNum"><img src="img/1.png"></div><div class="listDetail">'
                    }else if(i == 1) {
                        v0 = '<div class="list-group-item"><div class="listNum"><img src="img/2.png"></div><div class="listDetail">'
                    }else if (i == 2) {
                        v0 = '<div class="list-group-item"><div class="listNum"><img src="img/3.png"></div><div class="listDetail">'
                    }else {
                        v0 = '<div class="list-group-item"><div class="listNum">' + (i + 1) + '</div><div class="listDetail">'
                    }
                    var v1 = '<div class="pieceAuthor">' + receiver.data[i].author + '</div><div class="pieceName">编号:' + receiver.data[i].activityItemId + '&nbsp;《' + receiver.data[i].title + '》</div></div>'
                    var v2 = '<div class="listCount">' + receiver.data[i].count + '</div><div class="listborder"></div></div>'
                    vs += (v0 + v1 + v2)
                }
            }
            $('#videosrankContent').html(vs);
        },
        error: function(){
            console.log('getDatavideolist--Error');
            return;
        }
    })
}

function getcartoonrank() {
    $.ajax({
        type:"get",
        url: link + 'api/v2/getActivityItemsRanking?activityCode=shcwswds_2020&activityTagId=15',
        dataType:"json",
        beforeSend: function() {
            $(".gridContentloading").css('display','block')
        },
        success:function(receiver){
            $(".gridContentloading").css('display','none')
            if(receiver.data.length == 0){
                $('#cartoonsrankContent').html('暂无排名信息');
            }else {
                var vs = ''
                for(var i = 0; i < receiver.data.length; i++) {
                    var v0 = ''
                    if(i == 0) {
                        v0 = '<div class="list-group-item"><div class="listNum"><img src="img/1.png"></div><div class="listDetail">'
                    }else if(i == 1) {
                        v0 = '<div class="list-group-item"><div class="listNum"><img src="img/2.png"></div><div class="listDetail">'
                    }else if (i == 2) {
                        v0 = '<div class="list-group-item"><div class="listNum"><img src="img/3.png"></div><div class="listDetail">'
                    }else {
                        v0 = '<div class="list-group-item"><div class="listNum">' + (i + 1) + '</div><div class="listDetail">'
                    }
                    var v1 = '<div class="pieceAuthor">' + receiver.data[i].author + '</div><div class="pieceName">编号:' + receiver.data[i].activityItemId + '&nbsp;《' + receiver.data[i].title + '》</div></div>'
                    var v2 = '<div class="listCount">' + receiver.data[i].count + '</div><div class="listborder"></div></div>'
                    vs += (v0 + v1 + v2)
                }
            }
            $('#cartoonsrankContent').html(vs);
        },
        error: function(){
            console.log('getcartoonrank--Error');
            return;
        }
    })
}


function searchpic(tag) {
    $('#searchpicbtnreturn').css('display','none');
    var keywords = $("#searchkeywordspic").val();
    if(keywords == "") {
        alert('搜索编号不得为空');
        return;
    }
    $.ajax({
        type:"get",
        url: link + 'api/v2/getActivityItemList?activityCode=' + actCODE + '&activityTagId=13&count=1&keywords=' + keywords,
        dataType:"json",
        beforeSend: function() {
            $(".gridContentloading").css('display','block')
            // $('#piclist').html('');
        },
        success:function(receiver){
            // console.log(receiver.data)
            $(".gridContentloading").css('display','none')
            if(receiver.data.length == 0){
                alert('无结果')
                $("#searchkeywordspic").val("");
                return
            }else {
                $('#piclist').html('');
                var pic0 = '<div class="col-6"><div class="picscard-img"><a href="detail.html?id=' + receiver.data[0].id + '"><img alt="加载中" src="' + receiver.data[0].imgPath + sizev + '"></a></div><div class="picscard-info">'
                var pic1 = '<div class="infono">' + receiver.data[0].id + '</div><div class="infotitle">' + receiver.data[0].title + '</div><div class="infoname">' + receiver.data[0].author + '</div><div class="infovote">'
                var pic2 = '<div class="infovotecount" id="fs2020pfItems' + receiver.data[0].id + '">' + receiver.data[0].voteCount + '</div><div class="infovotecountbtn" onclick=vote("' + receiver.data[0].id + '","' + receiver.data[0].id + '")>' + iconcc + '</div>'
                var pic3 = '</div></div></div>'
                $('#piclist').html(pic0 + pic1 + pic2 + pic3);
                $('#morepicbtnforinit').css("display","none")
                $('#searchpicbtnreturn').css('display','block');
            }

            if(tag == 0){

            }else {
                $('.infovotecountbtn').css('display','none')
            }
        },
        error: function(){
            console.log('searchpic--Error');
            return;
        }
    })
}

function searchcartoon(tag) {
    $('#searchcartoonbtnreturn').css('display','none');
    var keywords = $("#searchkeywordscartoons").val();
    if(keywords == "") {
        alert('搜索编号不得为空');
        return;
    }
    $.ajax({
        type:"get",
        url: link + 'api/v2/getActivityItemList?activityCode=' + actCODE + '&activityTagId=15&count=1&keywords=' + keywords,
        dataType:"json",
        beforeSend: function() {
            $(".gridContentloading").css('display','block')
            // $('#piclist').html('');
        },
        success:function(receiver){
            // console.log(receiver.data)
            $(".gridContentloading").css('display','none')
            if(receiver.data.length == 0){
                alert('无结果')
                $("#searchkeywordscartoons").val("");
                return
            }else {
                $('#cartoonlist').html('');
                var pic0 = '<div class="col-6"><div class="picscard-img"><a href="detail.html?id=' + receiver.data[0].id + '"><img alt="加载中" src="' + receiver.data[0].imgPath + sizev + '"></a></div><div class="picscard-info">'
                var pic1 = '<div class="infono">' + receiver.data[0].id + '</div><div class="infotitle">' + receiver.data[0].title + '</div><div class="infoname">' + receiver.data[0].author + '</div><div class="infovote">'
                var pic2 = '<div class="infovotecount" id="fs2020pfItems' + receiver.data[0].id + '">' + receiver.data[0].voteCount + '</div><div class="infovotecountbtn" onclick=vote("' + receiver.data[0].id + '","' + receiver.data[0].id + '")>' + iconcc + '</div>'
                var pic3 = '</div></div></div>'
                $('#cartoonlist').html(pic0 + pic1 + pic2 + pic3);
                $('#morecartoonbtnforinit').css("display","none")
                $('#searchcartoonbtnreturn').css('display','block');
            }

            if(tag == 0){

            }else {
                $('.infovotecountbtn').css('display','none')
            }
        },
        error: function(){
            console.log('searchpic--Error');
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
                $("#fs2020pfItems" + id).html(receiver.activityItem.voteCount)
            }else {
                alert('链接错误，即将为您返回首页');
                window.location.href = 'index.html';
            }
        },
        error: function(){
            console.log('updateCurrentCount--Error');
            alert('链接错误，即将为您返回首页');
            window.location.href = 'index.html';
            return;
        }
    })
}