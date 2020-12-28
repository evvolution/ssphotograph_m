/**
 * note:2020口碑投票
 * author：zx
 * date：2020-11-12
 * modify：/
 */

var actCODE = 'fskbbtp1_2020'
var link = 'https://api.foshanplus.com/foshan/'
var fadeOuttime = 500

var iconcc = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-hand-thumbs-up" fill="#E11828" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16v-1c.563 0 .901-.272 1.066-.56a.865.865 0 0 0 .121-.416c0-.12-.035-.165-.04-.17l-.354-.354.353-.354c.202-.201.407-.511.505-.804.104-.312.043-.441-.005-.488l-.353-.354.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315L12.793 9l.353-.354c.353-.352.373-.713.267-1.02-.122-.35-.396-.593-.571-.652-.653-.217-1.447-.224-2.11-.164a8.907 8.907 0 0 0-1.094.171l-.014.003-.003.001a.5.5 0 0 1-.595-.643 8.34 8.34 0 0 0 .145-4.726c-.03-.111-.128-.215-.288-.255l-.262-.065c-.306-.077-.642.156-.667.518-.075 1.082-.239 2.15-.482 2.85-.174.502-.603 1.268-1.238 1.977-.637.712-1.519 1.41-2.614 1.708-.394.108-.62.396-.62.65v4.002c0 .26.22.515.553.55 1.293.137 1.936.53 2.491.868l.04.025c.27.164.495.296.776.393.277.095.63.163 1.14.163h3.5v1H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/></svg>&nbsp;'

// getpolicylist('25') //23
// getservicecaselist('38') //36=34+2

function sethint(hit) {
    sessionStorage.setItem('pageINDEX', hit)
    if(hit == 1){
        loadvotecount('16','25')
    }else if(hit == 2){
        loadvotecount('17','38')
    }
}

mainpage()

function mainpage() {
    hint();
    if((sessionStorage['l1Contents'] == null) || (sessionStorage['l2Contents'] == null) || ((sessionStorage['l1chose'] == null) && (sessionStorage['l2chose'] == null))) {
        getpolicylist('25') //23
        getservicecaselist('38') //32
    } else {
        $('#policyserviceList').html(sessionStorage['l1Contents'])
        $('#servicecaseList').html(sessionStorage['l2Contents'])
        loadvotecount('16','25')
        loadvotecount('17','38')

        $('.kbmaincoverforloading').fadeOut(fadeOuttime)
        backfromNext('l1chose','list1pro')
        backfromNext('l2chose','list2pro')
    }
}

function hint() {
    var hint = sessionStorage['pageINDEX'];
    // console.log(sessionStorage['Readed'])
    if(hint == 0){
        $('.fixbutton').css('display','none');
        // $('#pills-rule-tab').attr('active')
        // $('#pills-policyservice-tab').removeAttr('active')
        // $('#pills-servicecase-tab').removeAttr('active')
        // $('#pills-rank-tab').removeAttr('active')

        // $('#pills-rule').attr('show active')
        // $('#pills-policyservice').removeAttr('show active')
        // $('#pills-servicecase').removeAttr('show active')
        // $('#pills-rank').removeAttr('show active')
    }else if(hint == 1){

        $('.fixbutton').css('display','block');

        $('#pills-rule-tab').removeClass('active')
        $('#pills-policyservice-tab').addClass('active')
        $('#pills-servicecase-tab').removeClass('active')
        $('#pills-rank-tab').removeClass('active')

        $('#pills-rule').removeClass('show active')
        $('#pills-policyservice').addClass('show active')
        $('#pills-servicecase').removeClass('show active')
        $('#pills-rank').removeClass('show active')
    }else if(hint == 2){

        $('.fixbutton').css('display','block');

        $('#pills-rule-tab').removeClass('active')
        $('#pills-policyservice-tab').removeClass('active')
        $('#pills-servicecase-tab').addClass('active')
        $('#pills-rank-tab').removeClass('active')

        $('#pills-rule').removeClass('show active')
        $('#pills-policyservice').removeClass('show active')
        $('#pills-servicecase').addClass('show active')
        $('#pills-rank').removeClass('show active')
    }else if(hint == 3){

        $('.fixbutton').css('display','none');

        $('#pills-rule-tab').removeClass('active')
        $('#pills-policyservice-tab').removeClass('active')
        $('#pills-servicecase-tab').removeClass('active')
        $('#pills-rank-tab').addClass('active')
        
        $('#pills-rule').removeClass('show active')
        $('#pills-policyservice').removeClass('show active')
        $('#pills-servicecase').removeClass('show active')
        $('#pills-rank').addClass('show active')
    }
}

