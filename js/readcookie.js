/**
 * Created by zp on 3/3/15.
 */
function readCookie(name) {
    var cookiename = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++)
    {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(cookiename) == 0) return c.substring(cookiename.length,c.length);
    }
    return null;
}

function switchcontent(){
    var s = readCookie('credentials');
    if(s == 0){
        document.getElementById('content').src = "bartender_content.html";
    }
    else if (s==3){
        document.getElementById('content').src = "vip_content.html";
    }
    else{
        //trun to index.html or wrong page?
    }
}

