(function () {

    $.fn.carousel = function (options) {
        var el = $(this);
        var leftButton = el.find('.carousel-arrow-left');
        var rightButton =el.find('.carousel-arrow-right');
        var elementList = el.find('.carusel-list');
        var hider = el.find('.carusel-hider');

        var defaults = { // Настройки по умолчанию для конфигурируемого плагина
            imageWidth: 100, // ширина изображения
            imagesCount: 2, // количество изображений
            showTitle: true, // показывать подпись под изображением
            autoScroll: false, // автозапуск
            autoScrollInterval: 1000 // скорость анимации автозапуска
        };


        var settings = $.extend(defaults, options);


        el.find('.carusel-element img').attr('width', settings.imageWidth+'px');

        var slidesWidth = settings.imageWidth + 20;//  10px -margin slide

        var slidesCount = settings.imagesCount;

        el.css('width', (slidesWidth * slidesCount) + 180 + 'px'); // 180px - 2 buttons width
        hider.css('width', slidesWidth * slidesCount + 'px');

        var hiderHeight = hider.height();
        leftButton.css('margin-top', hiderHeight * 0.5 - 24); // 48px button's height
        rightButton.css('margin-top', hiderHeight * 0.5 - 24);

        //---------------------------------------------------------

        if (!settings.showTitle) {
            elementList.find('p').hide();
        }
        //------------------------------------------------------------

        var pixelsOffset = slidesWidth;
        var currentLeftValue = 0;

        var elementsCount = elementList.find('li').length;
        var minimumOffset = -((elementsCount - slidesCount) * pixelsOffset);
        var maximumOffset = 0;

        var rbId = false;
        var lbId = false;

        function rightButtonAuto() {
            rbId = setInterval(function () { // автопрокрутка
                rightButton.click()
            }, settings.autoScrollInterval);

        }

        function leftButtonAuto() {
            lbId = setInterval(function () { // автопрокрутка
                leftButton.click()
            }, settings.autoScrollInterval);

        }


        leftButton.click(function () {
            if (currentLeftValue != maximumOffset) {

                currentLeftValue += slidesWidth;
                elementList.animate({left: currentLeftValue + "px"}, 500);
                rightButton.css('visibility', 'visible');
            } else {

                if (settings.autoScroll) {
                    clearInterval(lbId);
                    rightButtonAuto();
                }
            }
            if (currentLeftValue == 0) {
                leftButton.css('visibility', 'none');
            }
        })

        rightButton.click(function () {
            if (currentLeftValue != minimumOffset) {
                currentLeftValue -= slidesWidth;
                elementList.animate({left: currentLeftValue + "px"}, 500);


                leftButton.css('visibility', 'visible');
            } else {

                if (settings.autoScroll) {
                    clearInterval(rbId);
                    leftButtonAuto();
                }
            }
            if(currentLeftValue == minimumOffset) {
                rightButton.css('visibility', 'hidden');
            }
        })

        if (currentLeftValue == maximumOffset) {
            leftButton.css('visibility', 'hidden');
        }

        if (settings.autoScroll) {
            leftButton.hide();
            rightButton.hide();
            rightButtonAuto();
        }
        return this;
    }

})(jQuery);;$(function () {
    $('.carusel').carousel({
        imageWidth: 500,
        imagesCount: 2,
        showTitle: true,
        autoScroll: false,
        autoScrollInterval: 2000
    });

    //-----------shabloniz

    var html = $('#product-list').html();
    var products = [
        {
            name: 'Тюльпаны',
            price: '320',
            imgLink: 'img/t1.jpg',
            href: 'index.html'
        },
        {
            name: 'Снежинки!',
            price: '250',
            imgLink: 'img/t2.jpg',
            href: '#'
        },
        {
            name: 'Стрелы амура',
            price: '320',
            imgLink: 'img/t3.jpg',
            href: '#'
        },
        {
            name: 'Парад бабочек',
            price: '320',
            imgLink: 'img/t4.jpg',
            href: '#'
        },
        {
            name: 'Красные розы',
            price: '320',
            imgLink: 'img/t5.jpg',
            href: '#'
        },
        {
            name: 'Гамбургер',
            price: '320',
            imgLink: 'img/t6.jpg',
            href: '#'
        },
        {
            name: 'Новый год',
            price: '320',
            imgLink: 'img/t7.jpg',
            href: '#'
        },
        {
            name: 'Сердце',
            price: '320',
            imgLink: 'img/t8.jpg',
            href: '#'
        }
    ];

    var content = tmpl(html, {
        data: products
    });

    $('.product').append(content);

    //---------------------------
    var html = $('#product-list-cupcake').html();
    var productsCupcake = [
        {
            name: 'Кекс творожный',
            price: '20',
            imgLink: 'img/c1.jpg',
            href: '#'
        },
        {
            name: 'Кекс с изюмом',
            price: '25',
            imgLink: 'img/c2.jpg',
            href: '#'
        },
        {
            name: 'Кекс со сгущенкой',
            price: '10',
            imgLink: 'img/c3.jpg',
            href: '#'
        },
        {
            name: 'Кекс с вишней',
            price: '10',
            imgLink: 'img/c4.jpg',
            href: '#'
        }
    ];

//------------------------------------------------
    var contentCupcake = tmpl(html, {
        data: productsCupcake
    });

    $('.product').append(contentCupcake);

    $('.cupcake').hide();

    $('#cake').on('click', function () {
        $('.cupcake').hide();
        $('.cake').show();
    });

    $('#cupcake').on('click', function () {
        $('.cupcake').show();
        $('.cake').hide();
    })

});;// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
(function(){
    var cache = {};

    this.tmpl = function tmpl(str, data){
        // Figure out if we're getting a template, or if we need to
        // load the template - and be sure to cache the result.
        var fn = !/\W/.test(str) ?
            cache[str] = cache[str] ||
                tmpl(document.getElementById(str).innerHTML) :

            // Generate a reusable function that will serve as a template
            // generator (and which will be cached).
            new Function("obj",
                "var p=[],print=function(){p.push.apply(p,arguments);};" +

                    // Introduce the data as local variables using with(){}
                "with(obj){p.push('" +

                    // Convert the template into pure JavaScript
                str
                    .replace(/[\r\t\n]/g, " ")
                    .split("<%").join("\t")
                    .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                    .replace(/\t=(.*?)%>/g, "',$1,'")
                    .split("\t").join("');")
                    .split("%>").join("p.push('")
                    .split("\r").join("\\'")
                + "');}return p.join('');");

        // Provide some basic currying to the user
        return data ? fn( data ) : fn;
    };
})();