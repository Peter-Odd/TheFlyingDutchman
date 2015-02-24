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
function addPurchase() {
	$db = db_connect();
	$queryArray = mysqli_real_escape_string($db, $_POST['queryArray']); 
	$date = new DateTime();
	$date = $date->format('Y-m-d H:i:s');
	$numberSql = "SELECT number FROM beers WHERE number=(SELECT max(number) FROM beers)";
	$number = mysqli_query($db, $numberSql);
	if ($number >= 5) { //ev 4
		$numToDelete = $number-4;
		$deleteSql = "DELETE FROM beers WHERE number='$numToDelete'";
		mysqli_query($db, $deleteSql);
	}
	$numToAdd = $number+1;
    
    foreach ($queryArray as $q) {
    	$name = $q[0];
    	$price = $q[1];
    	$amount = $q[2];
    	$beerid = $q[3];
    	$sql = "INSERT INTO beers(number, time, name, price, amount, beer_id) VALUES ('$numToAdd', '$date', '$name', '$price', '$amount', '$beerid')";
    	$result = mysqli_query($db, $sql);
    }
}

function getLastFive() {
	$db = db_connect();
	$resultArray = [];
	$sql = "SELECT * FROM beers";
	$result = mysqli_query($db, $sql);

	if (mysqli_num_rows($result) > 0) {
    	while ($row = mysqli_fetch_row($result)) {
    		$tmp = [$row[0], $row[1], $row[2], $row[3], $row[4], $row[5]];
    		$resultArray[] = $tmp;
    		// echo $row[0], PHP_EOL;
    		// echo $row[1], PHP_EOL;
    		// echo $row[2], PHP_EOL;
    		// echo $row[3], PHP_EOL;
    		// echo $row[4], PHP_EOL;
    		// echo $row[5], PHP_EOL;
    		// echo PHP_EOL;
    	}
    }   
    //var_dump($resultArray);
    mysqli_close($db);
    //echo json_encode($resultArray);
    //var_dump($resultArray);
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