var ready;
ready = function() {
	$('#menu_btn').click(function() {
		$('nav').toggleClass('hide');

		if(!$('nav').hasClass('hide')) {
			$('#nav_control i').attr('class', 'fa fa-times');
		} else {
			$('#nav_control i').attr('class', 'fa fa-bars');
		}
	});
};

$(document).ready(ready);
$(document).on('page:load', ready);