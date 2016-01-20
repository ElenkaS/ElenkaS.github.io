
//==========Checkbox==========================

function changeCheck(el) {

    var el = el,

        input = el.find("input").eq(0);

    if(!input.attr("checked")) {
        el.css("background-position","0 -16px");
        input.attr("checked", true);
    } else {
        el.css("background-position","0 0");
        input.attr("checked", false)
    }
    return true;
}

function changeCheckStart(el)
{
    var el = el,
        input = el.find("input").eq(0);
    if(input.attr("checked")) {
        el.css("background-position","0 -16px");
    }
    return true;

}

$(function(){

//===========Menu==================

    $('.menu li').hover(
        function() {

            $(this).children('.submenu').stop(true, true).fadeIn(500);

            $(this).animate({
                backgroundColor: '#A52A2A'
            },300);

            $(this).children('a').addClass('link-hover');

            $(this).children('.arrow').addClass('arrow-hover')
        },

        function() {

            $(this).children('.submenu').stop(true, true).fadeOut(50);

            $(this).animate({
                backgroundColor: '#FFF'
            },50);

            $(this).children('a').removeClass('link-hover');

            $(this).children('.arrow').removeClass('arrow-hover')
        }
    );

    $('.menu li').each( function() {

        if ($(this).find('ul').length) {
            $(this).children('a').after($('<div></div>').addClass('arrow'));
        }

    });

//===========Carousel==================

    $('.jcarousel').jcarousel({
        wrap:'circular'
    });
    $('.jcarousel-control-prev').click(function() {
        $('.jcarousel').jcarousel('scroll', '-=1');
    });

    $('.jcarousel-control-next').click(function() {
        $('.jcarousel').jcarousel('scroll', '+=1');
    });

    $('.jcarousel-pagination')
        .on('jcarouselpagination:active', 'a', function() {
            $(this).addClass('active');
        })
        .on('jcarouselpagination:inactive', 'a', function() {
            $(this).removeClass('active');
        })
        .jcarouselPagination();

//================Cusel=================================

    var params = {
        changedEl: "#idSelect",
        visRows: 5,
        scrollArrows: true
}
    cuSel(params);

    //==========Checkbox==========================

    $('.niceCheck').parent('label').on('click', function() {

        changeCheck($(this).children('.niceCheck'))
    });


    $(".niceCheck").each(function() {

        changeCheckStart($(this))
    });

//========Animation for '.local-wrapp' ==================

    $('.local-wrapp').hover(

        function() {
            $(this).addClass('local-wrapp-animated')
        },

        function() {
            $(this).removeClass('local-wrapp-animated')
        }

    )
});
