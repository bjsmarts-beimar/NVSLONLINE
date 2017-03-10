<?php

namespace NVSLOnline\Http\Middleware;

use Closure;

class Cors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        return $next($request)
                ->header('Access-Control-Allow-Origin', '*')
                //->header('Access-Control-Allow-Credentials', true)
                ->header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
                //->header('Access-Control-Allow-Headers', 'Content-Type,Accept,Authorization,X-Requested-With')
                //->header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization')
               // ->header('Access-Control-Max-Age', '28800')
                ->header('Access-Control-Allow-Headers', 'Content-Type')
                ;
    }
}
