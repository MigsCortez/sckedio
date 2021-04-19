<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Designer\Design;

class DesignRating extends Model
{
    use HasFactory;

    protected $table = 'design_ratings';
    
    protected $fillable = [
        'rate'
    ];

    protected $visible = [
        'rate',
        'design_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function design()
    {
        return $this->belongsTo(Design::class, 'design_id');
    }
}
