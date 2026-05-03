<?php
namespace App\Notifications\Messages;
class ChoreMessage 
{

    public function toText($chore): string 
    {
        $text = "Hello! This is your chore: \n
            <h2>{$chore['title']}</h2> \n
            {$chore['text']}\n
            <img src='{$chore['drawing']}'/>
        ";
        return $text;
    }
}