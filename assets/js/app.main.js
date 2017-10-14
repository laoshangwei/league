app.main = (() => {
    var that = {};

    that.startmarquee = function (elemId, lh, speed, delay) {
        var t;
        var oHeight = 300;
        var p = false;
        var o = document.getElementById(elemId);
        var preTop = 0;
        o.scrollTop = 0;
        function start() {
            t = setInterval(scrolling, speed);
            o.scrollTop += 1;
        }
        function scrolling() {
            if (o.scrollTop % lh != 0 && o.scrollTop % (o.scrollHeight - oHeight - 1) != 0) {
                preTop = o.scrollTop;
                o.scrollTop += 1;
                if (preTop >= o.scrollHeight || preTop == o.scrollTop) {
                    o.scrollTop = 0;
                }
            } else {
                clearInterval(t);
                setTimeout(start, delay);
            }
        }
        setTimeout(start, delay);
    }
    return that;
})();