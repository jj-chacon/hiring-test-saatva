<?php

 header("Access-Control-Allow-Origin: *");
 header('Content-type: application/json');

$query = $_SERVER['QUERY_STRING'];  
$query_arr=explode("url=",$query);  

$url = $query_arr[1]; 

$json_str = file_get_contents($url);
$json_obj = json_decode($json_str);

echo json_encode($json_obj);
?>