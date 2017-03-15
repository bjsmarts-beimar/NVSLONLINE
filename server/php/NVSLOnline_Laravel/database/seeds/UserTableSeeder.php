<?php

use Illuminate\Database\Seeder;
use NVSLOnline\User;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            [
                'name'=>'kevin',
                'email'=>'kevin@hotmail.com',
                'password'=>Hash::make('123456789')
            ]
        ];

        foreach ($users as $user) {
           User::create($user);
        }
    }
}
