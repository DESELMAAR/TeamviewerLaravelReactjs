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
        Schema::create('orders', function (Blueprint $table) {
            $table->string("id")->unique()->primary();
            $table->string("order_name")->nullable();
            $table->string("costumer_name")->nullable();
            $table->string("costumer_account")->nullable()->unique();
            $table->string("agent_name")->nullable();
            $table->string("status")->nullable();
            $table->string("agent_id")->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
