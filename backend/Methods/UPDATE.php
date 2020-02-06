<?php

class UPDATE extends Database
{
    public function start($table, $returnType, $schema, $data, $route, $Res, $conn, $JWT, $Validation)
    {
        $User = $Validation->checkUserLogin($JWT, $conn, $Res);
        $data->Post_UserID = $User['User_ID'];

        if (!$_FILES) {
            call_user_func($_ENV["PerparedSQL"]["UPDATE_Post"], $conn, $data);

            $Res->sendJSON("", 200, "");
        }

        $extention = pathinfo($_FILES["PostImageURL"]["name"], PATHINFO_EXTENSION);
        $hasValidExtnetion = false;

        foreach ($_ENV['ImageExtentions'] as $Ext) {
            if ($extention === $Ext) {
                $hasValidExtnetion = true;
            }
        }

        if ($hasValidExtnetion === false) return $Res->sendJSON("Unsupported Media Type", 415, "Error");


        $check = filesize($_FILES["PostImageURL"]["tmp_name"]);
        //in bytes 
        if ($check <= 100) {
            $Res->sendJSON("Image Must have content", 415, "Error");
        }

        $fileName = $_ENV["UUID_Light"]() . "." . "$extention";
        $filePath = __DIR__ . "/../post_images/" . "$fileName";

        move_uploaded_file(
            $_FILES["PostImageURL"]["tmp_name"],
            $filePath
        );

        $data->PostImageURL = "post_images/" . $fileName;

        call_user_func($_ENV["PerparedSQL"]["UPDATE_Post_Image"], $conn, $data);

        $Res->sendJSON("", 200, "");
    }
}
