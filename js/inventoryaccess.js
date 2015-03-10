var purchases = null;
var sum = 0;
var orderArr = new Array();
var undoArr = new Array();
var redoArr = new Array();
var deleteList = new Array();

var tmpOrderArr = new Array();

/* These should be set when user logs in */
var username = readCookie('username');
var password = readCookie('username');

var api = "http://pub.jamaica-inn.net/fpdb/api.php?username="+username+"&password="+password+"&action=";

/* -== START: FUNCTIONS TO HANDLE THE INVENTORY ==- */
/* Sets sessionStorage values indexed by beername, the last argument in the JSON below is for rating a beer */
function inventorySetValue(name, price, id, count) {
	sessionStorage[name] = JSON.stringify([price, id, count, 0]);
}

/* Returns information like id, name, producer, alcohol etc for a specific beer */
function getDetailedBeerInfo(beer) {
	beer = beer.toLowerCase();
	var returnBeer = new Array();
	httpGet(api + "beer_data_get&beer_id=" + getBeerId(beer),
		function callback_success(data) {
			returnBeer.push(data.payload[0].nr);
			returnBeer.push(data.payload[0].namn);
			returnBeer.push(data.payload[0].namn2);
			returnBeer.push(data.payload[0].varugrupp);
			returnBeer.push(data.payload[0].producent);
			returnBeer.push(data.payload[0].leverantor);
			returnBeer.push(data.payload[0].alkoholhalt);
		}, function callback_error(data) {
			console.log(data);
		});
	returnBeer.push(getBeerCount(beer));
	return returnBeer;
}


/* 	Sets a beers count - NOT WORKING CORRECT but thats because of the API
	if a user wants to buy 1 beer two beers will be bought in the API, this is because
	the API first gets a OPTION-request and executes the request on the server
	then the GET or POST-request is executed and another request is made */
	/* This will update both the inventory and the sessionStorage */
function setBeerCount(name, count) { 
	var beer = JSON.parse(sessionStorage[name]);
	// console.log(beer[1]);
	// console.log(beer[0]);
	httpGet(api+'inventory_append&beer_id='+beer[1]+'&amount='+count+'&price='+beer[0], null);
	beer[2] += count;
	beer[2] += count; //this is done because of the error mentioned above
	sessionStorage[name] = JSON.stringify(beer);
	return true;
}


/* return data for specific beer. [0]=price, [1]=id, [2]=count - WORKS*/
function getBeer(beer) {
	if (sessionStorage.length == 0) { createInventory(); }
	return JSON.parse(sessionStorage[beer.toLowerCase()])
}

/* Return beer id */
function getBeerId(name) {
	if (sessionStorage.length == 0) { createInventory(); }
	return JSON.parse(sessionStorage[name])[1];
}

/* return beer count - how many in stock */
function getBeerCount(name) {
	if (sessionStorage.length == 0) { createInventory(); }
	return JSON.parse(sessionStorage[name])[2];
}

/* return beer rating */
function getBeerRating(name) {
	if (sessionStorage.length == 0) { createInventory(); }
	return JSON.parse(sessionStorage[name])[3];
}

/* Buy a beer.. now it buys two - problems in the API -  WORKS but buys two 
	sessionStorage will have the same amount as the API, ie. buys two */
function buyBeer(name) {
	if (sessionStorage.length == 0) { createInventory(); }
	httpGetAsync(api+'purchases_append&beer_id='+JSON.parse(sessionStorage[name.toLowerCase()])[1],
		function callback_success(data) {
			console.log("You just bought yourself a beer!");
					//subtract beer count for name by 1
				}, function callback_error(data) {
					console.log('An error occurred: ' + data);
				});
	var beer = JSON.parse(sessionStorage[name]);
	 console.log("beer: "+ beer);
	 beer[2] -= 2;
	 console.log("beer: "+ beer);
	 
	sessionStorage[name] = JSON.stringify(beer);
}
/* -== END: FUNCTIONS TO HANDLE THE INVENTORY ==- */



/* Used to access the API, SYNCHRONUS call - WORKS */
function httpGet(url, callback_success, callback_error) {
	$.ajax({
		url: url,
		type: "POST",
		contentType: "application/json; charset=utf-8",
		dataType: 'json',
		async: false,
		success: callback_success,
		error: callback_error
	});
}


