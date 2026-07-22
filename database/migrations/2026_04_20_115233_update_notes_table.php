<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Models\User;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //
        Schema::table('notes', function (Blueprint $table) {
            $table->string('title', 2000)->nullable()->change();
            $table->string('text', 60000)->nullable()->change();
            $table->string('category')->nullable()->change();
            $table->float('cost')->nullable()->change();
            $table->datetime('due_datetime')->nullable()->change();
            $table->string('color')->nullable()->change();
            $table->foreignIdFor(User::class)->constrained();
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
