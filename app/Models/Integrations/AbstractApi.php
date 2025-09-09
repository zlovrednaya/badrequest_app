<?php
namespace App\Models\Integrations;

abstract class AbstractApi
{
    protected string $baseUrl;
    protected string $apiKey;

    public function __construct($baseUrl, $token)
    {
        $this->baseUrl = $baseUrl;
        $this->token = $token;
    }

    final public function request(string $endpoint, string $method = 'GET', array $data = []): mixed
    {
        $url = $this->baseUrl . $endpoint;
        $headers = $this->getHeaders();

        if(!empty($data)) {
            switch ($method) {
                case 'POST':
                case 'PUT':
                case 'PATCH':
                    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
                    break;
                case 'GET':
                    $url .= '?' . http_build_query($data);
                    break;    

            }
        }

        $options = [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => $method,
            CURLOPT_HTTPHEADER => $headers,
        ];
        
        $ch = curl_init();
        curl_setopt_array($ch, $options);
        $response = curl_exec($ch);
        curl_close($ch);
        echo print_r([$url,$response]);die;

        return $this->handleResponse($response);
    }

    abstract protected function getHeaders(): array;

}