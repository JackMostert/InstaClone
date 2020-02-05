<?php
require __DIR__ . '/vendor/autoload.php';

use \Firebase\JWT\JWT;

include "./class/Validate.php";
include "./class/Clean.php";
include "./class/db.php";
include "./class/POST.php";
include "./class/res.php";

$res = new Res();

if ($_POST) {

	$Post = new POST();
	$data = new stdClass();
	$Validate = new Validate();

	//returns data if everything is ok or will return false
	$data->Username = $Validate->_input($Validate->_array($_POST, "username"));
	$data->Email = $Validate->_email($Validate->_array($_POST, "email"));
	$data->ID = $data->Email;
	$data->Password = $Validate->_array($_POST, "password");

	if (
		!$data->Username ||
		!$data->Email ||
		!$data->ID ||
		!$data->Password
	) {
		$res->sendJSON(200, "Please Provide all details", 0);
		return;
	}

	$status = $Post->addUser($data);
	if ($status === "Empty") {
		$res->sendJSON(200, "Please Provide all details", 0);
	} else if ($status === "User found") {
		$res->sendJSON(200, "That email is already in use", 0);
	} else {
		// JWT
		$key = $_ENV['key'];
		$payload = $status;
		$jwt = JWT::encode($payload, $key, 'HS384');
		$res->sendJSON(200, $jwt, 1);
	}
} else {
	$res->sendJSON(200, "Please Provide all details", 0);
}
