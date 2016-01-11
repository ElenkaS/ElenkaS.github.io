window.onload = function(){	
	var hoursBlock = document.getElementById('hours');
	var minutesBlock = document.getElementById('minutes');
	var secondsBlock = document.getElementById('seconds');
	var milisecondsBlock = document.getElementById('miliseconds');

	var buttonStart = document.getElementById('button-start');
	var buttonReset = document.getElementById('button-reset');

	var zero = new Date(0,0);

	var timer = {
		miliseconds: 0,
		seconds: 0,
		minutes: 0,
		hours: 0,
		timerId: null,

		init: function () {
			this.miliseconds = 0;
			this.seconds = 0;
			this.minutes = 0;
			this.hours = 0;
			milisecondsBlock.innerHTML = timer.setters.zeroFill(timer.miliseconds, 3);
			secondsBlock.innerHTML = timer.setters.zeroFill(timer.seconds, 2);
			minutesBlock.innerHTML = timer.setters.zeroFill(timer.minutes, 2);
			hoursBlock.innerHTML = timer.setters.zeroFill(timer.hours, 2);

			buttonStart.innerHTML = 'start';
			buttonStart.style.backgroundColor = '#3c9eff';
			buttonReset.style.backgroundColor = '#f0ad4e';
			buttonReset.style.display = 'none';

			buttonStart.addEventListener('click', timer.manage.start);
			buttonReset.addEventListener('click', timer.manage.reset);
		},
		setters: {
			zeroFill: function (number, width, fillChar) {
				fillChar = fillChar || '0';
				number = number + '';
				return number.length >= width ? number : new Array(width - number.length + 1).join(fillChar) + number;
			},
			setMiliseconds: function () {
				zero.setMilliseconds(zero.getMilliseconds() + 4);
				timer.miliseconds = zero.getMilliseconds();

				timer.miliseconds++;
				if(timer.miliseconds >= 996) {
					timer.miliseconds = 0;
					timer.setters.setSeconds();
				}
				milisecondsBlock.innerHTML = timer.setters.zeroFill(timer.miliseconds, 3);
			},
			setSeconds: function () {
				timer.seconds++;
				if(timer.seconds >= 60) {
					timer.seconds = 0;
					timer.setters.setMinutes();
				}
				secondsBlock.innerHTML = timer.setters.zeroFill(timer.seconds, 2);
			},
			setMinutes: function () {
				timer.minutes++;
				if(timer.minutes >= 60) {
					timer.minutes = 0;
					timer.setters.setHours();
				}
				minutesBlock.innerHTML = timer.setters.zeroFill(timer.minutes, 2);
			},
			setHours: function () {
				timer.hours++;
				hoursBlock.innerHTML = timer.setters.zeroFill(timer.hours, 2);
			}
		},
		manage: {
			start: function () {
				buttonStart.innerHTML = 'Pause';
				buttonStart.removeEventListener('click', timer.manage.start);
				buttonStart.addEventListener('click', timer.manage.pause);
				timer.timerId = setInterval(timer.setters.setMiliseconds, 1);

				buttonStart.style.backgroundColor = '#C9302C';
				buttonReset.style.display = 'inline';
			},
			reset: function () {
				clearInterval(timer.timerId);
				timer.init();

				buttonStart.removeEventListener('click', timer.manage.pause);
				buttonStart.addEventListener('click', timer.manage.start);
			},
			pause: function (){
				buttonStart.innerHTML = 'Continue';
				buttonStart.removeEventListener('click', timer.manage.pause);
				buttonStart.addEventListener('click', timer.manage.start);
				clearInterval(timer.timerId);
				buttonStart.style.backgroundColor = '#398439';
			}
		}
	}
	
	//=======================================================
	timer.init();
}