<?php

require __DIR__ . '/vendor/autoload.php';

use Firebase\JWT\JWT;

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: text/html; charset=UTF-8');
include "./class/db.php";
include "./class/POST.php";
include "./_env.php";

$imageID = $_POST['imageID'];
