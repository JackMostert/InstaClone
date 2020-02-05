<?php
include(ROOT_PATH . './New/Schemas/Users.php');
include(ROOT_PATH . './New/Schemas/Comments.php');
include(ROOT_PATH . './New/Schemas/Likes.php');
include(ROOT_PATH . './New/Schemas/Posts.php');
include(ROOT_PATH . './New/Schemas/Tags.php');
include(ROOT_PATH . './New/Schemas/RequestConditional.php');
include(ROOT_PATH . './New/Schemas/RequestAll.php');

include(ROOT_PATH . './New/Core/_ENV.php');
include(ROOT_PATH . './New/Core/Validation.php');
include(ROOT_PATH . './New/Core/Response.php');
include(ROOT_PATH . './New/Core/Database.php');

include(ROOT_PATH . './New/Methods/CONTROL.php');
include(ROOT_PATH . './New/Methods/DELETE.php');
include(ROOT_PATH . './New/Methods/GET.php');
include(ROOT_PATH . './New/Methods/POST.php');
include(ROOT_PATH . './New/Methods/UPDATE.php');

$Validation 	= new Validation();
$Res 					= new Response();
$DELETE 			= new DELETE();
$GET 					= new GET();
$POST 				= new POST();
$UPDATE 			= new UPDATE();

$CONTROL 			= new CONTROL($Validation, $Res, $GET, $POST, $UPDATE, $DELETE);
