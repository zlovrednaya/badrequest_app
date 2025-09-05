<?php

namespace App\Models\Integrations;

class AviationStack extends AbstractApi
{
    private string $apiKey = '240610d6bd3b5ab2b9184234c7a2e132';
    private string $baseUrl = 'https://api.aviationstack.com/v1';
    private string $method;

    public function __construct($data)
    {
        parent::__construct();
    }


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

}