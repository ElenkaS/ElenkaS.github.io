$(function(){

	var $tabButtons = $('.tab-items');
	var $tabContents = $('.tab-text');


	function switchTab(e) {
		e.preventDefault();
		var index = $(this).index();
		$tabContents.eq(index).show().siblings().hide();
		$(this).addClass('tab-items-active').siblings().removeClass('tab-items-active');
	}

    $tabButtons.on('click', switchTab);

    $tabButtons.hover(
        function() {
            if (!$(this).hasClass('tab-items-active')) {
                $(this).addClass('tab-item-hover');
            } else {
                $(this).find('a').css('cursor', 'default');
            }
        },
        function() {
            $(this).removeClass('tab-item-hover')
        });

    $tabButtons.eq(0).addClass('tab-items-active');

	$tabContents.eq(0).show().siblings().hide();


	$('[title]').hover(
		function() {
			var width = $(this).width();
			var position = $(this).position();
			var title = $(this).attr('title');
			$(this).removeAttr('title').data('title', title);

			var $toolTip = $('<div></div>')
				.text(title)
				.addClass('tooltip');

			if($(this).attr('title-position') == 'top') {
				$toolTip
					.css('top', (position.top - 50) + 'px')
					.css('width', width)
					.css('left', position.left + 'px');
			} else {
				$toolTip.css('left', (width + position.left + 10) + 'px');
			}

			$(this).parent().append($toolTip);
			$toolTip.animate({opacity: 1}, 'slow');
		},
		function() {
			$('.tooltip').animate({opacity: 0}, 'fast').remove();
			$(this).attr('title', $(this).data('title'));
		}
	);


    $('#clear').on('click', function() {
        $(this).parents('form').find('input[type="text"]').val('');
    })


    $('.tab-button').hover(
        function() {
            $(this).css('backgroundColor', '#CCB9A4')
        },
        function() {
            $(this).css('backgroundColor', '#f0f0f0')
        }
    )
})





