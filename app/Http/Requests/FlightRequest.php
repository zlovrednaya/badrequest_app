<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FlightRequest extends FormRequest
{
    public function rules(): array
    {
        $scenario = $this->route()->getActionMethod(); 

        switch ($scenario) {
            case 'postObserveFlight':
                return [
                    //'airport' => 'nullable|string|size:3',
                    'email' => 'required|string',
                    'flight_number' => 'required|string',
                    'api_key' => 'nullable|string',
                ];

            case 'checkDelay':
                return [
                    'flight_number' => 'required|string|min:2|max:10',
                ];

            case 'findFlight':
                return [
                    'latitude'  => 'required_without:airport|numeric|between:-90,90',
                    'longitude' => 'required_without:airport|numeric|between:-180,180',
                    'airport'   => 'required_without:latitude|string|size:3',
                ];

            default:
                return [];
        }
    }

    public function messages(): array
    {
        return array_merge(parent::messages(), [
            'airport.size' => 'Airport code must be exactly 3 characters (e.g. LED, JFK).',
            'flight_number.required' => 'Flight number is obligatory',
        ]);
    }
}