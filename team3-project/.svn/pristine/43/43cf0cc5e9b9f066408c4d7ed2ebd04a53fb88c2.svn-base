<!--retreives information from the database Pub-->

<?php

// Class that keeps a mysqli connection of the pub database
class PubDBQuerries{
	private $mysqli;

	// makes a new mysqli class of Pub DB
	function __construct(){
		$this -> mysqli = new mysqli("localhost", "root", "", "pub");
		//$this -> mysqli->set_charset("utf8");

		if ($this ->mysqli->connect_errno) {
			printf("Connect failed: %s\n", $this -> mysqli ->connect_error);
			exit();
		}
	}

// the loggin function, makes cookie	
function loggin($username,$password){

	$username = $this->mysqli->real_escape_string($username);
	//$password = mysqli_real_escape_string($password);
	
	$result = $this -> mysqli -> query("SELECT * FROM users WHERE username = '$username'")or die("querry failed!"); 
	//Gives error if user dosen't exist
	$check = $result-> num_rows;
	if ($check == 0) { 
	 	echo "That user does not exist in our database. <a href=newCustomer.php>Click Here to Register</a> <a href=index.html>Click Back to homepage</a>"; 
	 	} 
	while($line = $result -> fetch_array())   { 
	 	$password = stripslashes($password);
	 	$line['password'] = stripslashes($line['password']);
	 	$password = md5($password);
	 	//gives error if the password is wrong
	 	if ($password != $line['password']) { 
	 		die('Incorrect password, please try again.<a href=index.html>Back to homepage</a>');
	 		  }

	 	else   { 
		 	// if login is ok then we add a cookie
		 	$hour = time() + 3600;
			
			setcookie("user_id", $line['user_id'], $hour);
		 	setcookie("user", $line['username'], $hour);
		 	setcookie("fname", $line['first_name'], $hour);
		 	setcookie("lname", $line['last_name'], $hour);
		 	setcookie("email", $line['email'], $hour);
		 	setcookie("credentials", $line['credentials'], $hour);
		 	setcookie("id", $line['password'], $hour);
		 	setcookie("credit", $line['credit'], $hour);
		 	setcookie("debt", $line['debt'], $hour);

		}
	}

	$result->close();
}

function loggedInCheck(){

if(isset($_COOKIE['user']))   {
   $username = $_COOKIE['user'];
   $pass = $_COOKIE['id'];
   $result = $this -> mysqli -> query("SELECT * FROM users WHERE username = '$username'")or die($mysqli -> error());
   while($info = $result -> fetch_array())   {
   //if the cookie has the wrong password, they are taken to the login page
	   if ($pass != $info['password'])   {
	    header("Location: index.html");
	   }
	   }
   }
   else
   //if the cookie does not exist, they are taken to the login screen
    {   header("Location: index.html");   } 
}

// adds new user information into the users table, cretes cookie and sends user to order.php
function addNewUser($username, $password, $name, $address, $fname, $phone){

		$password_hash=md5($password);

		$sql_username= $this-> mysqli->real_escape_string($username);
		$sql_name= $this-> mysqli->real_escape_string($name);
		$sql_fname= $this-> mysqli->real_escape_string($fname);
		$sql_address= $this-> mysqli->real_escape_string($address);
		$sql_phone= $this-> mysqli->real_escape_string($phone);
		$sql_password=$this-> mysqli->real_escape_string($password_hash);

		//kollar dubblett av namn
		$q1="SELECT username FROM users WHERE username = '$sql_username'";
		$result = $this -> mysqli->query($q1) or die("Query failed");
		$row= $result ->num_rows;

		if ($row==0){
			$result->close();
			$q2 = "INSERT INTO users (credentials,password,username,first_name,last_name,email,phone) VALUES (3,'$sql_password', '$sql_username', '$sql_name', '$sql_fname', '$sql_address', '$sql_phone')";
			$result = $this-> mysqli->query($q2) or die ("could not post value");

			$hour = time() + 3600;

			setcookie("user", $sql_username, $hour);
		 	setcookie("fname", $sql_name, $hour);
		 	setcookie("lname", $sql_fname, $hour);
		 	setcookie("email", $sql_address, $hour);
		 	setcookie("credentials", 3, $hour);
		 	setcookie("id", $sql_password, $hour);
		 	setcookie("credit", 0, $hour);
		 	setcookie("debt", 0, $hour);
			header("Location: order.php");
		}

		//Om det är en dubblett (samma username) så görs inget varning skrivs ut
		else{
			echo "Username already in use. ";
			echo "<a href='javascript:history.back()''>Back</a>";
		}
}

//-----------------Boolean minilbris database searches--------------------------------------------------------
	
