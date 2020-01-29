<?php

class schema
{
    private $method;
    private $data;
    private $table;

    public function __construct($_method, $_table, $_data)
    {
        $this->method = $_method;
        $this->data = $_data;
        $this->table = $_table;
    }
}
