<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Prescription extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'content' => $this->content,
            'patient_id' => $this->patient_id,
            'prescription_name' => $this->prescription_name,
            'prescription_description' => $this->prescription_description,
            'updated_at' => $this->updated_at,
        ];
    }

}
