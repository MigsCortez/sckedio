<?php

namespace App\Models\Designer;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Designer\Design;
class DesignFile extends Model
{
    use HasFactory;
    protected $table = 'design_files';
    
    protected $fillable = [
        'file_route',
        'is_private',
        'created_at',
        'updated_at',
    ];

    protected $visible = [
        'file_route',
        'is_private',
    ];

    protected $hidden = [
        'id'
    ];

    public function design()
    {
        return $this->belongsTo(Design::class, 'design_id');
    }
}
