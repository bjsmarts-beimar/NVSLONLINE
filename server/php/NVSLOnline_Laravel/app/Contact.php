<?php

namespace NVSLOnline;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    //con esta line evitamos en cambio a camel case
	public static $snakeAttributes = false;

	protected $table = 'Contacts';

	protected $primaryKey = 'Id';

	public $timestamps = false;
	
	protected $fillable =[
		'yourName',
		'email',
        'message',
        'requestSubject',
        'IsHidden',
        'created',
        'modifiedBy',
        'modifiedByfullName',
        'modified'
	];
}
