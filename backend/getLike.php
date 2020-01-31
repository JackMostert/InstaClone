<?php
include "./_env.php";
include "./class/db.php";
include "./class/POST.php";


header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: text/html; charset=UTF-8');

$image_id = $_POST['image_id'];

$Post = new POST();
$User_Statement = $Post->getLike($image_id);
$Result = $User_Statement->get_result();
$row_data = $Result->fetch_assoc();

echo $row_data['total'];
