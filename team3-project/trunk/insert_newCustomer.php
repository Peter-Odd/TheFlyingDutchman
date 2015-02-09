<?php

if (isset($_POST['username']) && isset($_POST['aname'])
 && isset($_POST['fname'])     && isset($_POST['email']) && isset($_POST['phone']) && isset($_POST['pass1']) && isset($_POST['pass2']))
{
	$username= $_POST['username'];
	$name= $_POST['aname'];
	$fname= $_POST['fname'];
	$address= $_POST['email'];
	$phone= $_POST['phone'];
	$password=$_POST['pass1'];
	$password2=$_POST['pass2'];


	if (!($password==$password2)){
		print "Passwords don't match!";
	}

	else {
		
		include_once "PubDBQuerries.php";
	  	$PubDBQuerries = new PubDBQuerries;

  		$PubDBQuerries -> addNewUser($username, $password, $name, $address, $fname, $phone);
	}
}
else{
	echo "Error not all post data received. ";
	echo "<a href='javascript:history.back()''>Back</a>";
}
?>