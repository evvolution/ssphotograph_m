
document.ready(function(){
    // isInfsplus()
});

function closenotice() {
    var close = document.getElementsByClassName("notice")[0];
    close.style.display = "none";
}

function getParam(paramName) {
    paramValue = "", isFound = !1;
    if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
        arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;
        while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
    }
    return paramValue == "" && (paramValue = null), paramValue
}

function isInfsplus() {
    var tag = getParam("fs_device");
    var forNofsplus = document.getElementById("forNofsplus");
    var forfsplus = document.getElementById("forfsplus");
    if (tag === null){
        forNofsplus.style.display = "block";
        forfsplus.style.display = "none";
    } else {
        forNofsplus.style.display = "none";
        forfsplus.style.display = "block";
    }
}

function allsumbit() {
    var formall = new FormData(document.getElementById("maininformation"));

    var title = document.getElementById("prjname").value.length;
    var company_a = document.getElementById("prjbelong").value.length;
    var contact_person = document.getElementById("prjcontact").value.length;
    var phone = document.getElementById("prjphone").value.length;
    var identify_id = document.getElementById("prjidentify").value.length;
    // var content_500 = document.getElementById("shortprjmain").value.length;
    var content = document.getElementById("shortprjverify").value.length;

    var fimg = document.getElementById("prjcover"); //获取整体file
    var isFile = fimg.value.length; //文件是否存在

    // console.log(typeFile);
    // if (isFile === 0) {
    //     alert("请上传作品");
    //     return;
    // }
    // if (!((typeFile === "jpg") || (typeFile === "JPG") || (typeFile === "JPEG") || (typeFile === "jpeg") || (typeFile === "raw") || (typeFile === "RAW"))) {
    //     alert("请上传jpg，jpeg或raw类型的作品");
    //     return;
    // }
    // if (countFile != 1) {
    //     alert("只可以上传一个作品文件");
    //     return;
    // }
    // if ((sizeFile < 2048) || (sizeFile > 20480)){
    //     alert("文件大小需在2M-20M");
    //     return;
    // }

    // return;

    if (title === 0) {
        alert("作品名称不可为空");
        return;
    }
    if (company_a === 0) {
        alert("请填写报送单位");
        return;
    }
    if (contact_person === 0) {
        alert("请填写联系人");
        return;
    }
    if (phone === 0) {
        alert("请填写联系方式");
        return;
    }
    if (identify_id === 0) {
        alert("请填写身份证号");
        return;
    }
    // if (content_500 === 0) {
    //     alert("请填写作品概要");
    //     return;
    // }
    if (content === 0) {
        alert("请填写作品简介");
        return;
    }

    /*-----------*/
    if (isFile === 0) {
        alert("请上传作品");
        return;
    }

    var typeFile = fimg.files[0].type.split("/")[1]; //文件类型JPG,JPEG,RAW
    var countFile = fimg.files.length; //文件数量只能为1
    var sizeFile = fimg.files[0].size / 1024; //文件大小

    if (!((typeFile === "jpg") || (typeFile === "JPG") || (typeFile === "JPEG") || (typeFile === "jpeg") || (typeFile === "raw") || (typeFile === "RAW"))) {
        alert("请上传jpg，jpeg或raw类型的作品");
        return;
    }
    if (countFile != 1) {
        alert("只可以上传一个作品文件");
        return;
    }
    if ((sizeFile < 2048) || (sizeFile > 20480)){
        alert("文件大小需在2M-20M");
        return;
    }
    ajax_postinfo(formall)
}

function ajax_postinfo(data) {

    $("#progress_m").css("display","block")
    $.ajax({
        type:"post",
        async: true,
        processData: false,
        contentType: false,
        url: 'https://server.foshanplus.com/hei_up',
        // url: 'http://172.16.20.17:8000/hei_up',
        data: data,
        xhr: function() {                        
            myXhr = $.ajaxSettings.xhr();
            if(myXhr.upload){ // check if upload property exists
                myXhr.upload.addEventListener('progress',function(e){                            
                    var loaded = e.loaded;                  //已经上传大小情况 
                    var total = e.total;                      //附件总大小 
                    var percent = Math.floor(100*loaded/total)+"%";     //已经上传的百分比  
                    // console.log("已经上传了："+percent);                 
                    $("#percent").html(percent);                                                     
                }, false); // for handling the progress of the upload
            }
            return myXhr;
        },
        success:function(receiver){
            // console.log(receiver);
            var success_id = receiver.data.id;
            // console.log(success_id);
            var strid = success_id.toString();
            // console.log(strid);
            var strid_md5 = strid.MD5().toLocaleUpperCase();

            $("#progress_m").css("display","none")

            $("#successcode").val(strid_md5);
            $("#code").css("display","block")
        },
        error: function(receiver){
            console.log(receiver);
            alert("提交失败，请稍后重试");
            return;
        }
    });
}

function clipToborad() {
    var target = document.getElementById("successcode");
    // console.log(target)
    target.select();
    document.execCommand("Copy");
    alert("已复制到剪切板，可粘贴。");
}

function clipToborad_pclink() {
    var target = document.getElementById("link_pc");
    // console.log(target)
    target.select();
    document.execCommand("Copy");
    alert("已复制到剪切板，可粘贴。");
}