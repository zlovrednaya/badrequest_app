<?php

namespace App\Notifications\Channels;

use MailerSend\MailerSend;
use MailerSend\Helpers\Builder\Recipient;
use MailerSend\Helpers\Builder\EmailParams;

use App\Notifications\AbstractNotification;

use Illuminate\Support\Facades\Log;

class EmailChannel extends AbstractNotification 
{

    public function __construct(string $apiKey)
    {
        $this->apiKey = $apiKey;
        $this->mainSender = 'info@dgoitdepot.com';
    }

    public function sendMessage(array $sendData): void
    {
        $mailersend = new MailerSend(['api_key' => $this->apiKey]);

        $recipients = [
            new Recipient($sendData['receiver']['email'], $receiver['receiver']['name'] ?? 'User'),
        ];

        Log::info($sendData);
        $emailParams = (new EmailParams())
            ->setFrom($this->mainSender)
            ->setFromName('DariasWidgetFactoryInfo')
            ->setRecipients($recipients)
            ->setSubject($sendData['subject'] ?? '[no-reply]')
            ->setHtml($sendData['message'])
            ->setText($sendData['message']);

        $mailersend->email->send($emailParams);

        return;
    }
}

