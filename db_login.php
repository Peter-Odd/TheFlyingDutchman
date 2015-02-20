<?php 
  $func_id = $_POST['func_id'];

  if ($func_id == "0") {
    login();
  }

  function db_connect() {
    $db = mysqli_connect("localhost", "root", "root", "tfd_db");
    if (mysql_errno()) {
      printf("Connection failed: %s\n", mysqli_connect_error());
      exit();
    } else {
      echo "Connection established", PHP_EOL;
    }
    return $db;
  }

  function login() {
    $db = db_connect();
    $username = mysqli_real_escape_string($db, $_POST['username']);
    $password = mysqli_real_escape_string($db, $_POST['password']);
    //echo md5($password);
    //echo PHP_EOL;
    $sql = "SELECT * FROM users WHERE username='$username'";
    $result = mysqli_query($db, $sql);

    if (mysqli_num_rows($result) > 0) {
      while ($row = mysqli_fetch_row($result)) {
        $password = stripslashes($password);
        //echo $password, PHP_EOL;
        $row[2] = stripslashes($row[2]);
        //echo $row[2], PHP_EOL;
        $password = md5($password);
        if ($password != $row[2]) {
          echo "Wrong password";
          //TODO: Ask the user to enter credentials again
        } else {
          echo "Correct password";
          //TODO: Redirect the use to correct page
        }
      }
    } else {
        echo "0 results";
      }
    mysqli_close($db);
    }

    /* TO BE IMPLEMENTED: 
        * create a new user to this database if a new user is created in the API

    */
?>
