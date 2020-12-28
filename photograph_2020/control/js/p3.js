
/*
    note：第三页控制
    anthor：zx
*/

function endactivity() {
    swal({title: "本次大赛征集已经结束",icon: "warning",});
    return;
}


function initLiteswitchp3() {
    liteswitch = new liteswitch({//下面要用到，就要声明为全局变量
        loop: false,
        startIndex: 0,//起始滑块的索引（从零开始）
        draggable: false,//使用拖动和触摸滑动
    });
}

function steppre() {
    liteswitch.prev();
    step.step("previous");
}

function inittype() {
    $('input[name="v_type"]').change(function(e) {
        var v_type = $("input[name='v_type']:checked").val();
        if(v_type === "摄影作品") {
            $("#forvideoprj").css("display", "none");
            $("#forvideopostprj").html("上传作品: ");

            $("#prjdirector").val("无");
            $("#prjwriter").val("无");
            $("#prjphotograph").val("无");
            $("#prjredeal").val("无");
            $("#prjactor").val("无");

            $("#prjdirector").attr("disabled","disabled");
            $("#prjwriter").attr("disabled","disabled");
            $("#prjphotograph").attr("disabled","disabled");
            $("#prjredeal").attr("disabled","disabled");
            $("#prjactor").attr("disabled","disabled");

        }else {
            
            $("#forvideoprj").css("display", "flex");
            $("#forvideopostprj").html("上传封面: ");

            $("#prjdirector").val("");
            $("#prjwriter").val("");
            $("#prjphotograph").val("");
            $("#prjredeal").val("");
            $("#prjactor").val("")

            $("#prjdirector").removeAttr("disabled");
            $("#prjwriter").removeAttr("disabled");
            $("#prjphotograph").removeAttr("disabled");
            $("#prjredeal").removeAttr("disabled");
            $("#prjactor").removeAttr("disabled");
        }
    })
}

function stepnext_1to2() {

    var title = $("#prjname").val().length;
    var v_type = $("input[name='v_type']:checked").val();
    var isVideoUploadedSuccess = $("#video_name_target_id").val();
    var isPicUploadedSuccess = $("#pic_name_target_id").val();

    var error1 = "";
    var error2 = "";

    if (title === 0) {
        swal({title: "作品名称不可为空",icon: "error",});
        return;
    }
    if ((isVideoUploadedSuccess.length === 0) && (v_type === "微视频作品")) {
        swal({title: "请上传作品文件",icon: "error",});
        return;
    }else {
        // console.log(isVideoUploadedSuccess)
        // console.log(video_name_toupload)
        // console.log(video_type_toupload)
        $.ajax({
            type: "get",
            url: commonlink + 'upload_complete?exam_id=32&task_id=' + isVideoUploadedSuccess + '&filename=' + video_name_toupload + '&type=' + video_type_toupload,
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
            url: commonlink + 'upload_complete?exam_id=32&task_id=' + isPicUploadedSuccess + '&filename=' + pic_name_toupload + '&type=' + pic_type_toupload,
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
    var identify_id = $("#prjidentify").val().length;

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
    if (identify_id === 0) {
        swal({title: "请填写身份证号",icon: "error",});
        return;
    }

    liteswitch.next()
    step.step("next");

    var v_type = $("input[name='v_type']:checked").val();
    if(v_type === "摄影作品") {
        swal({
            title: "您无需填写本页内容",
            icon: "warning",
            closeOnClickOutside: false,
        }).then(done=>{
            liteswitch.next()
            step.step("next");
        });
    }
}

function stepnext_3to4() {

    var director = $("#prjdirector").val().length;
    var screenwriter = $("#prjwriter").val().length;
    var photography = $("#prjphotograph").val().length;
    var clip = $("#prjredeal").val().length;

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

    liteswitch.next()
    step.step("next");
}

function initLitestep() {
    step.step({
        initStep: 1,
        stepNames: ["作品名称", "申报单位", "主创人员资料", "内容简介"]
    });
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
            $('#' + modal).modal("hide")
        });
    }
}

