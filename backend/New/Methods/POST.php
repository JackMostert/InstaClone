<?php

class POST extends Database
{
	private $Validation;
	private $Res;

	function __construct($Validation, $Res)
	{
		parent::__construct();
		$this->Validation = $Validation;
		$this->Res = $Res;
	}

	public function postDataTable($table, $returnType, $schema, $data, $route)
	{
		$data 		= $this->Validation->cleanValidStructure($data, $_ENV['Schema'][$schema]);

		if ($data === false)
			$this->Res->sendJSON("Please Provide All Required Fields", 400, "Error");

		$this->Connect();

		switch ($route) {
			case '/Register':
				call_user_func($_ENV["PerparedSQL"]["POST_Users"], $this->conn, $data)->execute();
				break;
		}

		$this->Disconnect();
	}

	public function route($table, $returnType, $schema, $data, $route)
	{
		$this->postDataTable($table, $returnType, $schema, $data, $route);
	}
}
