$(function() {

//style for menu

    var $menuLink = $('.menu_link');
    $menuLink.eq(0).css('background-color', '#248cec');

    $menuLink.on('click', function() {
       $(this).css('background-color', '#248cec').parent('li').siblings().children('a').css('background-color', '#2a2d32');
    });

//owl-carousel

    $("#owl-demo").owlCarousel({
    navigation: false, // Show next and prev buttons
    slideSpeed : 1000,
    paginationSpeed : 1000,
    singleItem: true
    });

//accordeon

    $('.news_banner_link').on('click', function (e) {
        e.preventDefault();

        if($(this).hasClass('news_banner_link-hover')) {
            $(this).siblings('.news_banner_text').stop(true,true).slideUp();
            $(this).find('.news_banner_sign').text('+');
            $(this).removeClass('news_banner_link-hover');
        } else {
            $(this).addClass('news_banner_link-hover');
            $(this).siblings('.news_banner_text').stop(true,true).slideDown();
            $(this).find('.news_banner_sign').text('-');
        }
    });
})









