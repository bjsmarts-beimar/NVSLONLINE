<?php

use Illuminate\Database\Seeder;
use NVSLOnline\Player;

class PlayersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       $players = [
            [
                'FirstName' => 'Phil',
                'LastName' => 'Heins',
                'IsHidden' => false,
                'TeamId' => 1
            ],
            [
                'FirstName' => 'Nikola',
                'LastName' => 'Pearson',
                'IsHidden' => false,
                'TeamId' => 2
            ],
            [
                'FirstName' => 'John',
                'LastName' =>  'Pearson',
                'IsHidden' => false,
                'TeamId' => 3
            ]
        ];

        foreach ($players as $player) {
            Player::create($player);
        }
    }
}
