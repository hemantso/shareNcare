(function($) {
  "use strict"

  // Mobile Nav button toggle
  $('.navbar-toggle-btn').on('click', function() {
    $('.navbar-menu').toggleClass('navbar-menu-active');
  });

  // Mobile Search button toggle
  $('.search-toggle-btn').on('click', function() {
    $('.navbar-search').toggleClass('navbar-search-active');
  });

  // Mobile dropdown
  $('.navbar-menu .has-dropdown > a').on('click', function(e) {
    e.preventDefault();
    $(this).parent().toggleClass('dropdown-active');
  });

  // Home Owl
  $('#home-owl').owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    margin: 0,
    nav: true,
    dots: true,
    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>']
  });

  // Testimonial Owl
  $('#testimonial-owl').owlCarousel({
    loop: true,
    margin: 15,
    dots: true,
    nav: false,
    autoplay: true,
    responsive: {
      0: {
        items: 1
      },
      992: {
        items: 2
      }
    }
  });

	// Parallax Background
	$.stellar({
		responsive: true
	});


})(jQuery);
