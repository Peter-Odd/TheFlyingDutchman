<script type="text/javascript" src="ajax.js"></script>
<?php 

 // if form has been submitted
if (isset($_POST['submit'])) {
	
	$value=$_POST['value'];
	$username=$_POST['username'];


  include_once "PubDBQuerries.php";
  $PubDBQuerries = new PubDBQuerries;

  $PubDBQuerries -> changeCredential($username, $value);

  header("Location: manager.php");
 

  
}
else   {
  ?>
  <form action="<?php echo $_SERVER['PHP_SELF']?>" method="post"> 
  <table id = "man_table" border="0" align="center">  
  <tr><td colspan=2><h2>Change Authority</h2></td></tr>
  <tr><td>Username:</td><td> <input type="text" name="username" required maxlength="40"></td></tr>
  <tr><td>New authority:</td><td>   <input type="number" required name="value" maxlength="10"></td></tr>
  <tr><td colspan="2" align="right">   <input type="submit" class="button" name="submit" value="Submit"></td></tr>
  </table> 
  </form><?php   } 
  ?>