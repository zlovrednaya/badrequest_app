<?php
namespace App\Models\Integrations;

abstract class AbstractApi
{
    public string $baseUrl;
    public string $apiKey;

    public function __construct()
    {

    }

    final public function request(string $endpoint, string $method = 'GET', array $data = []): mixed
    {
        $url = $this->baseUrl . $endpoint;
        $headers = $this->getHeaders();

        $options = [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => $method,
            CURLOPT_HTTPHEADER => $headers,
        ];

        if (!empty($data)) {
            $options[CURLOPT_POSTFIELDS] = json_encode($data);
        }

        $ch = curl_init();
        curl_setopt_array($ch, $options);
        $response = curl_exec($ch);
        curl_close($ch);

        return $this->handleResponse($response);
    }

    abstract protected function getHeaders(): array;

}