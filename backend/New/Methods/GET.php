<?php

class GET extends Database
{
	private $Validation;
	private $Res;

	function __construct($Validation, $Res)
	{
		parent::__construct();
		$this->Validation = $Validation;
		$this->Res = $Res;
	}

	public function begin($table, $type, $returnType, $data)
	{
		$payload = array();

		$data = $this->Validation->cleanValidStructure($data, $_ENV['Schema'][$table]);
		if ($data === false) $this->Res->sendJSON("Please Provide All Required Fields", 400, "Error");

		$this->Connect();
		$prepareSQL = $this->conn->prepare("SELECT * FROM `$table`");

		$prepareSQL->execute();
		$result = $prepareSQL->get_result();

		while ($rowData = $result->fetch_assoc()) {
			array_push($payload, $rowData);
		}

		return $payload;
	}
}
