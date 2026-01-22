<?php

namespace App\Services\Channels;

use MailerSend\MailerSend;
use MailerSend\Helpers\Builder\Recipient;
use MailerSend\Helpers\Builder\EmailParams;

class MailerSendService extends AbstractNotification {
    public string $apiKey = 'mlsn.d05be6f00e56ef65dd24be03c692e9562258c5a58b6336f4edcd97d3abaf7d53';

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

