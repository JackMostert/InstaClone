<?php

require ROOT_PATH . '/vendor/autoload.php';

use \Firebase\JWT\JWT;

class POST
{
	public function start($data, $route, $Res, $conn)
	{
		switch ($route) {
			case '/Register':
				$this->register($data, $Res, $conn);
				break;
			case '/newPost':
				$this->newPost($data, $Res, $conn);
				break;
			case '/newComment':
				# code...
				break;
			case '/newLike':
				# code...
				break;
		}
	}

	private function register($data, $Res, $conn)
	{
		$data->ID = sha1($data->Email);
		$data->Password = password_hash($data->Password, PASSWORD_DEFAULT, ['cost' => 12]);

		call_user_func($_ENV["PerparedSQL"]["POST_Users"], $conn, $data);

		$payload = new stdClass();
		$payload->UID = $data->ID;
		$payload->Expire = time() + 3600;

		$jwt = JWT::encode($payload, $_ENV['key'], 'HS384');

		$Res->sendData($jwt);
	}

	private function newPost($data, $Res, $conn)
	{
		$data->ID = $_ENV["UUID_Light"]();
		call_user_func($_ENV["PerparedSQL"]["POST_Post"], $conn, $data);
	}
}
