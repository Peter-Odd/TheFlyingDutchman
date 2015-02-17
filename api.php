<?php 
  // source: http://openenergymonitor.org/emon/node/107

  $func_id = $_POST['func_id'];

  if ($func_id == "1") {
    showUser();
  } elseif ($func_id == "2") {
    getCredit();
  } elseif ($func_id == "3") {
    getAllBeers();
  }

  function db_connect() {
    $db = mysqli_connect("localhost", "root", "root", "TFD");
    if (mysql_errno()) {
      printf("Connection failed: %s\n", mysqli_connect_error());
      exit();
    }
    return $db;
  }

  /* func_id = 1 */
  function showUser() {
    $db = db_connect();
    $name = mysqli_real_escape_string($db, $_POST['name']);
    $sql = "SELECT * FROM users WHERE first_name='$name'";
    $result = mysqli_query($db, $sql);            
    $array = mysqli_fetch_row($result);           
    mysqli_close($db);
    echo json_encode($array);
  }

  /* func_id = 2 */
  function getCredit() {
    $db = db_connect();
    $username = mysqli_real_escape_string($db, $_POST['username']);
    $sql = "SELECT credit FROM users WHERE username='$username'";
    $result = mysqli_query($db, $sql);            
    $array = mysqli_fetch_row($result);           
    mysqli_close($db);
    echo json_encode($array);
  }

  /* func_id = 3 */
  function getAllBeers() {
    $db = db_connect();
    $sql = "SELECT namn, prisinklmoms, varugrupp, alkoholhalt FROM sbl_beer INNER JOIN stock ON nr=beer_id";
    $result = mysqli_query($db, $sql);            
    $array = mysqli_fetch_row($result);           
    mysqli_close($db);
    echo json_encode($array);
  }


?>
