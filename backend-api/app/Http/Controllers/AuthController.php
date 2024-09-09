<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginUserRequest;
use App\Models\User;
use App\Traits\HttpResponses;
use Carbon\Carbon;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    use HttpResponses;

    public function login(LoginUserRequest $request) {
        try {
            $credentials = [
                'email' => $request->input('email'),
                'password' => $request->input('password'),
            ];

            $user = User::where('email', $credentials['email'])->first();

            if($user && empty($user->password)){
                return $this->loginFailedResponse("Password not found!. Use forget password option to reset your password.", 401);
            }

            if (!$user) {
                return $this->loginFailedResponse("Your credentials are incorrect!", 401);
            }

            if(!(Auth::attempt($credentials))) {
                return $this->loginFailedResponse("Your credentials are incorrect!.", 401);
            } else {
                $authUser                   =  Auth::user();
                $authUser->updated_at       = Carbon::now()->toDateTimeString();
                $authUser->save();

                $data['token']          =  $authUser->createToken($authUser->name.time())->plainTextToken;
                $data['id']             =  $authUser->id;
                $data['email']          =  $authUser->email;

                return $this->success('User successfully signed in', $data, 200);
            }
        } catch (AuthenticationException|\Exception $e) {
            return $this->error('Login Failed',[$e->getMessage()],);
        }
    }

    public function logout() {
        Auth::user()->currentAccessToken()->delete();
            return $this->success('', [], 204);
    }
}
