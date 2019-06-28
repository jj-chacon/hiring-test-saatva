<?php

$query=$_SERVER['QUERY_STRING'];  //get the full query string in url
$query_arr=explode("url=",$query);  //split the string by first get key

$url = $query_arr[1];  //take second parameter as url to be loaded
// if (preg_match('/\b(https?|ftp):\/\/*/', $url) !== 1) die;

print_r($query);
// echo (file_get_contents($url));
?>