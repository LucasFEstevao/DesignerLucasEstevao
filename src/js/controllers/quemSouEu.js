const quemSouEu = new class QuemSouEu {
    constructor() {}

    init() {
        routers.addHeader('quemSouEu');
        this.initTilt();
        this.initAos();
    }

    initTilt() {
        VanillaTilt.init($('.js-tilt-0')[0], {
            speed: 400
        });

        VanillaTilt.init($('.js-tilt-1')[0], {
            speed: 400
        });

    }

    initAos() {
        AOS.init({
            offset: 500,
            duration: 2000,
            easing: 'ease-in-out',
        });
    }
}();