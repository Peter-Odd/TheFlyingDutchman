<?php 
//if the login form is submitted
if (isset($_POST['submit'])) {
 // if form has been submitted
 // makes sure they filled it in

	if(!$_POST['username'] | !$_POST['pass']) {
	  die('You did not fill in a required field.');
	  }
	
	$username=$_POST['username'];
	$password=$_POST['pass'];

	include_once "PubDBQuerries.php";
  	$PubDBQuerries = new PubDBQuerries;

  	$PubDBQuerries -> loggin($username, $password);

	//then redirect them to the maneger area or member area
	if ($_COOKIE['credentials']==0){
		header("Location: manager.php");
	 	}
	else{
		header("Location: order.php");	
		}
}


else   {
  ?>
  <form action="<?php echo $_SERVER['PHP_SELF']?>" method="post">
  <br>   <br>   <br> 
  <table id='login_table'>
      <tr><th colspan=2>Login</th></tr>
  <tr> <td><br> Username:</td>
      <td> <br> <input type="text" name="username" required maxlength="40"></td></tr>
      <tr><td>Password:</td><td>   <input type="password" required name="pass" maxlength="50"></td></tr>
      <tr><td colspan="2" align="right">   <input type="submit" class="button"name="submit" value="Login">
  </td></tr>   </table>   </form>   <br><h2><a href="newCustomer.php">Create new member</a> </h2><br><?php   } 
  ?>

