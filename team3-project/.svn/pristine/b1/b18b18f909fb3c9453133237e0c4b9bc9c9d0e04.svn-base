<?php 
 // if form has been submitted
if (isset($_POST['submit'])) {


  include_once "PubDBQuerries.php";
  $PubDBQuerries = new PubDBQuerries;

	
	$price=$_POST['price'];
  $amount=$_POST['amount'];
	$beer_id=$_POST['beer_id'];
  $user_id=$_COOKIE['user_id'];

  $PubDBQuerries -> deliveryUpdate($user_id, $beer_id,$amount,$price);
 
  header("Location: manager.php");
  
}
else   {
  ?>
  <form action="<?php echo $_SERVER['PHP_SELF']?>" method="post"> 
  <table id = "man_table" border="0" align="center">  
  <tr><td colspan=2><h2>New delivery</h2></td></tr>
  <tr><td>ArtikleID:</td><td> <input type="number" name="beer_id" required maxlength="40"></td></tr>
  <tr><td>Amount:</td><td>   <input type="number" required name="amount" maxlength="10"></td></tr>
  <tr><td>Price per unit:</td><td>   <input type="number" required name="price" maxlength="10"></td></tr>
  <tr><td colspan="2" align="right">   <input type="submit" class="button" name="submit" value="Submit"></td></tr>
  </table> 
  </form><?php   } 
  ?>