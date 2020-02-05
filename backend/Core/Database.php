<?php

class Database
{
	protected $host;
	protected $username;
	protected $passwd;
	protected $dbname;
	protected $conn;

	function __construct()
	{
		$this->host = $_ENV['host'];
		$this->username = $_ENV['username'];
		$this->passwd = $_ENV['passwd'];
		$this->dbname = $_ENV['dbname'];
	}

	protected function Connect()
	{
		$this->conn = new mysqli($this->host, $this->username, $this->passwd, $this->dbname);
	}

	protected function Disconnect()
	{
		$this->conn->close();
	}
}
