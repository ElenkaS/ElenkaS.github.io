$(function() {

//style for menu

    var $menuLink = $('.menu__link');
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

    $('.banner__link').on('click', function (e) {
        e.preventDefault();

        if($(this).hasClass('banner__link_hover')) {
            $(this).siblings('.banner__text').stop(true,true).slideUp();
            $(this).find('.banner__sign').text('+');
            $(this).removeClass('banner__link_hover');
        } else {
            $(this).addClass('banner__link_hover');
            $(this).siblings('.banner__text').stop(true,true).slideDown();
            $(this).find('.banner__sign').text('-');
        }
    });
})









