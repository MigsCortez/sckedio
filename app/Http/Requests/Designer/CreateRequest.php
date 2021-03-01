<?php

namespace App\Http\Requests\Designer;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        if(Auth::user())
        {
            return true;
        }

        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'idea_name' => 'required|string',
            'description' => 'required|string',
            'category' => 'required|numeric',
            'design_cost' => 'required|numeric',
            'idea_type' => 'required|numeric',
            'public_files.*' => 'file|image|mimes:docx,pdf,jpeg,jpg,png,gif|max:204800',
            'private_files.*' => 'file|image|mimes:docx,pdf,jpeg,jpg,png,gif|max:204800',
        ];
    }
}

