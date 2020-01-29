<?php
require __DIR__ . '/vendor/autoload.php';

use Firebase\JWT\JWT;

include "./class/res.php";
include "./_env.php";
$res = new Res();
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: text/html; charset=UTF-8');

include "./class/db.php";
include "./class/POST.php";
$filePath;

if (isset($_FILES["image"]["name"])) {
	$filePath = "post_images/" . basename($_FILES["image"]["name"]);
	move_uploaded_file(
		$_FILES["image"]["tmp_name"],
		$filePath
	);
} else {
	$filePath = '';
}

$content = $_POST['content'];
$user_id = $_POST['user_id'];

$decoded = JWT::decode($user_id, $_ENV['key'], array('HS384'));

$user_id = $decoded->ID;

$Post = new POST();

function generateRandomString($length = 200)
{
	return md5(substr(str_shuffle(str_repeat($x = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($length / strlen($x)))), 1, $length));
}

//generateRandomString();  // OR: generateRandomString(24)

$Post->uploadImage(generateRandomString(), $content, $filePath, $user_id);

$res->sendJSON(200, '', 1);
