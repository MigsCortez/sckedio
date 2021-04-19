<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use App\Models\Designer\Design;
use App\Models\BuyerQueue;
use App\Models\DisplayPicture;
use App\Models\SocialLink;
use App\Models\DesignRating;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasRoles, HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
        // 'id',
        'role',
        'email_verified_at',
        'created_at',
        'updated_at',
        // 'roles'
    ];

    protected $visible = [
        'username',
        'email',
        'display_picture'
    ];

    // protected $appends = [
    //     'role_names'
    // ];
    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function activeDisplayPicture()
    {
        return $this->hasMany(DisplayPicture::class, 'user_id')->where('is_active', 1);
    }

    public function displayPicture()
    {
        return $this->hasMany(DisplayPicture::class, 'user_id');
    }

    public function design_rating()
    {
        return $this->hasMany(DesignRating::class, 'user_id');
    }

    public function social_link()
    {
        return $this->hasMany(SocialLink::class, 'user_id')->select('social_media', 'social_link');
    }

    public function user_information()
    {
        return $this->hasOne(UserInformation::class);
    }

    public function design()
    {
        return $this->hasMany(Design::class, 'owner_id');
    }

    public function findForPassport($username) 
    {
        return $this->where('username', $username)->first();
    }

    public function buyer_queue()
    {
        return $this->hasMany(BuyerQueue::class, 'buyer_id');
    }
}
