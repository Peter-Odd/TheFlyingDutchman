		var purchases = null;
		var sum = 0;
		var orderArr = new Array();
		
		/* These should be set when user logs in */
		var username = "ervtod";
		var password = "ervtod";
		
		var api = "http://pub.jamaica-inn.net/fpdb/api.php?username="+username+"&password="+password+"&action=";


		/* -== START: FUNCTIONS TO HANDLE THE INVENTORY ==- */
		/* This takes LONG time when keeping track of country, so this should be done at login page perhaps?! */
		function inventorySetValue(name, price, id, count) {
			var country = "";
			// httpGet(api + "beer_data_get&beer_id=" + id,
			// 	function callback_success(data) {
			// 		country = data.payload[0].ursprunglandnamn;
			// 	}, function callback_error(data) {
			// 		console.log("error");
			// 	});
			sessionStorage[name] = JSON.stringify([price, id, count, country]);
		}


		function getDetailedBeerInfo(beer) {
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
		

		/* TODO: make sure the API is updated - NOT WORKING CORRECT */
		function setBeerCount(name, count) { 
			var beer = JSON.parse(sessionStorage[name]);
			console.log(beer[1]);
			console.log(beer[0]);
			httpGet(api+'inventory_append&beer_id='+beer[1]+'&amount='+count+'&price='+beer[0], null);
			beer[2] += count;
			sessionStorage[name] = JSON.stringify(beer);
			return true;
		}


		/* return data for specific beer. [0]=price, [1]=id, [2]=count, [3]=country - WORKS*/
		function getBeer(beer) {
			if (sessionStorage.length == 0) { createInventory(); }
			return JSON.parse(sessionStorage[beer.toLowerCase()])
		}

		function getBeerId(name) {
			if (sessionStorage.length == 0) { createInventory(); }
			return JSON.parse(sessionStorage[name])[1];
		}

		function getBeerCount(name) {
			if (sessionStorage.length == 0) { createInventory(); }
			return JSON.parse(sessionStorage[name])[2];
		}

		function getBeerCountry(name) {
			if (sessionStorage.length == 0) { createInventory(); }
			return JSON.parse(sessionStorage[name])[3];
		}

		/* Buy a beer.. now it buys two. Why?! - DOESN'T WORK */
		function buyBeer(name) {
			if (sessionStorage.length == 0) { createInventory(); }

			httpGet(api+'purchases_append&beer_id='+JSON.parse(sessionStorage[name.toLowerCase()])[1],
				function callback_success(data) {
					console.log("You just bought yourself a beer!");
					//subtract beer count for name by 1
				}, function callback_error(data) {
					console.log('An error occurred: ' + data);
				});
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
		
		function getBeerByCountry(countryName) {
			document.getElementById("main").innerHTML = countryName;
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
				 	for(a = 0; a < 5; a++){			 		
					var txt = uniqueLastFive[a];
					var stock = getBeer(txt)[2];
					var beerName = txt.replace(/\'/g, '&apos');

					var tmphtml = $('#main').html();

					if (stock < 1) {
						$('#main').html('<div class="beerImageEmptyStock" style="background-image: url(images/beersearch/'+getBeer(beerName)[1]+'.png)"><h4>'+beerName+'</h4><h5>'+getBeer(beerName)[0]+' SEK</h5></div>'+tmphtml);
					}
					else if(stock < 10) {
						$('#main').html('<div class="beerImageLowStock" style="background-image: url(images/beersearch/'+getBeer(beerName)[1]+'.png)" onclick="placeOrderVip(\''+beerName+'\')"><h4>'+beerName+'</h4><h5>'+getBeer(beerName)[0]+' SEK</h5></div>'+tmphtml);
					}
					else {
						$('#main').html('<div class="beerImage" style="background-image: url(images/beersearch/'+getBeer(beerName)[1]+'.png)" onclick="placeOrderVip(\''+beerName+'\')"><h4>'+beerName+'</h4><h5>'+getBeer(beerName)[0]+' SEK</h5></div>'+tmphtml);
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

					if(stock < 1){
				 		$('#searchBeer2').html('<div class="beerButtonEmptyStock">'+txt+', '+getBeer(txt)[0]+ ' SEK</div><br>'+tmphtml);
					}
					if(stock < 10) {
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
			var index = orderArr.indexOf(txt);
			var amount = orderArr[index + 2];
    		sum = sum - (orderArr[index+1] * amount);
			$('#main_total').html("<div id='total_text'>TOTAL: "+sum+" SEK</div>");

			orderArr.splice(index, 3);
			console.log(orderArr);
		}


		function incButton(txt) {
			//	console.log(txt);
				var id = txt.replace(/\s+/g, "_");

				var index = orderArr.indexOf(txt);
				orderArr[index + 2] += 1;

				var value = orderArr[index + 2];
				document.getElementById(id).value = value;		
				var newVal = document.getElementById(id).value;
			//	console.log(newVal);
			//	placeOrder(txt);	
			//	console.log(orderArr);

				sum = sum + orderArr[index+1];
		      	$('#main_total').html("<div id='total_text'>TOTAL: "+sum+" SEK</div>"); 
			}


			function decButton(txt) {
			//	console.log(txt);
				var id = txt.replace(/\s+/g, "_");
				var index = orderArr.indexOf(txt);

				if(orderArr[index +2] > 1){
					orderArr[index + 2] -= 1;
					sum = sum - orderArr[index+1];
		    	  	$('#main_total').html("<div id='total_text'>TOTAL: "+sum+" SEK</div>");
				}

				var value = orderArr[index + 2];
				document.getElementById(id).value = value;		
				var newVal = document.getElementById(id).value;
			//	console.log(newVal);
			//	placeOrder(txt);	
			//	console.log(orderArr);

				 
			}



		function placeOrder(txt){
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
				$('#main').html(tmphtml+'<div class="beerButtonOrder"><div class ="orderText">'+orderArr[i]+', '+orderArr[i+1]+' SEK</div><div class="quantity"><input type="image" class="incButton" id='+id+' onclick="incButton(\''+orderArr[i]+'\')" src="images/bartender/plus.png" alt="Increase"><input type="text" name="quantityInput" id="quantityInput" value='+orderArr[i+2]+'><input type="image" class="decButton" src="images/bartender/minus.png" onclick="decButton(\''+orderArr[i]+'\')" alt="Decrease"></div><input type="image" class="deleteButton" src="images/bartender/delete.png" onclick="deleteFromlist(\''+orderArr[i]+'\')" alt="Delete"></input></div>');
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
			orderArr.splice("", orderArr.length);
			$('#main').html("<div class='main'></div><br>");
			$('#main_total').html("<div id='total_text'>TOTAL:</div>"); 
			sum = 0;
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