function backfromNext(list,pro) {
    var str = ''
    var num = ''
    if(!(sessionStorage[list] == null)){
        // console.log(sessionStorage[list])
        str = sessionStorage[list];
        // console.log(str)
        if(str != ''){
            num = str.substring(0,str.length-1).split(',').length
            for(var i = 0; i < num; i++ ){
                $("#kbchks2020" + str.substring(0,str.length-1).split(',')[i]).prop("checked",true)
            }
            $('#' + pro).html("(已选" + num + "/10)");
        }

    }
}

function loadvotecount(listtype,num) {
    var Vcount = '';
    if(listtype == '16'){
        Vcount = 'l1Vcounts'
    }else if(listtype == '17') {
        Vcount = 'l2Vcounts'
    }
    $.ajax({
        type: "get",
        url: link + 'api/v2/getActivityItemList?activityCode=' + actCODE + '&activityTagId=' + listtype + '&count=' + num,
        dataType:"json",
        beforeSend: function() {
        },
        success:function(receiver) {
            for(var i = 0; i < receiver.data.length; i++) {
                $('#' + Vcount + receiver.data[i].id).html(receiver.data[i].voteCount)
                // console.log(Vcount + receiver.data[i].id)
            }
        },
        error: function(){
            console.log(loadvotecount + '--Error');
            return;
        }
    })
}

//页面加载功能
$(document).ready(function(){
    
})

function getpolicylist(num) {
    $.ajax({
        type: "get",
        url: link + 'api/v2/getActivityItemList?activityCode=' + actCODE + '&activityTagId=16&count=' + num,
        dataType:"json",
        beforeSend: function() {
            //请求开始至成功显示加载条
            $("#l1loading").css('display','block')
        },
        success:function(receiver) {
            //清空列表显示区域
            $('#policyserviceList').html('');
            //隐藏加载条
            $("#l1loading").css('display','none')
            // console.log(receiver.data)
            for(var i = 0; i < receiver.data.length; i++) {
                var vote0 = '<div class="list-group-item"><div class="listNotag">No.' + receiver.data[i].id + '</div><div class="listNo">' + receiver.data[i].sno + '</div><div class="listMain">'
                var vote1 = '<div class="listtitle"><a href="detail.html?id=' + receiver.data[i].id + '">' + receiver.data[i].title + '</a></div><div class="listcount">'
                var vote2 = iconcc + '<b id="l1Vcounts' + receiver.data[i].id + '">' + receiver.data[i].voteCount + '</b></div></div><div class="listbtn">'
                var vote3 = '<input id="kbchks2020' + receiver.data[i].id + '" type="checkbox" name="list1chk" class="kbcheck" value="' + receiver.data[i].id + '" onclick=bindkbChecks("list1chk","list1pro")></div></div>'
                $('#policyserviceList').append(vote0 + vote1 + vote2 + vote3);
                // console.log(receiver.data[i].voteCount)
            }
            sessionStorage.setItem('l1Contents', $('#policyserviceList').html())
            backfromNext('l1chose','list1pro')
        },
        error: function(){
            console.log(getpolicylist + '--Error');
            return;
        }
    })
}

function getservicecaselist(num) {
    $.ajax({
        type: "get",
        url: link + 'api/v2/getActivityItemList?activityCode=' + actCODE + '&activityTagId=17&count=' + num,
        dataType:"json",
        beforeSend: function() {
            //请求开始至成功显示加载条
            $("#l2loading").css('display','block')
        },
        success:function(receiver) {
            //清空列表显示区域
            $('#servicecaseList').html('');
            //隐藏加载条
            $("#l2loading").css('display','none')
            // console.log(receiver.data)
            for(var i = 0; i < receiver.data.length; i++) {
                var vote0 = '<div class="list-group-item"><div class="listNotag">No.' + receiver.data[i].id + '</div><div class="listNo">' + receiver.data[i].sno + '</div><div class="listMain">'
                var vote1 = '<div class="listtitle"><a href="detail.html?id=' + receiver.data[i].id + '">' + receiver.data[i].title + '</a></div><div class="listanthor">' + receiver.data[i].description
                var vote2 =  '</div><div class="listcount">' + iconcc + '<b id="l2Vcounts' + receiver.data[i].id + '">' + receiver.data[i].voteCount + '</b></div></div><div class="listbtn">'
                var vote3 = '<input id="kbchks2020' + receiver.data[i].id + '" type="checkbox" name="list2chk" class="kbcheck" value="' + receiver.data[i].id + '" onclick=bindkbChecks("list2chk","list2pro")></div></div>'
                $('#servicecaseList').append(vote0 + vote1 + vote2 + vote3);
            }
            sessionStorage.setItem('l2Contents', $('#servicecaseList').html())
            // sessionStorage.setItem('pageINDEX', 0)
            backfromNext('l2chose','list2pro')
            $('.kbmaincoverforloading').fadeOut(fadeOuttime)
        },
        error: function(){
            console.log(getservicecaselist + '--Error');
            return;
        }
    })
}

