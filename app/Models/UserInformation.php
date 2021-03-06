<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserInformation extends Model
{
    use HasFactory;

    protected $table = "users_information";

    protected $fillable = [
        'user_id',
        'bio',
        'first_name',
        'last_name',
        'state',
        'city',
        'street',
        'postal_code',
        'country'
    ];

    protected $hidden =[
        'user_id',
        'id',
        'created_at',
        'updated_at'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
