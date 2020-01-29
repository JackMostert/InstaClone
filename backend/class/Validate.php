<?php

class Validate
{
  public function _email($email = false)
  {
    if (is_bool($email)) return false;
    if (is_string($email) === false) return false;
    if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) return false;
    return $email;
  }

  public function _input($input = false, $min = 3, $max = 255)
  {
    if (is_bool($input)) return false;
    if (is_string($input) === false) return false;
    if (!(strlen($input) >= $min) && !(strlen($input) <= $max)) return false;
    return $input;
  }

  public function _array($array = false, $key = false)
  {
    if (is_bool($array)) return false;
    if (is_array($array) === false) return false;
    if ($key && !array_key_exists($key, (array) $array)) return false;
    if ($key) return $array[$key];
    return $array;
  }
}
