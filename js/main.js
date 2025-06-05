(function ($) {
	"use strict";
	var nav = $('nav');
	var navHeight = nav.outerHeight();
	
	// Modern navbar functionality
	$('.navbar-toggler').on('click', function() {
		if (!$('#mainNav').hasClass('navbar-reduce')) {
			$('#mainNav').addClass('navbar-reduce');
		}
	});

	// Smooth scrolling for navigation links
	$('a.js-scroll[href*="#"]:not([href="#"])').on("click", function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: (target.offset().top - navHeight + 5)
				}, 1000, "easeInOutExpo");
				return false;
			}
		}
	});

	// Close responsive menu when a scroll trigger link is clicked
	$('.js-scroll').on("click", function () {
		$('.navbar-collapse').collapse('hide');
	});

	// Activate scrollspy to add active class to navbar items on scroll
	$('body').scrollspy({
		target: '#mainNav',
		offset: navHeight
	});

	// Modern navbar scroll behavior
	$(window).trigger('scroll');
	$(window).on('scroll', function () {
		var pixels = 50;
		if ($(window).scrollTop() > pixels) {
			$('.navbar-expand-md').addClass('navbar-reduce');
		} else {
			$('.navbar-expand-md').removeClass('navbar-reduce');
		}
	});

	// Modern counter animation
	$('.counter').counterUp({
		delay: 15,
		time: 2000,
		formatter: function (n) {
			return n.replace(/,/g, '.');
		}
	});

	// Smooth animations for skill progress bars
	$(window).on('scroll', function() {
		$('.skill-progress-bar').each(function() {
			var elementTop = $(this).offset().top;
			var elementBottom = elementTop + $(this).outerHeight();
			var viewportTop = $(window).scrollTop();
			var viewportBottom = viewportTop + $(window).height();
			
			if (elementBottom > viewportTop && elementTop < viewportBottom) {
				$(this).addClass('animate');
			}
		});
	});

	// Add smooth hover effects
	$('.card-modern, .project-card, .btn-modern, .btn-outline-modern').hover(
		function() {
			$(this).addClass('hover-effect');
		},
		function() {
			$(this).removeClass('hover-effect');
		}
	);

	// Preloader
	$(window).on('load', function () {
		if ($('#preloader').length) {
			$('#preloader').delay(100).fadeOut('slow', function () {
				$(this).remove();
			});
		}
	});

	// Back to top button
	$(window).scroll(function() {
		if ($(this).scrollTop() > 100) {
			$('.back-to-top').fadeIn('slow');
		} else {
			$('.back-to-top').fadeOut('slow');
		}
	});
	$('.back-to-top').click(function(){
		$('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
		return false;
	});

	/*--/ Star ScrollTop /--*/
	$('.scrolltop-mf').on("click", function () {
		$('html, body').animate({
			scrollTop: 0
		}, 1000);
	});

	/*--/ Star Testimonials owl /--*/
	$('#testimonial-mf').owlCarousel({
		margin: 20,
		autoplay: true,
		autoplayTimeout: 4000,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1,
			}
		}
	});

})(jQuery);
