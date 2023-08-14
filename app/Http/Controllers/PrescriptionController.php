<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Prescription;
use App\Http\Resources\Prescription as PrescriptionResource;

class PrescriptionController extends Controller
{
    public function index()
    {
        return PrescriptionResource::collection(Prescription::all());
    }

    public function show(Prescription $prescription)
    {
        return new PrescriptionResource($prescription);
    }
}
