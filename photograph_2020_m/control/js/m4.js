
document.ready(function(){
    ajax_forpics();
});

function ajax_forpics() {
    var xhr=new XMLHttpRequest();
    xhr.open('GET','https://server.foshanplus.com/exam/get_vote/?exam_id=37',false);
    xhr.onreadystatechange=function(){
        // readyState == 4
        if(xhr.readyState==4){
            if(xhr.status==200 || xhr.status==304){
                // console.log(xhr.responseText);
                var piclistx = JSON.parse(xhr.responseText)['projects'];
                // console.log(piclistx[0].length);
                // console.log(piclistx[0]);
                var picnum = piclistx[0].length;
                var picstr = "";
                for (var i = 0; i < picnum; i++) {
                    let line1 = '';
                    let line2 = '';
                    line1 = '<div class="piclist_item"><a target="_blank" href="' + piclistx[0][i].url + '"><img src="' + piclistx[0][i].pic_url + '"/></a>';
                    line2 = '<div class="imgtitle">' + piclistx[0][i].title + '</div><div class="imgauthor">' + piclistx[0][i].item_id + '</div></div>';
                    picstr += (line1 + line2);
                }
                var pics = document.getElementById("pic_m")
                pics.innerHTML = picstr;
                
            }else {
                alert('system error+' + xhr.readyState);
                return;
            }
        }
    }
    xhr.send();
}
