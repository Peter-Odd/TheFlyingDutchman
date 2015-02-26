<?php
class conn{
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
                if ($password != $row[2]) {
                    echo "Wrong password";
                    //TODO: Ask the user to enter credentials again
                } else if($row[1]== 0){
                    echo "admin";
                }
                else if ($row[1]== 3)
                {
                    echo "vip";
                }
                //TODO: Redirect the use to correct page
            }
        } else {
            echo "That user does not exist in our database. <a href=newCustomer.php>Click Here to Register</a> <a href=index.html>Click Back to homepage</a>";
        }

        $result->close();
    }
}
?>