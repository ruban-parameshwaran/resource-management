<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use App\Traits\HttpResponses;

class LoginUserRequest extends FormRequest
{   

    use HttpResponses;

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
            'email'     => 'required|string|email|exists:users,email',
            'password'  => 'required|string|min:6',
        ];
    }

    public function messages(): array
    {
        return [
            'email.exists'=> "User doesn't exist with this email!",
        ];
    }

    public function failedValidation(Validator $validator): void
    {
        $this->loginFailedResponse("Your credentials are incorrect!.", 400);
    }
}
