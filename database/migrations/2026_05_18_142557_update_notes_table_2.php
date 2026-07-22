<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('notes', function (Blueprint $table) {
            $table->text('telegram_message_id')->nullable();
        });


        // 1 batch -> many todonotes
        Schema::create('batches', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('user_id')->index();
        });

        Schema::create('notes_batches', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('batch_id')->index();
            $table->foreignId('note_id')->index();
             $table->foreignId('user_id')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
