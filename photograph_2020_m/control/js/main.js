
(function () {
    var ie = !!(window.attachEvent && !window.opera);
    var wk = /webkit\/(\d+)/i.test(navigator.userAgent) && (RegExp.$1 < 525);
    var fn = [];
    var run = function () { for (var i = 0; i < fn.length; i++) fn[i](); };
    var d = document;
    d.ready = function (f) {
        if (!ie && !wk && d.addEventListener)
        return d.addEventListener('DOMContentLoaded', f, false);
        if (fn.push(f) > 1) return;
        if (ie)
            (function () {
            try { d.documentElement.doScroll('left'); run(); }
            catch (err) { setTimeout(arguments.callee, 0); }
        })();
        else if (wk)
        var t = setInterval(function () {
            if (/^(loaded|complete)$/.test(d.readyState))
            clearInterval(t), run();
        }, 0);
    };
})();

function m_bak() {
    window.location.href="index.html"
}

function m1switch() {
    // window.location.href="action.html"
    alert("本次大赛征集已经结束");
    return;
}

function m2switch() {
    // window.location.href="check.html"
    window.location.href="http://h5.kyhdmedia.com/ky/2006flowercc/getUserInfo.php"
}

function m3switch() {
    window.location.href="news.html"
}

function m4switch() {
    window.location.href="show.html"
}