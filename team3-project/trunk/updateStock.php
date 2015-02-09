<?php 

 // if form has been submitted
if (isset($_POST['submit'])) {
	
	$value=$_POST['value'];
	$beer_id=$_POST['beer_id'];

  include_once "PubDBQuerries.php";
  $PubDBQuerries = new PubDBQuerries;
  $PubDBQuerries -> changeStock($beer_id, $value);

	
}
else   {
  ?>
  <form action="<?php echo $_SERVER['PHP_SELF']?>" method="post"> 
  <table id = "man_table" border="0" align="center">  
  <tr><td colspan=2><h2>Update Stock</h2></td></tr>
  <tr><td>Id:</td><td> <input type="number" name="beer_id" required maxlength="40"></td></tr>
  <tr><td>New amount:</td><td>   <input type="number" required name="value" maxlength="10"></td></tr>
  <tr><td colspan="2" align="right">   <input type="submit" class="button" name="submit" value="Submit"></td></tr>
  </table> 
  </form><?php   } 
  ?>