function getrank(ranktype) {
    sethint(3)
    var plugin = '<div class="leftplugin"></div><div class="rightplugin"></div>'
    var ranklist = '';
    var rload = ''
    if(ranktype == 16) {
        ranklist = 'policyserviceRank'
        rload = 'r1loading'
    }else if (ranktype == 17) {
        ranklist = 'servicecaseRank'
        rload = 'r2loading'
    }
    $.ajax({
        type:"get",
        url: link + 'api/v2/getActivityItemsRanking?activityCode=' + actCODE + '&activityTagId=' + ranktype ,
        dataType:"json",
        beforeSend: function() {
            $("#" + rload).css('display','block')
        },
        success:function(receiver){
            $("#" + rload).css('display','none')
            // console.log(receiver)
            if(receiver.data.length == 0){
                $('#' + ranklist).html('暂无排名信息' + plugin);
            }else {
                var rank = ''
                for(var i = 0; i < receiver.data.length; i++) {
                    var rank0 = ''
                    if(i == 0) {
                        rank0 = '<div class="list-group-item"><div class="rankNo"><img src="img/1.png"></div>'
                    }else if(i == 1) {
                        rank0 = '<div class="list-group-item"><div class="rankNo"><img src="img/2.png"></div>'
                    }else if (i == 2) {
                        rank0 = '<div class="list-group-item"><div class="rankNo"><img src="img/3.png"></div>'
                    }else {
                        rank0 = '<div class="list-group-item"><div class="rankNo">' + (i + 1) + '</div>'
                    }
                    var rank1 = '<div class="rankTitle"><div class="rankline1"><a href="detail.html?id=' + receiver.data[i].activityItemId  + '">' + receiver.data[i].title + '</a>'
                    var rank2 = '</div><div class="rankline2">' + receiver.data[i].description + '</div></div>'
                    var rank3 = '<div class="rankCount">' + receiver.data[i].count + '</div></div>'
                    rank += (rank0 + rank1 + rank2 + rank3);
                }
                $('#' + ranklist).html(rank + plugin);
            }

        },
        error: function(){
            console.log('getrank--' + ranktype + '--Error');
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
            if (receiver.ret == 1) {
                $("#fs2020pfItems" + id).html(receiver.activityItem.voteCount)
            }else {
                // alert('链接错误，即将为您返回首页');
                window.location.href = '404.html';
            }
        },
        error: function(){
            console.log('updateCurrentCount--Error');
            // alert('链接错误，即将为您返回首页');
            window.location.href = '404.html';
            return;
        }
    })
}

//固定一级导航栏在顶部
function initNav(){
    var mainnav = $('#mainnav');
    var startPos = $(mainnav).offset().top;
    $.event.add(window, "scroll", function () {
        var p = $(window).scrollTop();
        if ((p) > startPos) {  //到顶部
            $(mainnav).css('position', 'fixed');
            $(mainnav).css('top', '0px');
            $(mainnav).css('z-index','888')
        } else { //拉回来
            $(mainnav).css('position', 'relative');
        }
    });
}

function showSubmit() {
    $('.mainlist').click(function(){
        $('.fixbutton').css('display','block');
    })
    $('.mainother').click(function(){
        $('.fixbutton').css('display','none');
    })
}

function bindkbChecks(name,progress) {
    /*允许微信就放开*/

    if(initflag == 0){
        $('input[name="list1chk"]').each(function(){
            $(this).attr('disabled',true);
        });
        $('input[name="list2chk"]').each(function(){
            $(this).attr('disabled',true);
        });
        alert('请在佛山+App参与点赞活动');
        return;
    }

    /**/
    var checkedItems = $('input[name=' + name + ']:checked');
    var uncheckedItems = $('input[name=' + name + ']:not(:checked)');
    var state = checkedItems.length;
    if(state === 10){
        $('input[name=' + name + ']:not(:checked)').each(function(){
            $(this).attr('disabled',true);
        });
    }else if((state < 5) && ((state > 0) || (state === 0))){
        $('input[name=' + name + ']').each(function(){
            $(this).attr('disabled',false);
        });
    }else if((state < 10) && (state > 4)){
        $('input[name=' + name + ']').each(function(){
            $(this).attr('disabled',false);
        });
    }else if(state > 10){
        alert("当前榜单您最多选择10项");//这个不可能触发的
        return;
    }
    $('#' + progress).html("(已选"+ state+ "/10)");
    var list1checked = "";
    var list2checked = "";
    $('input[name="list1chk"]:checked').each(function(i){
        list1checked += ($(this).val() + "," );
    })
    $('input[name="list2chk"]:checked').each(function(i){  
        list2checked += ($(this).val() + "," );
    })
    sessionStorage.setItem('l1chose', list1checked)
    sessionStorage.setItem('l2chose', list2checked)
    // console.log(checkedItems)
}

