<?php
 
// php file requred for AJAX functionality
// handles queries too book_search class

include_once "PubDBQuerries.php";
$PubDBQuerries = new PubDBQuerries;

$option=$_GET['searchOption'];

// echoes error if no searchoption chosen
if ($option==0){
	echo "Please choose a seachoption!";
	}

// option 1 utilises serachTitle in book_search class
if ($option==1){
	$PubDBQuerries -> searchCountry($_GET['querry']);
}

// option 2 utilises searchPartTitle in book_search class
if ($option==2){
	$PubDBQuerries -> searchPartName($_GET['querry']);
}

// option 3 utilises searchCategory in book_search class
if ($option==3){
	$PubDBQuerries -> searchCategory($_GET['querry']);
}

// option 4 utilises listAllBooks in book_search class
if ($option==4){
	$PubDBQuerries -> listAllBeers();
	}

if ($option==5){
	$PubDBQuerries -> recentPurchase($_COOKIE['user_id']);
	}

if ($option==7){
	$PubDBQuerries -> orderOnLowStock();
	}

if ($option==8){
	$PubDBQuerries -> yearSales();
	}

if ($option==9){
	$PubDBQuerries -> monthSales();
	}

if ($option==10){
	$PubDBQuerries -> weekSales();
	}

if ($option==11){
	$PubDBQuerries -> getUser($_COOKIE['user']);
	}


if ($option==12){
    $PubDBQuerries -> listStatistics();
}

if ($option==13){
	$PubDBQuerries -> buyBeer($_GET['querry'],$_COOKIE['user_id'],$_GET['amount']);
	}

if ($option==14){
	$PubDBQuerries -> updateDebt($_COOKIE['user_id'],$_GET['querry']);
	}

if ($option==15){
	$PubDBQuerries -> repayDebtUsername($_GET['username'],$_GET['querry']);
	}

$aResult = array();

    if( !isset($_POST['functionname']) ) { $aResult['error'] = 'No function name!'; }

    if( !isset($_POST['arguments']) ) { $aResult['error'] = 'No function arguments!'; }

    if( !isset($aResult['error']) ) {

        switch($_POST['functionname']) {
            case 'buyBeer':
               if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 2) ) {
                   $aResult['error'] = 'Error in arguments!';
               }
               else {
                  $PubDBQuerries -> buyBeer($_POST['arguments'][0], $_COOKIE['user_id'],$_POST['arguments'][1]);
               }
               break;

            default:
               $aResult['error'] = 'Not found function '.$_POST['functionname'].'!';
               break;
        }

    }

    json_encode($aResult);


$PubDBQuerries -> closeMysqli();

?>