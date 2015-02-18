<?php 
  // source: http://openenergymonitor.org/emon/node/107

  $func_id = $_POST['func_id'];

  if ($func_id == "0") {
    login();
  }
  // if ($func_id == "1") {
  //   showUser();
  // } elseif ($func_id == "2") {
  //   getCredit();
  // } elseif ($func_id == "3") {
  //   getAllBeers();
  // }

  // function db_connect() {
  //   $db = mysqli_connect("localhost", "root", "root", "tfd_db");
  //   if (mysql_errno()) {
  //     printf("Connection failed: %s\n", mysqli_connect_error());
  //     exit();
  //   } else {
  //     echo "Connected to db!", PHP_EOL;
  //   }
  //   return $db;
  // }

  
  
  
  // function connect() {
  //   $db = new mysqli("localhost", "root", "", "tfd_db");
  //   echo 'db: ', $db;
  //   if ($db->connect_errno) {
  //     echo "Connect failed: %s\n", $db -> connect_error;
  //     exit();
  //   }
  //   return $db;
  // }

  function login() {
    $db = new mysqli("localhost", "root", "", "tfd_db");
    echo 'db: ', $db, PHP_EOL;
    if ($db->connect_errno) {
      echo "Connect failed: %s\n", $db -> connect_error;
      exit();
    }

    $username = $db->real_escape_string($_POST['username']);
    $password = $db->real_escape_string($_POST['password']);
    echo 'Username: ', $username, PHP_EOL;
    echo 'Password: ', $password, PHP_EOL;

    $sql = "SELECT * FROM users WHERE username='$username'";
    echo 'Sql-command: ', $sql, PHP_EOL;
    $result = $db->query($sql); //returns false on failure, otherwise true
    echo 'result: ', $result, PHP_EOL;
    $sqlResult = $result->num_rows;
    echo 'sqlResult: ', $sqlResult, PHP_EOL;
    if ($sqlResult == 0) {
      echo "User doesn't exists";
      // redirect to login page so the user can enter credentials again
    }
    while ($line = $sqlResult->fetch_array()) {
      $password = stripslashes($password);
      $line['password'] = stripslashes($line['password']);
      $password = md5($password);
      if ($password != $line['password']) {
        die('Incorrect password');
      } else {
        echo "login correct";
      }
    }


  // function login() {
  //   $db = db_connect();
  //   echo 'db: ', $db, PHP_EOL;
  //   $username = mysqli_real_escape_string($db, $_POST['username']);
  //   $password = mysqli_real_escape_string($db, $_POST['password']);
  //   echo 'Username: ', $username, PHP_EOL;
  //   echo 'Password: ', $password, PHP_EOL;

  //   $sql = "SELECT * FROM users WHERE username='$username'";
  //   echo 'Sql-command: ', $sql, PHP_EOL;
  //   $result = mysqli_query($db, $sql); //returns false on failure, otherwise true
  //   echo 'result: ', $result, PHP_EOL;
  //   $sqlResult = $result->mysqli_num_rows;
  //   echo 'sqlResult: ', $sqlResult, PHP_EOL;
  //   if ($sqlResult == 0) {
  //     echo "User doesn't exists";
  //     // redirect to login page so the user can enter credentials again
  //   }
  //   while ($line = $sqlResult-> fetch_array()) {
  //     $password = stripslashes($password);
  //     $line['password'] = stripslashes($line['password']);
  //     $password = md5($password);
  //     if ($password != $line['password']) {
  //       die('Incorrect password');
  //     } else {
  //       echo "login correct";
  //     }
  //   }

 
    // $array = mysqli_fetch_row($result);           
    mysqli_close($db);
    echo json_encode($array);
  }

  // /* func_id = 1 */
  // function showUser() {
  //   $db = db_connect();
  //   $name = mysqli_real_escape_string($db, $_POST['name']);
  //   $sql = "SELECT * FROM users WHERE first_name='$name'";
  //   $result = mysqli_query($db, $sql);            
  //   $array = mysqli_fetch_row($result);           
  //   mysqli_close($db);
  //   echo json_encode($array);
  // }

  // /* func_id = 2 */
  // function getCredit() {
  //   $db = db_connect();
  //   $username = mysqli_real_escape_string($db, $_POST['username']);
  //   $sql = "SELECT credit FROM users WHERE username='$username'";
  //   $result = mysqli_query($db, $sql);            
  //   $array = mysqli_fetch_row($result);           
  //   mysqli_close($db);
  //   echo json_encode($array);
  // }

  // /* func_id = 3 */
  // function getAllBeers() {
  //   $db = db_connect();
  //   $sql = "SELECT namn, prisinklmoms, varugrupp, alkoholhalt FROM sbl_beer INNER JOIN stock ON nr=beer_id";
  //   $result = mysqli_query($db, $sql);            
  //   $array = mysqli_fetch_row($result);           
  //   mysqli_close($db);
  //   echo json_encode($array);
  // }



?>
