(function (main) {
    var that = {
        name: "data",
        url: 'page/game-data/index.html',
        toolbar: '.toolbar-data',
        view: app.views["data"]
    };

    that.initEvent = function () {
        $$(document).on('click', that.toolbar, function () {
            that.view.loadPage({
                url: that.url,
                animatePages: false,
                reload: true
            });
        });


    }

    that.init = function () {
        that.initEvent();
    };

    that.init();
})(app.main);