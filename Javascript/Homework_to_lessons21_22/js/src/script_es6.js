$(() => {
    'use strict';
    //-----------template-------------

    let html = $('#test').html();
    let questions = [
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

    let localTest = localStorage.setItem('test', JSON.stringify(questions));
    let receivedTest = JSON.parse(localStorage.getItem('test'));

    let questionslist = tmpl(html, {
        data: receivedTest
    });

    $('form button').before(questionslist);

    //----------------------------------------------------------------------------

    let processTest = {
        correctAnswers: [],
        userAnswers: [],

        init() {
            this.fillCorrectAnswers();
            this.setupEventListener()
        },

        fillCorrectAnswers() {
            let ii = 0;
            for (let i of receivedTest) {
                ii++;
                let jj = 0;
                for (let j of i.answers) {
                    jj++;
                    if (j.correct == true) {
                        this.correctAnswers.push(`${ii}-${jj}`);
                    }
                }
            }
        },
        checkResult() {
            $('form input:checked').each((i, item) => {
                return processTest.userAnswers.push($(item).attr('name'))
            });

            console.log(processTest.userAnswers, processTest.correctAnswers)
            processTest.userAnswers.sort();
            processTest.correctAnswers.sort();

            if (processTest.userAnswers.toString() == processTest.correctAnswers.toString()) {
                processTest.showModal('Congratulation!', 'ok');
            } else {
                processTest.showModal('Oops!', 'NO');
            }
            processTest.userAnswers = [];
            return false;
        },

        showModal(header, text, modal = '.modal-window') {
            $(modal + ' .header').text(header);
            $(modal + ' .body').text(text);
            $(modal).fadeIn();
        },

        closeModal() {
            $('.modal-window').hide()
        },

        disableButton() {
            let checkedCount = $('form input:checked').length;
            if (checkedCount)
                $('#result').removeAttr('disabled');
            else
                $('#result').attr('disabled', 'disabled');
        },

        setupEventListener() {
            $('#result').on('click', processTest.checkResult);

            $('#close').on('click', this.closeModal);

            $('form input').on('click', this.disableButton);
        }
    }

    processTest.init();

})

