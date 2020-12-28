
/*
    note：第三页控制
    anthor：zx
*/

function initLiteswitch() {
    liteswitch = new liteswitch({//下面要用到，就要声明为全局变量
        loop: false,
        startIndex: 0,//起始滑块的索引（从零开始）
        draggable: false,//使用拖动和触摸滑动
    });
}

function initLitestep() {
    step.step({
        initStep: 1,
        stepNames: ["作品名称", "申报单位", "主创人员资料", "内容简介"]
    });
}

function steppre() {
    liteswitch.prev();
    step.step("previous");
}

function stepnext_1to2() {

    var title = $("#prjname").val().length;
    var v_type = $("#v_type").val();
    var isVideoUploadedSuccess = $("#video_name_target_id").val();
    var isPicUploadedSuccess = $("#pic_name_target_id").val();

    var error1 = "";
    var error2 = "";

    if (title === 0) {
        swal({title: "作品名称不可为空",icon: "error",});
        return;
    }
    // console.log(v_type)
    if (v_type === "0") {
        swal({title: "请选择作品类型",icon: "error",});
        return;
    }

    if (isVideoUploadedSuccess.length === 0) {
        swal({title: "请上传作品文件",icon: "error",});
        return;
    }else {
        // console.log(isVideoUploadedSuccess)
        // console.log(video_name_toupload)
        // console.log(video_type_toupload)
        $.ajax({
            type: "get",
            url: commonlink + 'upload_complete?exam_id=35&task_id=' + isVideoUploadedSuccess + '&filename=' + video_name_toupload + '&type=' + video_type_toupload,
            // url: 'http://172.16.20.17:8000/upload_complete?exam_id=29&task_id=' + isVideoUploadedSuccess + '&filename=' + video_name_toupload + '&type=' + video_type_toupload,
            success:function(receiver){
                console.log(receiver);
                // alert(1)
                $("#videofinalname").val(receiver.file_name);
            },
            error: function(receiver){
                console.log(receiver);
                swal({
                    title: "当前人数过多，请稍后重试",
                    icon: "error",
                });
                error1 = "1";
                return;
            }
        });
    }
    
    if (isPicUploadedSuccess.length === 0) {
        swal({title: "请上传图片",icon: "error",});
        return;
    }else {
        // console.log(isPicUploadedSuccess)
        // console.log(pic_name_toupload)
        // console.log(pic_type_toupload)
        $.ajax({
            type: "get",
            url: commonlink + 'upload_complete?exam_id=35&task_id=' + isPicUploadedSuccess + '&filename=' + pic_name_toupload + '&type=' + pic_type_toupload,
            // url: 'http://172.16.20.17:8000/upload_complete?exam_id=29&task_id=' + isPicUploadedSuccess + '&filename=' + pic_name_toupload + '&type=' + pic_type_toupload,
            success:function(receiver){
                console.log(receiver);
                // alert(1)
                $("#picfinalname").val(receiver.file_name);
            },
            error: function(receiver){
                console.log(receiver);
                swal({
                    title: "当前人数过多，请稍后重试",
                    icon: "error",
                });
                error2 = "1";
                return;
            }
        });
    }

    if (error1 === "1") {
        swal({
            title: "当前人数过多，请稍后重试",
            icon: "error",
        });
        console.log("video文件target_id获取失败");
        return;
    }

    if (error2 === "1") {
        swal({
            title: "当前人数过多，请稍后重试",
            icon: "error",
        });
        console.log("pic文件target_id获取失败");
        return;
    }

    liteswitch.next()
    step.step("next");
}

function stepnext_2to3() {

    var company_a = $("#prjbelong").val().length;
    var contact_person = $("#prjcontact").val().length;
    var phone = $("#prjphone").val().length;

    if (company_a === 0) {
        swal({title: "请填写报送单位",icon: "error",});
        return;
    }
    if (contact_person === 0) {
        swal({title: "请填写联系人",icon: "error",});
        return;
    }
    if (phone === 0) {
        swal({title: "请填写联系方式",icon: "error",});
        return;
    }

    liteswitch.next()
    step.step("next");
}

