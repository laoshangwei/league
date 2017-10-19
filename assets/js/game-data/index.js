(function (main, hero) {
    var that = {
        name: "data",
        url: 'page/game-data/index.html',
        toolbar: '.toolbar-data',
        view: app.views["data"]
    };

    that.formatData = function (heroInfo) {
        var temp = app.templates.get('hero');
        var [heroId, hrefs, imgUrl] = [heroInfo.id, "hero-info.html?id=", "assets/img/game-data/hero/" + heroInfo.image.full];
    }

    that.initLoadChamption = function (data, firstLoad) {
        if (firstLoad && data) data.forEach(item => that.formatData(item));
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
        // that.initLoadChamption(hero.data, firstLoad = true);
    };

    that.init();
})(app.main, app.data.hero);