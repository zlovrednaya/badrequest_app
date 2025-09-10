<?php

namespace App\Services\Integrations\AviationStack;

use App\Services\Integrations\AbstractApi;

class AviationStack extends AbstractApi
{
    //public string $baseUrl = 'https://api.aviationstack.com/v1/';
    private string $method;
    
    public function getFlightData($data): array
    {
        $result = $this->request('/flights', 'GET', $data);

        return $result;
        /**
         * [{"flight_date":"2025-09-08","flight_status":"landed","departure":{"airport":"Schiphol","timezone":"Europe\/Amsterdam","iata":"AMS","icao":"EHAM","terminal":"1","gate":"C5","delay":20,"scheduled":"2025-09-08T16:50:00+00:00","estimated":"2025-09-08T16:50:00+00:00","actual":"2025-09-08T17:09:00+00:00","estimated_runway":"2025-09-08T17:09:00+00:00","actual_runway":"2025-09-08T17:09:00+00:00"},"arrival":{"airport":"Keflavik International","timezone":"Atlantic\/Reykjavik","iata":"KEF","icao":"BIKF","terminal":null,"gate":"C","baggage":"5","scheduled":"2025-09-08T18:05:00+00:00","delay":null,"estimated":"2025-09-08T17:41:00+00:00","actual":"2025-09-08T17:41:00+00:00","estimated_runway":"2025-09-08T17:41:00+00:00","actual_runway":"2025-09-08T17:41:00+00:00"},"airline":{"name":"Icelandair","iata":"FI","icao":"ICE"},"flight":{"number":"507","iata":"FI507","icao":"ICE507","codeshared":null},"aircraft":null,"live":null}]
         */
    }

    public function getAirportData($data): array
    {
        $result = $this->request('/airports', 'GET', $data);

        return $result;
        /**
         * [{"flight_date":"2025-09-08","flight_status":"landed","departure":{"airport":"Schiphol","timezone":"Europe\/Amsterdam","iata":"AMS","icao":"EHAM","terminal":"1","gate":"C5","delay":20,"scheduled":"2025-09-08T16:50:00+00:00","estimated":"2025-09-08T16:50:00+00:00","actual":"2025-09-08T17:09:00+00:00","estimated_runway":"2025-09-08T17:09:00+00:00","actual_runway":"2025-09-08T17:09:00+00:00"},"arrival":{"airport":"Keflavik International","timezone":"Atlantic\/Reykjavik","iata":"KEF","icao":"BIKF","terminal":null,"gate":"C","baggage":"5","scheduled":"2025-09-08T18:05:00+00:00","delay":null,"estimated":"2025-09-08T17:41:00+00:00","actual":"2025-09-08T17:41:00+00:00","estimated_runway":"2025-09-08T17:41:00+00:00","actual_runway":"2025-09-08T17:41:00+00:00"},"airline":{"name":"Icelandair","iata":"FI","icao":"ICE"},"flight":{"number":"507","iata":"FI507","icao":"ICE507","codeshared":null},"aircraft":null,"live":null}]
         */
    }

    protected function getHeaders(): array
    {
        return [];
    }

    public function request(string $endpoint, string $method = 'GET', array $data = []): mixed
    {
        $data['access_key'] = $this->token;

        return parent::request($endpoint, $method, $data);
    }

    protected function handleResponse(string $rawResponse): array
    {
        return json_decode($rawResponse, true);
    }

}