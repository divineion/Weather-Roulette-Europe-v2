<?php 
require_once('../src/config.php');

header('Content-type: application/json; charset: UTF-8');

if (!isset($_GET['id'])) {
    $cityId = '3037456';
} else {
    $cityId = $_GET['id'];
}

$url = 'https://api.openweathermap.org/data/2.5/weather?id='.$cityId.'&appid='.appid;
$data = file_get_contents($url);

if ($data !== false) {
    print_r($data);
}