/*Функция для возведения в степеью Результат выводится в консоль*/
var x = +prompt('Введите основание степеня');
var n = +prompt('Введите показатель степеня');

function pow(x, n) {
	if (n >= 0) {
		var result = 1;
		for ( var i = 0; i < n; i++) {
			result *=x;
		}
	} else {
		var result = 1;
			n = n * (-1);
		for ( var i = 0; i < n; i++) {
			result = 1/(result * x);
		}
	} 
		
	return result;
}
console.log(pow(x, n));


/*Массив с именами пользователей*/

var arr = [];

for ( var i = 0; i < 5; i++) {
	arr[i] = prompt('Введите имя пользователя №'+(+i+1));
}

var userName = prompt('Введите имя');

for (var i = 0; i < arr.length; i++) {
	if (userName===arr[i]) {
		var flag = true;
		break;
	} 
}

if (flag) {
	alert(userName + ', вы успешно вошли');
}	else {
		alert('Ошибка входа');
	}