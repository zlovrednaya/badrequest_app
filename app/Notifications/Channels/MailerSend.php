<?php

namespace App\Notifications;

use MailerSend\Helpers\Builder\Recipient;
use MailerSend\Helpers\Builder\EmailParams;

class MailerSend extends AbstractNotification 
{
    private $apiKey;

    public function __construct()
    {
        $this->apiKey = config('services.mailersend.token');
    }
    
    public function sendMessage(): void
    {
        $mailersend = new MailerSend(['api_key' => $this->apiKey]);

        $recipients = [
            new Recipient('dasha13111997@gmail.com', 'Daria'),
        ];

        $emailParams = (new EmailParams())
            ->setFrom('info@test-86org8e3mekgew13.mlsender.net')
            ->setFromName('Test mail')
            ->setRecipients($recipients)
            ->setSubject('Subject')
            ->setHtml('This is the HTML content')
            ->setText('This is the text content');

        $mailersend->email->send($emailParams);
    }
}

