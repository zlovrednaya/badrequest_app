<?php

namespace App\Models\Integrations\AviationStack;

use App\Models\Integrations\AbstractApi;

class AviationStack extends AbstractApi
{
    //public string $baseUrl = 'https://api.aviationstack.com/v1';
    private string $method;

    private function prepareData(string $input): array
    {
        return [
            'limit' => 1,
            'iata' => $input,
        ];
    }
    private function getFlightSata(): array
    {
        $data = $this->prepareData();
        $result = $this->request('flights', 'GET', $data);
    }
    
    protected function getHeaders(): array
    {
        
    }

}