function stepnext_3to4() {

    var director = $("#prjdirector").val().length;
    var screenwriter = $("#prjwriter").val().length;
    var photography = $("#prjphotograph").val().length;
    var clip = $("#prjredeal").val().length;
    var starring = $("#prjactor").val().length;

    if (director === 0) {
        swal({title: "请填写导演",icon: "error",});
        return;
    }
    if (screenwriter === 0) {
        swal({title: "请填写编剧",icon: "error",});
        return;
    }
    if (photography === 0) {
        swal({title: "请填写摄像",icon: "error",});
        return;
    }
    if (clip === 0) {
        swal({title: "请填写剪辑",icon: "error",});
        return;
    }
    if (starring === 0) {
        swal({title: "请填写演员",icon: "error",});
        return;
    }

    liteswitch.next()
    step.step("next");
}



function postToshort(writepart, postpart, modal) {
    var inside = $('#' + writepart).val();
    if(inside === ""){
        swal({
            title: "内容不可为空",
            icon: "error",
        });
    }else {
        $('#' + postpart).val(inside);
        swal({
            title: "保存成功",
            icon: "success",
        }).then(done=>{
            modalclose(modal);
        });
    }
}

function submitinfo() {


    var content_500 = $("#prjcontent_500").val().length;
    var content = $("#prjcontent").val().length;
    var read = $("#read").is(":checked");


    if (content_500 === 0) {
        swal({title: "请填写作品梗概",icon: "error",});
        return;
    }
    if (content === 0) {
        swal({title: "请填写作品简介",icon: "error",});
        return;
    }
    if (read === false) {
        swal({title: "请阅读活动须知后勾选",icon: "error",});
        return;
    }
    // return
    var formall = new FormData(document.getElementById("maininformation"));
    $.ajax({
        type:"post",
        async: false,
        processData: false,
        contentType: false,
        url: commonlink + 'big_hei_up',
        data: formall,
        xhr: function() {                        
            myXhr = $.ajaxSettings.xhr();
            if(myXhr.upload){ // check if upload property exists
                myXhr.upload.addEventListener('progress',function(e){                            
                    var loaded = e.loaded;                  
                    var total = e.total;                      
                    var percent = Math.floor(100*loaded/total)+"%";     //已经上传的百分比               
                    $("#sheet_process_modal_num").html(percent);                                                     
                }, false); // for handling the progress of the upload
            }
            return myXhr;
        }, 
        beforeSend: function() {
            
            modalshow('sheet-process');

            $("#final-submit").css("display","none");
            $("#final-group").css("display","block");
            $('#prjcontent_500').prop("disabled", true);
            $('#prjcontent').prop("disabled", true);
            $('#read').prop("disabled", true);
        },
        success:function(receiver){
            // console.log(receiver);
            var success_id = receiver.data.id;
            // console.log(success_id);
            var strid = success_id.toString();
            // console.log(strid);
            var strid_md5 = strid.MD5().toLocaleUpperCase();
            // console.log(strid_md5);
            swal({
                title: "提交成功",
                icon: "success",
                text: '请牢记您的作品识别码，本码仅展示一次 \r\n \r\n' + strid_md5 + '\r\n \r\n 扫码下载佛山+，查看作品审核进度',
                closeOnClickOutside: false,
                content: {
                    element: "img",
                    attributes: {
                        src: "././img/basic/download.png",
                    },
                    element: "img",
                },
            }).then(function (){
                modalclose('sheet-process');
            });
        },
        error: function(receiver){
            console.log(receiver);
            swal({
                title: "提交失败，请稍后重试",
                icon: "error",
            });
            return;
        }
    });
}


