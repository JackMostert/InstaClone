<?php

class GET extends Database
{
	private function getTableData($table, $returnType, $schema, $data)
	{
		$payload 	= array();
		$data 		= $this->Validation->cleanValidStructure($data, $_ENV['Schema'][$schema]);

		if ($data === false)
			$this->Res->sendJSON("Please Provide All Required Fields", 400, "Error");

		$this->Connect();

		switch ($schema) {
			case 'RequestSingle':
				$Field = $data->Field;
				$Search = $data->ID;

				if ($returnType === 'Count') {
					$prepareSQL = $this->conn->prepare("SELECT COUNT(*) as total FROM `$table` WHERE $Field = '$Search'");
				} else {
					$prepareSQL = $this->conn->prepare("SELECT * FROM `$table` WHERE $Field = '$Search'");
				}

				break;
			case 'RequestAll':

				if ($returnType === 'Count') {
					$prepareSQL = $this->conn->prepare("SELECT COUNT(*) as total FROM `$table`");
				} else {
					$prepareSQL = $this->conn->prepare("SELECT * FROM `$table`");
				}

				break;
		}

		$prepareSQL->execute();
		$result = $prepareSQL->get_result();

		while ($rowData = $result->fetch_assoc()) {
			array_push($payload, $rowData);
		}

		$this->Disconnect();

		return $payload;
	}

	public function route($table, $returnType, $schema, $data, $route)
	{
		$payload = array();

		switch ($route) {
			case '/Feed':
				//Get all post
				$payload = $this->getTableData($table, $returnType, $schema, $data);

				//Get like Count assoc with Posts
				foreach ($payload as $key => $value) {
					$internalData = new stdClass();
					$internalData->ID = $value['ID'];
					$internalData->Field = "image_id";
					$payload[$key]['Likes'] = $this->getTableData('Likes', 'Count', "RequestSingle", $internalData)[0]["total"];
				}

				//Get Comment Count assoc with Posts
				foreach ($payload as $key => $value) {
					$internalData = new stdClass();
					$internalData->ID = $value['ID'];
					$internalData->Field = "image_id";
					$payload[$key]['Comments'] = $this->getTableData('Comments', 'Count', "RequestSingle", $internalData)[0]["total"];
				}

				//Get User data for post information
				foreach ($payload as $key => $value) {
					$internalData = new stdClass();
					$internalData->ID = $value['user_id'];
					$internalData->Field = "ID";
					$tempHolder = $this->getTableData('Users', 'Data', "RequestSingle", $internalData);
					if ($tempHolder) {
						$payload[$key]['User'] = $tempHolder[0]["User_username"];
					} else {
						$payload[$key]['User'] = $tempHolder;
					}
					unset($payload[$key]['user_id']);
				}

				break;
		}

		return $payload;
	}

	private function getData($table, $returnType, $schema, $data, $conn)
	{

		$result = "";

		switch ($schema) {
			case 'RequestSingle' && $returnType === "Count":
				$result = call_user_func($_ENV["PerparedSQL"]["GET_Conditional_Count"], $conn, $table, $data->field, $data->toSearch)->execute();
				break;
			case 'RequestSingle':
				$result = call_user_func($_ENV["PerparedSQL"]["GET_Conditional"], $conn, $table, $data->field, $data->toSearch)->execute();
				break;
			case 'RequestAll' && $returnType === "Count":
				$result = call_user_func($_ENV["PerparedSQL"]["GET_All_Count"], $conn, $table)->execute();
				break;
			case 'RequestAll':
				$result = call_user_func($_ENV["PerparedSQL"]["GET_All"], $conn, $table)->execute();
				break;
		}
	}

	public function start($table, $returnType, $schema, $data, $route, $Res, $conn)
	{

		$this->getData($table, $returnType, $schema, $data, $conn);

		switch ($route) {
			case '/Feed':
				break;
		}
	}
}
