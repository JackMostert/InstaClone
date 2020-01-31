<?php

class Response
{
	public function sendJSON($message = "", $HTTPStatusCode = 200, $type = "normal")
	{

		header('Access-Control-Allow-Origin: *');
		header('Access-Control-Allow-Methods: POST');
		header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
		header('Content-Type: text/html; charset=UTF-8');

		http_response_code($HTTPStatusCode);
		$res = new STDClass();
		$res->message = $message;
		$res->type = $type;
		echo json_encode($res);
		exit();
	}
}
