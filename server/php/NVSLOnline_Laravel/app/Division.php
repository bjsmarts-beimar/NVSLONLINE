<?php

namespace NVSLOnline;

use Illuminate\Database\Eloquent\Model;

class Division extends Model
{
    //con esta line evitamos en cambio a camel case
	public static $snakeAttributes = false;

	protected $table = 'Divisions';

	protected $primaryKey = 'Id';

	public $timestamps = false;
	
	protected $fillable =[
		'DivisionName',
		'IsHidden'
	];
}
