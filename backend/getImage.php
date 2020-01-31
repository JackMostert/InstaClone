<?php

include "./class/db.php";
include "./class/res.php";
include "./class/POST.php";

$Post = new POST();
$res = new Res();
$db = new DB();

$ID = $_POST['ID'];

$array1 = array();

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

$User_Statement = $Post->getLike($row_data['ID']);
$Result = $User_Statement->get_result();
$row_data = $Result->fetch_assoc();

$commentCountResult = $Post->getComment($payload->ImageID);
$commentCount = $commentCountResult->get_result();
$payload->CommentCount = 0;

while ($CCount = $commentCount->fetch_assoc()) {
	$user = $Post->findUserByID($CCount['user_id']);
	$userComment = new stdClass();
	$userComment->Username = $user['Username'];
	$userComment->Comment = $CCount['comment'];
	array_push($array1, $userComment);
	$payload->CommentCount += 1;
}

$payload->comments = $array1;
$payload->LikeCount = $row_data['total'];


echo json_encode($payload);

exit;
