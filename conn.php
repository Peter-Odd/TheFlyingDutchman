<?php
        $db = mysqli_connect("sql3.freesqldatabase.com", "sql368767", "kG4%mU7*", "sql368767");
        if (mysql_errno()) {
            printf("Connection failed: %s\n", mysqli_connect_error());
            exit();
        } else {
            echo "Connection established", PHP_EOL;
        }