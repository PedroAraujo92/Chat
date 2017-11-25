var name = "";
function startChat(){
	name = document.getElementById('txtNome').value;

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		// 4 DONE | 200 OK
		if (this.readyState == 4 && this.status == 200) {
			var conteudo_chat = this.responseText;
			// document.getElementById('txtNome').value;
			// window.location.href="chat.html";
			// name = document.getElementById('txtNome');
			document.getElementById('container').innerHTML = conteudo_chat;
			document.getElementById('chat_user').innerHTML = name;
			getConnectedUsers();
			// var all_users = getConnectedUsers();
			// document.getElementById('users').innerHTML = "Usuários conectados: " + getConnectedUsers();//name;
		}

	}

	xhttp.open("GET", "chat.html", true);
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

			online_users += ' | ' + name;

			document.getElementById('users').innerHTML = "Usuários conectados: " + online_users;
			console.log(online_users);
		}
	}

	xhttp.open("GET", "http://www.angelito.com.br/webchat/users", true);
	xhttp.send();
}

/*function isConnectedUser(user_name){
	var xhttp = new XMLHttpRequest();
	// var user_name = "";
	xhttp.onreadystatechange = function(){
		// 4 DONE | 200 OK
		if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
			 console.log(this.responseText);
		}
	}

	xhttp.open("POST", "http://www.angelito.com.br/webchat/user?nickname=" + user_name);
	xhttp.send();
}*/