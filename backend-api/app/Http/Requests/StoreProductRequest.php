<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
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
            'product_code' => 'required|string|unique:products,product_code',
            'name' => 'required|string|max:255',
            'unit' => 'required|in:400g,1kg',
            'retail_price' => 'required|numeric|min:0',
            'whole_sale' => 'nullable|numeric|min:0',
            'is_active' => 'boolean',
        ];
    }

    public function messages()
    {
        return [
            'product_code.required' => 'Product code is required.',
            'product_code.unique' => 'Product code must be unique.',
            'name.required' => 'Product name is required.',
            'unit.required' => 'Unit is required (e.g., 400g, 1kg).',
            'retail_price.required' => 'Retail price is required.',
            'retail_price.numeric' => 'Retail price must be a valid number.',
            'whole_sale.required' => 'Wholesale price is required.',
            'whole_sale.numeric' => 'Wholesale price must be a valid number.',
        ];
    }

}
