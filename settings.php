<?php 

$func_id = $_POST['func_id'];

if ($func_id == "0") {
	addPurchase();
} elseif ($func_id == "1") {
	getLastFive();
}

function db_connect() {
	$db = mysqli_connect("sql3.freesqldatabase.com", "sql368767", "kG4%mU7*", "sql368767");
	if (mysql_errno()) {
		printf("Connection failed: %s\n", mysqli_connect_error());
		exit();
	} else {
		//echo "Connection established", PHP_EOL;
	}
	return $db;
}

/* Used to keep track of last five purchases made to the system (this is used by the bartender) */
/* Make sure to call this function with sizeof($str)%3 == 0 */ 
function addPurchase() {
	$db = db_connect();
	$str = $_POST['str']; 

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
    		echo "New record created successfully";
    	} else {
    		echo "Error: " . $sql . "<br>" . mysqli_error($db);
    	}
    }
    mysqli_close($db);
}

function getLastFive() {
	$db = db_connect();
	$resultArray = new ArrayObject();
	$tmpArray = [];

	$numberSql = "SELECT number FROM beers WHERE number=(SELECT min(number) FROM beers)";
	
	$result1 = mysqli_query($db, $numberSql);
	if (mysqli_num_rows($result1) > 0) {
		$row1 = mysqli_fetch_row($result1);
		$number = $row1[0];
	}

	$sql = "SELECT * FROM beers ORDER BY number";
	$result = mysqli_query($db, $sql);

	if (mysqli_num_rows($result) > 0) {
		$tmp2 = $number;
		$tmp = "";
		$oldDate = [];
    	while ($row = mysqli_fetch_row($result)) {
    		if ($tmp2 == $row[0]) {
    			$tmp .= "$row[2],$row[3],$row[4],";
    			$oldDate = $row[1];
    		} else {
    			$tmp .= "$oldDate";
    			$resultArray[] = $tmp;
				$tmp2 = $row[0];
				$tmp = "";
				$tmp = "$row[2],$row[3],$row[4],";
				$oldDate = $row[1];
			}
    		// $tmp = [ $row[0], $row[1], $row[2], $row[3], $row[4] ];
    		// $resultArray[] = $tmp;
    	}
    	$tmp .= $oldDate;
    	$resultArray[] = $tmp;
    }   
    mysqli_close($db);
    print json_encode($resultArray);   
}

?>