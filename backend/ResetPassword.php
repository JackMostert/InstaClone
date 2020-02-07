<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: text/html; charset=UTF-8');
// Database login detains
$_ENV['host'] = 'localhost';
$_ENV['username'] = 'root';
$_ENV['passwd'] = '';
$_ENV['dbname'] = 'imageping';

include "./Core/Database.php";


class PwdReset extends Database
{

    function __construct()
    {
        parent::__construct();
    }

    public function start()
    {
        $method = $_POST['method'];

        if ($method === 'First') {

            $selector = bin2hex(random_bytes(8));
            $token = random_bytes(32);

            $exp = date("U") + 1800;

            $email = $_POST['email'];

            $this->Connect();

            $prepareSQL = $this->conn->prepare("DELETE FROM `pwdreset` WHERE PWDReset_Email = '$email'");
            $prepareSQL->execute();

            $hassedTok = password_hash($token, PASSWORD_DEFAULT);

            $prepareSQL = $this->conn->prepare("INSERT INTO `pwdreset` (`PWDReset_Email`, `PWDReset_selector`, `PWDReset_token`, `PWDReset_exp`) VALUES ('$email', '$selector', '$hassedTok', '$exp')");
            $prepareSQL->execute();

            $this->Disconnect();

            $info = new stdClass();

            $info->token = bin2hex($token);
            $info->selector = $selector;

            print_r(json_encode($info));
        }

        if ($method === "Second") {
            $sel = $_POST['selector'];
            $val = $_POST['token'];
            $email = $_POST['pwd'];

            $pwd = password_hash($email, PASSWORD_DEFAULT, ['cost' => 12]);

            if ($val && $sel) {

                if (ctype_xdigit($sel) !== false && ctype_xdigit($val) !== false) {
                    $currentDate = date("U");

                    $this->Connect();

                    $prepareSQL = $this->conn->prepare("SELECT * FROM pwdreset WHERE PWDReset_selector = '$sel' AND PWDReset_exp >= '$currentDate'");
                    $prepareSQL->execute();
                    $result = $prepareSQL->get_result();
                    $data = $result->fetch_assoc();

                    if ($data['PWDReset_ID']) {
                        $token = hex2bin($val);
                        $tokenCheck = password_verify($token, $data['PWDReset_token']);

                        if ($tokenCheck) {
                            $tokenEmail = sha1($data['PWDReset_Email']);

                            $prepareSQL = $this->conn->prepare("UPDATE users SET User_Password = '$pwd' WHERE User_ID = '$tokenEmail'");
                            $prepareSQL->execute();
                            echo "";
                        }
                    }

                    $this->Disconnect();
                }
            }
        }
    }
}

$DB = new PwdReset();
$DB->start();
