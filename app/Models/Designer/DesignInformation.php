<?php

namespace App\Models\Designer;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DesignInformation extends Model
{
    use HasFactory;

    protected $table = 'designs_information';

    protected $fillable = [
        'design_id',
        'description',
        'category_id',
        'design_cost',
        'idea_type_id',
        'created_at',
        'updated_at',
    ];

    protected $visible = [
        'design_id',
        'description',
        'category_id',
        'design_cost',
        'idea_type_id',
    ];

    public function design()
    {
        return $this->belongsTo(Design::class);
    }

    public function ideaType()
    {
        return $this->hasOne(IdeaType::class);
    }

}
