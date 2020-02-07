<?php

require '../vendor/autoload.php';

use \Firebase\JWT\JWT;

class POST
{
	public function start($data, $route, $Res, $conn, $JWT, $validation, $file)
	{
		switch ($route) {
			case '/Register':
				$this->register($data, $Res, $conn);
				break;
			case '/newPost':
				$this->newPost($data, $Res, $conn, $validation, $JWT, $file);
				break;
			case '/newComment':
				$this->newComment($data, $Res, $conn, $validation, $JWT);
				break;
			case '/newLike':
				$this->newLike($data, $Res, $conn, $validation, $JWT);
				break;
			case '/Login':
				$this->login($data, $Res, $conn);
				break;
		}
	}

	private function newLike($data, $Res, $conn, $validation, $JWT)
	{
		$User = $validation->checkUserLogin($JWT, $conn, $Res);
		$data->ID = $_ENV["UUID_Light"]();
		$data->User_ID = $User['User_ID'];

		$FoundLike = call_user_func($_ENV["PerparedSQL"]["GET_Conditional_Like"], $conn, 'Likes', "Like_UserID", $User['User_ID'], 'Like_PostID', $data->Post_ID);

		//Already Liked Photo
		if ($FoundLike->fetch_assoc()) {
			call_user_func($_ENV["PerparedSQL"]["REMOVE_Like"], $conn, 'Likes', "Like_UserID", $User['User_ID'], 'Like_PostID', $data->Post_ID);
		} else {
			// hasen't liked photo
			call_user_func($_ENV["PerparedSQL"]["POST_Like"], $conn, $data);
		}

		$Res->sendJSON("", 200, "");
	}

	private function newComment($data, $Res, $conn, $validation, $JWT)
	{
		$User = $validation->checkUserLogin($JWT, $conn, $Res);
		$data->ID = $_ENV["UUID_Light"]();
		$data->User_ID = $User['User_ID'];

		call_user_func($_ENV["PerparedSQL"]["POST_Comment"], $conn, $data);

		$Res->sendJSON("", 200, "");
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

	private function newPost($data, $Res, $conn, $validation, $JWT)
	{
		$User = $validation->checkUserLogin($JWT, $conn, $Res);
		$data->ID = $_ENV["UUID_Light"]();
		$data->User_ID = $User['User_ID'];
		if (isset($_FILES["PostImageURL"])) {
			$extention = pathinfo($_FILES["PostImageURL"]["name"], PATHINFO_EXTENSION);
			$hasValidExtnetion = false;

			foreach ($_ENV['ImageExtentions'] as $Ext) {
				if ($extention === $Ext) {
					$hasValidExtnetion = true;
				}
			}

			if ($hasValidExtnetion === false) return $Res->sendJSON("Unsupported Media Type", 415, "Error");


			$check = filesize($_FILES["PostImageURL"]["tmp_name"]);
			//in bytes 
			if ($check <= 100) {
				$Res->sendJSON("Image Must have content", 415, "Error");
			}

			$fileName = $_ENV["UUID_Light"]() . "." . "$extention";
			$filePath = __DIR__ . "/../post_images/" . "$fileName";

			move_uploaded_file(
				$_FILES["PostImageURL"]["tmp_name"],
				$filePath
			);

			$data->PostImageURL = "post_images/" . $fileName;
		}
		call_user_func($_ENV["PerparedSQL"]["POST_Post"], $conn, $data);

		$Res->sendJSON("", 200, "");
	}
}