function submitvote(){
    //若在app但是未登录，则调用登录
    fs_getUserinfo(()=>{
        if(initflag == 2){
            fs_login();
            return;
        }
        if(initflag == 0){
            alert('请在佛山+App参与点赞活动');
            return;
        }
        var list1count = $('input[name="list1chk"]:checked').length;
        var list2count = $('input[name="list2chk"]:checked').length;
        if((list1count < 5) && (list2count < 5)) {
            alert("每个榜单至少选择5项");
            return;
        } else if ((list1count < 5) && (list2count > 4)) {
            alert("行政服务榜至少选择5项");
            return;
        } else if ((list1count > 4) && (list2count < 5)) {
            alert("服务案例榜至少选择5项");
            return;
        } else if((list1count > 4) && (list2count > 4)) {
            // getcaptcha();
            // $("#captcha").modal("show");
            var res = confirm("请确认您的选择")
            if(res == true){
                votepush()
            }else {
                return
            }
        }
    })
    
}

function getcaptcha() {
    $("#captchacode").val("")
    $.ajax({
        type:"get",
        url: link + 'api/v2/captcha?token=' + authInfo.fs_token,
        // url: link + 'api/v2/captcha?token=BA1D366BFE2946C0A327B81E56883683',
        dataType:"json",
        success:function(data){
            // console.log("getcaptcha:" + data)
            $("#captchaimg").attr("src",'data:image/png;base64,' + data.img);
        },
        error: function(){
            console.log('getcaptcha*****xxx');
            alert("获取验证码失败");
        }
    })
}


function votepush(){
    var list1checked = "";
    var list2checked = "";
    var item = '';
    // var verifyCode = $("#captchacode").val();
    // if(verifyCode == ""){
    //     alert("验证码不得为空");
    //     return;
    // }
    $('input[name="list1chk"]:checked').each(function(i){
        list1checked += ($(this).val() + "," );
    })
    $('input[name="list2chk"]:checked').each(function(i){  
        list2checked += ($(this).val() + "," );
    })
    item = (list1checked + list2checked).toString()
    item = item.substring(0,item.length-1);
    // console.log(item)
    // kbtoken = JSON.parse(sessionStorage['fs_member']).token;
    // kbtoken = 'BA1D366BFE2946C0A327B81E56883683';
    $.ajax({
        type:"post",
        url: link + 'api/v2/votesByActivityDayOnlyOne',
        data:{
            "activityCode": actCODE,
            "activityItemIds": item,
            // "verifyCode": verifyCode,
            "token": authInfo.fs_token,
            // "token": 'BA1D366BFE2946C0A327B81E56883683',
            "msgStatus": 2,
        },
        dataType:"json",
        success:function(data){
            console.log(data)
            //返回点赞提交结果
            alert(data.msg);
            if(data.ret == 1){
                //验证码正确，点赞提交成功
                //1.清空已选session
                //2.清空已选进度
                //3.清空已勾选
                //4.隐藏验证码窗
                sessionStorage.setItem('l1chose', '')
                sessionStorage.setItem('l2chose', '')
                $("#list1pro").html('(已选0/10)')
                $("#list2pro").html('(已选0/10)')
                $('input[name="list1chk"]:checked').each(function(){
                    $(this).prop("checked",false)
                });
                $('input[name="list2chk"]:checked').each(function(){
                    $(this).prop("checked",false)
                });
                // $("#captcha").modal("hide")
                //去抽奖 ----to do
                //1.显示红包窗
                // alert('红包调试中')
                $("#mypocket").modal("show")
            }else if(data.ret == 0){
                if(data.msg == "今天已点赞3次，请明天再点赞！"){
                    //验证码正确，点赞提交成功，但是次数已满
                    //1.清空已选session
                    //2.直接刷新页面
                    sessionStorage.setItem('l1chose', '')
                    sessionStorage.setItem('l2chose', '')
                    window.location.href = 'index.html'
                }
                // else if(data.msg == "验证码错误"){
                //     //验证码错误，点赞提交失败
                //     //1.不关闭窗，重新获取验证码
                //     //2.不清空session，若直接刷新页面，则读取上一次选择
                //     getcaptcha();
                // }
                else {
                    //异常，去404
                    window.location.href = '404.html'
                }
            }
            // updateCurrentCount(item);
            // window.location.href = 'index.html'
        },
        error: function(data){
            console.log(data)
            console.log('votepush*****xxx');
            alert("当前点赞人数过多，请稍后重试");
        }
    })
}

