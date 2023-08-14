<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Prescription;  // Ensure the namespace is correct.

class PrescriptionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        \App\Models\Prescription::factory(10)->create();
    }
}
