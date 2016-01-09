var test = {
	body: '',
	createTag: function(params) {
		/*
		params: {
			tagName: '', 
			className: '',
			content: '',
			target: '',
			inputType: ''
		}
*/
		if (params.tagName == '') {
			alert('Not set tagName!');
			return;
		}

		if (params.tagName == 'textNode') {
			return this.createTextNode(params.content, params.target);
		}

		var element = document.createElement(params.tagName);
		if (params.className) {
			element.setAttribute('class', params.className);
		}
		if (params.content) {
			element.innerHTML = params.content;
		}
		
		if (params.inputType){
      		element.setAttribute('type', params.inputType);
		}
		var target = params.target;
		if (!target) {
			target = this.body;
		} 
		target.appendChild(element);

		return element;
	},
	createTextNode: function (text, target) {
		if (!text) {
			alert ('Not set text for text node');
			return;
		}
		var elem = document.createTextNode(text);
		target.appendChild(elem);

		return elem;
	},
	createOneAnswersBlock: function(params) {
		/*
		params: {
					answersCount: '',
					answerText: '',
					target: ''
				 }
		*/
		for (var i = 1; i <= params.answersCount; i++) {
			var div = this.createTag({
				tagName: 'div', 
				className: 'label_custom checkbox',
				target: params.target
			})
			var label = this.createTag({
				tagName: 'label',
				//content: '<input type="checkbox"/>'+params.answerText+i,
				target: div,
			})
			var checkbox = this.createTag({
				tagName: 'input',
				target: label,
				inputType: 'checkbox'
			})
			var label_text = this.createTag({
				tagName: 'textNode',
				target: label,
				content: params.answerText+i
			})
			label.insertBefore(checkbox, label_text);
			
		};	
	},
	createAnketa: function(params){
		/*
		params: {
					questionCount: '', 
					questionText: '',
					answersCount: '',
					answerText: '',
					target: ''
				}
		*/
		for (var i = 1; i <= params.questionCount; i++) {
			this.createTag({
				tagName: 'h3', 
				className: 'label_custom',
				content: i + '. ' + params.questionText + i,
				target: params.target
			})
			this.createOneAnswersBlock({
				answersCount: params.answersCount,
				answerText: params.answerText,
				target: params.target
			 })
		}
	}
}

//=====================================начало программы=============================

test.body = document.getElementsByTagName('body')[0];
test.createTag({
	tagName: 'h2', 
	className: 'text-center',
	content: 'Тест по программированию'
});

var form = test.createTag({tagName: 'form'});
test.createAnketa({
	questionCount: 3, 
	questionText: 'Вопрос №',
	answersCount: 3,
	answerText: 'Вариант ответа №',
	target: form
});

test.createTag({
	tagName: 'button', 
	className: 'btn btn-primary center-block',
	content: 'Проверить мои результаты',
	target: form
})