/* 视频上传 */
function uploadx_btn() {
    $.fcup({
        upId: 'uploadx', //上传dom的id
        upShardSize: '2', //切片大小,(单次上传最大值)单位M，默认2M
        upMaxSize: '2000', //上传文件大小,单位M，不设置不限制

        upUrl: 'https://server.foshanplus.com/file_upload', //文件上传接口
        // upUrl: 'http://172.16.20.17:8000/file_upload', //文件上传接口
  
        upType: 'mov,mp4,mpeg', //上传类型检测, 用,号分割
  
        //接口返回结果回调，根据结果返回的数据来进行判断，可以返回字符串或者json来进行判断处理
        upCallBack: function (res) {

            // console.log(res)
            // console.log(video_name_toupload)
            // console.log(video_type_toupload)
            var msg = res.msg;
            var target_id = res.target_id;
            if(msg === "成功") {


                //把上传成功的文件名显示在页面span中
                $("#uploaded_video_name").val(video_name_toupload);
                //把上传成功的文件类型存在页面隐藏input中
                $("#uploaded_video_type").html(video_type_toupload);

                //改变上传按钮的颜色并且使其禁用x
                $(".bigfile_btn").css("background-color", "#a6aba6");
                $("#uploadx_input").prop("disabled", true);

                //把文件获取的target_id存放在隐藏的input中
                $("#video_name_target_id").val(target_id);

            } else {
                alert("当前访问人数过多,请稍后重试");
                return;
            }
        },
  
        // 上传过程监听，可以根据当前执行的进度值来改变进度条
        upEvent: function (num) {
            modalclose("pre-upload")
            var p = toPercent(num);
            // console.log(p)
            modalshow('video-process')
            $("#video_process_modal_num").html(p);
            if(num === 100){
                modalclose("video-process")
                setTimeout(function(){ 
                    modalshow('uploadsuccess')
                }, 500);
            }
        },
  
        // 发生错误后的处理
        upStop: function (errmsg) {
            console.log(errmsg)
            swal({
                title: "访问人数过多，请重试",
                icon: "error",
            });
            return;
        },
  
        // 开始上传前的处理和回调,比如进度条初始化等
        upStart: function () { 
            modalshow('pre-upload');
        }
    });
}

function uploads_btn() {
    $.fcup_pic({
        upId_pic: 'uploads', //上传dom的id
        upShardSize_pic: '2', //切片大小,(单次上传最大值)单位M，默认2M
        upMaxSize_pic: '5', //上传文件大小,单位M，不设置不限制
        upUrl_pic: 'https://server.foshanplus.com/file_upload', //文件上传接口
        // upUrl_pic: 'http://172.16.20.17:8000/file_upload', //文件上传接口
        upType_pic: 'jpg,png', //上传类型检测,用,号分割

        upCallBack_pic: function (res) {
            // console.log(res)
            var msg = res.msg;
            var target_id = res.target_id;
            if(msg === "成功") {
           
                //把上传成功的文件名显示在页面input中-图片文件
                $("#uploaded_pic_name").val(pic_name_toupload);
                //把上传成功的文件类型存在页面隐藏input中-图片文件
                $("#uploaded_pic_type").html(pic_type_toupload);

                //改变"上传"按钮的颜色并且使其禁用-图片文件
                $(".bigfile_btn_pic").css("background-color", "#a6aba6");
                $("#uploads_input").prop("disabled", true);
                //把文件获取的target_id存放在隐藏的input中-图片文件
                $("#pic_name_target_id").val(target_id);

            } else {
                alert("当前访问人数过多,请稍后重试");
                return;
            }

        },
  
        upEvent_pic: function (num) {
            modalclose("pre-upload")
            var p = toPercent(num);
            // console.log(p)
            modalshow('pic-process')
            $("#video_process_modal_num").html(p);
            if(num === 100){
                modalclose("pic-process")
                setTimeout(function(){ 
                    modalshow('uploadsuccess')
                }, 500);
            }
        },
  
        // 发生错误后的处理
        upStop_pic: function (errmsg) {
            console.log(errmsg)
            swal({
                title: "访问人数过多，请重试",
                icon: "error",
            });
            return;
        },
  
        // 开始上传前的处理和回调,比如进度条初始化等
        upStart_pic: function () {
            modalshow('pre-upload')
        }
    });
}

function toPercent(point) {
    var str = Number(point).toFixed(2);
    str += "%";
    return str;
}