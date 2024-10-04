<?php

namespace App\Http\Requests;

use App\Helpers\ResponseHelper;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;

class UpdateProductRequest extends FormRequest
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
            'product_code'      => 'required|string',
            'name'              => 'required|string|max:255',
            'unit'              => 'required|in:400g,1kg',
            'retail_price'      => 'required|numeric|min:0',
            'whole_sale'        => 'nullable|numeric|min:0',
            'is_active'         => 'boolean',
            'category_id'       => 'required|exists:categories,id',
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
