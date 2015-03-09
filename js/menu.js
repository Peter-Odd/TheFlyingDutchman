function home() {
    var s = readCookie('credentials');
    if(s == 0){
        document.getElementById('content').src = "bartender_content.html";
    }
    else if (s==3){
        document.getElementById('content').src = "vip_content.html";
    }
    //document.getElementById('content').src = "vip_content.html";
}

function help() {
    var s = readCookie('credentials');
    if(s == 0){
        document.getElementById('content').src = "admin_help.html";
    }
    else if (s==3){
        document.getElementById('content').src = "vip_help.html";
    }
    //document.getElementById('content').src = "vip_help.html";
}

function settings() {
    var s = readCookie('credentials');
    if(s == 0){
        document.getElementById('content').src = "admin_settings.html";
    }
    else if (s==3){
        document.getElementById('content').src = "vip_settings.html";
    }
    //document.getElementById('content').src = "admin_settings.html";
}

function logout() {
    self.location="logout.php";
}

function about() {
    var s = readCookie('credentials');
    if(s == 0){
        document.getElementById('content').src = "admin_about.html";
    }
    else if (s==3){
        document.getElementById('content').src = "vip_about.html";
    }
    //document.getElementById('content').src = "vip_about.html";
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

