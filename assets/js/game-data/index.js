(function (main) {
    var that = {
        name: "game-data",
        url: 'page/game-data/index.html',
        toolbar: '.toolbar-game-data',
        view: app.views[name]
    };

    that.initEvent = function () {
        $$(document).on('click', that.toolbar, function () {
            that.view.loadPage({
                url: that.url,
                animatePages: false,
                reload: true
            });
        });

        $$(document).on('click', '[href="#game-data"]', function () {
            location.reload();
        });
    }

    that.init = function () {
        that.initEvent();
        main.startmarquee('game-consult', 1, 20, 10);
    };

    that.init();
})(app.main);