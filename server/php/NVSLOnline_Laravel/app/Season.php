<?php

namespace NVSLOnline;

use Illuminate\Database\Eloquent\Model;

class Season extends Model
{
    //con esta line evitamos en cambio a camel case
	public static $snakeAttributes = false;
	
    protected $table = 'Seasons';

	protected $primaryKey = 'Id';

	public $timestamps = false;

	protected $fillable =[
		'SeasonName',
		'Active',
		'IsHidden',
		'SeasonStart',
		'SeasonEnd'
	];
}
