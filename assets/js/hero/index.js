(function (params, main) {
    var that = {
        name: "hero",
        url: 'page/hero/index.html',
        toolbar: '.toolbar-hero',
        view: app.views["hero"]
    };

    that.getHeroListContent = function (heroKeys) {
        var html = '';
        for (var i in heroKeys) {
            var hero = params.defailData[heroKeys[i]];
            hero = hero.data ? hero.data : hero;
            var temp = app.templates.get('hero').trim();
            var url = `assets/img/hero/photo/${hero.image.full}`;
            html += temp.format(hero.id, hero.tags.join('-'), '', url, hero.name);
        }
        return html;
    }

    that.getHeroScript = function (name, callback) {
        var scriptUrl = `assets/js/hero/defail/${name}.js`;
        app.main.loadScript(scriptUrl);
    }

    that.getHeroSkin = function (heroInfo) {
        var activeHero = 'Aatrox';
        var heroData = params.defailData[activeHero].data;
        var nickName = heroData.skins[0].name === 'default' ? '默认皮肤' : heroData.skins[0].name;
        var temp = app.templates.get('swiper');
        var skinContent = '';
        var types = '';

        heroData.skins.forEach(item => {
            var temp = app.templates.get('skin');
            var url = `assets/img/hero/skin/${activeHero}/big${item.id}.jpg`;
            skinContent += temp.format(url).trim();
        });

        heroData.tags.forEach(type => types += `<span>${params.heroType[type]}</span>`);

        return temp.format(heroData.id, skinContent, nickName, heroData.title, types, heroData.info.attack, heroData.info.defense, heroData.info.difficulty, heroData.info.magic);
    }

    that.formatData = function (heroInfo) {
        $$('.swiper').html(that.getHeroSkin(heroInfo));
        app.initSwiper('.swiper-Aatrox');
        $$('.hero-list').html(that.getHeroListContent(params.fullKeys));

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

        $$(document).on('click', '.link-home', function () {
            window.location.reload();
        });
    }

    app.onPageInit(that.name, function (page) {
        that.initLoadChamption(params.defailData);
    });

    that.init = function () {
        that.initEvent();
        that.getHeroScript('Aatrox');
    };

    that.init();
})(app.hero.params, app.hero.main);