<?php

$method = 			$_POST['method'];
$destination = 	$_POST['destination'];


switch ($destination) {
	case 'User':
		include "./User.php";
		$User = new User();
		$User->inital($method);
		break;

	default:
		# code...
		break;
}
