<?php
include "../InitalLoad.php";
require_once(ROOT_PATH . './New/Core/GeneralImports.php');

$Request 							= $_POST;

// $Res->sendJSON($Request, 200, "");

//Validate Request
$hasValidRoute 				= $Validation->hasKeyWithValidData($Request, 'route', $_ENV['routes']);
$hasValidMethod 			= $Validation->hasKeyWithValidData($Request, 'method', $_ENV['methods']);
$hasValidTable 				= $Validation->hasKeyWithValidData($Request, 'table', $_ENV['tables']);
$hasValidSchemaType 	= $Validation->hasKeyWithValidData($Request, 'schema', $_ENV['schemas']);
$hasValidReturnType 	= $Validation->hasKeyWithValidData($Request, 'returnType', $_ENV['returnTypes']);
$isValidRequest 			= $hasValidMethod && $hasValidTable && $hasValidReturnType && $hasValidSchemaType && $hasValidRoute;

if ($isValidRequest === false) $Res->sendJSON("Invalid Request", 400, "Error");

switch ($Request['method']) {

	case 'GET':
		include(ROOT_PATH . './New/Methods/GET.php');
		$GET = new GET($Validation, $Res);
		$result = $GET->route($Request['table'], $Request['returnType'], $Request['schema'], (object) json_decode($Request['data']), $Request['route']);
		$Res->sendData($result);
		break;

	case 'POST':
		include(ROOT_PATH . './New/Methods/POST.php');
		$POST = new POST($Validation, $Res);
		$POST->route($Request['table'], $Request['returnType'], $Request['schema'], (object) json_decode($Request['data']), $Request['route']);
		break;

	case 'UPDATE':
		include(ROOT_PATH . './New/Methods/UPDATE.php');
		$UPDATE = new UPDATE($Validation, $Res);
		$UPDATE->begin($Request['table'], $Request['type'], $Request['returnType'], (object) json_decode($Request['data']));
		break;

	case 'DELETE':
		include(ROOT_PATH . './New/Methods/DELETE.php');
		$DELETE = new DELETE($Validation, $Res);
		$DELETE->begin($Request['table'], $Request['type'], $Request['returnType'], (object) json_decode($Request['data']));
		break;

	default:
		$Res->sendJSON("Internal Server Error", 500, "Error");
		break;
}