	// boolean true if beer_id is in the stock table
	function isStocked($beer_id){
		$q1 = "SELECT * FROM stock WHERE beer_id= '$beer_id'" ;
		$result = $this -> mysqli -> query($q1) or die ("query failed!");

		if (mysqli_num_rows($result)==0){
			return false;
			}
		else{
			return true;
			}
		$result -> close();
	}

//------------------------------ Functions that echoes beer table --------------------------------------------


	//returns all items that have lower in_stock value than the threshold
	function orderOnLowStock(){

		$q1 = "SELECT * FROM sbl_beer INNER JOIN stock ON nr=beer_id WHERE in_stock<threshold";
		$result= $this -> mysqli -> query($q1) or die ("query failed!");

		$this->makeOrderTable($result);
		$result -> close();
	}

	//set the stock value
	function changeStock($beer_id,$value){

		$q1="UPDATE stock SET in_stock= '$value' WHERE beer_id='$beer_id'";
		$result= $this -> mysqli -> query($q1) or die ("query failed!");
	}


	//Stores the delivered items into beers_bought, updates inserts into stock
	function deliveryUpdate($user_id, $beer_id,$amount,$price){

		$q1="INSERT INTO beers_bought (admin_id,beer_id,amount,price) VALUES ('$user_id', '$beer_id','$amount','$price')";
		$result= $this -> mysqli -> query($q1) or die ("query 1 failed!");

		if ($this->isStocked($beer_id)){
			$q2="UPDATE stock SET in_stock= in_stock +'$amount' WHERE beer_id='$beer_id'";
		}
		else {
			$q2="INSERT IGNORE INTO stock (beer_id, in_stock, threshold, order_amount) VALUES('$beer_id', '$amount', 20,20)";
		}
		$result= $this -> mysqli -> query($q2) or die ("query 3 failed!");
	}

	//function inserts new line in beers_sold table and updates the in_stock in stock table
	function buyBeer($beer_id, $user_id,$amount){

		for ($i=0;$i<$amount;$i++){
			$q1="INSERT INTO beers_sold (user_id,beer_id) VALUES ('$user_id', '$beer_id')";
			$result= $this -> mysqli -> query($q1) or die ("query failed!");
		}

		$q2="UPDATE stock SET in_stock= in_stock -'$amount' WHERE beer_id='$beer_id'";
		$result= $this -> mysqli -> query($q2) or die ("query failed!");
	}

	//updates the customer debt
	function updateDebt($user_id,$cost){

		$q2="UPDATE users SET debt= debt +'$cost' WHERE user_id='$user_id'";
		$result= $this -> mysqli -> query($q2) or die ("query failed!");
	}

	//updates the customer debt
	function updateDebtUsername($username,$cost){

		$q2="UPDATE users SET debt= debt +'$cost' WHERE username='$username'";
		$result= $this -> mysqli -> query($q2) or die ("query failed!");
	}

	//lists all beer
	function listAllBeers(){
		
		$q1 = "SELECT * FROM sbl_beer INNER JOIN stock ON nr=beer_id";
		$result= $this -> mysqli -> query($q1) or die ("query failed!");
        echo "<tr>All Beers</tr>";
		$this->makeAllBeerTable($result);
		$result -> close();
		}

	// list all statistics from the sbl and stock table
    function listStatistics(){

        $q1 = "SELECT * FROM sbl_beer INNER JOIN stock ON nr=beer_id";
        $result= $this -> mysqli -> query($q1) or die ("query failed!");

        $this->makeStatisticTable($result);
        $result -> close();
    }

	// Search for part of the beer name
	function searchPartName($str){

		if($str==""){
			echo "Enter something to search!";
		}

		else {
			$q1 = "SELECT * FROM sbl_beer INNER JOIN stock ON nr=beer_id WHERE namn LIKE '%$str%'";
			$result= $this -> mysqli -> query($q1) or die ("query failed!");

			if (mysqli_num_rows($result)==0){
				echo "No such beer title $str";
			}
			else{
				$this -> makeBeerTable($result);
			}
			$result -> close();
		}
	}

	// Search for country of the beer
	function searchCountry($str){

		if($str==""){
			echo "Enter something to search!";
		}

		else {
			$q1 = "SELECT * FROM sbl_beer INNER JOIN stock ON nr=beer_id WHERE ursprunglandnamn LIKE '%$str%'";
			$result= $this -> mysqli -> query($q1) or die ("query failed!");

			if (mysqli_num_rows($result)==0){
				echo "No such country title $str";
			}
			else{
				$this -> makeAllBeerTable($result);
			}
			$result -> close();
		}
	}

