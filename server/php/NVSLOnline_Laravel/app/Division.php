<?php

namespace NVSLOnline;

use Illuminate\Database\Eloquent\Model;

class Division extends Model
{
	protected $table = 'Divisions';

	protected $primaryKey = 'Id';

	public $timestamps = false;

	protected $fillable =[
		'DivisionName',
		'IsHidden'
	];
}
