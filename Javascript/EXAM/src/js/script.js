var images = [];
var words = [];
$(function () {
    $.support.cors = true;
//===========Carousel==================
    $('.jcarousel').jcarousel({
            wrap: 'circular'
        })

        .jcarouselAutoscroll({
            interval: 4000,
            target: '+=1',
            autostart: true
        });

    $('.jcarousel-control-prev')
        .on('jcarouselcontrol:active', function () {
            $(this).removeClass('inactive');
        })
        .on('jcarouselcontrol:inactive', function () {
            $(this).addClass('inactive');
        })
        .jcarouselControl({
            target: '-=1'
        });

    $('.jcarousel-control-next')
        .on('jcarouselcontrol:active', function () {
            $(this).removeClass('inactive');
        })
        .on('jcarouselcontrol:inactive', function () {
            $(this).addClass('inactive');
        })
        .jcarouselControl({
            target: '+=1'
        });

    //================AJAX==================//


    function url(query, amount, loadImagesImmediatly) {
        amount = amount || 1;
        $.ajax({
            type: "GET",
            dataType: "json",
            cache: false,
            url: 'http://api.pixplorer.co.uk/image?&amount=' + amount + '&size=10&word=' + query,
            crossDomain: true,
            success: function (data) {
                if (data.status == 'failed') {

                    for (i = 1; i <= (amount); i++) {
                        var rand = Math.floor((Math.random() * 10) + 1);
                        images.push('img/' + rand  + '.jpg');
                        words.push('no answer from server')
                    }
                }

                for (i = 0; i <= ((data.images.length - 1)); i++) {
                   // console.log('amount',amount);
                    //console.log('l',data.images.length);
                    images.push(data.images[i].imageurl);
                    words.push(data.images[i].word)
                }

                //console.log(images);

                if (loadImagesImmediatly) {
                    loadImage();
                }

            }

        })
    }

    function loadImage() {

        var picList = tmpl($('#list').html(), images, words);

        $('.ideas__image-wrapper').html('');
        $('.ideas__image-wrapper').append(picList);
        $('.ideas__image-wrapper').isotope({
            itemSelector: '.grid-item',
            layoutMode: 'fitRows',
            masonry: {
                gutter: 20
            }
        });
    }

    var query = '';

    for (i = 0; i < 7; i++) {
        url(query, 1, i === 6);
    }

    $('#search').click(function (e) {
       images = [];
        words = [];
        e.preventDefault();
        var query = encodeURIComponent($('#input_search').val());
        url(query, 7, true);
        return false;
    });

    $('.ideas__image-wrapper').on('click', '.ideas__text', function () {
        var bg = $(this).parent('.ideas__image').css('background-image');
        var $modalWindow = $('<div class="modal-window"/>');
        $modalWindow.css('background-image', bg);
        $modalWindow.css('background-image', bg).css('display', 'none');
        var $overlay = $('<div class="overlay"/>');
        $('body').prepend($overlay);
        $('.overlay').prepend($modalWindow);
        $modalWindow.fadeIn(1000);
    });

    $('body').on('click', '.overlay', function () {
        $('.overlay').hide();
        $('modal-window').fadeOut(200);
        $('.overlay').remove();
        $('modal-window').remove();
        $('header').css("background-size", "cover");

    });

})