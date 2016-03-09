jasmine.getFixtures().fixturesPath = '.';

describe("fillCorrectAnswers_METHOD", function () {
    loadFixtures('index_for_tests.html');
    it("CorrectAnswers_not to be undefine", function () {
        'use strict';
        var receivedTest1 = [
            {
                text: 'question #1 text',
                answers: [
                    {
                        answ_text: 'Answer1-1',
                        correct: true,
                    },
                    {
                        answ_text: 'Answer1-2',
                    }
                ]
            },
            {
                text: 'question #2 text',
                answers: [
                    {
                        answ_text: 'Answer2-1',
                    },
                    {
                        answ_text: 'Answer2-2',
                        correct: true,

                    },
                ]
            },
        ];

        var result = processTest.fillCorrectAnswers(receivedTest1);
        console.log(result);
        expect(result).not.toBeUndefined();
        expect(result[0]).toEqual('1-1');
        expect(result[1]).toEqual('2-2');



    });
});

describe("userAnswers_METHOD", function () {
    it("userAnswers_not to be undefine", function () {
        var answ = [];

        answ.push(('<input type="checkbox" name="1-1" id="">'));
        answ.push(('<input type="checkbox" name="2-2" id="">'));

        processTest.checkResult($(answ));
        expect(processTest.userAnswers).not.toBeUndefined();
        expect(processTest.userAnswers[0]).toEqual('1-1');
        expect(processTest.userAnswers[1]).toEqual('2-2');
    });
});
