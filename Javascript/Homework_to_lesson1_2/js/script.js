/*Функция для возведения в степень Результат выводится в консоль*/
var x = +prompt('Введите основание степеня');
var n = +prompt('Введите показатель степеня');

if (Number.isInteger(x) && Number.isInteger(n)){
	console.log(pow(x, n));
} else {
	console.log('Enter only integer numbers')
}


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


/*Массив с именами пользователей*/

var arr = [];

for (var i = 0; i < 5; i++) {
	var name =  prompt('Введите имя пользователя №'+(i+1));
	if (name)
		arr[i] = name;
}

if (arr.length > 0) {
	var userName = prompt('Введите свое имя');
	if (userName) {
		var flag = false;
		for (var i = 0; i < arr.length; i++) {
			if (userName===arr[i]) {
				flag = true;
				break;
			} 
		}

		if (flag) {
			alert(userName + ', вы успешно вошли');
		}	else {
			alert('Ошибка входа');
		}
	} else {
		alert('Вы не ввели своего имени');
	}

	
} else {
	alert('Вы не ввели ни одного имени');

}

