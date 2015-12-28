window.onload = function(){	
	var hours_block = document.getElementById('hours');
	var minutes_block = document.getElementById('minutes');
	var seconds_block = document.getElementById('seconds');
	var miliseconds_block = document.getElementById('miliseconds');

	var button_start = document.getElementById('button_start');
	var button_reset = document.getElementById('button_reset');

	function init() {
		hours = 0;
		minutes = 0;
		seconds = 0;
		miliseconds = 0;
		zero = new Date(0,0);

		miliseconds_block.innerHTML = zeroFill(miliseconds, 3);
		seconds_block.innerHTML = zeroFill(seconds, 2);
		minutes_block.innerHTML = zeroFill(minutes, 2);
		hours_block.innerHTML = zeroFill(hours, 2);

		button_start.innerHTML = 'start';
		button_start.style.backgroundColor = '#3c9eff';
		button_reset.style.backgroundColor = '#f0ad4e';
		button_reset.style.display = 'none';
	}

	function zeroFill(n, width, z) {
		  z = z || '0';
		  n = n + '';
		  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
	}

	function setMiliseconds() {
		zero.setMilliseconds( zero.getMilliseconds() + 4);
		miliseconds = zero.getMilliseconds();

		miliseconds++;
		if(miliseconds >= 996) {
			miliseconds = 0;
			setSeconds();
		}
		miliseconds_block.innerHTML = zeroFill(miliseconds, 3);
	}

	function setSeconds() {
		seconds++;
		if(seconds >= 60) {
			seconds = 0;
			setMinutes();
		}
		seconds_block.innerHTML = zeroFill(seconds, 2);
	}

	function setMinutes() {
		minutes++;
		if(minutes >= 60) {
			minutes = 0;
			setHours();
		}
		minutes_block.innerHTML = zeroFill(minutes, 2);
	}

	function setHours() {
		hours++;
		hours_block.innerHTML = zeroFill(hours, 2);;
	}

	function start() {
		button_start.innerHTML = 'Pause';
		button_start.removeEventListener('click', start);
		button_start.addEventListener('click', pause);
		timerId = setInterval(setMiliseconds, 1);
		button_start.style.backgroundColor = '#C9302C';
		button_reset.style.display = 'inline';
	}

	function reset() {
		clearInterval(timerId);
		init();
		button_start.removeEventListener('click', pause);
		button_start.addEventListener('click', start);
	}

	function pause(){
		button_start.innerHTML = 'Continue';
		button_start.removeEventListener('click', pause);
		button_start.addEventListener('click', start);
		clearInterval(timerId);
		button_start.style.backgroundColor = '#398439';
	}

	//=======================================================
	button_start.addEventListener('click', start);
	button_reset.addEventListener('click', reset);

	init();
}