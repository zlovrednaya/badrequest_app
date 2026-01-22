<?php
namespace App\Services\Notifications;

abstract class AbstractNotification
{
    protected string $apiKey;
    protected array $recipient;
    protected string $message;

    public function __construct(array $recipient, string $message)
    {
        $this->recipient = $recipient;
        $this->message = $message;
    }

    public function getRecipients(): void
    {
        
    }
    public function sendMessage(): void
    {
        
    }
} 