<?php

namespace App\Http\Requests;

use App\Helpers\ResponseHelper;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;

class UpdateOrderRequest extends FormRequest
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
            'order_num' => 'required',
            'customer_id' => 'required|exists:customers,id',
            'order_date' => 'required|date',
            'order_amount' => 'required|numeric',
            'order_description' => 'nullable|string',
            'delivery_id' => 'nullable|exists:deliveries,id',
            'payment_method' => 'required|in:cod,card,onlinetransfer',
            'status' => 'required|in:open,processing,delivered,rejected,cancel',
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
