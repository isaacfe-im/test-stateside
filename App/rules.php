<?php namespace SendMail;

class rules {
    private static $rules = array(
      'required' => [ //Campos requeridos
        ['nombre'],
        ['email'],
        ['asunto'],
        ['mensaje']
      ],
      'email' => 'email'
    );

    public static function get($key)
    {
        return self::$rules[$key];
    }

    public static function all()
    {
        return self::$rules;
    }

}
