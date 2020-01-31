<?php
include "../InitalLoad.php";
require_once(ROOT_PATH . './New/Core/GeneralImports.php');

$Request 							= $_POST;

//Validate Request
$hasValidMethod 			= $Validation->hasKeyWithValidData($Request, 'method', $_ENV['methods']);
$hasValidTable 				= $Validation->hasKeyWithValidData($Request, 'table', $_ENV['tables']);
$hasValidType 				= $Validation->hasKeyWithValidData($Request, 'type', $_ENV['types']);
$hasValidReturnType 	= $Validation->hasKeyWithValidData($Request, 'returnType', $_ENV['returnTypes']);
$isValidRequest 			= $hasValidMethod && $hasValidTable && $hasValidType && $hasValidReturnType;

if ($isValidRequest === false) $Res->sendJSON("Invalid Request", 400, "Error");

switch ($Request['method']) {

	case 'GET':
		include(ROOT_PATH . './New/Methods/GET.php');
		$GET = new GET($Validation);
		$GET->begin($Request['table'], $Request['type'], $Request['returnType'], $Request['data']);
		break;

	case 'POST':
		include(ROOT_PATH . './New/Methods/POST.php');
		$POST = new POST($Validation);
		$POST->begin($Request['table'], $Request['type'], $Request['returnType'], $Request['data']);
		break;

	case 'UPDATE':
		include(ROOT_PATH . './New/Methods/UPDATE.php');
		$UPDATE = new UPDATE($Validation);
		$UPDATE->begin($Request['table'], $Request['type'], $Request['returnType'], $Request['data']);
		break;

	case 'DELETE':
		include(ROOT_PATH . './New/Methods/DELETE.php');
		$DELETE = new DELETE($Validation);
		$DELETE->begin($Request['table'], $Request['type'], $Request['returnType'], $Request['data']);
		break;

	default:
		$Res->sendJSON("Internal Server Error", 500, "Error");
		break;
}
