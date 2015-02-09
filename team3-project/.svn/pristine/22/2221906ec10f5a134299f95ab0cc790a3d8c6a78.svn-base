<?php
include_once "PubDBQuerries.php";
$PubDBQuerries = new PubDBQuerries;
$PubDBQuerries->loggedInCheck();
include_once "header.php";


if ($_COOKIE['credentials']>0){
  header("Location:order.php");
}
?> 

<head>
    <script type="text/javascript" src="js/jquery.js" /> </script>   
    <script type="text/javascript" src="js/i18next.js" /></script>
    <script type="text/javascript" src="js/translate.js" /></script>
    

</head>

<script type="text/javascript" src="ajax.js"></script>
<title class="manager" data-i18n="manager.management">Management</title>
<!-- <script> i18n.setLng('en', function(t) { /* loading done */ }); </script> -->



      <div id='menubar'>
        <ul id='menu' class = "manager">
          <!-- put class='selected' in the li tag for the selected page - to highlight which page you're on -->
          <li><a href='order.php' data-i18n="manager.order">Order</a></a></li>

          <?php
          if (isset($_COOKIE['user'])){ print '<li><a href="yourPage.php" class="manager" data-i18n="manager.your_page">Your Page</a></li>';
              if ($_COOKIE['credentials']==0){ print '<li class="selected"><a href="manager.php" class="manager" data-i18n="manager.management">Management</a></li>';}
              }
          ?>

          <li><a href='schedule.php' data-i18n="manager.schedule">Schedule</a></li>
          <li><a href='aboutUs.php' data-i18n="manager.aboutus">About Us</a></li>

          <?php
          if (isset($_COOKIE['user'])){ print '<li><a href="logout.php"  class="manager" data-i18n="manager.logoff">Log Out</a></li>';}
          ?>   

        </ul>
      </div>



  <div id = 'manegersite_content'>
    <div class = 'man_content'>

        <h2 class="manager" data-i18n="manager.language">Language</h2>
        <ul class="manager">
           <button class="button" onclick="changeLanguage()" data-i18n="manager.chose_lang">Get user</button>
           <!-- <button class="button" onclick="setEnglish()" data-i18n="manager.chose_lang">Get user</button> -->
           
        </ul>


        <h2 class="manager" data-i18n="manager.user_mangement">User mangement</h2>
        <ul class="manager">
           <button class="button" onclick="listBeer('',11)" data-i18n="manager.get_user">Get user</button>
           
           <button class="button" onclick="changeAuthority()" data-i18n="manager.change_authority">Change Authority</button>

           <button class="button" onclick="setCredit()" data-i18n="manager.credit">Credit</button>

           <button class="button" onclick="repayDebt()" data-i18n="manager.repay_debt">Repay debt </button>
        </ul>


        <h2 class="manager" data-i18n="manager.beer_mangement">Beer mangement</h2>
        <h3 class="manager" data-i18n="manager.hthree">Statistics and stats</h3>
        <ul class="manager">          
           <button class="button" onclick="listBeer('','12')" data-i18n="manager.beer_statistic">Beer statistics</button>

           <button class="button" onclick="listBeer('','8')" data-i18n="manager.sales_this_year"> Sales this year </button>

           <button class="button" onclick="listBeer('','9')" data-i18n="manager.sales_this_month"> Sales this month </button>

           <button class="button" onclick="listBeer('','10')" data-i18n="manager.sales_this_week"> Sales this week </button>  

           <!-- <button class="button" onclick="window.location.href='bearOfTheWeek.html'" data-i18n="manager.beer_of_the_week">Bear of the week</button>  -->         
        </ul>

        <h3 class="manager" data-i18n="manager.order_pages">Order pages</h3>
        <ul class="manager">

         <!-- <button onclick="window.location.href='order.php'">Order</button> -->

          <button class="button" onclick="updateStock()" data-i18n="manager.update_stock_of_beer"> Update stock of beer</button>

          <button class="button"  onclick="listBeer('','7')" data-i18n="manager.order_low_on_stock"> Order on low stock </button>

          <button class="button"  onclick="delivery()" data-i18n="manager.delivery">Delivered</button>  

        </ul>      
   
  

    </div>
     <div id="table" align="center">
  </div>

</div>

<?php
include_once "footer.php";
?>

</body>

</html>
