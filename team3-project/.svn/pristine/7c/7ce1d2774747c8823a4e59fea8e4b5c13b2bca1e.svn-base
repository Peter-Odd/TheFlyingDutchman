<title>Create New Member</title>

<?php
include_once "header.php";
//include_once "menubarLoggedIn.php";
?>

      <div id='menubar'>
        <ul id='menu'>
          <!-- put class='selected' in the li tag for the selected page - to highlight which page you're on -->
          <li class = "selected"><a href='index.html'>Home</a></li>
          <li><a href='schedule.php'>Schedule</a></li>
          <li><a href='aboutUs.php'>About Us</a></li>
          
        </ul>
      </div>

  <div id = 'manegersite_content'>
    <div class = 'man_content'>

    <h2 align= 'center'> Create New Member</h2>
    <meta name='description' content='website description' />
    <meta name='keywords' content='website keywords, website keywords' />
    <meta http-equiv='content-type' content='text/html; charset=windows-1252' />
    <link rel='stylesheet' type='text/css' href='style/style.css' />
  </div>



<script type="text/javascript">
<!--

    // checks if aName is in the format Name or Name-Name
    // true if the string matches the pattern
      function isName (aName)
        {
          var compareTo=/^[A-Z][a-z]+/
          var onlyLetters=/[^a-zA-Z]/
          if(compareTo.test(aName)!=1||onlyLetters.test(aName)!=0)
           {
            alert("Name/family name has to be in the format:\nName!\nStart with a capital letter and only letters allowed");
           }
           else
            {return true}
        }

    // checks if the string anAdress is in the format Streename number optional letter
    // true if anAdress matches the pattern
      function isEmail(anEmail)
        {
          var compareTo=/[a-z]+\@[a-z]+\.[a-z]+/
          if(compareTo.test(anEmail)!=1)
           {
            alert("Email has to be in the format:\nname@something.something");
           }
           else
            {return true}
        }
    // checks if aPhone is in the format 2-5 numbers followed by numbers
    // true if aPhone matches the pattern
      function isPhone(aPhone){
        var compareTo=/\d\d(?!\d{3})\s\d+/
        if(compareTo.test(aPhone)!=1)
           {
            alert("Phone number has to be in the format:\n2 to 5 numbers followed by a space followed by numbers! \n xxxx xxxxxxx");
           }
           else
            {return true}
      }

  // checkPass stores and compares the password submision for equality
  // will display matches of does not match on the window
  // return true if matches (used for allowing the submit button to be used moving on)
    function checkPass(){
    //Store the password field objects into variables ...
    var pass1 = document.getElementById('pass1');
    var pass2 = document.getElementById('pass2');
    //Store the Confimation Message Object ...
    var message = document.getElementById('confirmMessage');
    //Set the colors we will be using ...
    var goodColor = "#66cc66";
    var badColor = "#ff6666";
    //Compare the values in the password field
    //and the confirmation field
    if(pass1.value == pass2.value){
        //The passwords match.
        //Set the color to the good color and inform
        //the user that they have entered the correct password
        pass2.style.backgroundColor = goodColor;
        message.style.color = goodColor;
        message.innerHTML = "Match!"
        return true
    }
	else{
        //The passwords do not match.
        //Set the color to the bad color and
        //notify the user.
        pass2.style.backgroundColor = badColor;
        message.style.color = badColor;
        message.innerHTML = "No Match!"
        return false
    }
}
// the check all checks that all the fields are filled correctly
// return false if any field is not correctly filled not allowing the submit button to send
      function checkAll()
      {

        if(!isName(document.frm.aname.value)||!isName(document.frm.fname.value)||!isEmail(document.frm.email.value)|| !isPhone(document.frm.phone.value)||!checkPass())
          {
          return false;
          }
       }
-->
</script>


  <div class="manegersite_content" align="center" >


  <form action='insert_newCustomer.php'name="frm" method="post" action="noscript.cgi" onSubmit="return checkAll();">
    <table border="0">
      <tr>
        <td>*User name:</td>
        <td><input type="text" name="username" size="20" required> </td>
      </tr>
      <tr>
        <td>*Name:</td>
        <td><input type="text" name="aname" size="20" required></td>
      </tr>
      <tr>
        <td>*Family name:</td>
        <td><input type="text" name="fname" size="20" required></td>
      </tr>
      <tr>
        <td>*Email:</td>
        <td><input type="text" name="email" size="20" required></td>
      </tr>
      <tr>
        <td>*Phone:</td>
        <td><input type="tel" name="phone" size="20" required></td>
      </tr>
      <tr>
      <td> <label for="pass1">*Password:</label> </td> <td> <input type="password" name="pass1" id="pass1" required> </td>
      </tr>
      </tr>
      <tr>
      <td> <label for="pass2">*Confirm Password:</label> </td> <td> <input type="password" name="pass2" id="pass2" onkeyup="checkPass(); return false;">
                                                    <br><span id="confirmMessage" class="confirmMessage" required></span> </td>
      </tr>
       </table>

       <br><br>
   <input type="submit" class="button" name="submit" value="Send" align='center'>
   <input type="reset" class="button" name="reset" value="Reset" align='center'>       
  
  </div>
  </form>
  </div>
  </div>

<?php
include_once "footer.php";
?>

</body>
</html>




