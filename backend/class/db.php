<?php

class DB
{
  public $host = "localhost";
  public $username = "root";
  public $passwd = "";
  public $dbname = "ImagePing";
  public $conn;

  public function Connect()
  {
    $this->conn = new mysqli($this->host, $this->username, $this->passwd, $this->dbname);
  }

  public function Disconnect()
  {
    $this->conn->close();
  }
}
