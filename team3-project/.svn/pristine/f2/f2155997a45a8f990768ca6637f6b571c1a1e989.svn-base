<title>About Us</title>
<?php
include_once "header.php";
//include_once "menubar.php";
?>

      <div id='menubar'>
        <ul id='menu'>
          <!-- put class='selected' in the li tag for the selected page - to highlight which page you're on -->
          

          <?php
          if (isset($_COOKIE['user'])){ 
              print '<li><a href="order.php">Order</a></li>';
              print '<li><a href="yourPage.php">Your Page</a></li>';
              if ($_COOKIE['credentials']==0){ print '<li><a href="manager.php">Management</a></li>';}
              }else{
                print '<li><a href=\'index.html\'>Home</a></li>';
              }
          ?>

          <li><a href='schedule.php'>Schedule</a></li>
          <li class='selected'><a href='aboutUs.php'>About Us</a></li>

          <?php
          if (isset($_COOKIE['user'])){ print '<li><a href="logout.php">Log Out</a></li>';}
          ?>   

        </ul>
      </div>

  <div id='site_content'>
    <div class='content'>
  <br><br>
 	<h1>About Us</h1>
 	<h2><i>The Flying Dutchman</i>, a history</h2>
    <p>The pub is located in the center of Uppsala, the most wonderful city of the world! At <i>the Flying Dutchman</i> you will find tradition, top class service and lots of beer!</p>

    <p>After being founded by <i>Helge Pjoskel</i> the year of 1612 it soon became one of the most popular hangouts of the students and other parts of the social elite in the city.</p>

    <p>During the 19th centaury the pub saw a lot of changes. It left the care of the <i>Pjoskel</i> family and got bought by the <i>Jonssons</i>, who is the greatgreatgreatgrandfather of todays owner. The pub was burnt down 1882. It got rebuilt and has not been changed since, todays building was ready 1885.</p>

    <p>The costumer base of the pub has also been changing, while it in the early years mostly hosted students and rich people, todays regulars are sports fans and working people coming in for a beer after work.</p>

    <p><i>The flying dutchman</i> is famous for the friendly atmosphere where everyone is welcome to relax, talk, watch games and listen to live music.</p>

    <p>Welcome to you and all your friends to this amazing building full of history where we got more great memories in the making!</p>
	<h2>Location</h2>
  <a href="http://kartor.eniro.se/?q=dragarbrunnsgatan%2017">Dragarbrunnsgatan 17B, click for map</a>
 	<h2>Staff</h2>
 		<p>The staff is here for your service!</p>
    <p><i>The flying dutchman</i> is famous for the great service and the welcoming atmosphere, this we owe too our great regulars but also the amazing staff working for your wellbeeing!</p>
    <p>If you got any questions or suggestions, please don't hesitate to contact us and we will listen!</p>
	<h2>Contact Us</h2>

    <p>Per-Eke Jonsson, owner</p>
	  <p>Telephone number, Email, Fax</p>
    <br><br>
  </div>
<?php
include_once "sideBar.php";
?>
</div>

<?php
include_once "footer.php";
?>

</body>
</html>