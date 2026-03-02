<?php

namespace App\Notifications\Channels;

use MailerSend\MailerSend;
use MailerSend\Helpers\Builder\Recipient;
use MailerSend\Helpers\Builder\EmailParams;

use App\Notifications\AbstractNotification;

class EmailChannel extends AbstractNotification 
{

    public function __construct(string $apiKey)
    {
        $this->apiKey = $apiKey;
        $this->mainSender = 'info@dgoitdepot.com';
    }

    public function sendMessage($sendData): void
    {
        $mailersend = new MailerSend(['api_key' => $this->apiKey]);

        $recipients = [
            new Recipient('dasha13111997@gmail.com', 'Daria'),
        ];
        Log::info($sendData);die;
        $emailParams = (new EmailParams())
            ->setFrom($this->mainSender)
            ->setFromName('DariasWidgetFactoryInfo')
            ->setRecipients($recipients)
            ->setSubject('Subject')
            ->setHtml('This is the HTML content')
            ->setText($sendData['message']);

        $mailersend->email->send($emailParams);
    }
}

