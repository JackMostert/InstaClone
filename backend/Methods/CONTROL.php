<?php

class CONTROL extends Database
{
	private $Validation;
	private $Res;
	private $GET;
	private $POST;
	private $UPDATE;
	private $DELETE;

	function __construct($Validation, $Res, $GET, $POST, $UPDATE, $DELETE)
	{
		parent::__construct();
		$this->Validation = $Validation;
		$this->Res = $Res;
		$this->GET = $GET;
		$this->POST = $POST;
		$this->UPDATE = $UPDATE;
		$this->DELETE = $DELETE;
	}

	private function structuralValidation($data, $schema)
	{
		$data = $this->Validation->cleanValidStructure($data, $_ENV['Schema'][$schema]);
		if ($data === false)
			$this->Res->sendJSON("Please Provide All Required Fields", 400, "Error");
	}

	private function dataSensitization()
	{
		// $data = $this->Validation->cleanValidStructure($data, $_ENV['Schema'][$schema]);
		// if ($data === false)
		// $this->Res->sendJSON("Provided Invaleid chars", 400, "Error");
	}

	public function handler($method, $table, $returnType, $schema, $data, $route, $JWT = false, $file = false)
	{
		$this->structuralValidation($data, $schema);
		$this->dataSensitization();

		$this->Connect();

		switch ($method) {
			case 'GET':
				$this->GET->start($table, $returnType, $schema, $data, $route, $this->Res, $this->conn, $JWT, $this->Validation);
				break;
			case 'POST':
				$this->POST->start($data, $route, $this->Res, $this->conn, $JWT, $this->Validation, $file);
				break;
			case 'UPDATE':
				$this->UPDATE->start($table, $returnType, $schema, $data, $route, $this->Res, $this->conn, $JWT, $this->Validation);
				break;
			case 'DELETE':
				$this->DELETE->start($table, $returnType, $schema, $data, $route, $this->Res, $this->conn, $JWT, $this->Validation);
				break;
		}

		$this->Disconnect();
	}
}
