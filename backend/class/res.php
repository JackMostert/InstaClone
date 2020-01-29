<?php

class Res
{
  public function sendJSON($status = 200, $message = "", $Sstatus = 0)
  {
    
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Content-Type: text/html; charset=UTF-8');

    http_response_code($status);
    $res = new STDClass();
    $res->message = $message;
    $res->Sstatus = $Sstatus;
    echo json_encode($res);
    exit;
  }
}
