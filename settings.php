<?php 

$func_id = $_POST['func_id'];

if ($func_id == "0") {
	addPurchase();
} elseif ($func_id == "1") {
	getLastFive();
}
// $q = $_REQUEST["q"]; 
// if ($q == "1") {
// 	getLastFive();
// }

function db_connect() {
	$db = mysqli_connect("localhost", "root", "root", "tfd_db");
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
	//var_dump($str);

	$inputArray = explode(',', $str);
	$date = new DateTime();
	$date = $date->format('Y-m-d H:i:s');
	$numberSql = "SELECT number FROM beers WHERE number=(SELECT max(number) FROM beers)";
	
	$result = mysqli_query($db, $numberSql);
	if (mysqli_num_rows($result) > 0) {
		$row = mysqli_fetch_row($result);
		//printf("row: %d\n", $row[0]);
		$number = $row[0];
	}
	//$number = mysqli_fetch_row($result)

	printf("number: %d\n", $number);
	if ($number >= 5) { //ev 4
		$numToDelete = $number-4;
		$deleteSql = "DELETE FROM beers WHERE number='$numToDelete'";
		mysqli_query($db, $deleteSql);
	}
	$numToAdd = $number+1;
	//printf("numtoadd: %d\n", $numToAdd);
    
	$max = sizeof($inputArray);
	for ($i=0; $i < $max; $i += 3) { 
    	$name = $inputArray[$i];
    	$price = $inputArray[$i+1];
    	$amount = $inputArray[$i+2];
    	// printf("name: %s\n", $name);
    	// printf("name: %s\n", $numToAdd);
    	// printf("name: %s\n", $date);
    	// printf("name: %s\n", $price);
    	// printf("name: %s\n", $amount);

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
	$resultArray = [];
	$sql = "SELECT * FROM beers ORDER BY number";
	$result = mysqli_query($db, $sql);

	if (mysqli_num_rows($result) > 0) {
    	while ($row = mysqli_fetch_row($result)) {
    		$tmp = [ $row[0], $row[1], $row[2], $row[3], $row[4] ];
    		$resultArray[] = $tmp;
    	}
    }   
    //var_dump($resultArray);
    mysqli_close($db);
    print json_encode($resultArray);   
}



//         $password = stripslashes($password);
//         //echo $password, PHP_EOL;
//         $row[2] = stripslashes($row[2]);
//         //echo $row[2], PHP_EOL;
//         $password = md5($password);
//           $row[1] = stripslashes($row[1]);
//         if ($password != $row[2]) {
//           echo "Wrong password";
//           //TODO: Ask the user to enter credentials again
//         } else if($row[1]== 0){
//               echo "dddddddddd";
//         }
//           else if ($row[1]== 3)
//           {
//               echo "dddddddddd";
//           }
//           //TODO: Redirect the use to correct page
//       }
//     } else {
//         echo "0 results";
//       }
//     }
// }

?>