/* Used to access the API, ASYNCHRONUS call - WORKS */
function httpGetAsync(url, callback_success, callback_error) {
	$.ajax({
		url: url,
		type: "POST",
		contentType: "application/json; charset=utf-8",
		dataType: 'json',
		success: callback_success,
		error: callback_error
	});
}


/* Used to set first and lastname + credit for that user in header on main page - WORKS */
function getUsernameAndCredit() {
	httpGetAsync(api+'iou_get',
		function callback_success(data) {
			document.getElementById("loggedInUser").innerHTML = data.payload[0].first_name + " " + data.payload[0].last_name;
			document.getElementById("userCredit").innerHTML = data.payload[0].assets + " sek.";
		},
		function callback_error(data) {
		});
};


/* set choice to 'text' if you want text to be shown on search, otherwise you can use 'image' to show images */
// function getBeerImage(str, choice) {
// 	if (str.length == 0) { 
// 		document.getElementById("main").innerHTML = "";
// 		return;
// 	} else {
// 		var xmlhttp = new XMLHttpRequest();
// 		xmlhttp.onreadystatechange = function() {
// 			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
// 				document.getElementById("main").innerHTML = xmlhttp.responseText;
// 			}
// 		}
// 		xmlhttp.open("GET", "gethint.php?q=" + str +"&choice=" + choice, true);
// 		xmlhttp.send();
// 	}
// }

