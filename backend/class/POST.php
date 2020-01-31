<?php

class POST extends DB
{
	public function addUser($user)
	{
		$this->Connect();
		$Validate = new Validate();
		$Clean = new Clean();

		$user->Username = $Validate->_input($Clean->_input($user->Username));
		$user->Email = $Validate->_input($Clean->_email($user->Email));

		if (
			!$user->Username ||
			!$user->Email
		) return "Empty";

		$user->ID = sha1($user->Email);

		if ($this->checkUserByID($user->ID)) return "User found";

		$user->Password = password_hash($user->Password, PASSWORD_DEFAULT, ['cost' => 12]);

		$User_Statement = $this->conn->prepare("INSERT INTO Users(ID, Email, Password, Username) VALUES (?,?,?,?)");
		$User_Statement->bind_param("ssss", $user->ID, $user->Email, $user->Password, $user->Username);
		$User_Statement->execute();

		$payload = new stdClass();
		$payload->ID = $user->ID;
		$payload->Username = $user->Username;
		$payload->Email = $user->Email;

		$this->Disconnect();

		return $payload;
	}

	public function loginUser($user)
	{
		$this->Connect();
		$Validate = new Validate();
		$Clean = new Clean();

		$user->Email = $Validate->_input($Clean->_email($user->Email));

		if ($user->Email === false) return "No Email";

		$user->ID = sha1($user->Email);
		$User_Statement = $this->conn->prepare("SELECT ID, Password, Username FROM Users WHERE ID = ?");
		$User_Statement->bind_param("s", $user->ID);
		$User_Statement->execute();
		$Result = $User_Statement->get_result();
		$row_data = $Result->fetch_assoc();

		if (!$row_data) return "No User";

		$SID = $row_data['ID'];
		$SPassword = $row_data['Password'];

		if (!password_verify($user->Password, $SPassword)) return "Wrong Password";

		$payload = new stdClass();
		$payload->ID = $SID;
		$payload->Email = $user->Email;
		$payload->Username = $row_data['Username'];

		$this->Disconnect();

		return $payload;
	}

	public function findUserByID($ID)
	{
		$this->Connect();
		$User_Statement = $this->conn->prepare("SELECT * FROM Users WHERE ID = ?");
		$User_Statement->bind_param("s", $ID);
		$User_Statement->execute();
		$Result = $User_Statement->get_result();
		return $row = $Result->fetch_assoc();
		$this->Disconnect();
	}

	private function checkUserByID($ID)
	{
		$User_Statement = $this->conn->prepare("SELECT ID FROM Users WHERE ID = ?");
		$User_Statement->bind_param("s", $ID);
		$User_Statement->execute();
		$Result = $User_Statement->get_result();
		$row_data = $Result->fetch_assoc();
		if ($row_data) return true;
		return false;
	}

	public function uploadImage($_ID, $_content, $_URL, $_user_id)
	{
		$this->Connect();
		$User_Statement = $this->conn->prepare("INSERT INTO images(ID, content, URL, user_id) VALUES (?,?,?,?)");
		$User_Statement->bind_param("ssss", $_ID, $_content, $_URL, $_user_id);
		$User_Statement->execute();
		$this->Disconnect();
	}

	public function postlike($user_id, $userID, $imageID)
	{
		$this->Connect();
		$User_Statement = $this->conn->prepare("INSERT INTO likes(ID, user_id, image_id) VALUES (?,?,?)");
		$User_Statement->bind_param("sss", $user_id, $userID, $imageID);
		$User_Statement->execute();
		$this->Disconnect();
	}
}
