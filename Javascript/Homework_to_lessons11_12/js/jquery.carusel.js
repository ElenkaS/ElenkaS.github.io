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

})(jQuery);