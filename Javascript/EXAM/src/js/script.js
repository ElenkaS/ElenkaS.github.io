
$(function() {
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
            crossDomain: true,

            success: function(data) {
                for (i = 0; i <= (data.images.length - 1); i++) {
                   url1 = data.images[i].imageurl;
                    $('.grid-item').eq(i).css("background-image", "url('"+decodeURI(url1)+"')");
                    $('.ideas__text').eq(i).text(data.images[i].word);
                }

                $('.grid').isotope({
                    itemSelector: '.grid-item',
                    layoutMode: 'fitRows',
                    masonry: {
                        gutter: 20
                    }
                });
                //console.log(data);
                if(data.status == 'failed') {
                  //  console.log("no answer from server");
                    urlDefault = ['img/1.jpg', 'img/2.jpg', 'img/3.jpg', 'img/4.jpg', 'img/5.jpg', 'img/6.jpg', 'img/7.jpg'];
                    for (i = 0; i <= 6; i++) {
                        url1 = urlDefault[i];
                        $('.grid-item').eq(i).css("background-image", "url('"+decodeURI(url1)+"')");
                        $('.ideas__text').eq(i).text('no answer from server');
                    }
                }
            },
        });
    }

    $('#search').click(function(e) {

        e.preventDefault();
        var query = encodeURIComponent($('#input_search').val());
        renderList(query);
        return false;

    });

    renderList('');

    $('.ideas__text').on('click', function() {

        var bg = $(this).parent('.ideas__image').css('background-image');
        var $modalWindow = $('<div class="modal-window"/>');
        $modalWindow.css('background-image', bg);
        $modalWindow.css('background-image', bg).css('display', 'none');
        var $overlay = $('<div class="overlay"/>');
        $('body').prepend($overlay);
        $('.overlay').prepend($modalWindow);
        $modalWindow.fadeIn(1000);
    });

    $('body').on('click', '.overlay', function() {
        $('.overlay').hide();
        $('modal-window').fadeOut(200);
        $('.overlay').remove();
        $('modal-window').remove();



        $('header').css( "background-size", "cover" );

    });

    /////////////////////////////////

    ////////////////////////////
  /*  function loadXMLDoc(query, cb) {


        var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

        //var xhr = new XHR();

        var url = 'http://api.pixplorer.co.uk/image?word=' + query + '&amount=7&size=m';

       // var xmlhttp = new XMLHttpRequest();

         var xmlhttp = new XHR();

        /*
         try {
         xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
         } catch (e) {
         try {
         xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
         } catch (E) {
         xmlhttp = false;
         }
         }
         */
      /*  if (xmlhttp === false) {
            console.log('not set xmlhttp')
            return;
        }

        /*xmlhttp.onreadystatechange = function () {

            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var data = JSON.parse(xmlhttp.responseText);
                console.log(data)
                for (i = 0; i <= (data.images.length - 1); i++) {
                    url1 = data.images[i].imageurl;
                    $('.grid-item').eq(i).css("background-image", "url('" + decodeURI(url1) + "')");
                    $('.ideas_text').eq(i).text(data.images[i].word);
                }
                console.log('start')
                $('.grid').isotope({
                    itemSelector: '.grid-item',
                    layoutMode: 'fitRows',
                    masonry: {
                        gutter: 20
                    }
                });
                console.log('end')
            }
        }*/



       /* xmlhttp.onload = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var data = JSON.parse(xmlhttp.responseText);
                console.log(data)
                for (i = 0; i <= (data.images.length - 1); i++) {
                    url1 = data.images[i].imageurl;
                    $('.grid-item').eq(i).css("background-image", "url('" + decodeURI(url1) + "')");
                    $('.ideas_text').eq(i).text(data.images[i].word);
                }
                console.log('start')
                $('.grid').isotope({
                    itemSelector: '.grid-item',
                    layoutMode: 'fitRows',
                    masonry: {
                        gutter: 20
                    }
                });
                console.log('end')
            }
        }

        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }


  /*  function loadXMLDoc() {
        try {
            loadXMLDoc()
        } catch (e) {
            alert("В этом браузере данная фича не поддерживается.")
        }
    }*/
















/*
    $('#search').click(function (event) {
        event.preventDefault();
        var query = $('#input_search').val();

       // $('.grid').remove();

        loadXMLDoc(query);

    });*/

   // var query = '';
    //loadXMLDoc(query);

})