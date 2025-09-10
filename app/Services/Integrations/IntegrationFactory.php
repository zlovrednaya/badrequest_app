<?php
namespace App\Services\Integrations;

use App\Services\Integrations\AviationStack\AviationStack;

class IntegrationFactory
{
    public static function create(string $service)
    {
        return match (strtolower($service)) {
            'aviationstack' => new AviationStack('https://api.aviationstack.com/v1', config('services.aviationstack.token')),
            default => throw new InvalidArgumentException("Unsupported API service: $service"),
        };
    }
}