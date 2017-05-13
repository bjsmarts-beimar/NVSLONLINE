<?php

namespace NVSLOnline;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    //con esta line evitamos en cambio a camel case
	public static $snakeAttributes = false;

	protected $table = 'News';

	protected $primaryKey = 'Id';

	public $timestamps = false;
	
	protected $fillable =[
		'title',
		'description',
        'IsHidden',
        'created',
        'modifiedBy',
        'modifiedByfullName',
        'modified'
	];
}