function submitinfo() {

    var starring = $("#prjactor").val().length;
    var content_500 = $("#shortprjmain").val();
    var content = $("#shortprjverify").val();
    var read = $("#read").is(":checked");

    if (starring === 0) {
        swal({title: "请填写演员",icon: "error",});
        return;
    }
    if (content_500 === '您还没有提交作品梗概') {
        swal({title: "请填写作品梗概",icon: "error",});
        return;
    }
    if (content === '您还没有提交作品简介') {
        swal({title: "请填写作品简介",icon: "error",});
        return;
    }
    if (read === false) {
        swal({title: "请阅读活动规则后勾选",icon: "error",});
        return;
    }

    var formall = new FormData(document.getElementById("maininformation"));
    $.ajax({
        type:"post",
        async: true,
        processData: false,
        contentType: false,
        url: commonlink + 'big_hei_up',
        // url: 'http://172.16.20.17:8000/big_hei_up',
        data: formall,
        xhr: function() {                        
            myXhr = $.ajaxSettings.xhr();
            if(myXhr.upload){ // check if upload property exists
                myXhr.upload.addEventListener('progress',function(e){                            
                    var loaded = e.loaded;                  //已经上传大小情况 
                    var total = e.total;                      //附件总大小 
                    var percent = Math.floor(100*loaded/total)+"%";     //已经上传的百分比  
                    // console.log("已经上传了："+percent);                 
                    $("#myajaxprocess").css("width",percent);
                    $("#myajaxprocess").html(percent);                                                     
                }, false); // for handling the progress of the upload
            }
            return myXhr;
        },       
        // dataType:"json",
        beforeSend: function() {
            //提交之前，隐藏返回按钮，提交按钮，修改模态框按钮，禁用输入框和复选框
            
            $("#ajaxprocess_modal").modal('show')

            $("#finalpre").css("display","none");
            $("#finalsubmit").css("display","none");
            $(".showmodal").css("display","none");
            $('#prjactor').prop("disabled", true);
            $('#read').prop("disabled", true);

            //提交成功后显示禁用按钮
            $(".finalsubmitted").css("display","block");
        },
        success:function(receiver){
            console.log(receiver);
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
                        src: "http://img.foshanplus.com/2020/pic/chan/basic/download.png",
                    },
                    element: "img",
                },
            }).then(done=>{
                $("#ajaxprocess_modal").modal('hide')
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


function uploadx_btn() {
    $.fcup({
        upId: 'uploadx', //上传dom的id
        upShardSize: '5', //切片大小,(单次上传最大值)单位M，默认2M
        upMaxSize: '2000', //上传文件大小,单位M，不设置不限制

        upUrl: 'https://server.foshanplus.com/file_upload', //文件上传接口
        // upUrl: 'http://172.16.20.17:8000/file_upload', //文件上传接口
  
        upType: 'mov,mp4', //上传类型检测,用,号分割
  
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
                // $("#bigfile_btn_execUpload").css("background-color", "#a6aba6");
                // $("#bigfile_btn_execUpload").removeAttr("onclick","do_exec_upload()");

                // $("#bigfile_btn_cancelUpload").removeAttr("onclick","do_cancel()");
                // $("#bigfile_btn_cancelUpload").css("background-color", "#a6aba6");
                // $("#bigfile_btn_cancelUpload").css("border-right", "1px solid #feed4d");
                // $("#bigfile_btn_cancelUpload").prop("disabled", true);

                //把文件获取的target_id存放在隐藏的input中
                $("#video_name_target_id").val(target_id);

            } else {
                alert("当前访问人数过多,请稍后重试");
                return;
            }
        },
  
        // 上传过程监听，可以根据当前执行的进度值来改变进度条
        upEvent: function (num) {
            var p = toPercent(num);
            // console.log(p)
            $("#video_process_modal").modal("show");
            $("#video_process_modal_num").css("width", p);
            if(num === 100){
                $("#video_process_modal").modal("hide");
                setTimeout(function(){ 
                    $("#UploadBIGsuccee_modal").modal("show"); 
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
            
        }
    });
}

function uploads_btn() {
    $.fcup_pic({
        upId_pic: 'uploads', //上传dom的id
        upShardSize_pic: '2', //切片大小,(单次上传最大值)单位M，默认2M
        upMaxSize_pic: '20', //上传文件大小,单位M，不设置不限制
        upUrl_pic: 'https://server.foshanplus.com/file_upload', //文件上传接口
        // upUrl_pic: 'http://172.16.20.17:8000/file_upload', //文件上传接口
        upType_pic: 'jpg,jpeg,raw', //上传类型检测,用,号分割

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
            var p = toPercent(num);
            // console.log(p)
            $("#pic_process_modal").modal("show");
            $("#pic_process_modal_num").css("width", p);
            if(num === 100){
                $("#pic_process_modal").modal("hide");
                setTimeout(function(){ 
                    $("#UploadBIGsuccee_modal").modal("show"); 
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
            
        }
  
    });
}


/* pic */
function do_execPic_upload() {
    // console.log(pic_size_toupload)
    var result = getFileinfomation_pic();
    if(result != "checkedpic") {
        swal({
            title: "请选择正确的文件",
            icon: "error",
        });
        return;
    }
    jQuery.fcup_upload_pic()
}

function getFileinfomation_pic() {
    var picfile = document.getElementById("uploads_input").files;
    // console.log("1111", picfile)
    // console.log(picfile);
    //校验是否存在文件
    if(picfile.length === 0){
        swal({
            title: "请上传或刷新页面后重试",
            icon: "error",
        });
        return;
    }else if (picfile.length != 1) {
        swal({
            title: "您只可以上传一个文件",
            icon: "error",
        });
        return;
    }
    var picfile_type = picfile[0].type.split("/")[1]; //文件类型JPG,JPEG,RAW
    var picfile_size = picfile[0].size / 1024 / 1024; //文件大小MB
    var picfile_name = picfile[0].name;
    $("#uploaded_pic_name").val(picfile_name);

    if (!((picfile_type === "jpg") || (picfile_type === "JPG") || (picfile_type === "jpeg") || (picfile_type === "JPEG") || (picfile_type === "raw") || (picfile_type === "RAW"))) {
        swal({
            title: "只允许上传jpg,jpeg或raw格式的文件",
            icon: "error",
        });
        $("#uploads_input").val("");
        $("#uploaded_pic_name").val("");
        return;
    }
    
    if ((picfile_size < 2) || (picfile_size > 20)) {
        swal({
            title: "文件大小需在2M-20M之间",
            icon: "error",
        });
        $("#uploads_input").val("");
        $("#uploaded_pic_name").val("");
        return;
    }


    return "checkedpic";
}

function do_cancelPic() {
    if($("#uploads_input").val().length === 0) {
        swal({
            title: "您还没有选择文件",
            icon: "error",
        });
        return;
    }
    $("#uploads_input").val("");
    $("#uploaded_pic_name").val("");
}





/* video */
function do_exec_upload() {
    // console.log(pic_size_toupload)
    var result = getFileinfomation();
    if(result != "checkedvideo") {
        swal({
            title: "请选择正确的文件",
            icon: "error",
        });
        return;
    }
    jQuery.fcup_upload();
}

function getFileinfomation() {
    // var filex = document.getElementById("uploadx_input").files;
    var filex = jQuery('#uploadx_input')[0].files;
    console.log(filex);
    //校验是否存在文件
    if(filex.length === 0){
        swal({
            title: "请上传或刷新页面后重试",
            icon: "error",
        });
        return;
    }else if (filex.length != 1) {
        swal({
            title: "您只可以上传一个文件",
            icon: "error",
        });
        return;
    }
    var filex_type = filex[0].type.split("/")[1]; //文件类型JPG,JPEG,RAW
    var filex_size = filex[0].size / 1024 / 1024; //文件大小MB
    var filex_name = filex[0].name;
    $("#uploaded_video_name").val(filex_name);

    if (!((filex_type === "mp4") || (filex_type === "MP4") || (filex_type === "mov") || (filex_type === "MOV"))) {
        swal({
            title: "只允许上传mp4或mov格式的文件",
            icon: "error",
        });
        $("#uploadx_input").val("");
        $("#uploaded_video_name").val("");
        return;
    }

    if ((filex_size < 2000) && (filex_size > 1)) {
        swal({
            title: "文件大小不得超过2G",
            icon: "error",
        });
        $("#uploadx_input").val("");
        $("#uploaded_video_name").val("");
        return;
    }


    return "checkedvideo";
}

function do_cancel() {
    if($("#uploadx_input").val().length === 0) {
        swal({
            title: "您还没有选择文件",
            icon: "error",
        });
        return;
    }
    $("#uploadx_input").val("");
    $("#uploaded_video_name").val("");
}

function toPercent(point) {
    var str = Number(point).toFixed(2);
    str += "%";
    return str;
}