<?php
namespace App\Notifications\Messages;
class ChoreMessage 
{

    public function toText($chore): string 
    {
        $text = "Hello! This is your chore: \n
            {$chore['title']} {$chore['message']}\n
            <img src='{$chore['drawing']}'/>
        ";
        echo var_dump($text);die;
        return $text;
    }
}