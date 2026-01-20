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
        Schema::create('flights_subscribers', function (Blueprint $table) {
            $table->id();
            $table->integer('flight_id');
            $table->integer('subscriber_id');
            $table->string('notification_status');
            $table->timestamp('last_checked_at')->useCurrent();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('flights_notifications');
    }
};
