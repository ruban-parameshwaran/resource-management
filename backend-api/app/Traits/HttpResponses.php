<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Exceptions\HttpResponseException;

trait HttpResponses {

    /**
     * Return success message as a json response
     * @param mixed $data
     * @param string|null $message
     * @param int $code
     * @return JsonResponse
     */
    protected function success(string $message, array $data = [], int $code = 401): JsonResponse
    {
        return response()->json([
           'success' => true ,
           'message' => $message ,
           'data'    => $data ,
        ], $code);
    }

    /**
     * Return error message as a json response
     * @param string|null $message
     * @param array $errors
     * @param int $code
     * @return JsonResponse
     */
    protected function error(string $message, array $errors = [], int $code = 401): JsonResponse
    {
        $response = ['success' => false, 'message' => $message];

        if(!empty($errors)){
            $response['data'] = $errors;
        }

        throw new HttpResponseException(response()->json($response, $code));
    }

    protected function loginFailedResponse(string $message, int $code){
        $response = ['success' => false, 'message' => $message];
        throw new HttpResponseException(response()->json($response, $code));
    }
}