	//changes credentials for the user
	function changeCredential($username,$value){
		$q1="UPDATE users SET credentials = '$value' WHERE username='$username'";
		$result= $this -> mysqli -> query($q1) or die ("query failed!");
	}

	//sets the credit to the given value in database
	function setCredit($username,$value){
		$q1="UPDATE users SET credit = '$value' WHERE username='$username'";
		$result= $this -> mysqli -> query($q1) or die ("query failed!");
	}

	//Lists 5 recent purchases of user
	function recentPurchase($user_id){

		$q1 = "SELECT * FROM 
				( SELECT MAX(T1.timestamp) AS lastTimestamp, T1.beer_id, T2.namn, T3.in_stock,
					T2.nr, T2.prisinklmoms, T2.varugrupp,T2.ursprunglandnamn,T2.alkoholhalt,
				count(1) AS noPurchased FROM beers_sold T1 
				INNER JOIN sbl_beer T2 ON T1.beer_id=T2.nr 
				INNER JOIN stock T3 ON T1.beer_id=T3.beer_id 
				WHERE T1.user_id='$user_id' 
				GROUP BY T1.beer_id, T2.namn, T3.in_stock,T2.nr, T2.prisinklmoms, T2.varugrupp,T2.ursprunglandnamn,T2.alkoholhalt
				) AS T 
				ORDER BY T.lastTimestamp DESC 
				LIMIT 5";


		$result= $this -> mysqli -> query($q1) or die ("query failed $user_id");
		$this -> makeBeerTable($result);

	}

	//returns this years sale
	function yearSales(){
		$q1 = "SELECT * FROM sbl_beer
				 INNER JOIN beers_sold ON nr=beer_id
				  WHERE YEAR(timestamp)=YEAR(CURRENT_DATE)";
			$result= $this -> mysqli -> query($q1) or die ("query failed!");

			if (mysqli_num_rows($result)==0){
				echo "No sales this month";
			}
			else{
				$this -> makeSaleTable($result);
			}
			$result -> close();
	}

	//returns the current months sale
	function monthSales(){
		$q1 = "SELECT * FROM sbl_beer
				 INNER JOIN beers_sold ON nr=beer_id
				  WHERE MONTH(timestamp)=MONTH(CURRENT_DATE)  AND YEAR(timestamp)=YEAR(CURRENT_DATE)";
			$result= $this -> mysqli -> query($q1) or die ("query failed!");

			if (mysqli_num_rows($result)==0){
				echo "No sales this month";
			}
			else{
				$this -> makeSaleTable($result);
			}
			$result -> close();
	}

	//returns the current week sale
	function weekSales(){
		$q1 = "SELECT * FROM sbl_beer
				 INNER JOIN beers_sold ON nr=beer_id
				  WHERE WEEK(timestamp)=WEEK(CURRENT_DATE) AND YEAR(timestamp)=YEAR(CURRENT_DATE)";
			$result= $this -> mysqli -> query($q1) or die ("query failed!");

			if (mysqli_num_rows($result)==0){
				echo "No sales this week";
			}
			else{
				$this -> makeSaleTable($result);
			}
			$result -> close();
	}

	//ehoes out a table from  the sale table
	function makeSaleTable($result){
		echo "<table width='550' border=0>
				<tr>
				<th>Name</th>
				<th>Price</th>
				<th>Date</th>
				</tr>
				<br>";

				while ($line = mysqli_fetch_array($result)) {
										
					$s2 = $line['namn'];
					$s3 = $line['prisinklmoms'];
					$s4 = $line['timestamp'];
					
					echo "<tr>";
					echo "<td>$s2</td>";
					echo "<td>$s3</td>";
					echo "<td>$s4</td>";
					echo "</tr>";
				}
				echo "</table>";

	}


	// echoes out a table of beer(s) information from the database.
	function makeAllBeerTable($result){
		
		echo " <table border='0' width=100% height='600' style='display: block; overflow-y: scroll; overflow-x: hidden'>
				<tr>
				<th>Name</th>
				<th>Price</th>
				<th>Type</th>
				<th>Country</th>
				<th>Stock</th>
				<th></th>
				</tr>";

				while ($line = mysqli_fetch_array($result)) {

					$s1 = $line['nr'];
					$s2 = switchString($line['namn']);
					$s3 = $line['prisinklmoms'];
					$s4 = $line['varugrupp'];
					$s5 = $line['ursprunglandnamn'];
					$s6 = $line['alkoholhalt'];
					echo "<tr id=\"'$s1'\" draggable = 'true' ondragstart='drag(event)'>";
					
					
					echo "<td> $s2 </td>";
					echo "<td>$s3</td>";
					echo "<td>$s4</td>";
					echo "<td>$s5</td>";

					if (isset($line['in_stock'])){
						$s8 = $line['in_stock'];
						echo "<td>$s8</td>";
						}
					echo "<td><button class='button' onclick=\"addBeer('$s2','$s3','$s1')\" value=\"$s2\"> <img src='style/chart2.png' width=30 height=30/> </td>";
					echo "</tr>";
				}
				echo "</table>";
			}


