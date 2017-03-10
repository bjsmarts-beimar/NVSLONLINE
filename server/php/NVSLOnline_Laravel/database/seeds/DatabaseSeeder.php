<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        $this->call(SeasonsTableSeeder::class);
        $this->call(VenuesTableSeeder::class);
        $this->call(DivisionsTableSeeder::class);
    }
}