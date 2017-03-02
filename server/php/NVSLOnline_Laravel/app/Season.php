<?php

namespace NVSLOnline;

use Illuminate\Database\Eloquent\Model;

class Season extends Model
{
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
