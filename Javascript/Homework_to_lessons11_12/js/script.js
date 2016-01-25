$(function () {
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

});