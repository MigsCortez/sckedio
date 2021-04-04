<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class Subscriber extends Model
{
    use Notifiable, SoftDeletes, HasFactory;

    protected $table = "subscribers";
    
    protected $fillable = [
        'name',
        'email'
    ];

}
