
var newListItem;
var prices = [];
var idbeerIn = [];
var quantities =[];
var names = [];
//undo redo var
var doList = [];
var donames = [];
var doprices = [];
var doTimes = [];
var doIB =[];
var actionPointer = 0;
var undoInUse = false;
// Do we have an existing list or not?
//
var empty_List;


$(document).ready(function() {

    // Do we have an existing list or not?
    //
    empty_List = true;


  });
// add one beer to the cart 
function addBeer(name, price, idBeer) {

  var alreadyIn = false;
  empty_List = false;

  for ( var i = 0; i < idbeerIn.length ; i++){
    if (idBeer == idbeerIn[i]){
      alreadyIn = true;
      quantities[i] += 1;
    }
  }

  if (alreadyIn == false) {
    idbeerIn.push(idBeer);
    quantities.push(1);
    prices.push(price);
    names.push(name);
  }

  if (!undoInUse){
    newAction(name,price,idBeer,"add");
    update_list();
  }
}

//remove one beer from the cart
function removeBeer(idBeer) {

  for ( var i = 0; i < idbeerIn.length ; i++){
    if (idBeer == idbeerIn[i]){
      if (undoInUse == false){
        newAction(names[i],prices[i],idBeer,"remove");
      }
      quantities[i] -= 1;
      if (quantities[i] == 0){
        idbeerIn.splice(i,1);
        quantities.splice(i,1);
        prices.splice(i,1);
        names.splice(i,1);
      }
    }
  }
  if (idbeerIn.length == 0){
    empty_List = true;
  }
  if (undoInUse == false){
    update_list();
  }
  
}

//update list display
function update_list (){

  display_undo_buttons();

  $('#beer').empty();
  for ( var i = 0; i < idbeerIn.length ; i++){
    id = "L" + idbeerIn[i];
    console.log(id);
    newListItem = '<li id="'+ id +'" draggable = "true" ondragstart="drag(event)"><button class="button" style="float: center;" onclick="removeBeer('+idbeerIn[i]+')">'+names[i]+' x ' + quantities[i]+'</button></li>';

    $('#beer').append(newListItem); 
  }
  
  if (empty_List){
    display_confirm_button(false);
    $('#total').empty();
  }else{
    display_confirm_button(true);
    update_total();
  }

}

// update the total of the cart
function  update_total (){

  $('#total').empty();
  $('#total').append('<b>TOTAL : '+total()+'kr</b>');
}

// calculate the total of the cart
function  total (){

  var total =0;
  for ( var i = 0; i < quantities.length ; i++){
    total += quantities[i] * prices[i];
  }

  total = toFixed(total,2);
  return total;
}

// function to display prices in a right way;
function toFixed(value, precision) {
  var precision = precision || 0,
  power = Math.pow(10, precision),
  absValue = Math.abs(Math.round(value * power)),
  result = (value < 0 ? '-' : '') + String(Math.floor(absValue / power));

  if (precision > 0) {
    var fraction = String(absValue % power),
    padding = new Array(Math.max(precision - fraction.length, 0) + 1).join('0');
    result += '.' + padding + fraction;
  }
  return result;
}

//function to enable or disable the diplay of the button comfirm
function display_confirm_button (val) {

  $('#confirm').empty();
  if (val){
    $('#confirm').append('<br><button class=\'button\' onclick="confirm()">Confirm my order</button>');
  }

}

//function to send the command to the database
function confirm () {

  var msg = "You bought : \n\n";
  //update stock
  for ( var i=0;i<idbeerIn.length;i++){

    $.ajax({
      type: "POST",
      url: 'ajaxQuerry.php',
      dataType: 'json',
      data: {functionname: 'buyBeer', arguments: [idbeerIn[i], quantities[i]]},

      success: function (obj, textstatus) {
                    if( !('error' in obj) ) {
                        yourVariable = obj.result;
                    }
                    else {
                        console.log(obj.error);
                    }
              }
    });


    msg += "\t - "+quantities[i]+" "+names[i]+"\n";
  }

  //update debt
  var total_of_cart = toFixed(total(),0);
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
  xmlhttp.open("GET","ajaxQuerry.php?querry="+total_of_cart+"&searchOption="+14,true);
  xmlhttp.send();

  msg += "\n TOTAL = "+total_of_cart+"kr\n\n Please go pick up your beers \n\n Enjoy - Your favorite PUB"; 
 
  alert(msg);

  display_confirm_button(false);
  prices = [];
  idbeerIn = [];
  quantities =[];
  names = [];
  empty_List = true;
  doList = [];
  donames = [];
  doprices = [];
  doTimes = [];
  doIB =[];
  actionPointer = 0;
  update_list();

}

