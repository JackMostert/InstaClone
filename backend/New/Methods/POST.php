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
			case '/Login':
				$this->login($data, $Res, $conn);
				break;
		}
	}

	private function login($data, $Res, $conn)
	{
		$ID = sha1($data->field); //field is email

		$User = call_user_func($_ENV["PerparedSQL"]["GET_Conditional"], $conn, 'Users', 'User_ID', $ID)->fetch_assoc();
		if (!$User) {
			$Res->sendJSON("Canno't find User", 404, "Error");
		} else if (!password_verify("$data->toSearch", $User['User_Password'])) {
			$Res->sendJSON("Username or password is incorrect", 401, "Error");
		} else {
			$payload = new stdClass();
			$payload->UID = $User['User_ID'];
			$payload->Expire = time() + 3600;

			$jwt = JWT::encode($payload, $_ENV['key'], 'HS384');

			$Res->sendData($jwt);
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
