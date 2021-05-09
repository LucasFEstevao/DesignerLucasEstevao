const routers = new class Router {
	constructor () {
		$(window).on('hashchange', e => this.loadPage());
		this.init();
	}

	init () {
		this.loadPage();
	}

	allRoutes () {
		return [
		    {id: '', url: 'src/html/pages/home.html'},
		    {id: 'quemSouEu', url: 'src/html/pages/quemSouEu.html'},
		    {id: 'portifolio', url: 'src/html/pages/portifolio.html'},
		    {id: 'contato', url: 'src/html/pages/contato.html'},
		];
	}

	getPage (pageCode) {
		if (window.innerWidth <= 991) {
			$('.js-menu').click()
		}

		let page = this.allRoutes().find( e => e.id == pageCode );

		if (!page) {
			window.location = '/';
		}

		return page;
	}

	loadPage () {
        const hashPage = location.hash.replace(/[#\/]/g, '');
		const page = this.getPage(hashPage);

		this.addComponents($('.js-content-body'), page);
	}

	addHeader (id) {
        const headerConfig = {id, url:'src/html/components/header.html'};
        const $header = $('.js-content-header');

        routers.addComponents($header, headerConfig);
    }

	addComponents ($place, page) {
		loader.init();

		setTimeout(() => {
			$.ajax({
				url: page.url,
				type: 'GET',
			})
			.done(function(data) {
				$place.html(data);

				if ( page.id != '' ) {
					const $btn = $('.js-start-particles');
					const $particles = $('.particles-js-canvas-el');

					$(`.js-header .js-link`).removeClass('active');
					$(`.js-header .js-link[href="#${page.id}"]`).addClass('active');

					if ( $particles.length === 1 ) {
						$btn.addClass('active');
					} else {
						$btn.removeClass('active');
					}
				}
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				loader.close();
			});
		}, 500);
	}
}();