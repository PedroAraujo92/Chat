var name = "";
function startChat(){
	name = document.getElementById('txtNome').value;

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		// 4 DONE | 200 OK
		if (this.readyState == 4 && this.status == 200) {
			var conteudo_chat = this.responseText;
			document.getElementById('container').innerHTML = conteudo_chat;
			connectUser();
		}

	}

	xhttp.open("GET", "chat.html", true);
	xhttp.send();
}

function connectUser(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		// 4 DONE | 200 OK
		if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
			if (this.responseText == "OK") {
				getConnectedUsers();
				loadWebChat();
				setInterval(loadWebChat, 3000);
				setInterval(getConnectedUsers, 5000);
			} else {
				alert(this.responseText);
			}

			 document.getElementById('chat_user').innerHTML = name;
		}
	}

	xhttp.open("POST", "http://www.angelito.com.br/webchat/user?nickname=" + name);
	xhttp.send();
}

function getConnectedUsers(){
	var online_users = "";
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		// 4 DONE | 200 OK
		if (this.readyState == 4 && this.status == 200) {
			var json = JSON.parse(this.responseText);

			for(var i = 0; i < json.length; i++) {
				online_users += json[i] + ' | ';
			}

			document.getElementById('users').innerHTML = "Usuários conectados: " + online_users;
		}
	}

	xhttp.open("GET", "http://www.angelito.com.br/webchat/users", true);
	xhttp.send();
}

function loadWebChat(){
	var messages = "";
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		// 4 DONE | 200 OK
		if (this.readyState == 4 && this.status == 200) {
			var json = JSON.parse(this.responseText);

			for(var i = 0; i < json.length; i++) {
				var item = json[i];
				if (item.user == name) {
					messages += '<div class="content right"><span class="user"><span class="date">['+item.datetime+']</span> Você diz:</span><span class="message">'+item.textmsg+'</span></div>';
				} else {
					messages += '<div class="content left"><span class="user"><span class="date">['+item.datetime+']</span> '+item.user+' diz:</span><span class="message">'+item.textmsg+'</span></div>';
				}
			}

			document.getElementById("message").innerHTML = messages;
		}
	}

	xhttp.open("GET", "http://www.angelito.com.br/webchat/messages?nickname=" + name, true);
	xhttp.send();
}

function sendMessage(){
	var message = document.getElementById('txtMessage').value;
	document.getElementById('txtMessage').value = "";
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200){
			if(this.responseText == "OK"){
				loadWebChat();
				setTimeout(scrolldown, 100);
			}else{
				alert(this.responseText);
			}
		}
	}

	xhttp.open("POST", "http://www.angelito.com.br/webchat/send?nickname=" + name + '&textmsg=' + message, true);
	xhttp.send();
}

function scrolldown(){
	window.scrollTo(0, document.body.scrollHeight + 30);
}