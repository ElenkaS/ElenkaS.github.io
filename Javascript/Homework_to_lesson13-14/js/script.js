$(function () {

    'use strict';

    //-----------enter data to template-------------
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

//-------------sent data test to localStorage-------------
    var localTest = localStorage.setItem( 'test', JSON.stringify( questions ));
    var receivedTest = JSON.parse(localStorage.getItem('test'));
//-------------------------------------------------------------
    var questionslist = tmpl(html, {
        data: receivedTest
    });
//--------------append data template---------------------------

    $('form button').before(questionslist);

//--------------------------------------------------------------
    var processTest = {
        correctAnswers: [],
        userAnswers: [],

        init: function() {
            this.fillCorrectAnswers();
            this.setupEventListener()
        },

        fillCorrectAnswers: function() {
            for (var i = 0; i < questions.length; i++) {
                for (var j = 0; j < questions[i].answers.length; j++) {
                    if (questions[i].answers[j].correct == true) {
                        this.correctAnswers.push(''+(i+1)+'-'+(j+1));
                    }
                }
            }
        },
        checkResult: function() {

            $('form input:checked').each( function() {
                processTest.userAnswers.push($(this).attr('name'));
            })

            processTest.userAnswers.sort();
            processTest.correctAnswers.sort();

            if (processTest.userAnswers.toString() == processTest.correctAnswers.toString()) {
                processTest.showModal('Поздравляю!', 'Тест успешно пройден');
            } else {
                processTest.showModal('Oops!', 'Тест пройден с ошибками ((((');
            }
            processTest.userAnswers = [];
            return false;
        },

        showModal: function(header, text, modal) {
            modal = modal || '.modal-window';
            $(modal + ' .header').text(header);
            $(modal + ' .body').text(text);
            $(modal).fadeIn();
        },

        closeModal:function() {
            $('.modal-window').hide()
        },

        disableButton: function() {
            var checkedCount = $('form input:checked').length;
            if (checkedCount)
                $('#result').removeAttr('disabled');
            else
                $('#result').attr('disabled', 'disabled');
        },

        setupEventListener: function() {
            $('#result').on('click', this.checkResult);

            $('#close').on('click', this.closeModal);

            $('form input').on('click', this.disableButton);
        }
    }

    processTest.init();
    })
