<?php

include "./class/db.php";
include "./class/res.php";
include "./class/POST.php";

$Post = new POST();
$res = new Res();
$db = new DB();

$ID = $_POST['ID'];

$db->Connect();
$User_Statement = $db->conn->prepare("SELECT * FROM images WHERE ID = ?");
$User_Statement->bind_param("s", $ID);
$User_Statement->execute();
$Result = $User_Statement->get_result();

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: text/html; charset=UTF-8');

$row_data = $Result->fetch_assoc();
$data = $Post->findUserByID($row_data['user_id']);

$payload = new stdClass();
$payload->Username = $data['Username'];
$payload->ImageURL = $row_data['URL'];
$payload->ImageContent = $row_data['content'];
$payload->ImageID = $row_data['ID'];

echo json_encode($payload);

exit;
