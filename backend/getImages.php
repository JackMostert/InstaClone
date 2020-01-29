<?php

include "./class/db.php";
include "./class/res.php";
include "./class/POST.php";

$Post = new POST();
$res = new Res();
$db = new DB();

$db->Connect();
$User_Statement = $db->conn->prepare("SELECT * FROM images");
$User_Statement->execute();
$Result = $User_Statement->get_result();
$array1 = array();
$array2 = array();

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: text/html; charset=UTF-8');

while ($row_data = $Result->fetch_assoc()) {
	array_push($array1, $row_data);
}


foreach ($array1 as $value) {
	//code to be executed; 
	$payload = new stdClass();
	$data = $Post->findUserByID($value['user_id']);
	$payload->Username = $data['Username'];
	$payload->ImageURL = $value['URL'];
	$payload->ImageContent = $value['content'];
	$payload->ImageID = $value['ID'];
	array_push($array2, $payload);
}

$object = (object) $array2;

echo json_encode($object);

exit;