	// echoes out a table with information from the sbl and stock table
	function makeBeerTable($result){
		
		$num=$result->num_rows;

		if ($num!=0){

			echo " <table border=0 width=572>
					<tr>
					<th>Name</th>
					<th>Price</th>
					<th>Type</th>
					<th>Country</th>
					<th>Stock</th>
					<th></th>
					</tr>";

					while ($line = mysqli_fetch_array($result)) {

						$s1 = $line['nr'];
						$s2 = switchString($line['namn']);
						$s3 = $line['prisinklmoms'];
						$s4 = $line['varugrupp'];
						$s5 = $line['ursprunglandnamn'];
						$s6 = $line['alkoholhalt'];
						echo "<tr id=\"'$s1'\" draggable = 'true' ondragstart='drag(event)'>";
						
						echo "<td>$s2</td>";
						echo "<td>$s3</td>";
						echo "<td>$s4</td>";
						echo "<td>$s5</td>";

						if (isset($line['in_stock'])){
							$s8 = $line['in_stock'];
							echo "<td>$s8</td>";
							}
						echo "<td><button class='button' onclick=\"addBeer('$s2','$s3','$s1')\" value='$s2'> <img src='style/chart2.png' width=30 height=30/> </td>";
						echo "</tr>";
					}
					echo "</table>";
				}
		}

	// echoes out a table of beer(s) information from the database.
	function makeOrderTable($result){
		
		echo " <table border='0' width='550'>
				<tr>
				<th>Id</th>
				<th>Name</th>		
				<th>Amount to order</th>
				</tr>";

				while ($line = mysqli_fetch_array($result)) {
					echo "<tr>";
					$s1 = $line['nr'];
					$s2 = switchString($line['namn']);
					$s3 = $line['order_amount'];
										
					echo "<td>$s1</td>";
					echo "<td>$s2</td>";
					echo "<td>$s3</td>";
				}
				echo "</table>";
			}


	//echoes out statistics table
    function makeStatisticTable($result){

        echo "<table width= '550' border=0 >
				<tr>
				<th>Name</th>
				<th>Stock</th>
				</tr>
				<br>";

        while ($line = mysqli_fetch_array($result)) {
            echo "<tr>";
            $s2 = $line['namn'];

            echo "<td>$s2</td>";
            if (isset($line['in_stock'])){
                $s8 = $line['in_stock'];
                echo "<td>$s8</td>";
            }
            echo "</tr>";
        }
        echo "</table>";
    }

    // returns debt and credit for user_id
    function getDebtCredit($user_id){
    	$q1 = "SELECT credit,debt FROM users WHERE user_id = '$user_id'";
		$result= $this -> mysqli -> query($q1) or die ("query failed!");

		return $result;
		$result -> close();
    }

    //return user information in the form of a table
	function getUser($username){
		$q1 = "SELECT * FROM users WHERE username = '$username'";
		$result= $this -> mysqli -> query($q1) or die ("query failed!");

			echo "<table id = 'user_table'>
				<tr>
				<th>Username:</th>
				<th>Name:</th>
				<th>Last Name:</th>
				<th>Email:</th>
				<th>Phone:</th>
				<th>Credentials:</th>
				<th>Credit:</th>
				<th>Debt:</th>
				</tr>
				<br>";

			while ($line = mysqli_fetch_array($result)) {
										
					$s2 = $line['username'];
					$s3 = $line['first_name'];
					$s4 = $line['last_name'];
					$s5 = $line['email'];
					$s6 = $line['phone'];
					$s7 = $line['credentials'];
					$s8 = $line['credit'];
					$s9 = $line['debt'];
					
					echo "<tr>";					
					echo "<td>$s2</td>";
					echo "<td>$s3</td>";
					echo "<td>$s4</td>";
					echo "<td>$s5</td>";
					echo "<td>$s6</td>";
					echo "<td>$s7</td>";
					echo "<td>$s8</td>";
					echo "<td>$s9</td>";

				echo "</table>";
			}
			$result -> close();
		}

	function closeMysqli(){
		$this -> mysqli -> close();
	}
}
	//function that replaces ' with empty string
	function switchString($name){
	    $name=str_replace("'","",$name);
	    return $name;
	    
}


//--------------------------------------class ends-------------------------------------------------------------------------

?>