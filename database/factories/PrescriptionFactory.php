<?php

namespace Database\Factories;

use App\Models\Prescription;
use Illuminate\Database\Eloquent\Factories\Factory;

class PrescriptionFactory extends Factory
{
    protected $model = Prescription::class;

    public function definition(): array
    {
        return [
            'content'                 => $this->faker->paragraph,
            'patient_id'              => $this->faker->numberBetween(1, 100),
            'prescription_name'       => $this->faker->word,
            'prescription_description'=> $this->faker->sentence,
        ];
    }
}
