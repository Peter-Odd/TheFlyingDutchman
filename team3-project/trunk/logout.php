<?php

//this makes the time in the past to destroy the cookie
$cookie_name = "user";
unset($_COOKIE[$cookie_name]);
// empty value and expiration one hour before
$res = setcookie($cookie_name, '', time() - 3600);
header("Location: index.html");
?>