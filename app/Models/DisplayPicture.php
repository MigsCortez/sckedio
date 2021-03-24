<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class DisplayPicture extends Model
{
    use HasFactory;
    protected $table = 'display_pictures';

    protected $fillable = [
        'filename',
        'url',
        'is_active'
    ];

    protected $visible = [
        'url'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
