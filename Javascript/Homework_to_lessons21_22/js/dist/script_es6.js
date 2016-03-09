'use strict';

$(function () {
    'use strict';
    //-----------template-------------

    var html = $('#test').html();
    var questions = [{
        text: 'Что такое шаблонизация?',
        answers: [{
            answ_text: 'Это прием в веб дизайне'
        }, {
            answ_text: 'Это возможность сохранить данные в удобный формат'
        }, {
            answ_text: 'Это генерирование HTML на основании некоторых данных - “шаблона” ',
            correct: true
        }, {
            answ_text: 'Тоже правильный ответ ))))',
            correct: true
        }]
    }, {
        text: 'Что такое шаблон?',
        answers: [{
            answ_text: 'Текстовая строка, содержащая специальные параметры',
            correct: true
        }, {
            answ_text: 'Любая строка в HTML'
        }, {
            answ_text: 'Объект, который передается шаблонизатору'
        }, {
            answ_text: 'Генерируемый HTML код'
        }]
    }, {
        text: 'Каким образом шаблон помещается в HTML документ?',
        answers: [{
            answ_text: 'Шаблон размещают в теге script с нестандартным атрибутом type',
            correct: true
        }, {
            answ_text: 'Шаблон размещают в теге script'
        }, {
            answ_text: 'Шаблон размещают в HTML документе как есть, не оборачивая тегом'
        }, {
            answ_text: 'Шаблон размещают в любом теге'
        }]
    }, {
        text: 'Выберите шаблон, согласно которому нужно выполнить expr как javascript код:',
        answers: [{
            answ_text: ' <%- expr %>'
        }, {
            answ_text: ' <%+ expr %>'
        }, {
            answ_text: '<%= expr %>'
        }, {
            answ_text: '<% expr %>',
            correct: true
        }]
    }];

    var localTest = localStorage.setItem('test', JSON.stringify(questions));
    var receivedTest = JSON.parse(localStorage.getItem('test'));

    var questionslist = tmpl(html, {
        data: receivedTest
    });

    $('form button').before(questionslist);

    //----------------------------------------------------------------------------

    var processTest = {
        correctAnswers: [],
        userAnswers: [],

        init: function init() {
            this.fillCorrectAnswers();
            this.setupEventListener();
        },
        fillCorrectAnswers: function fillCorrectAnswers() {
            var ii = 0;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = receivedTest[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var i = _step.value;

                    ii++;
                    var jj = 0;
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = i.answers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var j = _step2.value;

                            jj++;
                            if (j.correct == true) {
                                this.correctAnswers.push(ii + '-' + jj);
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        },
        checkResult: function checkResult() {
            $('form input:checked').each(function (i, item) {
                return processTest.userAnswers.push($(item).attr('name'));
            });

            console.log(processTest.userAnswers, processTest.correctAnswers);
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
        showModal: function showModal(header, text) {
            var modal = arguments.length <= 2 || arguments[2] === undefined ? '.modal-window' : arguments[2];

            $(modal + ' .header').text(header);
            $(modal + ' .body').text(text);
            $(modal).fadeIn();
        },
        closeModal: function closeModal() {
            $('.modal-window').hide();
        },
        disableButton: function disableButton() {
            var checkedCount = $('form input:checked').length;
            if (checkedCount) $('#result').removeAttr('disabled');else $('#result').attr('disabled', 'disabled');
        },
        setupEventListener: function setupEventListener() {
            $('#result').on('click', processTest.checkResult);

            $('#close').on('click', this.closeModal);

            $('form input').on('click', this.disableButton);
        }
    };

    processTest.init();
});
