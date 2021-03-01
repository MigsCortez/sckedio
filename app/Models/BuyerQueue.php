<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Designer\Design;
use App\Models\User;

class BuyerQueue extends Model
{
    use HasFactory;
    protected $table = 'buyer_queue';

    protected $fillable = [
        'buyer_id',
        'designer_id',
        'is_active'
    ];

    public function design()
    {
        return $this->belongsTo(Design::class, 'design_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }
}
