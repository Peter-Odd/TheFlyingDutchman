<?php
include_once "PubDBQuerries.php";
$PubDBQuerries = new PubDBQuerries;
$PubDBQuerries->loggedInCheck();
include_once "header.php";

?>

<title>Order your favorite Beers</title>
<script type="text/javascript" src="ajax.js"></script>


      <div id='menubar'>
        <ul id='menu'>
          <!-- put class='selected' in the li tag for the selected page - to highlight which page you're on -->
          <li class='selected'><a href='order.php'>Order</a></li>

          <?php
          if (isset($_COOKIE['user'])){ print '<li><a href="yourPage.php">Your Page</a></li>';
              if ($_COOKIE['credentials']==0){ print '<li><a href="manager.php">Management</a></li>';}
              }
          ?>

          <li><a href='schedule.php'>Schedule</a></li>
          <li><a href='aboutUs.php'>About Us</a></li>

          <?php
          if (isset($_COOKIE['user'])){ print '<li><a href="logout.php">Log Out</a></li>';}
          ?>   

        </ul>
      </div>

<div id='site_content'>
    <div class='content'>
      <br><br>
      <h2>5 latest purchases<h2/>

    <div id="purchased"><b></b></div>

     <h2>Search for a beer<h2/>
    <input  type='text' id='querry' required/>
    <select id="searchOption">
    <option value="2">Searchoption:</option>
    <option value="1">Country</option>
    <option value="2">Part of beer name</option>
    </select>

    <button class="button" onclick="getInput()"> Search </button>

    <br/><br/>
   
    <button class="button" onclick="listBeer('','4')"> List all </button></br></br>

    
    <div id="table"></div>
    <br>
    </div>
   
   <div id = "sidebar">
    <div id="undo"></div> 
   <div id = "order" ondrop="drop(event)" ondragover="allowDrop(event)">
   <b>Your order: </b>
   <div>
   <ul id="beer">
   </ul>
       <div id ="total" style="padding-top: 10px; height: 19px"></div>
       <div id ="confirm"></div>
   </div>

   </div>

    </div>
   </div>
  </div>
</div>
<?php
include_once "footer.php";
?>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script type="text/javascript" src="cart.js"></script>
</body>
</html>
