<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: text/html; charset=UTF-8');

include "./class/db.php";
include "./class/POST.php";

$filePath = "post_images/" . basename($_FILES["image"]["name"]);

$title = $_POST['title'];

move_uploaded_file(
	$_FILES["image"]["tmp_name"],
	$filePath
);

$Post = new POST();

function generateRandomString($length = 10)
{
	return md5(substr(str_shuffle(str_repeat($x = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($length / strlen($x)))), 1, $length));
}

//generateRandomString();  // OR: generateRandomString(24)

echo $Post->uploadImage(generateRandomString(), $title, $filePath);
