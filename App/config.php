<?php

namespace SendMail;

class config {

    private static $config = array(
        'username' => 'username',
        "password" => 'password',
        'SMTPSecure' => 'tls',
        'SMTPAuth' => 'SMTPAuth',
        'type' => 'smtp',
        'debug' => 0,
        'host' => 'smtp.gmail.com',
        'port' => 587,
        'templateFrom' => 'templateEmail.php',
        'templateConfirmFrom' => 'templateConfirmEmail.php',
        'emailSend' => 'email@gmail.com',
        'titleSend' => 'Correo de prueba',
        'addAddress' => 'email@gmail.com',
        'addAddressTitle' => 'Este es un corro de prueba',
        'subject' => 'Correo de prueba para grunt compile',
        'subjectConfirm' => 'Correo de confirmacion',
        "success" => "Su correo se ha enviado exitosamente",
        "error" => "Ocurrio un error inesperado al enviar el correo",
        "success" => "Su correo se ha enviado exitosamente",
        "invalid" => "Valores invalidos",
    );
    
    public static function get($key)
    {
        return self::$config[$key];
    }

}
