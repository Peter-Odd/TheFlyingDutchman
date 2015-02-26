
		var barInventory = null;
		var purchases = null;
		
		/* These should be set when user logs in */
		var username = "ervtod";
		var password = "ervtod";
		var sum = 0;
		var orderArr = new Array();

		var api = "http://pub.jamaica-inn.net/fpdb/api.php?username="+username+"&password="+password+"&action=";


		/* Contains all data about the beverages in the bar */
		function inventoryObject() {
			this.inven = Object.create(null);

			this.setValue = function(name, price, id, count) {
				this.inven[name] = [price, id, count];
			}

			/* If set count then make sure the API is updated */
			this.setCount = function(name, count) { 
				console.log(this.getId("yeti") +" "+ this.getPrice("yeti"));
				httpGet(api+'inventory_append&beer_id='+this.getId(name)+'&amount='+count+'&price='+this.getPrice(name), null);
				this.inven[name][2] += count;
				return true;
			}

			/* returns array with all the beverages in the bar. [0]=price [1]=id [2]=amount */
			this.getAllInventory = function() {
				var inventory = new Object();
				for (bev in this.inven) {
					if (bev == "")
						continue;
					inventory[bev] = [ this.inven[bev][0], this.inven[bev][1], this.inven[bev][2] ];
				}
				return inventory;
			}

			this.getBeerInfo = function(name) {
				return this.inven[name];
			}

			this.getPrice = function(name) {
				return this.inven[name][0];
			}

			this.getId = function(name) {
				return this.inven[name][1];
			}

			this.getCount = function(name) {
				return this.inven[name][2];
			}
			return this;
		}

		/* Contains purchase data, NOT IMPLEMENTED */
		function purchaseObject() {
			this.purch = Object.create(null);

			return this;
		}


		/* Used to access the API */
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

		/* Create a new user. OBS: THERE IS NO WAY TO ADD CREDIT TO A USER IN THE API */
		function createNewUser(new_username, new_password, re_password, first_name, last_name, email, phone) {
			//if ( new_password === re_password && validateEmail(email) && validatePhone(phone) ) {
				//console.log(new_username + " " + new_password + " " + re_password + " " + first_name + " " + last_name + " " + email + " " + phone + ".");
				httpGet(api+'user_edit&new_username='+new_username+'&new_password='+new_password+'&first_name='+first_name+'&last_name='+last_name+'&email='+email+'&phone='+phone, 
					function callback_success() { 
						return true;
					}, 
					function callback_error(data) {
						console.log('An error occurred: ' + data);
					});
			// } else {
			// 	console.log("Password fields don't match");
			// }
		}

		/* User specific functions (purchases) WORKS */
		function getFiveLastPurchases() {
			var lastFive = [];
			httpGet(api+'purchases_get', 
			 	function callback_success(data) {
			 		for (var i=0; i<5; i++) {
			 			lastFive[i] = data.payload[i];
			 		}
			 	},
			 	function callback_error(data) {
			 		console.log('An error occurred: ' + data);
			 	});
			// Data can be accessed this way:
			// console.log(lastFive[0].namn);
			// console.log(lastFive[0].namn2);
			// console.log(lastFive[0].transaction_id);
			// console.log(lastFive[0].user_id);
			// console.log(lastFive[0].beer_id);
			// console.log(lastFive[0].price);
			// console.log(lastFive[0].timestamp);
			return lastFive;
		}

	

			/* User specific functions (purchases) WORKS */
