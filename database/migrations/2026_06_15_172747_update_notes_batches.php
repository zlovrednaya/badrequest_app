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
        if (!Schema::hasColumn('notes_batches', 'note_ids')) {
            Schema::table('notes_batches', function (Blueprint $table) {
                $table->json('note_ids')->nullable();
            });
        }
        if (Schema::hasColumn('notes_batches', 'note_id')) {
            Schema::table('notes_batches', function (Blueprint $table) {
                $table->dropColumn('note_id');
            });
        }
        if (Schema::hasColumn('notes_batches', 'batch_id')) {
            Schema::table('notes_batches', function (Blueprint $table) {
                    $table->dropColumn('batch_id');
            });
        }

        Schema::table('notes_batches', function (Blueprint $table) {
                $table->json('batch_name')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
       
    }
};
