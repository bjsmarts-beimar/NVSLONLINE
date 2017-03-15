<?php

namespace NVSLOnline;

use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    //con esta line evitamos en cambio a camel case
	public static $snakeAttributes = false;
	
    protected $table = 'Players';

	protected $primaryKey = 'Id';

	public $timestamps = false;

	protected $fillable =[
		'FirstName',
        'LastName',
		'IsHidden',
        'TeamId'
	];
}
