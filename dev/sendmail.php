<?php namespace SendMail;

require '../vendor/autoload.php';

header("Content-type: application/json; charset=utf-8");

if( !empty($_POST) ){
    $SendMail = new SendMail($_POST);
    echo json_encode( $SendMail->send() );
}else{
    header("Location: /");
}
