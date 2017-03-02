<?php

use Illuminate\Database\Seeder;
use NVSLOnline\Division;

class DivisionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $divisions = [
            [
                'DivisionName' => 'First',
                'IsHidden' => false
            ],
            [
                'DivisionName' => 'Second',
                'IsHidden' => false
            ]
        ];

        foreach ($divisions as $division) {
            Division::create($division);
        }
    }
}
