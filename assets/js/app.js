var $$ = Dom7;
var app = new Framework7({
    //Material Theme (Material theme only)
    pushState: true,
    swipePanel: 'left',
    meterialRipple: true,
    materialRippleElements: '.ripple, a.link, a.item-link, .button, .modal-button, .tab-link, .label-radio, .label-checkbox, .actions-modal-button, a.searchbar-clear, .floating-button',
    cache: true,
    activeState: true,
    activeStateElements: 'a, button, label, span',
    onAjaxStart: () => app.showIndicator(),
    obAjaxComplete: () => app.hideIndicator()
});

(function () {
    app.alert = window.alert = (text, title, callbackOk) => {
        if (typeof title === 'function') {
            callbackOk = arguments[1],
                title = undefined;
        }
        return app.modal({
            cssClass: 'modal-alter',
            text: text || '',
            title: typeof title === 'indefined' ? app.params.modalTitle : title,
            buttons: [{
                text: app.params.modalButtonOk,
                bold: true,
                onClick: callbackOk
            }]
        });
    };

    app.confirm = window.confirm = (text, title, callbackOk, callbackCancel) => {
        if (typeof title === 'function') {
            callbackCancel = arguments[2];
            callbackOk = arguments[1];
            title = undefined;
        }
        return app.modal({
            cssClass: 'modal-confirm',
            text: text || '',
            title: typeof title === 'undefined' ? app.params.modalTitle : title,
            buttion: [{
                text: text,
                onClick: callbackCancel
            },
            {
                text: text,
                bold: true,
                onClick: callbackOk
            }]
        });
    }

    app.notify = (message, callback, title) => {
        app.addNotification({
            title: title || '',
            message: message + '',
            onClose: callback
        });
    }

    app.templates.get = function (name) {
        var id = 'temp-' + name;
        return this[id] || app.templates.set(id, $$('#' + id).html());
    };
    app.templates.set = function (name, value) {
        var temp = this[name] = value;
        return temp;
    };

    app.timer = Object.create(Object.prototype, {
        'clear': {
            enumerable: false,
            value: () => Object.values(app.timer).forEach(id => clearInterval(id))
        }
    });

    app.initView = () => {
        var views = app.api ? ['data'] : ['home', 'data'];
        if (app.api) {
            $$('#view-home').removeClass('view-main active');
            $$('#view-data').addClass('view-main active');
        } else {
            app.addView('#view-home', {
                dynamicNavbar: true,
                swipeBackPage: true,
            });
        }
        app.addView('#view-data', {
            dynamicNavbar: true,
            swipeBackPage: true,
            domCache: true,
            preroute: function (view, options) {
                app.params.templatepages = false;
                return true;
            }
        });
        views.forEach((item, i) => {
            app.views[views[i]] = app.views[i];
        });
    };

    app.initHome = () => {
        app.mainView.loadPage({
            url: 'home.html',
            animatePages: false,
            reload: app.api
        });
    }


    app.initSwiper = (swiperName, direction, speed, autoplay, watchSlidesVisibility, height) => {
        app.swiperOption = {
            direction: direction || 'horizontal',
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoplayDisableOnInteraction: false,
            speed: speed || 600,
            autoplay: autoplay || 3000,
            watchSlidesVisibility: watchSlidesVisibility || false,
            height: height || '',
            loop: true,
        };
        app.swiper(swiperName, app.swiperOption);
    };
    app.initEvent = () => {

        $$(document).on('ajaxStart', e => {
            var xhr = e.detail.xhr;
        });

        $$(document).on('ajaxComplete', e => {
            app.hideIndicator();
            app.pullToRefreshDone();
        });

        $$('#view-main .view').on('show', e => {
            var isViewData = this.id === 'view-data';
            app.mainView - isViewData ? app.views.data : app.views.home;
            app.params.swipePanel = isViewData ? '' : 'right';
        });

        $$(document).on('pageInit', e => {
            var page = e.detail.page;
            if (page.view !== undefined) {
                var view = $$(page.view.selector);
                view.find('.toolbar a').removeClass('active');
                view.find('.toolbar a.toolbar-' + page.view.activePage.name).addClass('active');
            }

            if (page.name === 'main') app.initSwiper();
        });

        $$(document).on('pageAfterBack', e => {
            var page = e.detail.page;
            var view = $$(page.view.selector);
            view.find('.toolbar a').removeClass('active');
            view.find('.toolbar a.toolbar-' + page.view.activePage.name).addClass('active');
        });
    }

    app.initSwiper('.swiper-container');
    app.initSwiper('.swiper-consult', 'vertical', '600', '2000', true, 220);
    app.initView();
    app.initHome();
    app.initEvent();
})();

$$.postJSON = (url, data, success, error) => {
    return $$.ajax({
        url: url,
        method: 'POST',
        contentType: 'application/json;charset-UTF-8',
        data: JSON.stringify(data),
        dataType: 'json',
        success: success,
        error: error
    });
}

