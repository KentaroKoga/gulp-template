var pressed = [];
var secretCode = 'unicorn';

window.addEventListener('keyup', function(e) {
	console.log(e.key);
	pressed.push(e.key);
	pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);

	if(pressed.join('').includes(secretCode)) {
		console.log('heeeeeeeeeeellllllllloooooooo');
		cornify_add();
	}

console.log(pressed);
});