/*		function getFiveLastPurchasesAdmin() {
			var lastFive = new Set();

			httpGet(api+'purchases_get_all', 
			 	function callback_success(data) {
			 		var i = 0;
			 		var a = 0;
			 		 while(lastFive.size < 5){
			 			
						 if(data.payload[i].namn == "") {
						 	i++;
						 }
						 else{
			 		 		lastFive.add(data.payload[i].namn);
			 		 		i++;
			 		 	}
			 		 }

			 		 for (item of lastFive) {

				 		 var tmphtml = $('#searchBeer2').html();
				 	
				 		 $('#searchBeer2').html(tmphtml+'<div class="beerButton" onclick="placeOrder(\''+item+'\'')">"+item+", "+getBeer(item)[0]+'' SEK</div><br>'');
				 	//	 $('#searchBeer2').html(tmphtml+'<div class="beerButton" onclick="placeOrder(\''+txt+'\')">'+txt+'</div><br>');
				 		// console.log(item);

				 		 a++;

			 		}
			 	},

			 	function callback_error(data) {
			 		console.log('An error occurred: ' + data);
			 	});

			// Data can be accessed this way:
			// console.log(lastFive[0].namn);
			// console.log(lastFive[0].namn2);
			// console.log(lastFive[0].transaction_id);
			// console.log(lastFive[0].user_id);
			// console.log(lastFive[0].beer_id);
			// console.log(lastFive[0].price);
			// console.log(lastFive[0].timestamp);
			return lastFive;
		}
*/

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
					var tmphtml = $('#searchBeer2').html();
				 	$('#searchBeer2').html('<div class="beerButtonSearch" onclick="placeOrder(\''+txt+'\')">'+txt+', '+getBeer(txt)[0]+ ' SEK</div><br>'+tmphtml);
			 	}
			 		},

			 	function callback_error(data) {
			 		console.log('An error occurred: ' + data);
			 	});
					return uniqueLastFive;
				}


		function placeOrder(txt){
			
		/*	if find beer in order LIST
				add quantity to input
			else
				create new div */


			sum = sum + getBeer(txt)[0];
			var tmphtml = $('#main').html();
			$('#main').html(tmphtml+'<div class="beerButtonOrder"><div class ="orderText">'+txt+', '+getBeer(txt)[0]+' SEK</div><div class="quantity"><input type="image" class="incButton" src="images/bartender/plus.png" alt="Increase"><input type="text" name="quantityInput" id="quantityInput" value="1"><input type="image" class="decButton" src="images/bartender/minus.png" alt="Decrease"></div><input type="image" class="deleteButton" src="images/bartender/delete.png" alt="Delete"></input></div>');
			$('#main_total').html("<div id='total_text'>TOTAL: "+sum+" SEK</div>");

			/* DELETE BEER FROM ORDER LIST AND UPDATE SUM */
			$('.deleteButton').on('click',function(){
    			$(this).parent('div.beerButtonOrder').remove();
    			var $button = $(this);
				var amount = $button.parent().find("input").val();
    			sum = sum - (getBeer(txt)[0] * amount);
				$('#main_total').html("<div id='total_text'>TOTAL: "+sum+" SEK</div>");
			});

			/* INCREASE INPUT WHEN + IS CLICKED*/
			$(".incButton").on("click", function() {
				var $button = $(this);
				 
				if( ($button.parent().find("input").val()) > 1) {
					var oldValue = $button.parent().find("input").val();
		      		var newVal = parseFloat(oldValue) + 1;
		      		sum = sum + getBeer(txt)[0];
		      		$('#main_total').html("<div id='total_text'>TOTAL: "+sum+" SEK</div>");
				}
				else{
					var newVal = 2;
					sum = sum + getBeer(txt)[0];				
					$('#main_total').html("<div id='total_text'>TOTAL: "+sum+" SEK</div>");
				}

		 		$button.parent().find("input").val(newVal);
			});

			/* DECREASE INPUT WHEN - IS CLICKED*/
				$(".decButton").on("click", function() {
		  			var $button = $(this);
		  			var oldValue = $button.parent().find("input").val();

	    			if (oldValue > 1) {
	      				var newVal = parseFloat(oldValue) - 1;
	      				sum = sum - getBeer(txt)[0];
		      			$('#main_total').html("<div id='total_text'>TOTAL: "+sum+" SEK</div>");

	    			} 
	    			else {
	      				newVal = 1;
	    			}

	 			$button.parent().find("input").val(newVal);
			});
		}

	


		/* Returns user balance WORKS */
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

		/* Create the inventory object WORKS */
		function createInventory() {
			barInventory = new inventoryObject();
			httpGet(api+'inventory_get', 
				function callback_success(data) {
					$.each(data.payload, function(key, item) {
						if (item.namn == "") { /* remove beers with no name */ } 
							else {
								barInventory.setValue(item.namn.toLowerCase(), 
								parseInt(item.pub_price.toLowerCase()), 
								parseInt(item.beer_id.toLowerCase()), 
								parseInt(item.count.toLowerCase()));
							}
					});
				}, 
				function callback_error(data) {
					console.log('An error occurred: ' + data);
				});	
		}

		/* Buy a beer.. now it buys two. Why?! */
		function buyBeer(name) {
			if (barInventory == null) { createInventory(); }
			httpGet(api+'purchases_append&beer_id='+barInventory.getBeerInfo(name.toLowerCase())[1],
				function callback_success(data) {
					console.log("You just bought yourself a beer!");
					//subtract beer count for name by 1
				}, function callback_error(data) {
					console.log('An error occurred: ' + data);
				});
		}

		/*returns all beverages in the system WORKS */
		function getAllBeverages() {
			if (barInventory == null) { createInventory(); }
			return barInventory.getAllInventory();
		}

		/* return data for specific beer. [0]=price, [1]=id, [2]=count WORKS*/
		function getBeer(beer) {
			if (barInventory == null) { createInventory(); }
			var beerData = barInventory.getBeerInfo(beer.toLowerCase());
			return beerData;
		}

		/* Update the beer count for a specific beer */
		//NOT WORKING PERFECT
		function setBeerCount(beer, newCount) {
			if (newCount === parseInt(newCount, 10)) {
				if (barInventory == null) { createInventory(); }
				return barInventory.setCount(beer.toLowerCase(), newCount);
			} else {
				console.log(newCount + ' is not an integer.');
			}
		}


		//NEW FUNCTIONS, SHOLUD MAYBE BE MOVED SOMEWHERE ELSE(?)

		/* EMPTY THE ORDER COLUMN, RESET THE TOTAL SUM AND DELETE BOUGHT BEER FROM DATABASE */
		function finishOrder() {

			/*Deletes all beerButtons, change class on searchBeer2 if we dont wnat them to be deleted*/
			//$( ".beerButton" ).remove();

			/* Deletes only main, keeps beerButtons in searchBeer2 */
			$('#main').html("<div class='main'></div><br>");

			$('#main_total').html("<div id='total_text'>TOTAL:</div>"); 
			sum = 0;
		}