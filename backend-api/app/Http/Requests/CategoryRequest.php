<?php

namespace App\Http\Requests;

use App\Helpers\ResponseHelper;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;

class CategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:255|unique:categories,name',
        ];
    }

    /**
     * Return validation exception when validation failed
     * @param Validator $validator
     * @return void
     */
    public function failedValidation(Validator $validator): void
    {
        ResponseHelper::sendError('Validation Error', $validator->errors(), 400);
    }
}
