<?php
include(__DIR__.'/simplehtmldom_1_9_1/simple_html_dom.php');

header('Content-Type: text/html; charset=ISO-8859-2');

if(!isset($_GET['villeAPI'])){
    $villeAPI = "Besançon";
}else{
	$villeAPI = $_GET['villeAPI'];
}

$html = file_get_html('https://www.google.com/search?q='.$villeAPI);
$paragraph = $html->find('#main > div:nth-child(4) > div > div.xpc > div:nth-child(1) > div:nth-child(2) > div > div > div > div',0)->innertext;
$paragraph = utf8_encode($paragraph);
print_r($paragraph);