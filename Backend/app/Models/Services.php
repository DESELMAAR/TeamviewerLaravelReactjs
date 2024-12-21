<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Services extends Model
{
    use HasFactory;
    protected $fillable = [
        'Service','Added_By'
    ];

    public function user(){
        return $this->belongsTo(User::class,foreignKey:'Added_By',ownerKey:'id');
    }

    public function order(){
        return $this->belongsToMany(Order::class);
    }

}
