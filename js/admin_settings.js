/* Validate email address */
			function validateEmail(email, htmlresult) { 
    			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    			if (htmlresult == '1') {
	    			if (re.test(email))
	    				document.getElementById("resultemail").innerHTML = "<img class='valid' src='images/settings/valid.png' alt='Email valid' title='Email valid'>";
	    			else 
	    				document.getElementById("resultemail").innerHTML = "<img class='valid' src='images/settings/notvalid.png' alt='Email not valid' title='Email not valid'>";
	    		} else 
	    			return re.test(email);
			} 

			/* Validate phone */
			function validatePhone(phone, htmlresult) {
				re = /^\+?(0|[0-9]\d*)$/;;
				if (htmlresult == '1') {
					if (re.test(phone))
	    				document.getElementById("resultphone").innerHTML = "<img class='valid' src='images/settings/valid.png' alt='Phone number valid' title='Phone number valid'>";
	    			else 
	    				document.getElementById("resultphone").innerHTML = "<img class='valid' src='images/settings/notvalid.png' alt='Phone number not valid' title='Phone number not valid (Valid format [+][0-9])'>";
	    		} else 
	    			return re.test(phone);
			}

			/* Create a new user - WORKS, BUT THERE IS NO WAY TO ADD CREDIT TO A USER IN THE API */
			function createNewUser(new_username, new_password, re_password, first_name, last_name, email, phone) {
				httpGetAsync(api+'user_edit&new_username='+new_username+'&new_password='+new_password+'&first_name='+first_name+'&last_name='+last_name+'&email='+email+'&phone='+phone, 
					function callback_success() { 
						return true;
					}, 
					function callback_error(data) {
						console.log('An error occurred: ' + data);
					});
			}

			/* Used to validate password, email and phone before the real API-function gets called */
			function callCreateNewUser(uname, pword, re_password, firstname, lastname, email, phone) {
				if ( (pword == re_password) && (validateEmail(email, '0')) && (validatePhone(phone, '0')) ) {
					console.log("It works");
					//uncomment row below before presentation
					createNewUser(uname, pword, re_password, firstname, lastname, email, phone)
					//CALLs createUser in settings.php to create user in our local DB as well
					$.ajax({      
				      type: 'POST',                        
				      url: 'settings.php',
				      data: 
				      { 
				        func_id : "2",
				        uname : uname,
				        pword : pword,
				        firstname : firstname,
				        lastname : lastname,
				        email : email,
				        phone : phone 
				      },                        
				      dataType: 'json'
				    });
				} else 
					console.log("Either not matching password-fields, incorrect email or phone");
			}

			/* Queries the db for five last receipts */
			function getLastFive() {
				//$('#output').html('<br> Receipts are being loaded...');
			    $.ajax({      
			      type: 'POST',                        
			      url: 'settings.php',
			      data: { 
			        func_id : "1" 
			      },                        
			      dataType: 'json',
			      success: function(data) {
			      	if (data.status == 'success') {
			      		var content = $('#output').html();
			      		$.each(data, function(beer, item) {
			      			var tmp = item.split(",");
			      			if (tmp[tmp.length-1] != 'success') 
			      				content += '<br>' + '<strong>' + tmp[tmp.length-1] +'</strong>'; //the date
			      			for (i=0; i<tmp.length-1; i+=3) {
			      				var t = '<br>';
			      				t += tmp[i];
			      				t += ", " + tmp[i+1] + ', ';
			      				t += " " + tmp[i+2] + ' SEK';
			      				content += t;
			      			}
			      			content += '<br>';
			      		});
			      		$('#output').html(content);
			      	} else {
			      		console.log("db query not correct");	
			      	}
			      }
			    });
  			}