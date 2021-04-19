<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class SocialLink extends Model
{
    use HasFactory;
    protected $table = 'social_links';
    
    protected $fillable = [
        'social_link',
        'social_media'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
