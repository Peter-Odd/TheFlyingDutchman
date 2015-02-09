      <div id='menubar'>
        <ul id='menu'>
          <!-- put class='selected' in the li tag for the selected page - to highlight which page you're on -->
          <li class='selected'><a href='index.html'>Home</a></li>

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