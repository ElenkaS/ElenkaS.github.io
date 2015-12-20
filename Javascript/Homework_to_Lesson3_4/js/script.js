var test = {
	createTag: function(tagName, className, content, target, inputType) {
		var element = document.createElement(tagName);
		if (className) {
			element.setAttribute('class', className);
		}
		if (content) {
			element.innerHTML = content;
		}
		
		if (inputType){
      		element.setAttribute('type', inputType);
		}

		if (!target) {
			target = document.querySelector('body');
		} 
		target.appendChild(element);

		return element;
	}
}

test.createTag('h2', 'text-center', 'Тест по программированию');
var form = test.createTag('form', '', '');

test.createTag('h3', 'offset50', '1. Вопрос №1', form);
for (var i = 1; i <= 3; i++) {
	div = test.createTag('div', 'offset50 checkbox', '', form);
	label = test.createTag('label', '', '<input type="checkbox"/>Вариант ответа №'+i, div);
	//test.createTag('input', '', '', label, 'checkbox');
};

test.createTag('h3', 'offset50', '2. Вопрос №2', form);
for (var i = 1; i <= 3; i++) {
	div = test.createTag('div', 'offset50 checkbox', '', form);
	label = test.createTag('label', '', '<input type="checkbox"/>Вариант ответа №'+i, div);
	//test.createTag('input', '', '', label, 'checkbox');
};

test.createTag('h3', 'offset50', '3. Вопрос №3', form);
for (var i = 1; i <= 3; i++) {
	div = test.createTag('div', 'offset50 checkbox', '', form);
	label = test.createTag('label', '', '<input type="checkbox"/>Вариант ответа №'+i, div);
	//test.createTag('input', '', '', label, 'checkbox');
};

test.createTag('button', 'btn btn-primary center-block', 'Проверить мои результаты', form);
