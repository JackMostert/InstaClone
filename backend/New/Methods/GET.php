<?php

class GET extends Database
{
	private $Validation;

	function __construct($Validation)
	{
		$this->Validation = $Validation;
	}

	public function begin($table, $type, $returnType, $data)
	{
		$this->Validation->cleanValidStructure($data, $_ENV['Schema'][$table]);
	}
}
