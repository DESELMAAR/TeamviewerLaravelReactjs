<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable=[
"order_id",
"order_name",
"costumer_name",
"costumer_account",
"agent_name",
"status",
"agent_id",
    ];

public function services(){
    return $this->belongsToMany(Services::class);
}
}
