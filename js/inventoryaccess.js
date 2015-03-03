
		var purchases = null;
		var sum = 0;
		var orderArr = new Array();
		var undoArr = new Array();
		var redoArr = new Array();
		var deleteList = new Array();

		var tmpOrderArr = new Array();
		
		/* These should be set when user logs in */
		var username = "ervtod";
		var password = "ervtod";
		
		var api = "http://pub.jamaica-inn.net/fpdb/api.php?username="+username+"&password="+password+"&action=";


		/* -== START: FUNCTIONS TO HANDLE THE INVENTORY ==- */
		/* This takes LONG time when keeping track of country, so this should be done at login page perhaps?! */
		function inventorySetValue(name, price, id, count) {
			var country = "";
			httpGet(api + "beer_data_get&beer_id=" + id,
				function callback_success(data) {
					country = data.payload[0].ursprunglandnamn;
				}, function callback_error(data) {
					console.log("error");
				});
			sessionStorage[name] = JSON.stringify([price, id, count, country]);
		}
		

		/* TODO: make sure the API is updated - NOT WORKING CORRECT */
		function inventorySetCount(name, count) { 
			var beer = JSON.parse(sessionStorage[name]);
			console.log(beer[1]);
			console.log(beer[0]);
			httpGet(api+'inventory_append&beer_id='+beer[1]+'&amount='+count+'&price='+beer[0], null);
			beer[2] += count;
			sessionStorage[name] = JSON.stringify(beer);
			return true;
		}


		function inventoryGetBeerInfo(name) {
			var beer = JSON.parse(sessionStorage[name]);
			return beer;
		}


		function inventoryGetPrice(name) {
			var beer = JSON.parse(sessionStorage[name]);
			return beer[0];
		}


		function inventoryGetId(name) {
			var beer = JSON.parse(sessionStorage[name]);
			return beer[1];
		}


		function inventoryGetCount(name) {
			var beer = JSON.parse(sessionStorage[name]);
			return beer[2];
		}


		function inventoryGetCountry(name) {
			var beer = JSON.parse(sessionStorage[name]);
			return beer[3];
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
					document.getElementById("loggedInUser").innerHTML = "Welcome " + data.payload[0].first_name + " " + data.payload[0].last_name;
					document.getElementById("userCredit").innerHTML = "Credit: " + data.payload[0].assets + " sek.";
				},
				function callback_error(data) {
				});
		};


		/* set choice to 'text' if you want text to be shown on search, otherwise you can use 'image' to show images */
		function getBeerImage(str, choice) {
			if (str.length == 0) { 
				document.getElementById("main").innerHTML = "";
				return;
			} else {
				var xmlhttp = new XMLHttpRequest();
				xmlhttp.onreadystatechange = function() {
					if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
						document.getElementById("main").innerHTML = xmlhttp.responseText;
					}
				}
				xmlhttp.open("GET", "gethint.php?q=" + str +"&choice=" + choice, true);
				xmlhttp.send();
			}
		}
		

		/* Get the five last purchases for a user - NOT WORKING */
		function getFiveLastPurchases() {
			$('#search').val("");

			var lastFive = new Array();
			var uniqueLastFive = new Array();

			httpGetAsync(api+'purchases_get', 
			 	function callback_success(data) {
			 		var i = 0;

				 	while(uniqueLastFive.length < 5){
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
				 	var mainTmp = "";
				 	for(i = 0; i < 5; i++){			 		
						$.get("getHint.php", {q: uniqueLastFive[i], choice: 'image'},
							function(data) {                                          
	  							$('#main').html(data+mainTmp);
	  							mainTmp = $('#main').html();
							}
						);
				 	}
			 	},
				function callback_error(data) {
		 			console.log('An error occurred: ' + data);
			 	});
					return uniqueLastFive;
				}

	
		/* Get five last purchases (for all users), this can be called if admin - WORKS */
		function getFiveLastPurchasesAdmin(){
			$('#searchBeer2').html('<div class="searchBeer2"</div><br>');

			var lastFive = new Array();
			var uniqueLastFive = new Array();


			httpGet(api+'purchases_get_all', 
			 	function callback_success(data) {
			 		var i = 0;

			 	while(uniqueLastFive.length < 5){
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

			 	for(a = 0; a < 5; a++){			 		
					var txt = uniqueLastFive[a];
					var stock = getBeer(txt)[2];
					var beerName = txt.replace(/\'/g, '&apos');

					var tmphtml = $('#searchBeer2').html();

					if(stock == 0){
				 		$('#searchBeer2').html('<div class="beerButtonEmptyStock">'+txt+', '+getBeer(txt)[0]+ ' SEK</div><br>'+tmphtml);
					}
					else if(stock < 10) {
				 		$('#searchBeer2').html('<div class="beerButtonLowStock" onclick="placeOrder(\''+beerName+'\')">'+txt+', '+getBeer(txt)[0]+ ' SEK</div><br>'+tmphtml);
					}
					else{
				 		$('#searchBeer2').html('<div class="beerButton" onclick="placeOrder(\''+beerName+'\')">'+txt+', '+getBeer(txt)[0]+' SEK</div><br>'+tmphtml);
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
			$('#main_total').html("<div id='total_text'>TOTAL: "+sum+" SEK</div>");

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
					$('#main').html("<div class='main'></div><br>");
					$('#main_total').html("<div id='total_text'>TOTAL:</div>"); 
				}


				else{
					var tmphtml = "";
					for (var i = 0; i < orderArr.length; i+=3) {

						console.log(orderArr[i]);
						var index = orderArr.indexOf(orderArr[i]);
						var amount = orderArr[index + 2];
						
						sum = sum + (orderArr[index + 1] * amount);
					
						var tempBeerName = orderArr[i].replace(/\'/g, '&apos');

						$('#main').html(tmphtml+'<div class="beerButtonOrder"><div class ="orderText">'+orderArr[i]+', '+orderArr[i+1]+' SEK</div><div class="quantity"><input type="image" class="incButton" onclick="incButton(\''+tempBeerName+'\')" src="images/bartender/plus.png" alt="Increase"><input type="text" name="quantityInput" id="quantityInput" value='+orderArr[i+2]+'><input type="image" class="decButton" src="images/bartender/minus.png" onclick="decButton(\''+tempBeerName+'\')" alt="Decrease"></div><input type="image" class="deleteButton" src="images/bartender/delete.png" onclick="deleteFromlist(\''+tempBeerName+'\')" alt="Delete"></input></div>');
						tmphtml = $('#main').html();
						$('#main_total').html("<div id='total_text'>TOTAL: "+sum+" SEK</div>");
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

				$('#main').html(tmphtml+'<div class="beerButtonOrder"><div class ="orderText">'+orderArr[i]+', '+orderArr[i+1]+' SEK</div><div class="quantity"><input type="image" class="incButton" id='+id+' onclick="incButton(\''+tempBeerName+'\')" src="images/bartender/plus.png" alt="Increase"><input type="text" name="quantityInput" id="quantityInput" value='+orderArr[i+2]+'><input type="image" class="decButton" src="images/bartender/minus.png" onclick="decButton(\''+tempBeerName+'\')" alt="Decrease"></div><input type="image" class="deleteButton" src="images/bartender/delete.png" onclick="deleteFromlist(\''+tempBeerName+'\')" alt="Delete"></input></div>');
				tmphtml = $('#main').html();
				$('#main_total').html("<div id='total_text'>TOTAL: "+sum+" SEK</div>");
			};


			$('.deleteButton').on('click',function(){ 
    			$(this).parent('div.beerButtonOrder').remove();
			});
		
			/* INCREASE INPUT WHEN + IS CLICKED*/
		/*	$(".incButton").on("click",function() {
			
				var $button = $(this);
				var value = $button.parent().find("input").val;
				$button.parent().find("input").val = value;


			//	var amount = incButton(txt);

			/*	var index = orderArr.indexOf(txt);
				orderArr[index + 2] += 1;

				var $button = $(this);
		 		$button.parent().find("input").val(orderArr[index + 2]);

				sum = sum + orderArr[index+1];
		      	$('#main_total').html("<div id='total_text'>TOTAL: "+sum+" SEK</div>");

		 		console.log(orderArr); 
			}); */

			/* DECREASE INPUT WHEN - IS CLICKED*/
			/*	$(".decButton").on("click", function() {
					var $button = $(this);
					var index = orderArr.indexOf(txt);
					 
					if(orderArr[index +2] > 1){
						orderArr[index +2] -= 1;
					}

	      			sum = sum - orderArr[index +1];
		      		$('#main_total').html("<div id='total_text'>TOTAL: "+sum+" SEK</div>");
	 				$button.parent().find("input").val(orderArr[index + 2]);
	 			//	console.log(orderArr);
			});*/
		}


		/*Empty OrderArr and delete divs from main */
		function cancelOrder() {
			
			if(orderArr.length < 1){

				console.log("nothing to cancel!");
			}
			else{

			//	if(sista i undo är cancelorder -> gör allt men lägg inte till ngon ny)
				var tmp = orderArr.slice();
				tmpOrderArr.push(tmp);
				undoArr.push("cancelOrder");
				console.log("nya undo");
				console.log(undoArr);

				orderArr.splice("", orderArr.length);
				$('#main').html("<div class='main'></div><br>");
				$('#main_total').html("<div id='total_text'>TOTAL:</div>"); 
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


		/* Buy a beer.. now it buys two. Why?! - DOESN'T WORK */
		function buyBeer(name) {
			if (sessionStorage.length == 0) { createInventory(); }
			httpGet(api+'purchases_append&beer_id='+inventoryGetBeerInfo(name.toLowerCase())[1],
				function callback_success(data) {
					console.log("You just bought yourself a beer!");
					//subtract beer count for name by 1
				}, function callback_error(data) {
					console.log('An error occurred: ' + data);
				});
		}

		/*returns all beverages in the system - WORKS */
		// function getAllBeverages() {
		// 	if (barInventory == null) { createInventory(); }
		// 	return barInventory.getAllInventory();
		// }


		/* return data for specific beer. [0]=price, [1]=id, [2]=count, [3]=country - WORKS*/
		function getBeer(beer) {
			if (sessionStorage.length == 0) { createInventory(); }
			var beerData = inventoryGetBeerInfo(beer.toLowerCase());
			return beerData;
		}


		/* Update the beer count for a specific beer */
		//NOT WORKING PERFECT
		function setBeerCount(beer, newCount) {
			if (newCount === parseInt(newCount, 10)) {
				if (sessionStorage.length == 0) { createInventory(); }
				return inventorySetCount(beer.toLowerCase(), newCount);
			} else {
				console.log(newCount + ' is not an integer.');
			}
		}


		function vip_pay() {
			alert("Lets pay!");
		}


		function vip_cancel() {
			alert("I don't want to do this... abort!");
		}


		/* EMPTY THE ORDER COLUMN, RESET THE TOTAL SUM AND DELETE BOUGHT BEER FROM DATABASE */
		function finishOrder() {

			orderArr.splice("", orderArr.length);
			$('#main').html("<div class='main'></div><br>");
			$('#main_total').html("<div id='total_text'>TOTAL:</div>"); 
			sum = 0;
		}

		function finishOrderCredit() {

			var VIPname = $('#VIPnameInput').val();
			console.log(VIPname);

    		if (VIPname.length > 1) {
    			var balance = getUserBalance(VIPname);
    			//sum = 10;

    			//SOFT BALANCE ???
    			if(balance < sum ) {
    				console.log("not enough!")
    				alert("Not enough credit!");
    			}
    			else{
    				//buy beer 
    				orderArr.splice("", orderArr.length);
					$('#main').html("<div class='main'></div><br>");
					$('#main_total').html("<div id='total_text'>TOTAL:</div>"); 
					sum = 0;
					//close popup
					//add popup with confirmation? 
    			}
    		}
    		else{
				alert("No username!");
    			console.log("inget namn");
    		}
		}



		/* TMP CODE BELOW */

				/* returns array with all the beverages in the bar. [0]=price [1]=id [2]=amount */
			// this.getAllInventory = function() {
			// 	var inventory = new Object();
			// 	for (bev in this.inven) {
			// 		if (bev == "")
			// 			continue;
			// 		inventory[bev] = [ this.inven[bev][0], this.inven[bev][1], this.inven[bev][2], this.inven[bev][3] ];
			// 	}
			// 	return inventory;
			// }