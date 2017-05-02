<?php

namespace SendMail;

use Valitron\Validator as ValidateForm;
use SendMail\rules as rules;
use SendMail\config as config;
use SendMail\xss_filter as xss;

require '../vendor/phpmailer/phpmailer/PHPMailerAutoload.php';


class SendMail {

    private $valid;
    private $PHPMailer;
    private $stateValidate;
    private $values;
    private $xss;

    public function __construct($val) {
        $this->xss = new xss();
        $this->valid = new ValidateForm($this->xssMethod($val));
        $this->values = $this->xssMethod($val);
        $this->PHPMailer = new \PHPMailer();
        $this->stateValidate = $this->validate();
    }

    public function xssMethod($post) {

        foreach ($post as $key => $valor) {
          $this->xss->filter_it($valor);
        };
        return $post;

    }

    public function validate() {

        $this->valid->rules(rules::all());
        return $this->valid->validate();
    }

    private function renderTemplate($template) {

        extract($this->values);
        ob_start();
        include $template;
        return ob_get_clean();
    }

    private function sendConfig($confirm = false) {

        $this->PHPMailer->isSMTP();
        $this->PHPMailer->SMTPDebug = config::get('debug');
        $this->PHPMailer->Debugoutput = 'html';
        $this->PHPMailer->Host = config::get('host');
        $this->PHPMailer->Port = config::get('port');
        $this->PHPMailer->SMTPSecure = config::get('SMTPSecure');
        $this->PHPMailer->SMTPAuth = config::get('SMTPAuth');
        //Accesos smtp
        $this->PHPMailer->Username = config::get('username');
        $this->PHPMailer->Password = config::get('password');

        if ($confirm) {
            //remitente
            $this->PHPMailer->setFrom(config::get('emailSend'), config::get('titleSend'));
            //destinatario
            $this->PHPMailer->addAddress($this->values['email'], config::get('addAddressTitle'));
            //Asunto
            $this->PHPMailer->Subject = config::get('subjectConfirm');
            //Template
            $this->PHPMailer->msgHTML($this->renderTemplate(config::get('templateConfirmFrom')), dirname(__FILE__));
        } else {
            //remitente
            $this->PHPMailer->setFrom(config::get('emailSend'), config::get('titleSend'));
            //destinatario
            $this->PHPMailer->addAddress(config::get('addAddress'), config::get('addAddressTitle'));
            //Copia a
            $this->PHPMailer->addReplyTo(config::get('emailSend'), config::get('titleSend'));
            //Asunto
            $this->PHPMailer->Subject = config::get('subject');
            //Template
            $this->PHPMailer->msgHTML($this->renderTemplate(config::get('templateFrom')), dirname(__FILE__));
        }
    }

    public function send() {

        $this->sendConfig();
        $message = [];

        if ($this->stateValidate) {
            if ($this->PHPMailer->send()) {

                $this->sendConfig(true);
                $this->PHPMailer->send();

                $message['state'] = 'ok';
                $message['info'] = config::get('success');
            } else {
                $message['state'] = 'error';
                $message['info'] = config::get('error');
            }
        } else {
            $message['state'] = 'error';
            $message['info'] = config::get('invalid');
        }

        return $message;
    }

}