function initClock() {
    var b = new Date;
    var b = -b.getTimezoneOffset() / 60;
    var i = '2020__regexoperators___/11/27 23:59:59';
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
        dayTextNumber: 1, //倒计时天数数字个数
        displayDay: !0, //是否显示天数
        displayHour: !0, //是否显示小时数
        displayMinute: !0, //是否显示分钟数
        displaySecond: !0, //是否显示秒数
        displayLabel: !0, //是否显示倒计时底部label
        onFinish: function() {
            $('#pills-servicecase,#pills-policyservice').html('<div style="margin:20px auto;text-align:center;color:#fff">点赞已结束</div>')
            $('.fixbutton').css('visibility','hidden')
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

function isWeixinBrower() {
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf('micromessenger') != -1;
    var isAndroid = ua.indexOf('android') != -1;
    var isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1);
    if (!isWeixin) {//紧急关闭活动将！去掉
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1ac6cb553739a3d0&redirect_uri=https://content.foshanplus.com/h5/greatbrands2020/index.html&response_type=code&scope=snsapi_base&state=hyxt#wechat_redirect'
    }
}

function getPocket(){
    authInfo.activityLottery();
}

function getEnd(){
    window.location.href="index.html"
}

//判断是否有奖品未领
function isMyhaveprize(){
    $.ajax({
        type:"get",
        url: 'https://api.foshanplus.com/foshan/api/v2/getMyPrizes?startId=-1&count=10&activityCode=fskbbtp_lottery_2020&token=' + authInfo.fs_token,
        dataType:"json",
        success:function(data){
            // console.log(data.data)
            if(data.data.length == 0){
                //没中奖不做操作，隐藏提示
                $('#myprizeNotice').css('display','none')

            } else if(data.data.length != 0) {
                if(data.data[0].sendStatus == 0) {
                    //中奖了但是没派送，显示提示
                    $('#myprizeNotice').css('display','block')
                
                }else if(data.data[0].sendStatus != 0) {
                    //已经领了，隐藏提示
                    $('#myprizeNotice').css('display','none')

                }
            }
        },
        error: function(){
            console.log('myprizes*****xxx');
            // alert("获取奖品列表失败");
            return;
        }
    })
}

function myprizes() {
    $.ajax({
        type:"get",
        url: 'https://api.foshanplus.com/foshan/api/v2/getMyPrizes?startId=-1&count=10&activityCode=fskbbtp_lottery_2020&token=' + authInfo.fs_token,
        dataType:"json",
        success:function(data){
            console.log(data.data)
            if(data.data.length == 0){
                $("#prizeContent").html('未获奖');
            } else if(data.data.length != 0) {
                $("#prizeName").html(data.data[0].prizeName);
                if(data.data[0].sendStatus == 0) {
                    var codex = data.data[0].prizeCode;
                    getmoney(codex)
                    // $("#prizeGet").html('<span style="color:#C01103" onclick="getmoney()">点击领取</span>');
                }else if(data.data[0].sendStatus != 0) {
                    $("#prizeGet").html('<span>已领取</span>');
                }
            }
        },
        error: function(){
            console.log('myprizes*****xxx');
            alert("获取奖品列表失败");
        }
    })

    // $('#myprizemodal').modal('show')
}

function getmoney(prizecode) {
    console.log(prizecode)
    $.ajax({
        type:"post",
        url:'https://api.foshanplus.com/foshan/api/v2/cashPrize',
        dataType:"json",
        data:{
            // "prizeCode": inner,
            "prizeCode": prizecode,
            "token": authInfo.fs_token,
        },
        success:function(data){
            console.log(data.ret)
            console.log(data.msg)
            if(data.ret == 1){
                alert('领取成功');
                // console.log('领取成功');
                // getEnd();
            } else if(data.ret == 0) {
                // alert(data.msg);
                console.log(data.msg);
                // getEnd();
            } else {
                console.log(data);
            }
        },
        error: function(){
            console.log('getmoney*****xxx');
            return;
        }
    })
}