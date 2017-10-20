(function (main, params, hero) {
    var that = {
        name: "data",
        url: 'page/game-data/index.html',
        toolbar: '.toolbar-data',
        view: app.views["data"]
    };

    that.getHeroListContent = function (heroInfo) {
        var html = '';
        for (var hero in heroInfo) {
            hero = heroInfo[hero];
            hero = hero.data ? hero.data : hero;
            var temp = app.templates.get('hero').trim();
            var url = `assets/img/game-data/hero/${hero.image.full}`;
            html += temp.format(hero.id, hero.tags.join('-'), '', url, hero.name);
        }
        return html;
    }

    that.getHeroScript = function (name, callback) {
        var scriptUrl = `assets/js/game-data/hero-info/${name}.js`;
        main.loadScript(scriptUrl);
    }

    that.getHeroSkin = function (heroInfo) {
        var activeHero = 'Aatrox';
        var heroData = hero.data[activeHero].data;
        var nickName = heroData.skins[0].name === 'default' ? '默认皮肤' : heroData.skins[0].name;
        var temp = app.templates.get('swiper');
        var skinContent = '';
        var types = '';

        heroData.skins.forEach(item => {
            var temp = app.templates.get('skin');
            var url = `assets/img/game-data/hero-skin/${activeHero}/big${item.id}.jpg`;
            skinContent += temp.format(url).trim();
        });

        heroData.tags.forEach(type => types += `<span>${params.heroType[type]}</span>`);

        return temp.format(heroData.id, skinContent, nickName, heroData.title, types, heroData.info.attack, heroData.info.defense, heroData.info.difficulty, heroData.info.magic);
    }

    that.formatData = function (heroInfo) {
        $$('.swiper').html(that.getHeroSkin(heroInfo));
        app.initSwiper('.swiper-Aatrox');
        $$('.hero-list').html(that.getHeroListContent(heroInfo));

    }

    that.initLoadChamption = function (data) {
        if (data) that.formatData(data);
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

    app.onPageInit(that.name, function (page) {
        that.initLoadChamption(hero.data);
    });

    that.init = function () {
        that.initEvent();
        that.getHeroScript('Aatrox');
    };

    that.init();
})(app.main, app.hero.params, app.hero.params.hero);