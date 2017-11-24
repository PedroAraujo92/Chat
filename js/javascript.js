function startChat(){
	var name = document.getElementById('txtNome').value;
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
			document.getElementById('users').innerHTML = "Usuários conectados: " + name;
		}

	}

	xhttp.open("GET", "chat.html", true);
	xhttp.send();
}