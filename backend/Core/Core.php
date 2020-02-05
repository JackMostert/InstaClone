<?php
include "../InitalLoad.php";
require_once('./GeneralImports.php');

$Request                             = $_POST;

//Validate Request
$hasValidRoute                 = $Validation->hasKeyWithValidData($Request, 'route', $_ENV['routes']);
$hasValidMethod             = $Validation->hasKeyWithValidData($Request, 'method', $_ENV['methods']);
$hasValidTable                 = $Validation->hasKeyWithValidData($Request, 'table', $_ENV['tables']);
$hasValidSchemaType         = $Validation->hasKeyWithValidData($Request, 'schema', $_ENV['schemas']);
$hasValidReturnType         = $Validation->hasKeyWithValidData($Request, 'returnType', $_ENV['returnTypes']);
$isValidRequest             = $hasValidMethod && $hasValidTable && $hasValidReturnType && $hasValidSchemaType && $hasValidRoute;

if ($isValidRequest === false) $Res->sendJSON("Invalid Request", 400, "Error");

$token = key_exists('Token', $Request) ? $Request['Token'] : false;
$file = key_exists('PostImageURL', $Request) ? $_FILES["image"]["name"] : false;

$CONTROL->handler($Request['method'], $Request['table'], $Request['returnType'], $Request['schema'], (object) json_decode($Request['data']), $Request['route'], $token,);
