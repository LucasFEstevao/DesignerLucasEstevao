const master = new class Master {
    constructor () {
        $(document).on('click', '.js-start-particles', e => this.initParticles(e));    
    }
    
    initParticles (e) {
        const $btn = $(e.currentTarget);
        const $particles = $('.particles-js-canvas-el');
        
        if ( $particles.length === 1 ) {
            $btn.removeClass('active')
            $particles.remove();
        } else {
            $btn.addClass('active');
            particlesJS.load('js-body', 'dist/lib/particles/particles.json', function() {
                console.log('callback - particles.js config loaded');
            });
        }
    }
}();