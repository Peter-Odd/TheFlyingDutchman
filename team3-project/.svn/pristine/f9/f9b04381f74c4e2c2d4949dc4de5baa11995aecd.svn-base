<title>Your Page</title>

<?php
include_once "header.php";
//include_once "menubar.php";
?>

      <div id='menubar'>
        <ul id='menu'>
          <!-- put class='selected' in the li tag for the selected page - to highlight which page you're on -->
          <li><a href="order.php">Order</a></li>

          <?php
          if (isset($_COOKIE['user'])){ print '<li class="selected"><a href="yourPage.php">Your Page</a></li>';
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

<?php
  if(!isset($_COOKIE['fname'])) {
       echo "ERROR";
  } else {
     $fname = $_COOKIE['fname'];
  }
?>

<div id = 'manegersite_content'>
  <div class = 'man_content'>

  <h1>Your Page</h1>

  <p><strong>Welcome <?php print("$fname"); ?>!</strong></p>

  <?php
   include_once "PubDBQuerries.php";
  $PubDBQuerries = new PubDBQuerries;
  
  $result=$PubDBQuerries -> getDebtCredit($_COOKIE['user_id']);

   while ($line = mysqli_fetch_array($result)){

    $debt=$line['debt'];
    $credit=$line['credit'];
  }
  ?>

<p><strong>Your current debt is: <?php print("$debt"); ?> </strong></p> 
<p><strong>Your current line of credit is: <?php print("$credit"); ?></strong></p>
</br>


  <div id="calcAlc">
    <h2> Calculate your alcohol level: </h2>

    <form id = "alcForm">
                  Alcohol in gramm: <br>
                  <input type="text" name="alcohol">
                  <br>
                  Weight: <br>
                  <input type="text" name="weight">
                  <br>
                  Your sex:<br>
                  <input type="radio" name="sex" value="male" checked>Male
                  <input type="radio" name="sex" value="female">Female
                  <br>


      </form>

      <button class="button" onclick = "calculateAlcohol()">Submit</button>
      <br>

       <script>
        function calculateAlcohol() {
          var alc = document.getElementsByName("alcohol")[0].value;
          var weight = document.getElementsByName("weight")[0].value;
          var sex = document.getElementsByName("sex");
          var factor;
          if(sex[0].checked){
            factor = 0.7;
            }
          else{
            factor = 0.6;
            }


                    var prom = alc/weight * factor;

                    document.getElementById("alcResult").innerHTML = prom;

                    if(prom < 0.02){
                        document.getElementById("promCon").innerHTML = "You are good to drive";
                    }
                    else{
                        document.getElementById("promCon").innerHTML = "Don't drive!";
                    }


                    /**document.getElementById("test").innerHTML = "Forth Step";
                    alcInGramm();
                    **/
            }

            /**function alcInGramm(){
                    var xmlhttp = new XMLHttpRequest();
                    var url = "http://systembolagetapi.se/?id=11341";

                    document.getElementById("test").innerHTML = "Fifth Step";

                    xmlhttp.onreadystatechange = function() {
                        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                            var text = xmlhttp.responseText.toString();
                            text = text.substring(1, text.length-1);
                            console.log(text);
                            console.log(xmlhttp.responseText);
                            var myArr = JSON.parse(text);
                            console.log(myArr);
                            myFunction(myArr);
                        }
                    }
                    xmlhttp.open("GET", url, true);
                    xmlhttp.send();



                    function myFunction(arr) {
                        var alc = arr.alcohol;
                        console.log(alc);
                        //var alc = arr.getJSONObject("alcohol");
                        var vol = "";
                        var count = 0;
                         for(i = 0; i < arr.length; i++){
                            if(arr[i] = ":"){
                                count= count + 1;
                            }

                            if(count == 35 && arr[i]!=","){
                                alc += arr[i].toString();
                                console.log(arr[i]);
                                console.log(i);
                                console.log(count);
                            }
                            if(count == 71 && arr[i]!=" ") {
                                vol += arr[i].toString();
                                console.log(arr[i]);
                                console.log(i);
                                console.log(count);
                            }
                        }

                        document.getElementById("test").innerHTML = vol;
                    }
             }**/


            </script>

        <div id="alcohol">
            <p> Alcohol level: <i id = "alcResult">not yet calculated</i></p>
            
            <p id = "promCon"></p>
        </div>
        <br><br><br>
        <div>
            <p id="test"> </p>
        </div>

        </div>

      <div id="flash02">
          <embed  id="flash1" width="220" height="168" src="swf/001.swf" quality="hight">
              <div style="text-align: center; "><a href="javascript:void(0);" onclick="closediv02()">close</a></div>
      </div>
      <div id="flash01">
          <embed width="220" height="168" src="swf/002.swf" quality="hight">
              <div style="text-align: center; "><a href="javascript:void(0);" onclick="closediv02()">close</a></div>
      </div>
      <script>
          function closediv02(){
              flash01.style.display = "none";
              flash02.style.display="none";
          }
      </script>

    </div>
   </div>
  </div>
</div>

<?php
include_once "footer.php";
?>

</body>
</html>