<?php

namespace NVSLOnline;

use Illuminate\Database\Eloquent\Model;

class Venue extends Model
{
    protected $table = 'Venues';

	protected $primaryKey = 'Id';

	public $timestamps = false;

	protected $fillable =[
		'VenueName',
		'IsHidden'
	];
}
