<?php

include "./_env.php";

class Clean
{
  public function _email($email)
  {
    $email = trim($email);
    return filter_var($email, FILTER_SANITIZE_EMAIL);
  }

  public function _input($input = "")
  {
    $input = trim($input);
    $input = stripslashes($input);
    $input = htmlspecialchars($input);
    $input = preg_replace($_ENV['validateInputRegex'], '', $input);
    return $input;
  }
}
