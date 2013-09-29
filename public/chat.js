window.onload = function() {
	var messages = [];
	var socket = io.connect('http://192.168.0.4:3700');
	var field = document.getElementById("field");
	var sendButton = document.getElementById("send");
	var content = document.getElementById("content");
	var name = document.getElementById("name");

	socket.on('message', function(data) {
		if(data.message) {
			messages.push(data);
			var html = '';
			for(var i=0; i<messages.length; i++) {
				var name = 'Server';
				if(messages[i].username){ name = messages[i].username; }
				html += '<b>' + name + ': </b>';
				html += messages[i].message + '<br />';
			}
			content.innerHTML = html;
			content.scrollTop = content.scrollHeight;
		}else{
			console.log("There is a problem:", data);
		}
	});

	sendButton.onclick = function() {
		if(name.value == "") {
			alert("Please type your name!");
		}else{
			var text = field.value;
			socket.emit('send', {
				message: text,
				username: name.value
			});
			field.value = "";
		}
	}
}
