<?php
include(ROOT_PATH . './New/Schemas/Users.php');
include(ROOT_PATH . './New/Schemas/Comments.php');
include(ROOT_PATH . './New/Schemas/Likes.php');
include(ROOT_PATH . './New/Schemas/Posts.php');
include(ROOT_PATH . './New/Schemas/Tags.php');

include(ROOT_PATH . './New/Core/_ENV.php');
include(ROOT_PATH . './New/Core/Validation.php');
include(ROOT_PATH . './New/Core/Response.php');
include(ROOT_PATH . './New/Core/Database.php');

$Validation 	= new Validation();
$Res 					= new Response();
