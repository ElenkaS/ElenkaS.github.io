var processTest = {};

$(function () {
    'use strict';
    //-----------template-------------

    var html = $('#test').html();
    var questions = [
        {
            text: 'Что такое шаблонизация?',
            answers: [
                {
                    answ_text: 'Это прием в веб дизайне',
                },
                {
                    answ_text: 'Это возможность сохранить данные в удобный формат',
                },
                {
                    answ_text: 'Это генерирование HTML на основании некоторых данных - “шаблона” ',
                    correct: true,
                },
                {
                    answ_text: 'Тоже правильный ответ ))))',
                    correct: true
                }
            ]
        },
        {
            text: 'Что такое шаблон?',
            answers: [
                {
                    answ_text: 'Текстовая строка, содержащая специальные параметры',
                    correct: true,
                },
                {
                    answ_text: 'Любая строка в HTML'
                },
                {
                    answ_text: 'Объект, который передается шаблонизатору'
                },
                {
                    answ_text: 'Генерируемый HTML код'
                }
            ]
        },
        {
            text: 'Каким образом шаблон помещается в HTML документ?',
            answers: [
                {
                    answ_text: 'Шаблон размещают в теге script с нестандартным атрибутом type',
                    correct: true
                },
                {
                    answ_text: 'Шаблон размещают в теге script'
                },
                {
                    answ_text: 'Шаблон размещают в HTML документе как есть, не оборачивая тегом'
                },
                {
                    answ_text: 'Шаблон размещают в любом теге'
                }
            ]
        },
        {
            text: 'Выберите шаблон, согласно которому нужно выполнить expr как javascript код:',
            answers: [
                {
                    answ_text: ' <%- expr %>'
                },
                {
                    answ_text: ' <%+ expr %>'
                },
                {
                    answ_text: '<%= expr %>'
                },
                {
                    answ_text: '<% expr %>',
                    correct: true
                }
            ]
        }
    ];

    var localTest = localStorage.setItem('test', JSON.stringify(questions));
    var receivedTest = JSON.parse(localStorage.getItem('test'));

    var questionslist = tmpl(html, {
        data: receivedTest
    });


    $('form button').before(questionslist);

    //----------------------------------------------------------------------------

    processTest = {
        correctAnswers: [],
        userAnswers: [],

        init: function () {
            this.correctAnswers = this.fillCorrectAnswers(receivedTest);
            this.setupEventListener()
        },

        fillCorrectAnswers: function (receivedTest) {
            var correctAnswers = [];
            for (var i = 0; i < receivedTest.length; i++) {
                for (var j = 0; j < receivedTest[i].answers.length; j++) {
                    if (receivedTest[i].answers[j].correct == true) {
                        correctAnswers.push('' + (i + 1) + '-' + (j + 1));
                    }
                }
            }
            return correctAnswers;
        },
        checkResult: function (checkedTags) {
            checkedTags.each(function () {
                processTest.userAnswers.push($(this).attr('name'));
            })

            processTest.userAnswers.sort();
            processTest.correctAnswers.sort();

            if (processTest.userAnswers.toString() == processTest.correctAnswers.toString()) {
                processTest.showModal('Congratulation!', 'ok');
            } else {
                processTest.showModal('Oops!', 'NO');
            }


            return false;
        },


        showModal: function (header, text, modal) {
            modal = modal || '.modal-window';
            $(modal + ' .header').text(header);
            $(modal + ' .body').text(text);
            $(modal).fadeIn();
        },

        closeModal: function () {
            $('.modal-window').hide()
        },

        disableButton: function () {
            var checkedCount = $('form input:checked').length;
            if (checkedCount)
                $('#result').removeAttr('disabled');
            else
                $('#result').attr('disabled', 'disabled');
        },

        setupEventListener: function () {
            $('#result').on('click', function(e){
                e.preventDefault();
                processTest.checkResult($('form input:checked'))
                processTest.userAnswers = [];
                return false;
            });

            $('#close').on('click', this.closeModal);

            $('form input').on('click', this.disableButton);
        }
    }

    processTest.init();

    try {
        module.exports = processTest;
    } catch (e) {
    }
})

