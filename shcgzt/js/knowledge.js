$(document).ready(function(){
    getquestions();
});

function getquestions() {
    var num = newsitem.total;
    var str = "";
    var icon1 = '<svg width="20px" height="20px" viewBox="0 0 16 16" class="bi bi-question-square-fill" fill="#c81700" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm4.57 6.033H5.25C5.22 4.147 6.68 3.5 8.006 3.5c1.397 0 2.673.73 2.673 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.355H7.117l-.007-.463c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.901 0-1.358.603-1.358 1.384zm1.251 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927z"/></svg>&nbsp;<strong><big>'
    var icon2 = '</big></strong><br/><svg width="20px" height="20px" viewBox="0 0 16 16" class="bi bi-check-square-fill" fill="#048e1b" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>&nbsp;'
    for (var i = 0; i < num; i++) {
        var line = '<li class="list-group-item" style="text-align: justify;">' + icon1 + (i+1) + '.' + newsitem.info[0].question[i] + icon2 + newsitem.info[0].key[i] + '</li>'
        str += line;
    }
    $("#quesitoncontent").html(str);
}