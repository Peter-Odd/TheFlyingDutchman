<title>Schedule</title>

<?php
include_once "header.php";
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

          <li class='selected'><a href='schedule.php'>Schedule</a></li>
          <li><a href='aboutUs.php'>About Us</a></li>

          <?php
          if (isset($_COOKIE['user'])){ print '<li><a href="logout.php">Log Out</a></li>';}
          ?>   

        </ul>
      </div>

  <div id='site_content'>

    <div class='content'>
    <br><br>
 		<h1>Schedule</h1>
 		<h2>When is the pub open?</h2>
 		<p>The pub is open every day of the week. </p>
 		<p>Sunday-Thursday: 15:00 - 23:00. </p>
 		<p>Friday-Saturday:    13:00 - 24:00. </p>
 		<p>At holidays, check out our special time table a few lines down for special times. </p>

 		<h2>Upcoming holidays</h2>
 		<p> At Lucia, <i>2014-12-13</i>, the pub is open 06:30-09:00, 15:00-23:00. See events for more information. </p>

		<h2>Events</h2>
 		<h3>This week</h3>

		<p><i>2014-11-29</i> On this Saturday, Ben Fling and his band will join us for a memorable night. Bring your friends to this incredible event with live music that will blow your mind! Starting at 20:00.</p>

		<h3>This month</h3>
		<p><i>2014-12-13</i> At 07:00 in the morning the we got a chorus from the local church at the pub for Lucia! We will serve beer and cookies!</p>


		<h2>Regular events</h2>
		<p>Every Thursday we got hockey night where you can hang out in the pub and watch the exiting hockey games from SHL. Games at 19:00.</p>
		<p>Saturday is fotball day! We show games from Allsvenskan and Premier league during the day. Come join your fellow fotball fans over a beer. Games from 14:00.</p>
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
