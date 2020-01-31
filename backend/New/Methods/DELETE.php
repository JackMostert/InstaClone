<?php

class DELETE extends Database
{
	private $Validation;

	function __construct($Validation)
	{
		$this->Validation = $Validation;
	}

	public function begin($table, $type, $returnType, $data)
	{
	}
}
