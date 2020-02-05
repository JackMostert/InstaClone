<?php
include('../Schemas/Users.php');
include('../Schemas/Comments.php');
include('../Schemas/Likes.php');
include('../Schemas/Posts.php');
include('../Schemas/Tags.php');
include('../Schemas/RequestConditional.php');
include('../Schemas/RequestAll.php');

include('./_ENV.php');
include('./Validation.php');
include('./Response.php');
include('./Database.php');

include('../Methods/CONTROL.php');
include('../Methods/DELETE.php');
include('../Methods/GET.php');
include('../Methods/POST.php');
include('../Methods/UPDATE.php');

$Validation     = new Validation();
$Res                     = new Response();
$DELETE             = new DELETE();
$GET                     = new GET();
$POST                 = new POST();
$UPDATE             = new UPDATE();

$CONTROL             = new CONTROL($Validation, $Res, $GET, $POST, $UPDATE, $DELETE);
