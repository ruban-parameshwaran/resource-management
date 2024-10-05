<?php

namespace App\Http\Requests;

use App\Helpers\ResponseHelper;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;

class UpdateCustomerRequest extends FormRequest
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
            'name'      => 'required|string|max:255',
            'contact'   => 'required|string|max:255',
            'address'   => 'required|string|max:255',
            'email'     => 'required|email',
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
