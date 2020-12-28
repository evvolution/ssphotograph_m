
document.ready(function(){
    ajax_forpics();
});

function ajax_forpics() {
    var xhr=new XMLHttpRequest();
    xhr.open('GET','https://server.foshanplus.com/exam/get_vote/?exam_id=34&by_random=0',false);
    xhr.onreadystatechange=function(){
        // readyState == 4
        if(xhr.readyState==4){
            if(xhr.status==200 || xhr.status==304){
                // console.log(xhr.responseText);
                var piclistx = JSON.parse(xhr.responseText)['projects'][0];
                // console.log(piclistx[0].length);
                console.log(piclistx);
                var picnum = piclistx.length;
                var picstr = "";
                for (var i = 0; i < picnum; i++) {
                    let line1 = '';
                    let line2 = '';
                    line1 = '<div class="p4item"><a href="videopage.html?id=' + piclistx[i].id + '">';
                    line2 = '<img src="' + piclistx[i].pic_url + '?imageView2/1/w/367/h/203/interlace/1/q/70" /></a><p>' + piclistx[i].title + '</p></div>';
                    picstr += (line1 + line2);
                }
                var pics = document.getElementById("p4videos");
                pics.innerHTML = picstr;
                
            }else {
                alert('system error+' + xhr.readyState);
                return;
            }
        }
    }
    xhr.send();
}