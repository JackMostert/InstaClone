<?php

$_ENV['validateInputRegex'] = '/[^a-z0-9\-\|\_\ ]/i';

// JWT Toekn key
$_ENV['key'] = "fe d0 fa 74 a7 1e bb 68 08 0f 84 7a dc 7d 98 82 
1a d6 07 fd 11 19 92 9d 7e 34 94 87 88 45 5e d9 
22 7d e5 a2 79 a4 37 66 1a bf b0 da 4c 3b 2f 8d 
d4 d0 db 2d 07 22 e7 b4 15 13 1b c0 5d 68 bf 85 
bf 30 85 ff 4c d5 ef bc 68 7c 1c d7 e6 23 1d 68 
93 c8 e7 41 52 09 07 9f e6 ce 88 27 b4 51 64 4e 
95 c3 a0 db 92 f3 01 f0 cb 2e ad 85 97 61 cc 8d 
cf 08 1e c7 c4 29 97 1a a4 1d 35 13 08 13 56 e9";

// Database login detains
$_ENV['host'] = 'localhost';
$_ENV['username'] = 'root';
$_ENV['passwd'] = '';
$_ENV['dbname'] = 'imageping';

// For checking the request
$_ENV['routes'] = array('/newPost', '/Feed', '/Profile', '/Register', '/Login');
$_ENV['methods'] = array('GET', 'POST', 'DELETE', 'UPDATE');
$_ENV['tables'] = array('Users', 'Comments', 'Posts', 'Likes');
$_ENV['returnTypes'] = array('Count', 'Data');
$_ENV['schemas'] = array("Users", "Comments", "Likes", "Posts", "Tages", "RequestAll", "RequestConditional");

// Valid Schemas
$_ENV['Schema'] = array(
	'Users' => $UserSchema,
	'Comments' => $CommentSchema,
	'Likes' => $LikeSchema,
	'Posts' => $PostSchema,
	'Tages' => $TagSchema,
	'RequestConditional' => $RequestConditionalSchema,
	'RequestAll' => $RequestAllSchema,
);

// PerparedSQL
$_ENV["PerparedSQL"] = array(
	'POST_Users' => function ($conn, $data) {
		$prepareSQL = $conn->prepare("INSERT INTO `Users` (`User_ID`, `User_Password`, `User_FirstName`, `User_LastName`, `User_Age`, `User_Email`, `User_Username`) VALUES (?, ?, ?, ?, ?, ?, ?)");
		$prepareSQL->bind_param("ssssiss", $data->ID, $data->Password, $data->FirstName, $data->LastName, $data->Age, $data->Email, $data->Username);
		$prepareSQL->execute();
	},
	'POST_Post' => function ($conn, $data) {
		$prepareSQL = $conn->prepare("INSERT INTO Posts (Post_ID, Post_UserID, Post_Content, Post_Title, Post_ImageURL) VALUES (?, ?, ?, ?, ?)");
		$prepareSQL->bind_param("sssss", $data->ID, $data->User_ID, $data->PostText, $data->PostTitle, $data->PostImageURL);
		$prepareSQL->execute();
	},
	'GET_Conditional' => function ($conn, $table, $field, $toSearch) {
		$prepareSQL = $conn->prepare("SELECT * FROM `$table` WHERE $field = '$toSearch'");
		$prepareSQL->execute();
		return $prepareSQL->get_result();
	},
	'GET_Conditional_Count' => function ($conn, $table, $field, $toSearch) {
		$prepareSQL =  $conn->prepare("SELECT COUNT(*) as total FROM `$table` WHERE $field = '$toSearch'");
		$prepareSQL->execute();
		return $prepareSQL->get_result();
	},
	'GET_All' => function ($conn, $table) {
		$prepareSQL =  $conn->prepare("SELECT * FROM `$table`");
		$prepareSQL->execute();
		return $prepareSQL->get_result();
	},
	'GET_All_Count' => function ($conn, $table) {
		$prepareSQL =  $conn->prepare("SELECT COUNT(*) as total FROM `$table`");
		$prepareSQL->execute();
		return $prepareSQL->get_result();
	}
);

$_ENV["UUID_Light"] = function ($length = 200) {
	return md5(substr(str_shuffle(str_repeat($x = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($length / strlen($x)))), 1, $length));
};

$_ENV["UUID_Heavy"] = function ($length = 32) {
	return bin2hex(random_bytes($length));
};
