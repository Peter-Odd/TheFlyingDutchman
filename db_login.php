<?php
ob_start();

  function db_connect() {
//connect the online DB
    $db = mysqli_connect("sql3.freemysqlhosting.net", "sql370793", "jF8*tW6*", "sql370793");
    if (mysql_errno()) {
      exit();
    } else {
    }
    return $db;
  }
    if (isset($_POST['submit'])) {
        //check is the form post?
        Session_Start();
        $db = db_connect();
        $username = mysqli_real_escape_string($db, $_POST['username']);
        $password = mysqli_real_escape_string($db, $_POST['password']);
        //SQL
        $sql = "SELECT * FROM users WHERE username='$username'";
        $result = mysqli_query($db, $sql);
        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_row($result)) {
                $password = stripslashes($password);
                //match password
                $row[2] = stripslashes($row[2]);
                //store the data as arry.
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
                if ($password != $row[2]) {
                    //wrong password
                    header("Location:passwordwrong.html");
                } else if ($row[1] == 0) {
                    if(isset($_SESSION['expiretime'])) {
                        if($_SESSION['expiretime'] < time()) {
                            //login redirect
                            unset($_SESSION['expiretime']);
                            header('Location: index.html');
                            exit(0);
                        } else {
                            $_SESSION['expiretime'] = time() + 3600;
                        }
                    }
                    //set session and cookie
                    $_SESSION['user_id']=$row[0];
                    $_SESSION['credentials']=$row[1];
                    $_SESSION['password']=$row[2];
                    $_SESSION['username']=$row[3];
                    $_SESSION['fname']=$row[4];
                    $_SESSION['lname']=$row[5];
                    $_SESSION['email']=$row[6];
                    $_SESSION['phone']=$row[7];
                    $_SESSION['credit']=$row[8];
                    $_SESSION['debt']=$row[9];
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
                    header("Location:main.html");
                    mysqli_close($db);
                    exit;
                } else if ($row[1] == 3) {
                    if(isset($_SESSION['expiretime'])) {
                        if($_SESSION['expiretime'] < time()) {
                            unset($_SESSION['expiretime']);
                            header('Location: index.html');
                            exit(0);
                        } else {
                            $_SESSION['expiretime'] = time() + 3600;
                        }
                    }
                    $_SESSION['user_id']=$row[0];
                    $_SESSION['credentials']=$row[1];
                    $_SESSION['password']=$row[2];
                    $_SESSION['username']=$row[3];
                    $_SESSION['fname']=$row[4];
                    $_SESSION['lname']=$row[5];
                    $_SESSION['email']=$row[6];
                    $_SESSION['phone']=$row[7];
                    $_SESSION['credit']=$row[8];
                    $_SESSION['debt']=$row[9];
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
                    header("Location:main.html");
                    mysqli_close($db);
                    exit;
                }
            }
        } else {
            header("Location:nousers.html");
        }
    }else
    {
        header("Location: index.html");
    }