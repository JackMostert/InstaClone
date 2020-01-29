<?php
require __DIR__ . '/vendor/autoload.php';

use \Firebase\JWT\JWT;

include "./class/Validate.php";
include "./class/Clean.php";
include "./class/db.php";
include "./class/POST.php";
include "./class/res.php";
include "./_env.php";

$res = new Res();
// $_POST = json_decode(file_get_contents("php://input"), true);
if ($_POST) {

	$Post = new POST();
	$data = new stdClass();
	$Validate = new Validate();

	//returns data if everything is ok or will return false
	$data->Email = $Validate->_email($Validate->_array($_POST, "email"));
	$data->ID = $data->Email;
	$data->Password = $Validate->_array($_POST, "password");

	if (
		!$data->Email ||
		!$data->Password
	) $res->sendJSON(200, "Please Provide all details", 0);

	$status = $Post->loginUser($data);

	switch ($status) {
		case 'No Email':
			$res->sendJSON(200, "No Email provided", 0);
			break;
		case 'No User':
			$res->sendJSON(200, "Email or Password is incorrect", 0);
			break;
		case 'Wrong Password':
			$res->sendJSON(200, "Email or Password is incorrect", 0);
			break;
		case is_object($status):
			// JWT
			$key = $_ENV['key'];
			$payload = $status;
			$jwt = JWT::encode($payload, $key, 'HS384');
			$res->sendJSON(200, $jwt, 1);
			break;
		default:
			$res->sendJSON(500, "Something went wrong", 1);
			break;
	}
} else {
	$res->sendJSON(200, "Please Provide all details", 0);
}
