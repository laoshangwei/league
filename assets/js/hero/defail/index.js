(function (params, main) {
    var that = {};
    that.page = 'defail';

    that.initEvent = function () {
        app.onPageInit(that.page, function (page) {

        });
    }

    that.init = function () {
        that.initEvent();
    }

    that.init();
})(app.hero.params, app.hero.main);