$(function() {

  $(window).scroll(function() {
    if ($(this).scrollTop() > $(this).height()) {
      $('.top').addClass('active');
    } else {
      $('.top').removeClass('active');
    }
  });
  $('.top').click(function(){
    $('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
  });


  $(function() {
		var selectedClass = "";
		$(".fil-cat").click(function(){
		selectedClass = $(this).attr("data-rel");
     $(".col-12").fadeTo(100, 0.1);
		$(".col-12 > div").not("."+selectedClass).fadeOut().removeClass('scale-anm');
    setTimeout(function() {
      $("."+selectedClass).fadeIn().addClass('scale-anm');
      $(".col-12").fadeTo(300, 1);
    }, 300);

	});
});


});

$(window).on('load', function() {
  $('.preloader').delay(1000).fadeOut('slow');
});
