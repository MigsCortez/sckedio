<?php

namespace App\Models\Designer;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Designer\DesignFile;
use App\Models\BuyerQueue;

class Design extends Model
{
    use HasFactory;
    
    protected $table = 'designs';

    protected $fillable = [
        'owner_id',
        'idea_name',
        'created_at',
        'updated_at',
    ];


    public function user()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function public_files()
    {
        return $this->hasMany(DesignFile::class, 'design_id')->where('is_private', 0);
    }

    public function private_files()
    {
        return $this->hasMany(DesignFile::class, 'design_id')->where('is_private', 1);
    }

    public function design_information()
    {
        return $this->hasOne(DesignInformation::class);
    }

    public function buyer_queue()
    {
        return $this->hasMany(BuyerQueue::class, 'design_id');
    }
}
