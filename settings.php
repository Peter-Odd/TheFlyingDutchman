<?php 
header('Content-type: application/json');

$func_id = $_POST['func_id'];

if ($func_id == "0") {
	addReceipt();
} elseif ($func_id == "1") {
	getLastFive();
} elseif ($func_id == "2") {
	createUser();
}

function db_connect() {
	$db = mysqli_connect("sql3.freemysqlhosting.net", "sql369433", "eC1!wM9*", "sql369433");
	if (mysql_errno()) {
		printf("Connection failed: %s\n", mysqli_connect_error());
		exit();
	} else {
		//how to print in php without sending that print to ajax??
		//printf("Connection established\n");
	}
	return $db;
}

/* Used to keep track of last five purchases made to the system (this is used by the bartender) */
/* Make sure to call this function with sizeof($str)%3 == 0 */ 
function addReceipt() {
	$db = db_connect();
	$str = $_POST['str']; 
	$responseArray = [];

	$inputArray = explode(',', $str);
	$date = new DateTime();
	$date = $date->format('Y-m-d H:i:s');
	$numberSql = "SELECT number FROM beers WHERE number=(SELECT max(number) FROM beers)";
	
	$result = mysqli_query($db, $numberSql);
	if (mysqli_num_rows($result) > 0) {
		$row = mysqli_fetch_row($result);
		$number = $row[0];
	}

	if ($number >= 5) { 
		$numToDelete = $number-4;
		$deleteSql = "DELETE FROM beers WHERE number='$numToDelete'";
		mysqli_query($db, $deleteSql);
	}
	$numToAdd = $number+1;
    
	$max = sizeof($inputArray);
	for ($i=0; $i < $max; $i += 3) { 
    	$name = $inputArray[$i];
    	$price = $inputArray[$i+1];
    	$amount = $inputArray[$i+2];

    	$sql = "INSERT INTO beers(number, time, name, price, amount) VALUES ('$numToAdd', '$date', '$name', '$price', '$amount')";
    	if (mysqli_query($db, $sql)) {
    		$responseArray['status'] = 'success';
    	} else {
    		$responseArray['status'] = 'error';
    	}
    }
    mysqli_close($db);
    echo json_encode($responseArray);
}

/* Queries the db for five last receipts */
function getLastFive() {
	$db = db_connect();
	$receipt = new ArrayObject();

	$sql = "SELECT number FROM beers WHERE number=(SELECT min(number) FROM beers)";
	
	$result = mysqli_query($db, $sql);
	//TODO: make safe, check if query ok
	if (mysqli_num_rows($result) > 0) {
		$row = mysqli_fetch_row($result);
		$number = $row[0];
	}

	$sql = "SELECT * FROM beers ORDER BY number";
	$result = mysqli_query($db, $sql);
	//TODO: make safe, check if query ok

	if (mysqli_num_rows($result) > 0) {
		$receiptRow = "";
		//$receipt[] = "success";
		$oldDate = [];
    	while ($row = mysqli_fetch_row($result)) {
    		if ($number == $row[0]) {
    			$receiptRow .= "$row[2],$row[3],$row[4],";
    			$oldDate = $row[1];
    		} else {
    			$receiptRow .= "$oldDate";
    			$receipt[] = $receiptRow;
				$number = $row[0];
				$receiptRow = "";
				$receiptRow = "$row[2],$row[3],$row[4],";
				$oldDate = $row[1];
			}
    	}
    	$receiptRow .= $oldDate;
    	$receipt[] = $receiptRow;
    	$receipt['status'] = 'success';
    }   
    mysqli_close($db);
    print json_encode($receipt);   
}

	/* create a new user to this database if a new user is created in the API */
    function createUser() {
      $db = db_connect();
      $uname = mysqli_real_escape_string($db, $_POST['uname']);
      $pword = mysqli_real_escape_string($db, $_POST['pword']);
      $firstname = mysqli_real_escape_string($db, $_POST['firstname']);
      $lastname = mysqli_real_escape_string($db, $_POST['lastname']);
      $email = mysqli_real_escape_string($db, $_POST['email']);
      $phone = mysqli_real_escape_string($db, $_POST['phone']);
      $password = md5($pword);
      $sql = "INSERT INTO users(credentials, password, username, first_name, last_name, email, phone, credit, debt) VALUES (3,'$password','$uname','$firstname','$lastname','$email','$phone',0,0)";
      if (mysqli_query($db, $sql)) {
        echo "New record created successfully";
      } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($db);
      }
      mysqli_close($db);
    }



?>





