
//AJAX to get login form
function login() {

  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      document.getElementById("table").innerHTML=xmlhttp.responseText;
    }
  }
  xmlhttp.open("GET","login.php",true);
  xmlhttp.send();
}


//AJAX here we send information to be processed by ajaxQuerry.php and dispaly in "table"
function listBeer(str,option) {
  
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      document.getElementById("table").innerHTML=xmlhttp.responseText;
    }
  }
  xmlhttp.open("GET","ajaxQuerry.php?querry="+str+"&searchOption="+option,true);
  xmlhttp.send();
}



function purchased(str,option) {
  
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      document.getElementById("purchased").innerHTML=xmlhttp.responseText;
    }
  }
  xmlhttp.open("GET","ajaxQuerry.php?querry="+str+"&searchOption="+option,true);
  xmlhttp.send();
}

purchased("",5);

// fetch user input and send to listBeer()
function getInput () {
     
  var querry=document.getElementById("querry").value;
  var searchOption=document.getElementById('searchOption').value;
  listBeer(querry,searchOption);
}

function listLowOnStock(str,option) {
  
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      document.getElementById("table").innerHTML=xmlhttp.responseText;
    }
  }
  xmlhttp.open("GET","ajaxQuerry.php?querry="+str+"&searchOption="+option,true);
  xmlhttp.send();
}

function updateStock() {

  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      document.getElementById("table").innerHTML=xmlhttp.responseText + "</br></br>" + document.getElementById("table").innerHTML;
    }
  }
  xmlhttp.open("GET","updateStock.php",true);
  xmlhttp.send();
}

function changeAuthority() {

  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      document.getElementById("table").innerHTML=xmlhttp.responseText;
    }
  }
  xmlhttp.open("GET","changeAuthority.php",true);
  xmlhttp.send();
}


function setCredit() {

  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      document.getElementById("table").innerHTML=xmlhttp.responseText;
    }
  }
  xmlhttp.open("GET","setCredit.php",true);
  xmlhttp.send();
}

function delivery() {

  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      document.getElementById("table").innerHTML=xmlhttp.responseText;
    }
  }
  xmlhttp.open("GET","delivery.php",true);
  xmlhttp.send();
}

function repayDebt() {

  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      document.getElementById("table").innerHTML=xmlhttp.responseText;
    }
  }
  xmlhttp.open("GET","repayDebt.php",true);
  xmlhttp.send();
}