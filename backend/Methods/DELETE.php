<?php

class DELETE extends Database
{
    public function start($table, $returnType, $schema, $data, $route, $Res, $conn, $JWT, $Validation)
    {
        $User = $Validation->checkUserLogin($JWT, $conn, $Res);
        $data->Post_UserID = $User['User_ID'];

        call_user_func($_ENV["PerparedSQL"]["DELETE_Post_Image"], $conn, $data);
        $Res->sendJSON("", 200, "");
    }
}
