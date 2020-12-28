/**
 * note: 详情页
 * author：zx
 * date：2020-10-29
 * modify：/
 */

var sizev = '?x-oss-process=image/resize,p_15'

//加载数据、投票和投票功能
$(document).ready(function(){
    // getDatadetial()
})

// 获取详情数据
function getDatadetial(){
    var id = getParam('id');
    $.ajax({
        type:"get",
        url: link + 'api/v2/getActivityItemById?id=' + id,
        dataType:"json",
        success:function(receiver){
            // console.log(receiver)
            if (receiver.ret == 1) {
                ccgreenVoteDetailslogan = '请您为作品《' + receiver.activityItem.title + '》点赞';

                $("#mainid").html('No.' + receiver.activityItem.id)
                $("#title").html(receiver.activityItem.title + '<div id="goods">当前获赞数：' + receiver.activityItem.voteCount + '</div>')
                $("#author").html(receiver.activityItem.author)
                if(receiver.activityItem.description == ''){
                    $("#brief").append("无详情")
                }else {
                    $("#brief").append(receiver.activityItem.description)
                }
                
                /*  */
                getSign(ccgreenVoteDetailslogan)
                /*  */
                var video = '';
                if(receiver.activityItem.id == 1213) {
                    video1 = '<video ' + videoset + ' controls="controls" poster="' + receiver.activityItem.imgPath.toString().split(',')[0] + sizev + '" src="' + receiver.activityItem.videoPath.toString().split(',')[0] + '">浏览器不支持</video><div class="specialtitle">' + receiver.activityItem.title.toString().split('、')[0] + '</div>';
                    video2 = '<video style="border-radius:0" ' + videoset + ' controls="controls" poster="' + receiver.activityItem.imgPath.toString().split(',')[1] + sizev + '" src="' + receiver.activityItem.videoPath.toString().split(',')[1] + '">浏览器不支持</video><div class="specialtitle">' + receiver.activityItem.title.toString().split('、')[1] + '</div>'
                    video3 = '<video style="border-radius:0" ' + videoset + ' controls="controls" poster="' + receiver.activityItem.imgPath.toString().split(',')[2] + sizev + '" src="' + receiver.activityItem.videoPath.toString().split(',')[2] + '">浏览器不支持</video><div class="specialtitle">' + receiver.activityItem.title.toString().split('、')[2] + '</div>'
                    video4 = '<video style="border-radius:0" ' + videoset + ' controls="controls" poster="' + receiver.activityItem.imgPath.toString().split(',')[3] + sizev + '" src="' + receiver.activityItem.videoPath.toString().split(',')[3] + '">浏览器不支持</video><div class="specialtitle">' + receiver.activityItem.title.toString().split('、')[3] + '</div>'
                    video = (video1 + video2 + video3 + video4)
                    $("#title").html('<div id="goods">当前获赞数：' + receiver.activityItem.voteCount + '</div>')
                }else {
                    video = '<video ' + videoset + ' controls="controls" poster="' + receiver.activityItem.imgPath + sizev + '" src="' + receiver.activityItem.videoPath + '">浏览器不支持</video>'
                }
                
                $("#work").append(video);

            }else {
                alert('链接错误，即将为您返回首页');
                window.location.href = 'index.html';
            }
            // getSign();
        },
        error: function(){
            console.log('getDatadetial--Error');
            alert('链接错误，即将为您返回首页');
            window.location.href = 'index.html';
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
                window.location.reload();
            },
            error: function(){
                console.log('votepush*****xxx');
                alert("当前投票人数过多，请稍后重试");
            }
        })
    } else {
        // alert('请重新选择');
        return;
    }
}

function backpage() {
    // history.go(-1)
    document.referrer === '' ?
            window.location.href = 'https://content.foshanplus.com/h5/crimeCrackdown2020Vote/index.html' :
            // window.history.go(-1);
            window.history.back();
}

