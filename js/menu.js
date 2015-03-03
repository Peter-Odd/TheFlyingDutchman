function home() {
	document.getElementById('content').src = "vip_content.html";
}

function help() {
	document.getElementById('content').src = "vip_help.html";
}

function settings() {
	document.getElementById('content').src = "admin_settings.html";
}

function logout() {
    self.location="logout.php";
}

function about() {
	document.getElementById('content').src = "vip_about.html";
}

function bartender() {
	document.getElementById('content').src = "bartender_content.html";
}

function swedish() {
	alert("Swedish");
}

function english() {
	alert("English");
}
