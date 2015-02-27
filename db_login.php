<?php 
/*$func_id = $_POST['func_id'];

  if ($func_id == "0") {
    login();
  } elseif ($func_id == "1") {
    createUser();
  }*/

  function db_connect() {
    $db = mysqli_connect("sql3.freesqldatabase.com", "sql368767", "kG4%mU7*", "sql368767");
    if (mysql_errno()) {
      printf("Connection failed: %s\n", mysqli_connect_error());
      exit();
    } else {
      echo "Connection established", PHP_EOL;
    }
    return $db;
  }

    if (isset($_POST['submit'])) {
        //function login() {
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
                $row[1] = stripslashes($row[1]);
                $row[0] = stripslashes($row[0]);
                $row[3] = stripslashes($row[3]);
                $row[4] = stripslashes($row[4]);
                $row[5] = stripslashes($row[5]);
                $row[6] = stripslashes($row[6]);
                $row[7] = stripslashes($row[7]);
                $row[8] = stripslashes($row[8]);
                $row[9] = stripslashes($row[9]);
                $hour = time() + 3600;
                setcookie("user_id", $row[0], $hour);
                setcookie("credentials", $row[1], $hour);
                setcookie("password", $row[2], $hour);
                setcookie("username", $row[3], $hour);
                setcookie("fname", $row[4], $hour);
                setcookie("lname", $row[5], $hour);
                setcookie("email", $row[6], $hour);
                setcookie("phone", $row[7], $hour);
                setcookie("credit", $row[8], $hour);
                setcookie("debt", $row[9], $hour);

                if ($password != $row[2]) {

                    header("Location:index.html");
                } else if ($row[1] == 0) {
                    header("Location:bartender.html");
                } else if ($row[1] == 3) {
                    header("Location:vip.html");
                }
            }
        } else {
            echo "0 results";

        }
        mysqli_close($db);
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