/* List all beers and show in main div */
function getAllBeers() {
	$('#search').val("");
	if (sessionStorage.length == 0) { createInventory() }
	var tmphtml = "";
	for (var i = sessionStorage.length-1; i >= 0; i--) { //go through sessionStorage and list all beers in main div
		var stock = JSON.parse(sessionStorage.getItem(sessionStorage.key(i)));
		stock = stock[2];
		var beerName = sessionStorage.key(i);
		var escapedBeerName = beerName.replace(/\'/g, '&apos'); //make sure to escape '-chars
		if (stock > 1) {
			if(stock < 10) {
				$('#main').html('<div class="beerWrapper" ondrop="dropRating(event)" ondragover="event.preventDefault()" draggable="true" ondragstart="drag(event)"><div class="beerInfoImage"><img src="images/misc/info_bw.png" onclick="getInfoVip(\''+escapedBeerName+'\')"></div><div class="beerImageLowStock" onclick="placeOrder(\''+escapedBeerName+'\')"><h3>ONLY<br>'+stock+'<br>LEFT</h3><img src="images/beersearch/'+getBeer(beerName)[1]+'.png" ><h4>'+beerName+'</h4><h5>'+getBeer(beerName)[0]+' SEK</h5></div></div>'+tmphtml);
			}
			else {
				$('#main').html('<div class="beerWrapper" ondrop="dropRating(event)" ondragover="event.preventDefault()" draggable="true" ondragstart="drag(event)"><div class="beerInfoImage"><img src="images/misc/info_bw.png" onclick="getInfoVip(\''+escapedBeerName+'\')"></div><div class="beerImage" onclick="placeOrder(\''+escapedBeerName+'\')"><img src="images/beersearch/'+getBeer(beerName)[1]+'.png" ><h4>'+beerName+'</h4><h5>'+getBeer(beerName)[0]+' SEK</h5></div></div>'+tmphtml);
			}
			tmphtml = $('#main').html();
		}
	};
		

}

/* Get the five last purchases for a user and display in main div */
function getFiveLastPurchases() {
	$('#search').val(""); //clear search field

	var lastFive = new Array();
	var uniqueLastFive = new Array();

	httpGetAsync(api+'purchases_get', 
		function callback_success(data) {
			var i = 0;

			/* 	make sure to skip multiple versions of a beer if a user bought the same beer so
				we only shows one image per beer in the main div */
			while(uniqueLastFive.length < 5){
				if (typeof data.payload[i] == 'undefined') {
					uniqueLastFive.push("");
					continue;
				}

				if(data.payload[i].namn == "") { //if the API name-field is empty
					i++;
				}
				else{
					lastFive.push(data.payload[i].namn);
					$.each(lastFive, function(i, el){
						if($.inArray(el, uniqueLastFive) === -1) uniqueLastFive.push(el);
					})
					i++;
				}
			}
			var tmphtml = "";
			/* go through all uniqe beers and add it to the main div. Checks stock and adds text above image to indicate low stock */
			for(a = 0; a < 5; a++){			 		
				var beerName = uniqueLastFive[a];
				var stock = getBeer(beerName)[2];
				// var beerName = element.innerHTML;
				var escapedBeerName = beerName.replace(/\'/g, '&apos');

				if (stock < 1) {
					$('#main').html('<div class="beerWrapper" ondrop="dropRating(event)" ondragover="event.preventDefault()"><div class="beerImageEmptyStock"><h3>OUT<br>OF<br>STOCK</h3><img src="images/beersearch/'+getBeer(beerName)[1]+'.png" ><h4>'+beerName+'</h4><h5>'+getBeer(beerName)[0]+' SEK</h5></div></div>'+tmphtml);
				}
				else if(stock < 10) {
					$('#main').html('<div class="beerWrapper" ondrop="dropRating(event)" ondragover="event.preventDefault()" draggable="true" ondragstart="drag(event)"><div class="beerInfoImage"><img src="images/misc/info_bw.png" onclick="getInfoVip(\''+escapedBeerName+'\')"></div><div class="beerImageLowStock" onclick="placeOrder(\''+escapedBeerName+'\')"><h3>ONLY<br>'+getBeer(beerName)[2]+'<br>LEFT</h3><img src="images/beersearch/'+getBeer(beerName)[1]+'.png" ><h4>'+beerName+'</h4><h5>'+getBeer(beerName)[0]+' SEK</h5></div></div>'+tmphtml);
				}
				else {
					$('#main').html('<div class="beerWrapper" ondrop="dropRating(event)" ondragover="event.preventDefault()" draggable="true" ondragstart="drag(event)"><div class="beerInfoImage"><img src="images/misc/info_bw.png" onclick="getInfoVip(\''+escapedBeerName+'\')"></div><div class="beerImage" onclick="placeOrder(\''+escapedBeerName+'\')"><img src="images/beersearch/'+getBeer(beerName)[1]+'.png" ><h4>'+beerName+'</h4><h5>'+getBeer(beerName)[0]+' SEK</h5></div></div>'+tmphtml);
				}
					tmphtml = $('#main').html();
					}
				},
				function callback_error(data) {
					console.log('An error occurred: ' + data);
				});
		return uniqueLastFive;
	}


/* Get five last purchases (for all users), this can be called if admin - WORKS */
function getFiveLastPurchasesAdmin(){
	$('#search').val("");
	$('#searchBeer2').html('<div class="searchBeer2"</div><br>');

	var lastFive = new Array();
	var uniqueLastFive = new Array();


	httpGetAsync(api+'purchases_get_all', 
		function callback_success(data) {
			var i = 0;

			/* 	make sure to skip multiple versions of a beer if a user bought the same beer so
				we only shows one image per beer in the main div */
			while(uniqueLastFive.length < 5){
				if (typeof data.payload[i] == 'undefined') {
					uniqueLastFive.push("");
					continue;
				}

				if(data.payload[i].namn == "") {
					i++;
				}
				else{
					lastFive.push(data.payload[i].namn);
					$.each(lastFive, function(i, el){
						if($.inArray(el, uniqueLastFive) === -1) uniqueLastFive.push(el);
					})
					i++;
				}
			}
			/* go through all uniqe beers and add it to the main div. Checks stock and adds text above image to indicate low stock */
			for(a = 0; a < 5; a++) {			 		
				var txt = uniqueLastFive[a];
				console.log(getBeer(txt)[1]);
				var stock = getBeer(txt)[2];
				var beerName = txt.replace(/\'/g, '&apos');

				var tmphtml = $('#searchBeer2').html();

				if(stock < 1) {
					$('#searchBeer2').html('<div class="beerWrapper"><div class="beerInfoImage" onclick="getInfo(\''+beerName+'\')"><img id="beerInfoImage2" src="images/beersearch/'+getBeer(txt)[1]+'.png"></div><div class="beerButtonEmptyStock">'+txt+', '+getBeer(txt)[0]+ ' SEK</div></div><br>'+tmphtml);
				}
				else if(stock < 10) {
					$('#searchBeer2').html('<div class="beerWrapper"><div class="beerInfoImage" onclick="getInfo(\''+beerName+'\')"><img id="beerInfoImage2" src="images/beersearch/'+getBeer(txt)[1]+'.png"></div><div class="beerButtonLowStock" onclick="placeOrder(\''+beerName+'\')" draggable="true" ondragstart="drag(event)">'+txt+', '+getBeer(txt)[0]+ ' SEK</div></div><br>'+tmphtml);
				}
				else {
					$('#searchBeer2').html('<div class="beerWrapper"><div class="beerInfoImage" onclick="getInfo(\''+beerName+'\')"><img id="beerInfoImage2" src="images/beersearch/'+getBeer(txt)[1]+'.png"></div><div class="beerButton" onclick="placeOrder(\''+beerName+'\')" draggable="true" ondragstart="drag(event)">'+txt+', '+getBeer(txt)[0]+' SEK</div></div><br>'+tmphtml);
				}
			}
		},

		function callback_error(data) {
			console.log('An error occurred: ' + data);
		});
return uniqueLastFive;
}




/* DELETE BEER FROM ORDER LIST AND UPDATE SUM */
function deleteFromlist(txt) {

	var tmp = orderArr.slice();
	tmpOrderArr.push(tmp);
		//	console.log("tmp:");
		//	console.log(tmp);
		undoArr.push("deleteFromlist");
		//	console.log("nya undo");
		//	console.log(undoArr);

		var index = orderArr.indexOf(txt);
		var amount = orderArr[index + 2];
		sum = sum - (orderArr[index+1] * amount);
		$('#order_total').html("<div id='total_text'>TOTAL: "+sum+" SEK</div>");

		var deleted = orderArr.splice(index, 3);

		deleteList.push(deleted[0]);
		//	console.log("new orderarr efter delete");
		//	console.log(orderArr);
		//	console.log("deletedArr");
		//	console.log(deleteList);
	}


	function incButton(txt) {
		var name = txt.replace('&apos', "'");
		var index = orderArr.indexOf(name);
		orderArr[index + 2] += 1;

		console.log("incbutton");
		console.log(orderArr);
		updatePlaceOrder();	

	}


	function decButton(txt) {
		var name = txt.replace('&apos', "'");
		var index = orderArr.indexOf(name);

		if(orderArr[index +2] > 1){
			orderArr[index + 2] -= 1;
			updatePlaceOrder();

		}
	}


	function redo() {
		var length = redoArr.length;

		if(length < 1){
			console.log("nothing to redo!");
		}	

		else{

			var redo = redoArr.splice(length-1, 1);
			undoArr.push(redo[0]);
			console.log("nya redo");
			console.log(redoArr);
			console.log("-----------");


			if(redo == "placeOrder"){
				var redo = redoArr[length - 1];
				var length = tmpOrderArr.length;
				var tmp = tmpOrderArr[length -1];
				orderArr = tmp.slice();
				tmpOrderArr.splice(length -1, 1);
				updatePlaceOrder();
			}

			else if(redo == "cancelOrder"){
				cancelOrder();
			}

			else{
				var length = deleteList.length;
				var txt = deleteList[length -1];
				console.log("txt:");
				console.log(txt);
				deleteFromlist(txt);
				updatePlaceOrder();
			}
		}
	}


	function undo() {
		var length = undoArr.length;
		if(length < 1) {
			console.log("nothing to undo!");
		}

		else {
			var func = undoArr[length - 1];
						//console.log(undoArr);
						redoArr.push(func);
						console.log("nya redo");
						console.log(redoArr);
						undoArr.splice(length-1, 1);
						console.log("nya undo");
						console.log(undoArr);
						
						if(func == "placeOrder"){
							var tmp = orderArr.slice();
							tmpOrderArr.push(tmp);
							var length = orderArr.length;
							var index = (length - 3);
							orderArr.splice(index, 3);
							updatePlaceOrder();
						}
						/*Both cancelOrder and deleteFromList*/
						else {
							orderArr = tmpOrderArr.slice();
							var length = tmpOrderArr.length;
							var tmp = tmpOrderArr.splice(length-1, 1);
							orderArr = tmp[0];
							updatePlaceOrder();
						}

					}
				}


				function updatePlaceOrder() {
					sum = 0;
					console.log("updateplaceorderbutton");
					console.log(orderArr);

					if(orderArr == ""){
						$('#order').html("<div class='order'></div><br>");
						$('#order_total').html("<div id='total_text'>TOTAL:</div>"); 
					}


					else{
						var tmphtml = "";
						for (var i = 0; i < orderArr.length; i+=3) {

							console.log(orderArr[i]);
							var index = orderArr.indexOf(orderArr[i]);
							var amount = orderArr[index + 2];

							sum = sum + (orderArr[index + 1] * amount);

							var tempBeerName = orderArr[i].replace(/\'/g, '&apos');

							$('#order').html(tmphtml+'<div class="beerButtonOrder"><div class ="orderText">'+orderArr[i]+', '+orderArr[i+1]+' SEK</div><div class="quantity"><input type="image" class="incButton" onclick="incButton(\''+tempBeerName+'\')" src="images/bartender/plus.png" alt="Increase"><input type="text" name="quantityInput" id="quantityInput" value='+orderArr[i+2]+'><input type="image" class="decButton" src="images/bartender/minus.png" onclick="decButton(\''+tempBeerName+'\')" alt="Decrease"></div><input type="image" class="deleteButton" src="images/bartender/delete.png" onclick="deleteFromlist(\''+tempBeerName+'\')" alt="Delete"></input></div>');
							tmphtml = $('#order').html();
							$('#order_total').html("<div id='total_text'>TOTAL: "+sum+" SEK</div>");
						};

						$('.deleteButton').on('click',function(){ 
							$(this).parent('div.beerButtonOrder').remove();
						});
					}	

				}



				function placeOrder(txt){
					undoArr.push("placeOrder");
					console.log("nya undo");
					console.log(undoArr);

					var beerName = txt.replace('&apos', "'");
					var index = orderArr.indexOf(beerName);
					if(index != -1){
						orderArr[index + 2] += 1;
					}
					else{
						orderArr.push(beerName);
						orderArr.push(getBeer(beerName)[0]);
						orderArr.push(1);
					}

					var tmphtml = "";
					var updateIndex = orderArr.indexOf(beerName);

					sum = sum + orderArr[updateIndex + 1];

					for (var i = 0; i < orderArr.length; i+=3) {
						var id = orderArr[i].replace(/\s+/g, "_");   
						var tempBeerName = orderArr[i].replace(/\'/g, '&apos');

						$('#order').html(tmphtml+'<div class="beerButtonOrder"><div class ="orderText">'+orderArr[i]+', '+orderArr[i+1]+' SEK</div><div class="quantity"><input type="image" class="incButton" id='+id+' onclick="incButton(\''+tempBeerName+'\')" src="images/bartender/plus.png" alt="Increase"><input type="text" name="quantityInput" id="quantityInput" value='+orderArr[i+2]+'><input type="image" class="decButton" src="images/bartender/minus.png" onclick="decButton(\''+tempBeerName+'\')" alt="Decrease"></div><input type="image" class="deleteButton" src="images/bartender/delete.png" onclick="deleteFromlist(\''+tempBeerName+'\')" alt="Delete"></input></div>');
						tmphtml = $('#order').html();
						$('#order_total').html("<div id='total_text'>TOTAL: "+sum+" SEK</div>");
					};


				$('.deleteButton').on('click',function(){ 
				//	alert("hej");
					$(this).parent('div.beerButtonOrder').remove();
				});
}


/*Empty OrderArr and delete divs from main */
function cancelOrder() {

	if(orderArr.length < 1){

		console.log("nothing to cancel!");
	}
	else{

			//	if(sista i undo är cancelorder -> gör allt men lägg inte till ngon ny) !!!
			var tmp = orderArr.slice();
			tmpOrderArr.push(tmp);
			undoArr.push("cancelOrder");
			console.log("nya undo");
			console.log(undoArr);

			orderArr.splice("", orderArr.length);
			$('#order').html("<div class='order'></div><br>");
			$('#order_total').html("<div id='total_text'>TOTAL: 0 SEK</div>"); 
			sum = 0;
		}
	}


	/* Returns user balance - WORKS */
	function getUserBalance(username) {
		var userBalance = 0;
		httpGet(api+'iou_get',
			function callback_success(data) {
				userBalance = data.payload[0].assets;
			},
			function callback_error(data) {
				console.log("Something went wrong");
			});
		return parseInt(userBalance);
	}


	/* Create the inventory object - WORKS */
	function createInventory() {
		httpGet(api+'inventory_get', 
			function callback_success(data) {
				$.each(data.payload, function(key, item) {
				if (item.namn == "") { /* remove beers with no name */ } 
					else {
						inventorySetValue(
							item.namn.toLowerCase(), 
							parseInt(item.pub_price.toLowerCase()), 
							parseInt(item.beer_id.toLowerCase()), 
							parseInt(item.count.toLowerCase())
							);
					}
				});
			}, 
			function callback_error(data) {
				console.log('An error occurred: ' + data);
			});	
	}

	/*  */
	function vip_pay() {
		alert("Lets pay!");
	}

	/*  */
	function vip_cancel() {
		alert("I don't want to do this... abort!");
	}


	function printBill(){
		var tmphtml = "";

		for(var i = 0; i < orderArr.length; i+=3){
			var beer = orderArr[i];
			console.log(beer);
			document.getElementById('beerPopup').contentWindow.document.getElementById('beerContent').innerHTML = tmphtml+'<div class="beerButtonOrder"><div class ="orderText">'+orderArr[i]+', '+orderArr[i+1]+' SEK</div><div class="quantity">'+orderArr[i+2]+'</div></div></br>';
			tmphtml = document.getElementById('beerPopup').contentWindow.document.getElementById('beerContent').innerHTML;
		}
			document.getElementById('beerPopup').contentWindow.document.getElementById('beerContent').innerHTML = tmphtml+'<br><br><div class="beerButtonOrder"><div class ="orderText">TOTAL: '+sum+' SEK</div></div></br><br><button class="printButton">PRINT</button>';
		
		$('.order_buttonPrint').on("click",function() {
			$('#backgroundShadow').css({opacity:0.7});
			$('#backgroundShadow').fadeIn(100);
			$('#info').fadeIn(300);
					
			return false;
		});
				
		$('#backgroundShadow, #close').on("click",function() {
			$('#backgroundShadow, #info').fadeOut(300);	
		});
	}


	function finishOrder() {

		for(var i = 0; i < orderArr.length; i+=3){
    		var name = orderArr[i];
    		console.log(name);
    		console.log("here");
   			var amount = orderArr[i+2];
    		var stock = getBeer(name)[2];

    			if(stock < amount){
  					console.log("Not enough in stock of: " + name+". Only "+stock+" left");
   					alert("Not enough in stock of: " + name+". Only "+stock+" left.");
   				}
 				else {
    				buyBeer(name);
    			}
    	}

		orderArr.splice("", orderArr.length);
		$('#order').html("<div class='order'></div><br>");
		$('#order_total').html("<div id='total_text'>TOTAL:</div>"); 
		sum = 0;
	}



	function finishOrderCredit(user) {
		console.log(window.top.orderArr);
		if (user == "admin") {
			var VIPname = $('#VIPnameInput').val();
		} else {
			var VIPname = username;
		}
	//	console.log(VIPname);
		
		if(VIPname.length > 1) {
		//	var balance = getUserBalance(VIPname);
			//console.log(balance);
			var balance = 1000000000;
    			//SOFT BALANCE ???
    			if(balance < sum ) {
    				console.log("not enough credit!")
    				alert("Not enough credit!");
    			}
    			else {
    				console.log(orderArr.length);    			
    				// CHeck if all beers in oderArr are in stock before buying
					for(var i = 0; i < orderArr.length; i+=3){
    					var name = orderArr[i];
    					console.log(name);
    					console.log("here");
    					var amount = orderArr[i+2];
    					var stock = getBeer(name)[2];

    					if(stock < amount){
    						console.log("Not enough in stock of: " + beer+". Only "+stock+" left");
    						alert("Not enough in stock of: " + beer+". Only "+stock+" left");
    					}
    					else {}
    					//	buyBeer(name);
    					// delete credit from user
    				} 

    				orderArr.splice("", orderArr.length);
    				$('#order').html("<div class='order'></div><br>");
    				$('#order_total').html("<div id='total_text'>TOTAL:</div>"); 
    				sum = 0;

				}
		}
		
		else{
			alert("Wrong username!");
			console.log("Wrong username");
		}	
	}


		function creditPopup() {
			// console.log(orderArr);
			document.getElementById('beerPopup').contentWindow.document.getElementById('beerContent').innerHTML = '<div id="popupText">Enter VIP username:<br></div><div id="popupInput"><input id="VIPnameInput" type="text" name="username"></div><div id="popupSubmit"><br><button id="popupButton" onclick="finishOrderCredit("admin")"> OK </button></div>';

			$('.order_buttonCredit').on("click",function() {
					$('#backgroundShadow').css({opacity:0.7});
					$('#backgroundShadow').fadeIn(100);
					$('#info').fadeIn(300);
					
					return false;
				});
				
				$('#backgroundShadow, #close').on("click",function() {
					$('#backgroundShadow, #info').fadeOut(300);	
				});
		
		}






		/* Add receipt to the sql db */
		/*
		usage:
		<h3> Add receipt to system </h3>
		<button id="addReceipt" onclick="addReceipt()" type="button"> Add Receipt </button>
		*/
		function addReceipt(str) {
			$.ajax({      
				type: 'POST',                        
				url: 'settings.php',
				data: { 
					func_id : "0",
					str : str 
				},                        
				dataType: 'json',
				success: function(data) {
					if (data.status == 'success') {
						console.log("db query success");
					} else {
						console.log("db query failed");
					}
				}
			});
		}


			/* COOKIE-RELATED FUNCTIONS */
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

            //in case of go to main.html without login
            function checkstatus(){
                var s =readCookie('username');
                if(s==null){
                alert("you can not go to this page without login !");
                window.location.href='index.html';
                }
            }

	// /* Modal related function, click outside to close modal */
	// $(document).on('click', '.modal-backdrop', function (event) {
	//     bootbox.hideAll()
	// });

	// /* Modal related function, press Esc to close modal */
	// $(document).keyup(function(e) {
 // 		if (e.keyCode == 27) { bootbox.hideAll(); }   // esc
	// });

	var countA = 1;
	function dummy(value) {
		countA = value;
		// console.log(countA);
	}

	function dummy2(beer) {
		setBeerCount(beer, countA);
	}

	/* Creates a modal (popup) with beer data */
	function getInfo(beer) {
		var htmlStr = "";
		var tmp = getDetailedBeerInfo(beer);
		var box = bootbox.dialog({
			title: tmp[1] + ' ' + tmp[2],
			message: 	
			'<div id="container">' +
			'<img style="border-radius: 15px;" id="image" src="images/beersearch/'+tmp[0]+'.png">'+
			'<div id="information"><strong>'+tmp[1]+' '+tmp[2]+'</strong><br>'+
			'<strong>ID:</strong> '+tmp[0]+'<br>'+
			'<strong>Sort:</strong> '+tmp[3]+'<br>'+
			'<strong>Producer:</strong> '+tmp[4]+'<br>'+
			'<strong>Reseller:</strong> '+tmp[5]+'<br>'+
			'<strong>Alcohol:</strong> '+tmp[6]+'<br>'+
			'<strong>In stock:</strong> '+tmp[7]+
			'<form style="padding-top:15px;" id="orderForm"><label for="orderBeers">Order more beers</label><br>'+
			'<input id="amount" type="number" onchange="dummy(this.value)" value="1" required><button id="orderBtn" type="button" onclick="dummy2(\''+beer.toLowerCase()+'\')">ORDER</button></form></div>' +
			'</div>'
		});
	}

	 /* Creates a modal (popup) with beer data */
	function getInfoVip(beer) {
		var htmlStr = "";
	 			var tmp = getDetailedBeerInfo(beer);
	 			bootbox.dialog({
	 				title: tmp[1] + ' ' + tmp[2],
  					message: 	
  					'<img style="border-radius: 15px; padding-bottom:10px;" id="image" src="images/beersearch/'+tmp[0]+'.png"><br>'+
  					'<div id="information"><strong>'+tmp[1]+' '+tmp[2]+'</strong><br>'+
  					'<strong>ID:</strong> '+tmp[0]+'<br>'+
  					'<strong>Sort:</strong> '+tmp[3]+'<br>'+
  					'<strong>Producer:</strong> '+tmp[4]+'<br>'+
  					'<strong>Reseller:</strong> '+tmp[5]+'<br>'+
  					'<strong>Alcohol:</strong> '+tmp[6]+'<br>'+
  					'<strong>In stock:</strong> '+tmp[7]
  				}).addClass("modalHeight");
	 		}
