<script src="http://code.jquery.com/jquery-2.1.3.min.js"></script>

	<script>
		var barInventory = null;
		var purchases = null;
		
		/* These should be set when user logs in */
		var username = "ervtod";
		var password = "ervtod";

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

		/* Check if the user can log in to the system NOT WORKING YET */ 
		function login(username, password) {
			//if true redirect the user to the main page, and if admin redirect to admin page
			httpGet(api,
				function callback_success() {
					
				},
				function callback_error() {
					
				});
			return false; //ask the user to enter the correct credentials
		}

		/* Create a new user. THERE IS NO WAY TO ADD CREDIT TO A USER IN THE API */
		function createNewUser(new_username, new_password, first_name, last_name, email, phone) {
			httpGet(api+'user_edit&new_username='+new_username+'&new_password='+new_password+'&first_name='+first_name+'&last_name='+last_name+'&email='+email+'&phone='+phone, 
				function callback_success() { 
					return true;
				}, 
				function callback_error(data) {
					console.log('An error occurred: ' + data);
				});
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


			/* TEMP CODE BELOW */
			//var myForm = document.search;
			//var beerName = myForm.beername.value; //beer name is fetched from input form
			//var count = inventory.getBeerInfo(beerName);
	</script>