<?php
require __DIR__ . '/vendor/autoload.php';

use Firebase\JWT\JWT;

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: text/html; charset=UTF-8');
include "./class/db.php";
include "./class/POST.php";
include "./_env.php";

$userID = $_POST['userID'];
$imageID = $_POST['imageID'];

function generateRandomString($length = 200)
{
	return md5(substr(str_shuffle(str_repeat($x = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($length / strlen($x)))), 1, $length));
}

$ID = generateRandomString();

$decoded = JWT::decode($userID, $_ENV['key'], array('HS384'));

$user_id = $decoded->ID;

$Post = new POST();


$Post->postlike($user_id, $userID, $imageID);