// sends id of dragged element
function drag(event){
  event.dataTransfer.setData("text", event.target.id);
}

// prevents the default drop option of the brower when hovering over drop area
function allowDrop(event) {
  event.preventDefault();
}

// when beer is dropped on the list it adds the beer to the list
function drop(event){
  event.preventDefault();
  var data = event.dataTransfer.getData("text");

  var row = document.getElementById(data);
  data = data.substr(1, data.length -2);
  name = row.cells[0].innerHTML;
  price = row.cells[1].innerHTML;

  addBeer(name, price, data);

}

// deletes the beer from the shopping cart when its dropped
function dropOut(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");

  char = data.indexOf("L");

  if (char == -1) {

    return false;
  }
  else {

    id = data.substring(1, data.length);

    removeBeer(id);
  }
}

// adds to the body the attributes so that beer from the cart can be dropped there
body = document.body;
body.setAttribute("ondrop", "dropOut(event)");
body.setAttribute("ondragover","allowDrop(event)");
console.log(body);

/* ****************************************************** undo / redo part ******************************************/

function newAction (name, price, idBeer, action){
  while(doList.length > actionPointer){
    doList.splice(actionPointer,1);
    donames.splice(actionPointer,1);
    doprices.splice(actionPointer,1);
    doTimes.splice(actionPointer,1);
    doIB.splice(actionPointer,1);
  }
  if (actionPointer == 0){
    doList.push(action);
    donames.push(name);
    doprices.push(price);
    doTimes.push(1);
    doIB.push(idBeer);
    actionPointer++;
  }else{
    if (doIB[actionPointer-1] == idBeer && doList[actionPointer-1] == action){
      doTimes[actionPointer-1] += 1;
    }else{
      doList.push(action);
      donames.push(name);
      doprices.push(price);
      doTimes.push(1);
      doIB.push(idBeer);
      actionPointer++;
    }
  }
}

function undo(){
  
  actionPointer--;
  undoInUse = true; 

  if (doList[actionPointer] == "add"){
    for ( var i = 0 ; i < doTimes[actionPointer] ; i++){
      removeBeer(doIB[actionPointer]); 
    }
  } 
  if (doList[actionPointer] == "remove"){
    for ( var i = 0; i < doTimes[actionPointer]; i++){
      addBeer(donames[actionPointer],doprices[actionPointer],doIB[actionPointer]); 
    }
  } 
  update_list(); 
  undoInUse = false;
}

function redo(){
  
  undoInUse = true; 

  if (doList[actionPointer] == "add"){
    for ( var i = 0 ; i < doTimes[actionPointer] ; i++){
      addBeer(donames[actionPointer],doprices[actionPointer],doIB[actionPointer]); 
    }
  } 
  if (doList[actionPointer] == "remove"){
    for ( var i = 0; i < doTimes[actionPointer]; i++){
      removeBeer(doIB[actionPointer]);
    }
  } 
  actionPointer++;
  update_list(); 
  
  undoInUse = false;
}

//function to enable or disable the diplay of the button comfirm
function display_undo_buttons () {

  $('#undo').empty();
  if (actionPointer > 0 & actionPointer < doList.length){
    $('#undo').append('<button class="button" onclick="undo()">undo</button><button class="button" onclick="redo()">redo</button>');
  }
  if (actionPointer > 0 & actionPointer == doList.length){
    $('#undo').append('<button class="button" onclick="undo()">undo</button>');
  }
  if (actionPointer == 0 & actionPointer < doList.length){
    $('#undo').append('<button class="button" onclick="redo()">redo</button>');
  }
}