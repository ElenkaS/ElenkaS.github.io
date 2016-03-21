
$(function() {
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
        .on('jcarouselcontrol:active', function() {
            $(this).removeClass('inactive');
        })
        .on('jcarouselcontrol:inactive', function() {
            $(this).addClass('inactive');
        })
        .jcarouselControl({
            target: '-=1'
        });

    $('.jcarousel-control-next')
        .on('jcarouselcontrol:active', function() {
            $(this).removeClass('inactive');
        })
        .on('jcarouselcontrol:inactive', function() {
            $(this).addClass('inactive');
        })
        .jcarouselControl({
            target: '+=1'
        });

    //================AJAX==================//

    function renderList(queryPic) {

        $.ajax({
            type: "GET",
            dataType: "json",
            cache: false,
            url: 'http://api.pixplorer.co.uk/image?word=' + queryPic + '&amount=7&size=m',

            success: function(data) {
                for (i = 0; i <= (data.images.length - 1); i++) {
                   url1 = data.images[i].imageurl;
                    $('.grid-item').eq(i).css("background-image", "url('"+decodeURI(url1)+"')");
                    $('.ideas_text').eq(i).text(data.images[i].word);
                }

                $('.grid').masonry({
                    itemSelector: '.grid-item', // указываем элемент-контейнер в котором расположены блоки для динамической верстки
                    columnWidth: '.gutter-sizer', // указываем класс элемента являющегося блоком в нашей сетке
                    isResizable: true, // перестраивает блоки при изменении размеров окна
                    singleMode: false, // true - если у вас все блоки одинаковой ширины
                    isAnimated: true, // анимируем перестроение блоков
                    animationOptions: { // опции анимации - очередь и продолжительность анимации
                        queue: false,
                        duration: 700
                    }
                });
            }
        });
    }

    $('#search').click(function(e) {

        e.preventDefault();
        var query = encodeURIComponent($('#input_search').val());
        renderList(query);
        return false;

    });

    renderList('');
})