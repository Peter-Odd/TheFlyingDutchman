<?php
$a[] = "anchor steam beer";
$a[] = "beck's";
$a[] = "bedarö bitter";
$a[] = "beo";
$a[] = "bitburger";
$a[] = "black tower";
$a[] = "blue nun";
$a[] = "bombardier";
$a[] = "brewdog";
$a[] = "brewdog dead pony club";
$a[] = "brewdog hardcore ipa";
$a[] = "brewdog punk ipa";
$a[] = "brewdog rip tide";
$a[] = "brewdog trashy blonde";
$a[] = "briccotondo";
$a[] = "brooklyn";
$a[] = "brooklyn lager";
$a[] = "cameleon";
$a[] = "campos góticos";
$a[] = "casillero del diablo";
$a[] = "ch malavieille alliance";
$a[] = "château pech-latt";
$a[] = "chilcas";
$a[] = "chill out mountains";
$a[] = "chimay blå";
$a[] = "cidraie pear";
$a[] = "citra pale ale";
$a[] = "coopers best";
$a[] = "dr l";
$a[] = "duvel";
$a[] = "ecologica";
$a[] = "einbecker brauherren alkoholfrei";
$a[] = "el cortejo";
$a[] = "el coto";
$a[] = "electric nurse";
$a[] = "erdinger";
$a[] = "fentimans";
$a[] = "flying dog";
$a[] = "franziskaner";
$a[] = "freedom ipa";
$a[] = "fuller's esb";
$a[] = "gambrinus";
$a[] = "guinness";
$a[] = "hell";
$a[] = "hoegaarden";
$a[] = "hofbräu münchen oktoberfest";
$a[] = "hubert beck";
$a[] = "il conte";
$a[] = "il nostro";
$a[] = "innis & gunn";
$a[] = "jever pilsener";
$a[] = "karlovacko";
$a[] = "kasteel triple";
$a[] = "königsmosel";
$a[] = "king goblin";
$a[] = "kiviks astrakan fläderblom";
$a[] = "kiviks astrakan";
$a[] = "kiviks williams";
$a[] = "kloster";
$a[] = "kung";
$a[] = "kwak";
$a[] = "lapin kulta";
$a[] = "leffe";
$a[] = "leitz eins zwei dry";
$a[] = "lindemans bin 65";
$a[] = "mahou negra";
$a[] = "mariestads";
$a[] = "mariestads export";
$a[] = "mariestads old ox";
$a[] = "mikkeller";
$a[] = "miller";
$a[] = "modus hoperandi";
$a[] = "mountain livin'";
$a[] = "nanny state";
$a[] = "napa smith";
$a[] = "newcastle brown ale";
$a[] = "nils oscar";
$a[] = "old speckled hen";
$a[] = "omnipollo leon";
$a[] = "omnipollo";
$a[] = "oppigårds amarillo";
$a[] = "oppigårds";
$a[] = "paulaner";
$a[] = "paulaner oktoberfest";
$a[] = "pilsner urquell";
$a[] = "pistonhead";
$a[] = "poliziano vino nobile di montepulciano";
$a[] = "primator";
$a[] = "primátor";
$a[] = "rabarbernektar";
$a[] = "rochefort 10";
$a[] = "running duck";
$a[] = "ruppertsberger hofstück";
$a[] = "s:t eriks";
$a[] = "s:t eriks pale ale";
$a[] = "samuel adams";
$a[] = "sankt anna";
$a[] = "saxhyttegubbens blåbär 100%";
$a[] = "scarecrow";
$a[] = "shatler's";
$a[] = "sierra nevada";
$a[] = "sigtuna east coast pale ale";
$a[] = "sleepy bulldog";
$a[] = "slottskällans";
$a[] = "slottskällans imperial stout";
$a[] = "slottskällans princess";
$a[] = "slottskällans red ale";
$a[] = "sofiero original";
$a[] = "somersby";
$a[] = "spaten münchen";
$a[] = "spaten oktoberfestbier";
$a[] = "st peter's cream stout";
$a[] = "st peter's";
$a[] = "starobrno premium";
$a[] = "staropramen";
$a[] = "staropramen dark";
$a[] = "staropramen granat";
$a[] = "störtebeker 1402";
$a[] = "störtebeker";
$a[] = "stella artois";
$a[] = "stoneleigh";
$a[] = "stowford press";
$a[] = "strongbow";
$a[] = "svart";
$a[] = "thornbridge";
$a[] = "troppo";
$a[] = "via del campo";
$a[] = "viña maipo";
$a[] = "weihenstephaner";
$a[] = "wisby";
$a[] = "wyld wood";
$a[] = "xide jungle";
$a[] = "xide non alco";
$a[] = "xide pine citrus";
$a[] = "xide wasabi lemon";
$a[] = "yeti";
$a[] = "young's double chocolate stout";
$a[] = "zeitgeist";
$a[] = "zeunerts";
$a[] = "zlatopramen";

// get the q parameter from URL
$q = $_REQUEST["q"];

$hint = "";

/* Need to add support for swedish characters */

// lookup all hints from array if $q is different from "" 
if ($q !== "") {
    $q = strtolower($q);
    $len=strlen($q);
    foreach($a as $name) {
        if (stristr($q, substr($name, 0, $len))) {
            if ($hint === "") {
                
                //$name = addslashes($name);
                $name = ucwords($name);
                // $name = str_replace(" ", "\u0020", $name);
                $hint = "<div class='beerButton' onclick='alert($name)'>$name</div><br>";
            } else {
                //$name = addslashes($name);
                $name = ucwords($name);
                // $name = str_replace(" ", "\u0020", $name);
                $hint .= "<div class='beerButton' onclick='alert($name)' >$name</div><br>";
            }
        }
    }
}

// Output "no suggestion" if no hint was found or output correct values 
echo $hint === "" ? "no suggestion" : $hint;
?>