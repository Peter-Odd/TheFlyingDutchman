<?php
/**
 * Created by PhpStorm.
 * User: zp
 * Date: 2/27/15
 * Time: 2:14 PM
 */
//print_r($_COOKIE);
//echo $_COOKIE["username"];
setcookie("user_id", "", time()-3600);
setcookie("credentials", "", time()-3600);
setcookie("password", "", time()-3600);
setcookie("username", "", time()-3600);
setcookie("fname", "", time()-3600);
setcookie("lname", "", time()-3600);
setcookie("email", "", time()-3600);
setcookie("phone", "", time()-3600);
setcookie("credit", "", time()-3600);
setcookie("debt", "", time()-3600);
//unset($_COOKIE);
//print_r($_COOKIE);
header("Location:index.html");