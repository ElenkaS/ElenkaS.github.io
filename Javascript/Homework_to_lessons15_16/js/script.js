$(function () {

    function ajaxToGoogle(e) {
        var start = $(this).data('start') || 0
        var $search_input = $('#search');
        var search_text = $search_input.val();
        var key = 'ABQIAAAACKQaiZJrS0bhr9YARgDqUxQBCBLUIYB7IF2WaNrkYqF0tBovNBQFDtM_KNtb3xQxWff2mI5hipc3lg';
        var url = 'http://ajax.googleapis.com/ajax/services/search/web?start=' + start + '&v=1.0&key=' + key + '&q=' + search_text + '&rsz=8&callback=GoogleCallback&context=?';

        $.getJSON(url,
            function (data) {
                var ul = document.createElement("ul");
                $.each(data.results, function (i, val) {
                    var $li = $('<li>');
                    var li = document.createElement("li");
                    li.innerHTML = '<a href="' + val.url + '" title="' + val.url + '" target="_blank">' + val.title + "</a> - " + '<p class="visibleUrl">' + val.visibleUrl + '</p>' + '<p>' + val.content + '</p>';
                    ul.appendChild(li);

                });
                ul.classList.add('list');
                $('.wrapper .results').html(ul);
                $('li').addClass('item');
                $('li').children('a').addClass('link');

                if (data.cursor.pages.length > 1) {

                    var pageBlock = document.createElement('div');
                    pageBlock.classList.add('page-block');
                    resultsBlock = document.getElementsByClassName('results');


                    for (i = 0; i < data.cursor.pages.length; i++) {
                        var pageNumber = document.createElement("span");
                        var pageLink = document.createElement("a");
                        pageLink.innerHTML = i + 1;
                        pageLink.setAttribute('data-start', data.cursor.pages[i].start);
                        pageLink.setAttribute('href', '#');
                        pageLink.classList.add('page-link');
                        pageNumber.appendChild(pageLink);
                        pageBlock.appendChild(pageNumber);

                        if (data.cursor.currentPageIndex == i) {
                           pageLink.classList.add('active');
                        }
                    }
                    resultsBlock[0].appendChild(pageBlock);
                }
                $('.page-link').on('click', ajaxToGoogle);
            });

        return false
    }

    $('button').parent().on('submit', ajaxToGoogle);

});

function GoogleCallback(func, data) {
    window[func](data);
};
//-----------------------------------------------------------------------------------------------------------------

    var Human = {
        name: 'Adam',
        age: 30,
        sex: 'male',
        height: '175',
        weight: 85
    };

    var Worker = {
        job: 'programmer',
        money: 2500,
        workHard: function() {
            console.log("Let's make code");
        }
    };

    var Student = {
        college: 'Cooking school',
        grant: 50,
        TVseries: function () {
            console.log("Let's watch 'The Big Bang Theory'")
        }
    };

    Object.setPrototypeOf(Worker, Human);
    Object.setPrototypeOf(Student, Human);

    var Jack = Object.create(Worker);
    Jack.name = 'Jack';
    Jack.age = 30;

    var Bob = Object.create(Student);
    Bob.name = 'Bob';
    Bob.age = 20;

    console.log('Jack:', Jack.name, Jack.age, Jack.sex, Jack.height, Jack.weight, Jack.job, Jack.money, Jack.workHard());
    console.log('Bob:', Bob.name, Bob.age, Bob.sex, Bob.height, Bob.weight, Bob.college, Bob.grant, Bob.TVseries());









