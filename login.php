<?php
//if the login form is submitted
if (isset($_POST['submit'])) {
    // if form has been submitted
    // makes sure they filled it in

    if(!$_POST['username'] | !$_POST['password']) {
        die('You did not fill in a required field.');
    }

    $username=$_POST['username'];
    $password=$_POST['password'];

    include_once "conn.php";
    loggin($_POST['username'],$_POST['password']);

    //then redirect them to the maneger area or member area
    if ($_COOKIE['credentials']==0){
        header("Location: vip.html");
    }
    else{
        header("Location: bartender.html");
    }
}

else{}
function loggin($username,$password){
    $db = db_connect();
    $username = mysqli_real_escape_string($db, $_POST['username']);
    $password = mysqli_real_escape_string($db, $_POST['password']);
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
            $hour = time() + 3600;
            setcookie("user_id", $result['user_id'], $hour);
            setcookie("user", $result['username'], $hour);
            setcookie("fname", $result['first_name'], $hour);
            setcookie("lname", $result['last_name'], $hour);
            setcookie("email", $result['email'], $hour);
            setcookie("credentials", $result['credentials'], $hour);
            setcookie("id", $result['password'], $hour);
            setcookie("credit", $result['credit'], $hour);
            setcookie("debt", $result['debt'], $hour);
        }
    } else {
        echo "That user does not exist in our database. <a href=newCustomer.php>Click Here to Register</a> <a href=index.html>Click Back to homepage</a>";
    }
    $result->close();
}